export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  client: string;
  servicesProvided: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  outcome: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  useCase: string;
  deliverables: string[];
  duration: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  startingPriceINR: number;
  startingPriceUSD: number;
  featured?: boolean;
  description: string;
  idealFor: string;
  features: string[];
  deliveryTime: string;
}

export interface ContactLead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'archived';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  projectSlug?: string;
  featured: boolean;
}

export type BackgroundTheme =
  | 'dark-theme'
  | 'solar-system'
  | 'lunar-full-moon'
  | 'cosmic-aurora'
  | 'cyber-matrix'
  | 'obsidian-gold'
  | 'royal-sapphire'
  | 'matte-stealth';
