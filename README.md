# DEVFLOW AI – Premium Website Design & Development Studio

A production-grade, bespoke portfolio and client lead-generation website for **DEVFLOW AI**, engineered with high-craft digital aesthetics, interactive 3D WebGL scenes, sub-second performance, Supabase PostgreSQL persistence, and Netlify deployment readiness.

---

## 1. Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & System**: Tailwind CSS v4, Custom Design Tokens, Frosted Glassmorphism, Luxury Obsidian Surfaces
- **3D & Visuals**: Three.js (interactive floating glass interface & studio lighting with mouse/touch parallax, WebGL context lost recovery, and graceful 2D degradation)
- **Database & Persistence**: Supabase PostgreSQL with Row Level Security (RLS) + In-memory & Local Encrypted Fallbacks
- **Backend Architecture**: Node.js / Express API (`server.ts`) + Netlify Edge Serverless Functions (`netlify/functions/api.ts`)
- **Deployment Platform**: Netlify Edge (Configured via `netlify.toml` with SPA routing and secure caching headers)

---

## 2. Key Pages & Features

1. **Home**:
   - Hero section featuring headline *"WE BUILD DIGITAL EXPERIENCES"*, primary CTAs (*"START YOUR PROJECT"* and *"VIEW OUR WORK"*), and interactive 3D WebGL interface.
   - Trust and positioning statement: *"DESIGNED FOR IMPACT. BUILT FOR PERFORMANCE."*
   - Selected Work previewing real projects including **88 GYM** (`https://88gym.netlify.app/`), **SHREE NATH MALL**, and **SECRET MENS SALON**.
   - Services preview, Why Choose DEVFLOW AI comparison matrix, 7-step process preview, and attributable client testimonials.
2. **Selected Work (Portfolio)**:
   - Category filtering, live keyword search, metrics proof, case study modals, and external links.
3. **Services**:
   - 12 comprehensive service cards with deliverables, timelines, target applications, and direct consultation CTAs.
4. **About**:
   - Studio vision, client-first philosophy, quality standards, and technical approach.
5. **Process**:
   - Visual 7-step roadmap from 01 Discovery through 07 Handover.
6. **Pricing**:
   - Transparent Starter, Growth, Premium, and Custom tiers with multi-currency conversion (USD, EUR, GBP) and pricing factor guidance.
7. **Contact**:
   - Structured lead generation form with validation, anti-spam honeypot, duplicate protection, rate limiting, and direct WhatsApp / Call / Email links.
8. **Interactive Scope & Cost Estimator**:
   - Configurable line-item estimator for pages, 3D effects, booking engines, and Supabase integration with automatic pre-fill into the inquiry form.
9. **Admin Workspace (`#admin`)**:
   - Passcode-secured portal (`devflow2026`) for inspecting inbound leads, updating lead status, exporting leads to CSV, and managing portfolio records.

---

## 3. Supabase SQL Schema & Row Level Security (RLS)

Run this SQL snippet in your Supabase SQL Editor to provision the production schema:

```sql
-- 1. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public can insert new inquiries
CREATE POLICY "Public insert leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Policy: Only service role or authenticated staff can view leads
CREATE POLICY "Privileged staff view leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Privileged staff update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated 
USING (true);
```

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev

# Run TypeScript typecheck
npm run lint

# Build production bundle
npm run build
```

---

## 5. Netlify Deployment

1. Push this repository to GitHub.
2. Connect your repository to Netlify.
3. Configure the build settings (already defined in `netlify.toml`):
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Functions Directory**: `netlify/functions`
4. Add environment variables in the Netlify Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Server-side only)
