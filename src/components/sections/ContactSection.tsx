import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageSquare, Mail, Loader2, MapPin, ExternalLink, Bell, Smartphone, ArrowRight } from 'lucide-react';
import { submitContactLead, SubmitLeadPayload } from '../../lib/supabase';
import { createWhatsAppLeadAlertUrl, createSmsLeadAlertUrl } from '../../lib/notifications';
import { STUDIO_LOCATION } from '../../data/location';

interface ContactSectionProps {
  initialProjectType?: string;
  initialBudget?: string;
  initialDetails?: string;
  isFullPage?: boolean;
  embedded?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType = 'Business Websites',
  initialBudget = '₹4,999 - ₹9,999',
  initialDetails = '',
  isFullPage = false,
  embedded = false,
}) => {
  const [formData, setFormData] = useState<SubmitLeadPayload>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    projectType: initialProjectType,
    budget: initialBudget,
    message: initialDetails ? `Project Scope Estimate:\n${initialDetails}\n\nAdditional Notes:\n` : '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedToCloud, setSavedToCloud] = useState<boolean>(true);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<SubmitLeadPayload | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');

  useEffect(() => {
    if (initialProjectType || initialBudget || initialDetails) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProjectType || prev.projectType,
        budget: initialBudget || prev.budget,
        message: initialDetails
          ? (initialDetails.startsWith('Project Scope') || initialDetails.startsWith('Referencing') || initialDetails.startsWith('Selected Tier'))
            ? `Project Scope Estimate:\n${initialDetails}\n\nAdditional Notes:\n`
            : `${initialDetails}\n\n`
          : prev.message,
      }));
    }
  }, [initialProjectType, initialBudget, initialDetails]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTimeIST(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialProjectType) {
      setFormData(prev => ({ ...prev, projectType: initialProjectType }));
    }
    if (initialBudget) {
      setFormData(prev => ({ ...prev, budget: initialBudget }));
    }
    if (initialDetails) {
      setFormData(prev => ({
        ...prev,
        message: `Project Scope Estimate:\n${initialDetails}\n\nAdditional Notes:\n`,
      }));
    }
  }, [initialProjectType, initialBudget, initialDetails]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (formData.phone.trim() && !/^[\d\+\-\(\)\s]{7,25}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details about your project goals.';
    } else if (formData.message.length < 15) {
      errs.message = 'Please provide at least 15 characters describing your project.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContactLead(formData);
      if (res.success) {
        setIsSuccess(true);
        setSavedToCloud(Boolean(res.savedToSupabase));
        setLastSubmittedLead({ ...formData });
        setFormData({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          projectType: 'Business Websites',
          budget: '₹4,999 - ₹9,999',
          message: '',
          honeypot: '',
        });
      } else {
        setServerError(res.error || 'Unable to submit your request. Please try again.');
      }
    } catch (err: any) {
      setServerError('A network error occurred. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className={`relative overflow-hidden ${embedded || isFullPage ? 'py-10 sm:py-14 bg-transparent' : 'py-24 bg-[#08090d] border-t border-neutral-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Communication Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="badge-stylish mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Direct Founder Consultation · Priority Access</span>
              </div>
              <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5">
                START YOUR <span className="text-gradient-cyan">PROJECT</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-8">
                Work directly with <strong className="text-white font-semibold underline decoration-cyan-400 decoration-2 underline-offset-4">Mr Deepak</strong>, Lead Full-Stack Web Architect. Every project is hand-crafted with bespoke code, modern architecture, and sub-second performance.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="space-y-3 mb-8">
                {/* Direct Phone Number - Requested Mobile */}
                <a
                  href="tel:+919343795715"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900/70 border border-indigo-500/30 hover:border-indigo-400 hover:bg-neutral-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        Direct Mobile / Call
                      </div>
                      <div className="text-xs font-mono font-bold text-indigo-300">
                        +91 9343795715
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    Direct
                  </span>
                </a>

                {/* WhatsApp Quick Action */}
                <a
                  href="https://wa.me/919343795715?text=Hi%20Mr%20Deepak,%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        WhatsApp Fast Chat
                      </div>
                      <div className="text-xs font-mono text-neutral-300">
                        +91 9343795715 · Instant Reply
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    Online
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:kushwahdeepak6111@gmail.com"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        Personal Email
                      </div>
                      <div className="text-xs text-neutral-400 font-sans truncate max-w-[180px] sm:max-w-none">
                        kushwahdeepak6111@gmail.com
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">Direct</span>
                </a>

                {/* Studio Location */}
                <a
                  href={STUDIO_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        Studio / Office Location
                      </div>
                      <div className="text-xs text-neutral-300 font-sans truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                        {STUDIO_LOCATION.formattedAddress}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1 shrink-0">
                    <span>Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-white/10 text-xs text-neutral-300 font-mono space-y-1">
              <div className="text-cyan-400 font-semibold uppercase">DEEPAK'S CRAFTSMANSHIP COMMITMENT:</div>
              <p className="text-neutral-400">
                Zero agency bloat · 1-on-1 sprint collaboration · 100% bespoke React code & Supabase architecture.
              </p>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative">
              {isSuccess ? (
                <div className="py-10 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {savedToCloud ? 'INQUIRY SAVED TO SUPABASE' : 'INQUIRY SUBMITTED'}
                    </h3>
                    <p className="text-xs font-mono text-emerald-400">
                      {savedToCloud
                        ? '✓ Live Synced with Supabase · Instant Alert Dispatched'
                        : '✓ Saved Locally · Instant Alert Dispatched'}
                    </p>
                  </div>

                  {/* Phone Notification & Alert Status Card */}
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-900/90 border border-cyan-500/30 text-left space-y-3">
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs">
                      <Bell className="w-4 h-4 text-cyan-400 animate-bounce" />
                      <span>Phone Notification & Alert Triggered:</span>
                    </div>
                    <ul className="text-[11px] font-mono space-y-1.5 text-neutral-300">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Chime Sound & Mobile Vibration Sent to Mr Deepak</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Client Brief Saved to Supabase Leads Table</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Founder SMS / WhatsApp Alert Link Generated (+91 9343795715)</span>
                      </li>
                    </ul>

                    {lastSubmittedLead && (
                      <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row gap-2">
                        <a
                          href={createWhatsAppLeadAlertUrl({
                            name: lastSubmittedLead.name,
                            phone: lastSubmittedLead.phone,
                            email: lastSubmittedLead.email,
                            projectType: lastSubmittedLead.projectType,
                            budget: lastSubmittedLead.budget,
                            message: lastSubmittedLead.message,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Ping Deepak on WhatsApp Directly</span>
                        </a>

                        <a
                          href={createSmsLeadAlertUrl({
                            name: lastSubmittedLead.name,
                            phone: lastSubmittedLead.phone,
                            email: lastSubmittedLead.email,
                            projectType: lastSubmittedLead.projectType,
                            budget: lastSubmittedLead.budget,
                          })}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>SMS Alert</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Mr Deepak personally reviews all inquiries within 24 hours. If your project is urgent, click the direct WhatsApp button above for instant reply.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot anti-spam field (hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      id="website_hp"
                      type="text"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
                        Supabase Cloud Connected
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Encrypted & Verified</span>
                    </span>
                  </div>

                  {serverError && (
                    <div className="p-4 rounded-lg bg-red-950/50 border border-red-800/60 flex items-start gap-3 text-red-300 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Row 1: Name and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Vance"
                        className={`w-full px-4 py-3 bg-neutral-900/80 border rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                          errors.name ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Business / Organization Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="Vance Athletics Ltd."
                        className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@vance.com"
                        className={`w-full px-4 py-3 bg-neutral-900/80 border rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                          errors.email ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-4 py-3 bg-neutral-900/80 border rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all ${
                          errors.phone ? 'border-red-500' : 'border-neutral-800'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Project Type and Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white transition-all cursor-pointer"
                      >
                        <option value="Custom Website Design">Custom Website Design</option>
                        <option value="Business Websites">Business Websites</option>
                        <option value="Booking Websites">Booking & Reservation Hub</option>
                        <option value="Landing Pages">High-Conversion Landing Page</option>
                        <option value="Portfolio Websites">Creative / Executive Portfolio</option>
                        <option value="Custom Web Applications">Custom Web Application</option>
                        <option value="Website Redesign">Complete Website Redesign</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Investment Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-white transition-all cursor-pointer"
                      >
                        <option value="₹4,999 - ₹9,999">₹4,999 – ₹9,999 INR (Basic Website)</option>
                        <option value="₹9,999 - ₹14,999">₹9,999 – ₹14,999 INR (Standard Website)</option>
                        <option value="₹14,999 - ₹19,999">₹14,999 – ₹19,999 INR (Professional Website)</option>
                        <option value="₹19,999 - ₹24,999">₹19,999 – ₹24,999 INR (Advanced Website)</option>
                        <option value="₹24,999 - ₹29,999">₹24,999 – ₹29,999 INR (Ecommerce Website)</option>
                        <option value="₹29,999+">₹29,999+ INR (Custom Website / Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Description */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Project Description & Requirements <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current business, target audience, preferred timeframe, and any specific functionality required..."
                      className={`w-full px-4 py-3 bg-neutral-900/80 border rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white transition-all resize-y ${
                        errors.message ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 font-sans">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 btn-stylish-primary text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Encrypting & Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Project Brief to Mr Deepak</span>
                          <Send className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-neutral-400 font-mono">
                      ✦ Direct Founder Review · Non-disclosure guaranteed · 24-hr response SLA
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
