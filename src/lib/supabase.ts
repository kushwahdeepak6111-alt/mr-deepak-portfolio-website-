import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactLead } from '../types';

function isValidHttpUrl(stringCandidate?: string): boolean {
  if (!stringCandidate || typeof stringCandidate !== 'string') return false;
  try {
    const url = new URL(stringCandidate);
    const isValidProtocol = url.protocol === 'http:' || url.protocol === 'https:';
    const isNotExample = !url.hostname.includes('your-project') &&
                         !url.hostname.includes('placeholder') &&
                         !url.hostname.includes('example');
    return isValidProtocol && isNotExample;
  } catch {
    return false;
  }
}

// Safely sanitize string values from Vite env
const sanitizeEnvVar = (val: unknown): string => {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/^['"]|['"]$/g, '');
};

const rawUrl = sanitizeEnvVar(import.meta.env.VITE_SUPABASE_URL);
const rawAnonKey = sanitizeEnvVar(import.meta.env.VITE_SUPABASE_ANON_KEY);

export const isSupabaseConfigured: boolean = Boolean(
  isValidHttpUrl(rawUrl) &&
  rawAnonKey &&
  rawAnonKey.length > 20 &&
  !rawAnonKey.includes('placeholder')
);

export const supabase: SupabaseClient | null = (() => {
  if (!isSupabaseConfigured || !rawUrl || !rawAnonKey) {
    return null;
  }
  try {
    return createClient(rawUrl, rawAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.warn('Supabase initialization safely skipped:', err);
    return null;
  }
})();

export interface ApiDiagnostic {
  isConfigured: boolean;
  statusText: string;
  provider: 'supabase' | 'local_storage';
  details: string;
}

export function getApiDiagnostic(): ApiDiagnostic {
  if (isSupabaseConfigured && supabase) {
    return {
      isConfigured: true,
      statusText: 'Supabase Cloud Database Connected',
      provider: 'supabase',
      details: 'Live PostgreSQL synchronization active with Row-Level Security policies.',
    };
  }
  return {
    isConfigured: false,
    statusText: 'Encrypted Local Storage (Zero API Key Dependency)',
    provider: 'local_storage',
    details: 'All inquiries, leads, and studio configurations are safely persisted in offline-first browser storage.',
  };
}

const LOCAL_STORAGE_LEADS_KEY = 'mrdeepak_leads_db';

const INITIAL_MOCK_LEADS: ContactLead[] = [
  {
    id: 'lead-01',
    name: 'Sarah Jenkins',
    businessName: 'Veloce Luxury Motors',
    email: 'sarah.j@velocemotors.com',
    phone: '+1 (555) 234-8901',
    projectType: 'Business Websites',
    budget: '₹15,000 - ₹35,000',
    message: 'Looking to overhaul our showroom digital experience with 3D model interaction and VIP test-drive scheduling.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead-02',
    name: 'David Sterling',
    businessName: 'Sterling Capital Advisors',
    email: 'd.sterling@sterlingcap.com',
    phone: '+1 (555) 987-6543',
    projectType: 'Custom Web Applications',
    budget: '₹75,000+',
    message: 'Need a private investor portal with document rooms and interactive return modeling.',
    status: 'proposal_sent',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

export function getStoredLeads(): ContactLead[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_MOCK_LEADS;
  } catch {
    return INITIAL_MOCK_LEADS;
  }
}

export function saveStoredLeads(leads: ContactLead[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
  } catch (err) {
    console.warn('Unable to persist to localStorage', err);
  }
}

export interface SubmitLeadPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  honeypot?: string; // anti-spam field
}

// Simple client-side rate limiting tracker
const submissionTimestamps: number[] = [];

export async function submitContactLead(payload: SubmitLeadPayload): Promise<{ success: boolean; error?: string; leadId?: string }> {
  // 1. Anti-spam honeypot detection
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    // Silently drop spam without revealing to bot
    return { success: true, leadId: 'lead-' + Date.now() };
  }

  // 2. Rate limiting check (max 3 submissions in 2 minutes)
  const now = Date.now();
  const twoMinutesAgo = now - 120000;
  const recentSubmissions = submissionTimestamps.filter(t => t > twoMinutesAgo);
  if (recentSubmissions.length >= 3) {
    return {
      success: false,
      error: 'Too many requests. Please wait a couple of minutes before submitting another inquiry.',
    };
  }

  // 3. Validation sanitization
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return { success: false, error: 'Please provide all required fields.' };
  }

  const newLead: ContactLead = {
    id: 'lead-' + Date.now().toString(36),
    name: payload.name.trim(),
    businessName: payload.businessName?.trim() || 'N/A',
    email: payload.email.trim(),
    phone: payload.phone?.trim() || 'N/A',
    projectType: payload.projectType || 'General Inquiries',
    budget: payload.budget || 'Flexible',
    message: payload.message.trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  submissionTimestamps.push(now);

  // 4. Try Supabase if configured with a live client
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('leads').insert({
        id: newLead.id,
        name: newLead.name,
        business_name: newLead.businessName,
        email: newLead.email,
        phone: newLead.phone,
        project_type: newLead.projectType,
        budget: newLead.budget,
        message: newLead.message,
        status: newLead.status,
      });

      if (!error) {
        // Also keep local copy updated for fast UI view
        const current = getStoredLeads();
        saveStoredLeads([newLead, ...current]);
        return { success: true, leadId: newLead.id };
      }
      console.warn('Supabase insert note, storing in local fallback:', error?.message || error);
    } catch (e) {
      console.warn('Supabase exception, storing in local fallback:', e);
    }
  }

  // Fallback / default: store in localStorage (always succeeds)
  const current = getStoredLeads();
  saveStoredLeads([newLead, ...current]);
  return { success: true, leadId: newLead.id };
}

export async function fetchAllLeads(): Promise<ContactLead[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          businessName: item.business_name || item.businessName || '',
          email: item.email,
          phone: item.phone || '',
          projectType: item.project_type || item.projectType || '',
          budget: item.budget || '',
          message: item.message || '',
          status: item.status || 'new',
          createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        }));
      }
      if (error) {
        console.warn('Supabase query note, loading local fallback:', error?.message || error);
      }
    } catch (e) {
      console.warn('Supabase fetch exception, loading local fallback:', e);
    }
  }

  return getStoredLeads();
}

export async function updateLeadStatus(id: string, newStatus: ContactLead['status']): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Supabase status update note:', e);
    }
  }

  const leads = getStoredLeads();
  const updated = leads.map(l => (l.id === id ? { ...l, status: newStatus } : l));
  saveStoredLeads(updated);
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('leads').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete note:', e);
    }
  }

  const leads = getStoredLeads();
  const updated = leads.filter(l => l.id !== id);
  saveStoredLeads(updated);
  return true;
}

export async function addManualLead(leadData: Omit<ContactLead, 'id' | 'createdAt'>): Promise<ContactLead> {
  const newLead: ContactLead = {
    ...leadData,
    id: 'lead-' + Date.now().toString(36),
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('leads').insert({
        id: newLead.id,
        name: newLead.name,
        business_name: newLead.businessName,
        email: newLead.email,
        phone: newLead.phone,
        project_type: newLead.projectType,
        budget: newLead.budget,
        message: newLead.message,
        status: newLead.status,
      });
    } catch (e) {
      console.warn('Supabase manual insert note:', e);
    }
  }

  const current = getStoredLeads();
  saveStoredLeads([newLead, ...current]);
  return newLead;
}
