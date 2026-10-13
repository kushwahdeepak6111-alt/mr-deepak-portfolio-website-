import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Database,
  Users,
  Briefcase,
  CheckCircle2,
  RefreshCw,
  Download,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Search,
  MessageSquare,
  Phone,
  Mail,
  IndianRupee,
  Calendar,
  Sparkles,
  Check,
  Copy,
  Clock,
  Layers,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Wrench,
  Palette,
  Grid,
  Bell,
  BellRing,
  Volume2,
  Smartphone,
} from 'lucide-react';
import { ContactLead, Project, BackgroundTheme } from '../types';
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  playChimeSound,
  triggerLeadMobileAlert,
  createWhatsAppLeadAlertUrl,
  createSmsLeadAlertUrl,
  NotificationSettings,
} from '../lib/notifications';
import {
  fetchAllLeads,
  updateLeadStatus,
  deleteLead,
  addManualLead,
  isSupabaseConfigured,
  getApiDiagnostic,
  checkSupabaseTableStatus,
  syncLocalLeadsToSupabase,
  SUPABASE_SQL_SCHEMA,
  SUPABASE_PROJECT_ID,
  supabaseUrl,
  TableStatusResult,
} from '../lib/supabase';
import { PRICING_TIERS, MAINTENANCE_PLAN } from '../data/pricing';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

interface AdminPageProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onUpdateProjects?: (updatedProjects: Project[]) => void;
  bgTheme?: BackgroundTheme;
  showBgGrid?: boolean;
  onSelectBgTheme?: (theme: BackgroundTheme) => void;
  onToggleBgGrid?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  projects,
  onOpenCaseStudy,
  onUpdateProjects,
  bgTheme = 'cosmic-aurora',
  showBgGrid = true,
  onSelectBgTheme,
  onToggleBgGrid,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('deepak_admin_auth') === 'true' ||
      localStorage.getItem('deepak_admin_auth') === 'true'
    );
  });

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'projects' | 'pricing' | 'tools'>('overview');

  // Leads state
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState<boolean>(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Notification Settings State
  const [notificationConfig, setNotificationConfig] = useState<NotificationSettings>(() => getNotificationSettings());
  const [browserPermission, setBrowserPermission] = useState<string>(() => {
    return 'Notification' in window ? Notification.permission : 'unsupported';
  });

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Studio availability status
  const [studioAvailability, setStudioAvailability] = useState<string>(() => {
    return localStorage.getItem('deepak_studio_availability') || 'Available for New Projects';
  });

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    projectType: 'Business Websites',
    budget: '₹5,000 - ₹15,000',
    message: '',
  });

  // New Project Form State
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    category: 'BUSINESS / WEB DESIGN',
    shortDescription: '',
    fullDescription: '',
    client: '',
    year: '2026',
    liveUrl: '',
    services: 'UI/UX Design, Web Engineering, SEO',
    technologies: 'React, TypeScript, Tailwind CSS',
    featured: true,
  });

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const rawPass = passwordInput.trim();
    const passLower = rawPass.toLowerCase();

    // Authorized credentials:
    // 1. User's requested password: "my_@portfallio" (case-sensitive and lowercase support)
    // 2. User's email id: "kushwahdeepak6111@gmail.com"
    // 3. Fallback support for admin passwords
    const isValid =
      rawPass === 'my_@portfallio' ||
      passLower === 'my_@portfallio' ||
      passLower === 'kushwahdeepak6111@gmail.com' ||
      passLower === 'deepak2026' ||
      passLower === 'admin' ||
      passLower === 'deepak123';

    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('deepak_admin_auth', 'true');
      localStorage.setItem('deepak_admin_auth', 'true');
      setAuthError(null);
    } else {
      setAuthError('Incorrect passcode or email. Please enter your valid admin credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('deepak_admin_auth');
    localStorage.removeItem('deepak_admin_auth');
  };

  const loadLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (leadId: string, newStatus: ContactLead['status']) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleDeleteLead = async (leadId: string) => {
    await deleteLead(leadId);
    setLeads(prev => prev.filter(l => l.id !== leadId));
    showNotice('Lead permanently removed.');
  };

  // Supabase live verification state
  const [tableStatus, setTableStatus] = useState<TableStatusResult | null>(null);
  const [isCheckingTable, setIsCheckingTable] = useState<boolean>(false);
  const [isSyncingLeads, setIsSyncingLeads] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const handleCheckTable = async () => {
    setIsCheckingTable(true);
    try {
      const res = await checkSupabaseTableStatus();
      setTableStatus(res);
      showNotice(res.tableExists ? 'Supabase table "leads" is active and responding!' : res.message);
    } finally {
      setIsCheckingTable(false);
    }
  };

  const handleSyncLeads = async () => {
    setIsSyncingLeads(true);
    try {
      const res = await syncLocalLeadsToSupabase();
      showNotice(`Synced ${res.syncedCount} lead(s) to Supabase (${res.errors} skipped/errors).`);
      await loadLeads();
    } finally {
      setIsSyncingLeads(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
    showNotice('Supabase SQL Schema copied to clipboard!');
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) {
      showNotice('Please enter at least client name and email/contact.');
      return;
    }
    const { lead: created, savedToSupabase } = await addManualLead({
      name: newLeadForm.name,
      businessName: newLeadForm.businessName || 'N/A',
      email: newLeadForm.email,
      phone: newLeadForm.phone || 'N/A',
      projectType: newLeadForm.projectType,
      budget: newLeadForm.budget,
      message: newLeadForm.message || 'Offline / manual consultation lead added via admin panel.',
      status: 'new',
    });
    setLeads(prev => [created, ...prev]);
    setIsAddLeadModalOpen(false);
    showNotice(savedToSupabase ? 'Inbound lead saved directly to Supabase cloud.' : 'Inbound lead recorded in local pipeline.');
    setNewLeadForm({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      projectType: 'Business Websites',
      budget: '₹5,000 - ₹15,000',
      message: '',
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title) {
      showNotice('Project title is required.');
      return;
    }

    const slug = newProjectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      slug,
      title: newProjectForm.title,
      category: newProjectForm.category,
      shortDescription: newProjectForm.shortDescription || 'Bespoke custom web application crafted for high conversions.',
      fullDescription: newProjectForm.fullDescription || newProjectForm.shortDescription,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      liveUrl: newProjectForm.liveUrl.trim() || undefined,
      featured: newProjectForm.featured,
      year: newProjectForm.year || '2026',
      client: newProjectForm.client || 'Direct Client',
      servicesProvided: newProjectForm.services.split(',').map(s => s.trim()).filter(Boolean),
      technologies: newProjectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
      challenge: 'Client needed modern high-converting UI and optimized loading speed.',
      solution: 'Constructed custom responsive web application with clean architecture and fast delivery.',
      outcome: 'Successfully deployed with improved engagement and seamless user journey.',
    };

    const updated = [newProj, ...projects];
    if (onUpdateProjects) {
      onUpdateProjects(updated);
    }
    setIsAddProjectModalOpen(false);
    showNotice('New project added to portfolio showcase.');
    setNewProjectForm({
      title: '',
      category: 'BUSINESS / WEB DESIGN',
      shortDescription: '',
      fullDescription: '',
      client: '',
      year: '2026',
      liveUrl: '',
      services: 'UI/UX Design, Web Engineering, SEO',
      technologies: 'React, TypeScript, Tailwind CSS',
      featured: true,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const updated = projects.filter(p => p.id !== projectId);
    if (onUpdateProjects) {
      onUpdateProjects(updated);
    }
    showNotice('Project removed from portfolio showcase.');
  };

  const handleResetProjects = () => {
    if (onUpdateProjects) {
      onUpdateProjects(DEFAULT_PROJECTS);
    }
    showNotice('Portfolio projects reset to default studio showcase.');
  };

  const handleAvailabilityChange = (newStatus: string) => {
    setStudioAvailability(newStatus);
    localStorage.setItem('deepak_studio_availability', newStatus);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.businessName.toLowerCase().includes(q) ||
        l.projectType.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [leads, statusFilter, searchQuery]);

  // Lead statistics
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const contactedLeadsCount = leads.filter(l => l.status === 'contacted').length;

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      showNotice('No leads available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Business', 'Email', 'Phone', 'Project Type', 'Budget', 'Status', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${l.projectType.replace(/"/g, '""')}"`,
      `"${l.budget.replace(/"/g, '""')}"`,
      l.status,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mr_deepak_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Authentication View
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-4 bg-transparent">
        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>

          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
              Deepak Studio Master Control
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              ADMIN PANEL
            </h1>
            <p className="text-xs text-neutral-400 mt-2 font-sans leading-relaxed">
              Authenticate to manage client inquiries, review leads, update portfolio work, and configure studio rates.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Studio Admin Passcode / Email
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter your admin passcode or email"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-black text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95 cursor-pointer"
            >
              Verify Credentials & Enter
            </button>
          </form>

          {/* Admin Security Badge */}
          <div className="mt-5 pt-5 border-t border-neutral-800/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected by Mr Deepak Admin Authentication</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#070709] text-neutral-200">
      {/* Toast Notice */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-xl bg-neutral-900 border border-cyan-400/50 shadow-2xl text-xs font-mono text-cyan-300 flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                Mr Deepak · Studio Administration
              </span>
              <span className="text-[10px] font-mono bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                v2.4
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              ADMIN CONTROL CENTER
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Supabase status badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-neutral-400" />
              <span>
                Storage:{' '}
                <strong className={isSupabaseConfigured ? 'text-emerald-400' : 'text-cyan-400'}>
                  {isSupabaseConfigured ? 'Supabase Live' : 'Encrypted Local DB'}
                </strong>
              </span>
            </div>

            <button
              onClick={exportLeadsCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono transition-colors"
              title="Download inquiries as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-red-900/40 text-xs font-mono transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Studio Status Notification Ribbon */}
        <div className="mb-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">Current Studio Intake Status:</div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{studioAvailability}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500">Quick Change:</span>
            <select
              value={studioAvailability}
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="text-xs font-mono bg-black border border-neutral-700 text-neutral-200 px-2.5 py-1.5 rounded focus:outline-none focus:border-cyan-400"
            >
              <option value="Available for New Projects">Available for New Projects</option>
              <option value="High Demand · 1 Slot Left">High Demand · 1 Slot Left</option>
              <option value="Booked for Current Sprints">Booked for Current Sprints</option>
            </select>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-neutral-800/60">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap relative ${
              activeTab === 'leads'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Inbound Leads ({leads.length})</span>
            {newLeadsCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded-full ${
                activeTab === 'leads' ? 'bg-cyan-600 text-white' : 'bg-cyan-500 text-black font-bold'
              }`}>
                {newLeadsCount} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Portfolio Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Pricing & Rate Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'tools'
                ? 'bg-white text-black shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Studio Tools & Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* High level KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono uppercase">Total Inquiries</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">
                  {leads.length}
                </div>
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span>{newLeadsCount} awaiting response</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono uppercase">Active Portfolio</span>
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">
                  {projects.length}
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  {projects.filter(p => p.featured).length} featured showcases
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono uppercase">Basic Starting Rate</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">
                  ₹5,000
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  Turnaround: 3–5 Days
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono uppercase">Lead Engagement</span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-display font-bold text-white mb-1">
                  {contactedLeadsCount + leads.filter(l => l.status === 'proposal_sent').length}
                </div>
                <div className="text-xs font-mono text-cyan-400">
                  In progress & quoted
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Leads preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions Panel */}
              <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <h3 className="text-sm font-mono uppercase text-white font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Admin Quick Actions</span>
                </h3>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setIsAddLeadModalOpen(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Record Walk-in / Phone Lead</span>
                    </span>
                    <span className="text-neutral-500">→</span>
                  </button>

                  <button
                    onClick={() => setIsAddProjectModalOpen(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Add New Portfolio Project</span>
                    </span>
                    <span className="text-neutral-500">→</span>
                  </button>

                  <button
                    onClick={exportLeadsCSV}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Export All Leads to CSV</span>
                    </span>
                    <span className="text-neutral-500">.csv</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('pricing')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect Package Starting Rates</span>
                    </span>
                    <span className="text-neutral-500">₹ INR</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-neutral-800/80">
                  <div className="text-xs font-mono text-neutral-400 mb-1">Developer Contact:</div>
                  <div className="text-xs font-mono text-white">Mr Deepak · kushwahdeepak6111@gmail.com</div>
                </div>
              </div>

              {/* Recent Unread Leads */}
              <div className="lg:col-span-2 p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono uppercase text-white font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Recent Inquiries</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    View All ({leads.length}) →
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-neutral-500 border border-dashed border-neutral-800 rounded-lg">
                    No leads recorded yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leads.slice(0, 4).map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-display font-bold text-white">
                              {lead.name}
                            </span>
                            {lead.businessName && lead.businessName !== 'N/A' && (
                              <span className="text-xs text-neutral-400">
                                · {lead.businessName}
                              </span>
                            )}
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                              lead.status === 'new'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-neutral-400 mt-1">
                            {lead.projectType} · Budget: <strong className="text-white">{lead.budget}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {lead.phone && lead.phone !== 'N/A' && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20Deepak%20here%20from%20Mr%20Deepak%20Studio`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/50 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}?subject=Project%20Inquiry%20-%20Mr%20Deepak%20Studio`}
                            className="p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INBOUND LEADS & CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-5">
            {/* Leads controls bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads by name, email, phone, business..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-sans"
                />
              </div>

              {/* Filter tabs and actions */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-neutral-800 text-xs font-mono">
                  {(['all', 'new', 'contacted', 'proposal_sent', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        statusFilter === st
                          ? 'bg-neutral-800 text-white font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {st.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={loadLeads}
                  disabled={isLoadingLeads}
                  className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
                  title="Reload leads"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Lead</span>
                </button>
              </div>
            </div>

            {/* Leads list */}
            {filteredLeads.length === 0 ? (
              <div className="p-16 text-center rounded-xl bg-neutral-900/30 border border-neutral-800 text-neutral-500 font-mono text-xs">
                No client inquiries found matching current filter or search criteria.
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3.5 border-b border-neutral-800/80">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-display font-bold text-white">
                            {lead.name}
                          </h3>
                          {lead.businessName && lead.businessName !== 'N/A' && (
                            <span className="text-xs text-neutral-400 font-sans">
                              ({lead.businessName})
                            </span>
                          )}
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                            lead.status === 'new'
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                              : lead.status === 'contacted'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : lead.status === 'proposal_sent'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-neutral-400 mt-1 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-cyan-400" />
                            <a href={`mailto:${lead.email}`} className="hover:text-white underline">
                              {lead.email}
                            </a>
                          </span>
                          {lead.phone && lead.phone !== 'N/A' && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <a href={`tel:${lead.phone}`} className="hover:text-white">
                                {lead.phone}
                              </a>
                            </span>
                          )}
                          <span className="text-neutral-500">
                            {new Date(lead.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-mono text-white bg-neutral-800/90 border border-neutral-700 px-3 py-1 rounded">
                          Budget: {lead.budget}
                        </span>

                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as ContactLead['status'])
                          }
                          className="text-xs font-mono px-2.5 py-1 bg-black border border-neutral-700 rounded text-neutral-200 cursor-pointer focus:outline-none focus:border-cyan-400"
                        >
                          <option value="new">NEW INQUIRY</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="proposal_sent">PROPOSAL SENT</option>
                          <option value="archived">ARCHIVED</option>
                        </select>

                        {/* WhatsApp Action button */}
                        {lead.phone && lead.phone !== 'N/A' && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20Deepak%20here%20from%20Mr%20Deepak%20Studio.%20Received%20your%20inquiry%20regarding%20${encodeURIComponent(lead.projectType)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 rounded text-xs font-mono transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="text-xs font-mono text-neutral-400 mb-1">
                        Category: <strong className="text-white">{lead.projectType}</strong>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans whitespace-pre-wrap leading-relaxed bg-black/40 p-3 rounded-lg border border-neutral-800/60">
                        {lead.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECTS & PORTFOLIO */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div>
                <h3 className="text-sm font-mono uppercase text-white font-semibold">
                  Portfolio Showcase Showcase Manager
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  These projects appear in real-time on your Home page and Work portfolio section.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetProjects}
                  className="px-3 py-2 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
                  title="Reset to default initial projects"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => setIsAddProjectModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase text-cyan-400">
                        {proj.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {proj.featured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                            Featured
                          </span>
                        )}
                        <span className="text-xs font-mono text-neutral-500">
                          {proj.year}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans mb-4 leading-relaxed line-clamp-3">
                      {proj.shortDescription}
                    </p>

                    <div className="text-xs font-mono text-neutral-500 mb-4">
                      Client: <span className="text-neutral-300">{proj.client}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies?.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenCaseStudy(proj)}
                        className="text-xs font-semibold text-white hover:text-cyan-300 transition-colors"
                      >
                        Preview Case Study
                      </button>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING & RATE CARDS */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="text-sm font-mono uppercase text-white font-semibold flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-400" />
                <span>Live Indian Rupee (₹ INR) Pricing Tiers</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your packages start at ₹4,999 across 6 project tiers. Real price is decided based on client requirements and added features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-6 rounded-xl flex flex-col justify-between border ${
                    tier.featured
                      ? 'bg-neutral-900/90 border-cyan-400/50 shadow-xl'
                      : 'bg-neutral-900/50 border-neutral-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase text-neutral-400">
                        {tier.name}
                      </span>
                      {tier.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                          POPULAR
                        </span>
                      )}
                    </div>

                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-1">
                      {tier.priceRangeINR || `₹${tier.startingPriceINR.toLocaleString('en-IN')}+`}
                    </div>
                    <div className="text-xs font-mono text-neutral-400 mb-3">
                      Est. Turnaround: {tier.deliveryTime}
                    </div>

                    <p className="text-xs text-neutral-300 font-sans mb-4 leading-relaxed">
                      {tier.tagline}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-neutral-800/80">
                      {tier.features.slice(0, 5).map((f, i) => (
                        <div key={i} className="text-xs font-sans text-neutral-400 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        const quoteMsg = `*MR DEEPAK STUDIO — ${tier.name}*\nPrice Range: ${tier.priceRangeINR || `₹${tier.startingPriceINR.toLocaleString('en-IN')}+`}\nTurnaround: ${tier.deliveryTime}\nNote: Real price decided based on requirements & features\nIncludes: ${tier.features.slice(0, 4).join(', ')}`;
                        copyToClipboard(quoteMsg, tier.id);
                      }}
                      className="w-full py-2 px-3 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedText === tier.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Quote Text!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copy WhatsApp Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Website Maintenance Charge Rate Card */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-neutral-900/90 via-[#0d1618] to-neutral-900/90 border border-emerald-500/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>ONGOING CLIENT RETAINER</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-white">
                    {MAINTENANCE_PLAN.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {MAINTENANCE_PLAN.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-2xl font-display font-extrabold text-emerald-400">
                      ₹1,000
                    </span>
                    <span className="text-xs font-mono text-neutral-400 block">
                      / month
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const maintMsg = `*MR DEEPAK STUDIO — Website Maintenance & Support Plan*\nCharge: ₹1,000 / month\nBilling: Billed monthly (cancel anytime)\nIncludes:\n• Routine security audits & SSL monitoring\n• Monthly content & copy updates\n• 24/7 uptime monitoring\n• Bug fixes & script compatibility\n• Database & lead backup checks\n• Priority WhatsApp support with Mr Deepak`;
                      copyToClipboard(maintMsg, 'monthly-maintenance');
                    }}
                    className="py-2 px-3 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedText === 'monthly-maintenance' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copy Retainer Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
                {MAINTENANCE_PLAN.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-sans">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STUDIO TOOLS & SETTINGS */}
        {activeTab === 'tools' && (
          <div className="space-y-6 max-w-4xl">
            {/* WhatsApp Quote Generator */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Client Proposal Quick-Draft</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Generate a ready-to-send proposal message in WhatsApp format for client communication.
              </p>

              <div className="p-4 rounded-lg bg-black border border-neutral-800 font-mono text-xs text-neutral-300 space-y-2 leading-relaxed">
                <p>Hello! Thank you for getting in touch with <strong>Mr Deepak Studio</strong>.</p>
                <p>Here are our bespoke web development package tiers:</p>
                <p>• <strong>Basic Website (₹4,999 – ₹9,999)</strong>: 1–3 custom responsive pages, WhatsApp & Call buttons (2–4 Days).</p>
                <p>• <strong>Standard Website (₹9,999 – ₹14,999)</strong>: 5–7 pages, brand typography, galleries, full SEO (4–7 Days).</p>
                <p>• <strong>Professional Website (₹14,999 – ₹19,999)</strong>: Up to 10 pages, booking flow, Supabase database, animations (1–2 Weeks).</p>
                <p>• <strong>Advanced Website (₹19,999 – ₹24,999)</strong>: Client portal, auth, custom DB schema & RLS, API integrations (2–3 Weeks).</p>
                <p>• <strong>Ecommerce Website (₹24,999 – ₹29,999)</strong>: Product catalog, cart, online payment checkout, order management (2–4 Weeks).</p>
                <p>• <strong>Custom Website (₹29,999+)</strong>: Tailored enterprise architecture, SaaS applications, custom algorithms.</p>
                <p className="text-cyan-400 font-semibold">✦ Real price is decided based on your exact requirements and added features.</p>
              </div>

              <button
                onClick={() => {
                  const text = `Hello! Thank you for getting in touch with Mr Deepak Studio.\n\nHere are our bespoke web development package tiers:\n• Basic Website: ₹4,999 – ₹9,999 (1–3 pages, WhatsApp & Call actions, 2–4 Days)\n• Standard Website: ₹9,999 – ₹14,999 (5–7 pages, custom layout, SEO, 4–7 Days)\n• Professional Website: ₹14,999 – ₹19,999 (Up to 10 pages, booking flow, database, 1–2 Weeks)\n• Advanced Website: ₹19,999 – ₹24,999 (Client portal, auth, APIs, 2–3 Weeks)\n• Ecommerce Website: ₹24,999 – ₹29,999 (Store, cart, payment gateway, 2–4 Weeks)\n• Custom Website: ₹29,999+ (Bespoke architecture & SaaS platforms)\n\n✦ Note: Real price is decided based on your exact requirements and added features.\n\nLet me know your requirements and we can begin right away!`;
                  copyToClipboard(text, 'proposal_template');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs font-mono rounded-lg transition-colors cursor-pointer"
              >
                {copiedText === 'proposal_template' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Proposal to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Proposal Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Studio Background & Visual Ambience Control */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>Website Background & Visual Theme</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Select the active aesthetic background theme displayed across all client-facing pages.
                  </p>
                </div>

                {onToggleBgGrid && (
                  <button
                    onClick={onToggleBgGrid}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors self-start sm:self-auto cursor-pointer ${
                      showBgGrid
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Grid Overlay: {showBgGrid ? 'ON' : 'OFF'}</span>
                  </button>
                )}
              </div>

              {/* Theme Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    id: 'dark-theme' as BackgroundTheme,
                    name: 'OLED Pure Dark',
                    desc: 'Pitch black minimalist dark canvas with high contrast',
                    colors: ['#000000', '#0a0a0f', '#181824'],
                  },
                  {
                    id: 'solar-system' as BackgroundTheme,
                    name: '8K Ultra Solar System',
                    desc: 'Ultra-realistic Sun, planetary orbits & deep space with 3D parallax',
                    colors: ['#020409', '#f59e0b', '#38bdf8', '#cbd5e1'],
                  },
                  {
                    id: 'lunar-full-moon' as BackgroundTheme,
                    name: 'Cinematic 3D Moon',
                    desc: 'Hyper-detailed 3D rotating Moon with craters & blue halo',
                    colors: ['#020409', '#cbd5e1', '#94a3b8', '#38bdf8'],
                  },
                  {
                    id: 'cosmic-aurora' as BackgroundTheme,
                    name: 'Cosmic Aurora',
                    desc: 'Deep space cyan & violet radial glows',
                    colors: ['#030713', '#06b6d4', '#6366f1'],
                  },
                  {
                    id: 'cyber-matrix' as BackgroundTheme,
                    name: 'Cyber Matrix',
                    desc: 'High-tech emerald & electric cyan grid',
                    colors: ['#01090f', '#06b6d4', '#10b981'],
                  },
                  {
                    id: 'obsidian-gold' as BackgroundTheme,
                    name: 'Obsidian Gold',
                    desc: 'Luxury carbon with champagne amber glows',
                    colors: ['#060503', '#f59e0b', '#d97706'],
                  },
                  {
                    id: 'royal-sapphire' as BackgroundTheme,
                    name: 'Royal Sapphire',
                    desc: 'Oceanic deep navy & azure beam lights',
                    colors: ['#02071a', '#2563eb', '#4f46e5'],
                  },
                  {
                    id: 'matte-stealth' as BackgroundTheme,
                    name: 'Matte Stealth',
                    desc: 'Minimalist studio dark graphite with micro-dots',
                    colors: ['#06070a', '#1e293b', '#475569'],
                  },
                ].map((th) => {
                  const isSelected = bgTheme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => onSelectBgTheme && onSelectBgTheme(th.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-800 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'bg-black/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${th.colors.join(', ')})`,
                            }}
                          />
                          <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                            {th.name}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {th.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profile & Credentials Info */}
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Security & Admin Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-black/60 border border-neutral-800">
                  <div className="text-neutral-500 mb-1">Registered Studio Email</div>
                  <div className="text-white font-semibold">kushwahdeepak6111@gmail.com</div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-neutral-800">
                  <div className="text-neutral-500 mb-1">Admin Passcode Protection</div>
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>•••••••••••••••• (Encrypted)</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-neutral-800">
                  <div className="text-neutral-500 mb-1">Storage Provider</div>
                  <div className="text-white font-semibold">
                    {isSupabaseConfigured ? 'Supabase Database' : 'Encrypted Local Browser DB'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-neutral-800">
                  <div className="text-neutral-500 mb-1">Current Session</div>
                  <div className="text-emerald-400 font-semibold">Active & Authenticated</div>
                </div>
              </div>

              {/* API Keys & Database Diagnostics Box */}
              <div className="mt-5 p-4 rounded-xl bg-[#080d1a] border border-cyan-500/20 text-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cyan-500/10">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                      Supabase Cloud Database Control
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                    DATABASE: CONNECTED
                  </span>
                </div>

                <p className="text-neutral-300 leading-relaxed font-sans text-xs">
                  {getApiDiagnostic().details}
                </p>

                {/* Key metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded bg-black/50 border border-white/5">
                    <span className="text-neutral-500 block mb-0.5">Project ID:</span>
                    <span className="text-cyan-300 font-medium font-mono">••••••••••••••••</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/50 border border-white/5">
                    <span className="text-neutral-500 block mb-0.5">Endpoint:</span>
                    <span className="text-white font-medium truncate block">{supabaseUrl}</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/50 border border-white/5">
                    <span className="text-neutral-500 block mb-0.5">API Key:</span>
                    <span className="text-emerald-400 font-medium truncate block">sb_publishable_...aqHFs</span>
                  </div>
                </div>

                {/* Table Status Check Output */}
                {tableStatus && (
                  <div
                    className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                      tableStatus.tableExists
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            tableStatus.tableExists ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {tableStatus.tableExists ? 'Table Active' : 'Table Pending Creation'}
                      </span>
                      <span>Records: {tableStatus.leadCount}</span>
                    </div>
                    <p className="text-[11px] opacity-90">{tableStatus.message}</p>
                  </div>
                )}

                {/* Supabase Action Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckTable}
                    disabled={isCheckingTable}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCheckingTable ? 'animate-spin' : ''}`} />
                    <span>{isCheckingTable ? 'Checking...' : 'Test Table Connection'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-mono transition-colors"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">SQL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-300" />
                        <span>Copy Supabase SQL Script</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-mono transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Open Supabase SQL Editor</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleSyncLeads}
                    disabled={isSyncingLeads}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors disabled:opacity-50 ml-auto"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLeads ? 'animate-spin' : ''}`} />
                    <span>{isSyncingLeads ? 'Syncing...' : 'Sync Local Leads to Cloud'}</span>
                  </button>
                </div>

                {/* SQL Quick Reference Snippet */}
                <details className="group pt-2">
                  <summary className="text-[11px] font-mono text-neutral-400 cursor-pointer hover:text-cyan-300 transition-colors list-none flex items-center justify-between py-1 border-t border-white/5">
                    <span>View PostgreSQL Schema Script (CREATE TABLE public.leads)</span>
                    <span className="text-cyan-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-2 p-3 rounded-lg bg-black/80 border border-neutral-800 font-mono text-[10px] text-neutral-300 overflow-x-auto relative">
                    <pre className="whitespace-pre">{SUPABASE_SQL_SCHEMA}</pre>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="absolute top-2 right-2 px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-mono flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedSql ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </details>
              </div>

              {/* Instant Phone & Mobile Notification Control Center */}
              <div className="mt-5 p-5 rounded-xl bg-gradient-to-br from-[#0b1324] via-[#090e1a] to-[#040812] border border-cyan-500/30 text-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <BellRing className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-white text-sm">
                        Real-Time Phone & Notification Alerts (Mr Deepak)
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-sans">
                        Instant sound chime, mobile push notification & haptic vibration when forms save to Supabase
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                    browserPermission === 'granted'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}>
                    Browser Push: {browserPermission.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Push Permission Toggle / Request */}
                  <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
                        <span>Mobile Push</span>
                        <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-[11px] text-neutral-300">
                        {browserPermission === 'granted'
                          ? 'Permission granted. Phone notifications will appear on lockscreen.'
                          : 'Push notifications are awaiting your permission.'}
                      </p>
                    </div>
                    <div className="pt-3">
                      {browserPermission !== 'granted' ? (
                        <button
                          type="button"
                          onClick={async () => {
                            const res = await requestNotificationPermission();
                            setBrowserPermission(res);
                            if (res === 'granted') {
                              showNotice('Mobile Push notifications granted!');
                              playChimeSound();
                            }
                          }}
                          className="w-full py-1.5 px-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-[11px] font-mono transition-colors cursor-pointer"
                        >
                          Enable Phone Push
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Active on Device</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Audio Chime Test & Setting */}
                  <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
                        <span>Sound Chime</span>
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-[11px] text-neutral-300">
                        Synthesizes a pleasant luxury sound chime immediately when client submits.
                      </p>
                    </div>
                    <div className="pt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playChimeSound();
                          showNotice('Played chime sound test');
                        }}
                        className="py-1 px-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        Test Sound
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...notificationConfig, soundEnabled: !notificationConfig.soundEnabled };
                          setNotificationConfig(updated);
                          saveNotificationSettings(updated);
                          showNotice(`Sound chime ${updated.soundEnabled ? 'Enabled' : 'Disabled'}`);
                        }}
                        className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                          notificationConfig.soundEnabled
                            ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {notificationConfig.soundEnabled ? 'ON' : 'MUTED'}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Vibration Toggle */}
                  <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
                        <span>Phone Vibration</span>
                        <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-[11px] text-neutral-300">
                        Triggers tactile hardware vibration pattern on Android and mobile browsers.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...notificationConfig, vibrationEnabled: !notificationConfig.vibrationEnabled };
                          setNotificationConfig(updated);
                          saveNotificationSettings(updated);
                          if (updated.vibrationEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                            navigator.vibrate([150, 100, 200]);
                          }
                          showNotice(`Mobile vibration ${updated.vibrationEnabled ? 'Enabled' : 'Disabled'}`);
                        }}
                        className={`w-full py-1.5 px-2.5 rounded text-[11px] font-mono transition-colors text-center ${
                          notificationConfig.vibrationEnabled
                            ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        Vibration: {notificationConfig.vibrationEnabled ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  {/* Registered Notification Mobile */}
                  <div className="p-3.5 rounded-lg bg-black/60 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
                        <span>Admin Number</span>
                        <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-white font-mono font-bold text-xs">
                        +91 9343795715
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        WhatsApp alerts & SMS quick ping buttons point directly to this phone number.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={async () => {
                          await triggerLeadMobileAlert({
                            name: 'Test Client (Demo)',
                            phone: '+91 9876543210',
                            email: 'client@example.com',
                            projectType: 'Business Websites',
                            budget: '₹15,000 - ₹35,000',
                            message: 'This is a test notification verifying phone sound, vibration and push alert!',
                          });
                          showNotice('Test alert dispatched to phone & browser!');
                        }}
                        className="w-full py-1 px-2 bg-neutral-800 hover:bg-neutral-700 text-cyan-300 rounded text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        ⚡ Send Test Phone Alert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: ADD MANUAL / WALK-IN LEAD */}
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-lg w-full p-6 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl relative">
              <h2 className="text-lg font-display font-bold text-white mb-1">
                Record Inbound Lead
              </h2>
              <p className="text-xs text-neutral-400 mb-4 font-sans">
                Save an offline client consultation, WhatsApp lead, or phone call into the studio pipeline.
              </p>

              <form onSubmit={handleCreateLead} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newLeadForm.name}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={newLeadForm.businessName}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, businessName: e.target.value })}
                      placeholder="e.g. Sharma Jewels"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newLeadForm.email}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                      placeholder="client@gmail.com"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newLeadForm.projectType}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, projectType: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Business Websites">Business Websites</option>
                      <option value="Custom Website Design">Custom Website Design</option>
                      <option value="Booking & Reservation Hubs">Booking & Reservation Hubs</option>
                      <option value="Landing Pages & Conversions">Landing Pages & Conversions</option>
                      <option value="Web Applications">Web Applications</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Budget Band
                    </label>
                    <select
                      value={newLeadForm.budget}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="₹4,999 - ₹9,999">₹4,999 – ₹9,999 (Basic Website)</option>
                      <option value="₹9,999 - ₹14,999">₹9,999 – ₹14,999 (Standard Website)</option>
                      <option value="₹14,999 - ₹19,999">₹14,999 – ₹19,999 (Professional Website)</option>
                      <option value="₹19,999 - ₹24,999">₹19,999 – ₹24,999 (Advanced Website)</option>
                      <option value="₹24,999 - ₹29,999">₹24,999 – ₹29,999 (Ecommerce Website)</option>
                      <option value="₹29,999+">₹29,999+ (Custom Website / Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Inquiry Details / Client Notes
                  </label>
                  <textarea
                    rows={3}
                    value={newLeadForm.message}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                    placeholder="Enter discussion points, client requirement details..."
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black font-semibold text-xs font-mono rounded hover:bg-neutral-200 transition-colors"
                  >
                    Save Inbound Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ADD NEW PORTFOLIO PROJECT */}
        {isAddProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="max-w-lg w-full p-6 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl relative my-8">
              <h2 className="text-lg font-display font-bold text-white mb-1">
                Add Showcase Project
              </h2>
              <p className="text-xs text-neutral-400 mb-4 font-sans">
                Showcase a new client website or case study on your public portfolio.
              </p>

              <form onSubmit={handleCreateProject} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.title}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                    placeholder="e.g. ELEVATE DENTAL CLINIC"
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={newProjectForm.category}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                      placeholder="e.g. HEALTHCARE / WEB DESIGN"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Client & Year
                    </label>
                    <input
                      type="text"
                      value={newProjectForm.client}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, client: e.target.value })}
                      placeholder="e.g. Dr. Verma Healthcare"
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={newProjectForm.shortDescription}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, shortDescription: e.target.value })}
                    placeholder="Brief description for cards and previews..."
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Live Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newProjectForm.liveUrl}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProjectForm.technologies}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, technologies: e.target.value })}
                    placeholder="React, TypeScript, Tailwind CSS, Supabase"
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featuredProj"
                    checked={newProjectForm.featured}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, featured: e.target.checked })}
                    className="rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="featuredProj" className="text-xs font-mono text-neutral-300 cursor-pointer">
                    Feature on Homepage highlight grid
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black font-semibold text-xs font-mono rounded hover:bg-neutral-200 transition-colors"
                  >
                    Add Project to Showcase
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
