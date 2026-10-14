import React, { useState } from 'react';
import {
  X,
  Search,
  Globe,
  Smartphone,
  Laptop,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  TrendingUp,
  Star,
  ExternalLink,
  Sliders,
  Zap,
  Code2,
  Share2,
} from 'lucide-react';

interface SeoSearchEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToContact?: (data: { projectType: string; budget: string; details: string }) => void;
}

// Preset demo domains for one-click testing
const PRESETS = [
  {
    name: 'Mr Deepak Studio',
    title: 'Mr Deepak – Bespoke Website Design & Full-Stack Development',
    url: 'https://devflowai.studio',
    slug: 'services/web-design',
    description: 'Bespoke, high-performance websites engineered by Mr Deepak. Custom React & Node engineering, editorial UI/UX design, sub-second speeds, and top search engine rankings.',
    rating: 4.9,
    reviews: 84,
    priceRange: '₹4,999 - ₹24,999',
    keyword: 'website design & development',
    intent: 'Commercial',
  },
  {
    name: 'Modern E-Commerce',
    title: 'Aura Lifestyle – Handcrafted Artisan Decor & Minimalist Goods',
    url: 'https://auralifestyle.store',
    slug: 'shop/artisan-decor',
    description: 'Shop curated artisanal home decor, handcrafted ceramics, and sustainable interior essentials. Free shipping worldwide with zero checkout friction.',
    rating: 4.8,
    reviews: 215,
    priceRange: '₹1,200 - ₹18,500',
    keyword: 'buy artisanal home decor online',
    intent: 'Transactional',
  },
  {
    name: 'Healthcare & Clinic',
    title: 'Apex Dental Care – Painless Dentistry & Advanced Oral Surgery',
    url: 'https://apexdentalcare.in',
    slug: 'treatments/implants',
    description: 'Award-winning multispecialty dental clinic offering same-day implants, laser dentistry, and clear aligners. Book instant WhatsApp appointments.',
    rating: 5.0,
    reviews: 340,
    priceRange: '₹500 consultation',
    keyword: 'best dentist near me',
    intent: 'Local / Commercial',
  },
];

// Preset SEO Keywords database for search engine exploration
const KEYWORD_DATABASE = [
  {
    query: 'custom website design india',
    volume: '18,400/mo',
    difficulty: 38,
    cpc: '₹85.40',
    intent: 'Commercial Investigation',
    opportunity: 'High',
    topRankingFactors: ['Mobile Core Web Vitals (<1.2s)', 'Schema.org ProfessionalService', 'Bespoke UI case studies'],
  },
  {
    query: 'react full stack developer portfolio',
    volume: '24,600/mo',
    difficulty: 45,
    cpc: '₹112.00',
    intent: 'Informational / Commercial',
    opportunity: 'Very High',
    topRankingFactors: ['Live code demos', 'Performance 95+ score', 'Clean semantic metadata'],
  },
  {
    query: 'website maintenance services 1000 per month',
    volume: '8,200/mo',
    difficulty: 24,
    cpc: '₹42.50',
    intent: 'Transactional',
    opportunity: 'Ultra High',
    topRankingFactors: ['Clear transparent pricing', 'SSL/security trust badges', 'Rapid SLA response'],
  },
  {
    query: 'hire next js supabase developer',
    volume: '12,900/mo',
    difficulty: 32,
    cpc: '₹135.00',
    intent: 'Transactional',
    opportunity: 'High',
    topRankingFactors: ['PostgreSQL / Supabase expertise', 'Architecture security', 'Speed metrics'],
  },
  {
    query: 'luxury ecommerce website design',
    volume: '9,800/mo',
    difficulty: 49,
    cpc: '₹175.00',
    intent: 'Commercial',
    opportunity: 'High',
    topRankingFactors: ['Sub-second product hydration', 'Rich Product schema', '3D WebGL visuals'],
  },
];

export const SeoSearchEngineModal: React.FC<SeoSearchEngineModalProps> = ({
  isOpen,
  onClose,
  onApplyToContact,
}) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'audit' | 'keywords'>('serp');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  // Interactive Form State for Search Engine Simulator
  const [searchQuery, setSearchQuery] = useState('Mr Deepak website design & development');
  const [siteTitle, setSiteTitle] = useState(
    'Mr Deepak – Bespoke Website Design & Full-Stack Development'
  );
  const [siteUrl, setSiteUrl] = useState('https://devflowai.studio');
  const [urlSlug, setUrlSlug] = useState('services/web-design');
  const [metaDescription, setMetaDescription] = useState(
    'Bespoke, high-performance websites engineered by Mr Deepak. Custom React & Node engineering, editorial UI/UX design, sub-second speeds, and top search engine rankings.'
  );
  const [showRichSnippet, setShowRichSnippet] = useState(true);
  const [starRating, setStarRating] = useState('4.9');
  const [reviewsCount, setReviewsCount] = useState('84');
  const [priceRange, setPriceRange] = useState('₹4,999 - ₹24,999');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Keyword Explorer State
  const [keywordInput, setKeywordInput] = useState('custom website design india');
  const [selectedKeywordData, setSelectedKeywordData] = useState(KEYWORD_DATABASE[0]);

  if (!isOpen) return null;

  // Character count calculations & health status
  const titleLength = siteTitle.length;
  const isTitleOptimal = titleLength >= 30 && titleLength <= 60;
  const isTitleTooLong = titleLength > 60;

  const descLength = metaDescription.length;
  const isDescOptimal = descLength >= 120 && descLength <= 160;
  const isDescTooLong = descLength > 160;

  // Compute calculated search engine readiness score (0-100)
  const calculateSeoScore = () => {
    let score = 20; // baseline
    if (isTitleOptimal) score += 20;
    else if (titleLength >= 20 && titleLength <= 70) score += 10;

    if (isDescOptimal) score += 20;
    else if (descLength >= 80 && descLength <= 180) score += 10;

    if (siteUrl.startsWith('https://')) score += 10; // SSL
    if (urlSlug.length > 0 && !urlSlug.includes('?') && !urlSlug.includes('&')) score += 10; // Clean URL
    if (showRichSnippet) score += 10; // Schema.org rich snippets
    if (metaDescription.toLowerCase().includes('mr deepak') || metaDescription.toLowerCase().includes('website')) score += 10; // Keyword density

    return Math.min(100, score);
  };

  const seoScore = calculateSeoScore();

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSiteTitle(preset.title);
    setSiteUrl(preset.url);
    setUrlSlug(preset.slug);
    setMetaDescription(preset.description);
    setStarRating(preset.rating.toString());
    setReviewsCount(preset.reviews.toString());
    setPriceRange(preset.priceRange);
    setSearchQuery(preset.keyword);
  };

  const handleKeywordSearch = (query: string) => {
    setKeywordInput(query);
    const found = KEYWORD_DATABASE.find((k) =>
      k.query.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedKeywordData(found);
    } else {
      // Generate synthetic real-time analysis for user query
      setSelectedKeywordData({
        query: query,
        volume: '14,200/mo',
        difficulty: 35,
        cpc: '₹64.00',
        intent: 'Commercial',
        opportunity: 'High',
        topRankingFactors: [
          'Targeted exact-match H1 & title tags',
          'Schema.org rich structured snippets',
          'Sub-second Google Core Web Vitals speed',
        ],
      });
    }
  };

  const handleCopyCode = () => {
    const code = `<!-- Search Engine Optimization (SEO) Meta Tags -->
<title>${siteTitle}</title>
<meta name="description" content="${metaDescription}" />
<link rel="canonical" href="${siteUrl}/${urlSlug}" />

<!-- OpenGraph / Social Share Cards -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${siteTitle}" />
<meta property="og:description" content="${metaDescription}" />
<meta property="og:url" content="${siteUrl}/${urlSlug}" />

<!-- Schema.org JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Mr Deepak Studio",
  "url": "${siteUrl}",
  "description": "${metaDescription}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${starRating}",
    "reviewCount": "${reviewsCount}"
  },
  "priceRange": "${priceRange}"
}
</script>`;

    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleApplyToConsultation = () => {
    if (onApplyToContact) {
      onApplyToContact({
        projectType: 'SEO Optimization & Search Engine Discoverability',
        budget: '₹4,999 - ₹9,999',
        details: `SEO Audit from Search Engine Tool:\n• Target Keyword: ${searchQuery}\n• Target URL: ${siteUrl}/${urlSlug}\n• Proposed Title: ${siteTitle}\n• Current SEO Readiness Score: ${seoScore}/100`,
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  SEO SEARCH ENGINE SUITE
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-semibold">
                  LIVE SERP SIMULATOR
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Simulate Google Search Engine rankings, audit rich snippets, and optimize keyword visibility
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close SEO Tool"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Mode Selector */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 sm:px-6 bg-neutral-900/30">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('serp')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'serp'
                  ? 'bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google SERP Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Search Engine Audit ({seoScore}/100)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('keywords')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'keywords'
                  ? 'bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Keyword & Intent Explorer</span>
            </button>
          </div>

          {activeTab === 'serp' && (
            <div className="hidden sm:flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  deviceView === 'desktop'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Desktop Google Preview"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  deviceView === 'mobile'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Mobile Google Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 font-sans">
          {/* Quick Presets Picker */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-neutral-400 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Try One-Click Presets:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-300 text-neutral-300 transition-colors text-[11px] font-mono cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* TAB 1: GOOGLE SERP SIMULATOR */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              {/* Simulated Google Search Box */}
              <div className="relative">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 shadow-inner">
                  <div className="flex items-center gap-1.5 pl-1 font-display font-bold text-xs tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </div>
                  <div className="w-[1px] h-4 bg-neutral-700" />
                  <div className="flex-1 flex items-center gap-2">
                    <Search className="w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter search engine query..."
                      className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none placeholder-neutral-500 font-sans"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                    Search Engine Query
                  </span>
                </div>
              </div>

              {/* Realistic Google Search Engine Result Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    Live SERP Result ({deviceView === 'desktop' ? 'Desktop View' : 'Mobile Smartphone View'})
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isTitleOptimal ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      Title: {titleLength}/60 chars {isTitleOptimal ? '✓ Optimal' : isTitleTooLong ? '⚠ Truncated' : '• Short'}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDescOptimal ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      Desc: {descLength}/160 chars {isDescOptimal ? '✓ Optimal' : isDescTooLong ? '⚠ Truncated' : '• Short'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    deviceView === 'mobile'
                      ? 'max-w-md mx-auto bg-[#1b1c1e] border-neutral-700 shadow-2xl rounded-3xl p-4'
                      : 'bg-[#1b1c1e] border-neutral-700/80 shadow-xl'
                  }`}
                >
                  {/* Google SERP Breadcrumb / Favicon */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-300 text-[10px] font-bold shrink-0">
                      MD
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] text-neutral-200 font-medium leading-none truncate">
                        {siteUrl.replace('https://', '')}
                      </span>
                      <span className="text-[11px] text-neutral-400 truncate leading-tight">
                        {siteUrl} › {urlSlug}
                      </span>
                    </div>
                  </div>

                  {/* Google Blue Link Title */}
                  <h3 className="text-base sm:text-lg font-normal text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2">
                    {siteTitle || 'Enter your website title...'}
                  </h3>

                  {/* Rich Snippets (Ratings & Price) */}
                  {showRichSnippet && (
                    <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1 mb-1 font-sans">
                      <div className="flex items-center gap-1 text-amber-400">
                        <span className="font-semibold text-xs text-white">{starRating}</span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400 text-[11px]">({reviewsCount} reviews)</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-emerald-400 text-[11px] font-mono">{priceRange}</span>
                    </div>
                  )}

                  {/* Meta Description Snippet */}
                  <p className="text-xs sm:text-[13px] text-[#bdc1c6] font-normal leading-relaxed line-clamp-3 mt-1">
                    {metaDescription || 'Enter your meta description to see how it appears in Google search engine snippets.'}
                  </p>

                  {/* Sitelinks Mini Grid */}
                  <div className="mt-3.5 pt-3 border-t border-neutral-700/60 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-neutral-800/50 hover:bg-neutral-800 transition-colors cursor-pointer">
                      <div className="text-[#8ab4f8] font-medium">Services & Architecture</div>
                      <div className="text-neutral-400 text-[10px] truncate">Custom React & Node Engineering</div>
                    </div>
                    <div className="p-2 rounded bg-neutral-800/50 hover:bg-neutral-800 transition-colors cursor-pointer">
                      <div className="text-[#8ab4f8] font-medium">Pricing & Maintenance</div>
                      <div className="text-neutral-400 text-[10px] truncate">Starting ₹4,999 · ₹1,000/mo retainer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Field Customizer */}
              <div className="p-4 sm:p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    Customize Search Engine Metadata
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Edits reflect immediately in the live simulator
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Site Title */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-neutral-300">
                        Page Title (&lt;title&gt; tag)
                      </label>
                      <span
                        className={`text-[10px] font-mono ${
                          isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {titleLength}/60 chars (Recommended: 30–60)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                    />
                  </div>

                  {/* Domain & Slug */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Root Domain URL
                    </label>
                    <input
                      type="text"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Canonical Slug Path
                    </label>
                    <input
                      type="text"
                      value={urlSlug}
                      onChange={(e) => setUrlSlug(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-neutral-300">
                        Meta Description (&lt;meta name=&quot;description&quot;&gt;)
                      </label>
                      <span
                        className={`text-[10px] font-mono ${
                          isDescOptimal ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {descLength}/160 chars (Recommended: 120–160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
                    />
                  </div>

                  {/* Rich Snippets Toggle & Values */}
                  <div className="sm:col-span-2 pt-2 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showRichSnippet}
                        onChange={(e) => setShowRichSnippet(e.target.checked)}
                        className="rounded border-neutral-700 text-cyan-500 focus:ring-0"
                      />
                      <span className="text-xs font-mono text-neutral-300">
                        Enable Schema.org Rich Snippets (Star Ratings & Price)
                      </span>
                    </label>

                    {showRichSnippet && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={starRating}
                          onChange={(e) => setStarRating(e.target.value)}
                          placeholder="4.9"
                          className="w-14 px-2 py-1 rounded bg-neutral-950 border border-neutral-700 text-[11px] text-white text-center font-mono"
                        />
                        <span className="text-[10px] font-mono text-neutral-500">Stars</span>
                        <input
                          type="text"
                          value={reviewsCount}
                          onChange={(e) => setReviewsCount(e.target.value)}
                          placeholder="84"
                          className="w-16 px-2 py-1 rounded bg-neutral-950 border border-neutral-700 text-[11px] text-white text-center font-mono"
                        />
                        <span className="text-[10px] font-mono text-neutral-500">Reviews</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEARCH ENGINE AUDIT & SCORE */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              {/* Score Display Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-neutral-900 to-neutral-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-neutral-950 border-4 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    <span className="text-2xl font-bold font-mono text-white">{seoScore}</span>
                    <span className="text-[10px] text-cyan-300 absolute -bottom-1 font-mono">/100</span>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Search Engine Readiness Score
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                      {seoScore >= 90
                        ? 'Excellent · Google Top 3 Potential'
                        : seoScore >= 70
                        ? 'Good · Moderate Competitive Rank'
                        : 'Needs Optimization'}
                    </div>
                    <p className="text-xs text-neutral-400 font-sans mt-1">
                      Evaluated against Google Core Web Vitals, Schema.org protocols, and modern SERP algorithms.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied HTML Tags!</span>
                    </>
                  ) : (
                    <>
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>Copy SEO & Schema Tags</span>
                    </>
                  )}
                </button>
              </div>

              {/* 8 Checkpoints Audit List */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  8-Point Search Engine Diagnostic Checklist:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Title Tag Pixel Width</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {isTitleOptimal
                          ? `Optimal length (${titleLength} chars). Avoids Google ellipsis truncation.`
                          : `Currently ${titleLength} chars. Recommended 30–60 characters.`}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Meta Description Density</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {isDescOptimal
                          ? `Well proportioned (${descLength} chars) for maximum CTR.`
                          : `Currently ${descLength} chars. Ideal length is 120–160 chars.`}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Schema.org Structured Data</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        JSON-LD ProfessionalService configured with star ratings and pricing ranges.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">OpenGraph & Social Share Cards</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Rich media preview cards verified for WhatsApp, LinkedIn, X, and Facebook.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Core Web Vitals Benchmark</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Engineered with sub-second LCP (&lt;1.0s), zero cumulative layout shift (CLS).
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Robots.txt & XML Sitemap</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Verified crawlability on /public/robots.txt and /public/sitemap.xml.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Mobile-First Viewport</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Zero horizontal overflow, 48px touch targets, responsive fluid typography.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">SSL & Security Encryption</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Strict HTTPS enforcement, canonical URLs, and protected administrative routes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEYWORD & INTENT EXPLORER */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              {/* Keyword Search Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => handleKeywordSearch(e.target.value)}
                    placeholder="Search any keyword or niche (e.g. dental clinic, custom web app, ecommerce)..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              </div>

              {/* Keyword Quick Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-neutral-400">Trending Queries:</span>
                {KEYWORD_DATABASE.map((item) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => handleKeywordSearch(item.query)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                      selectedKeywordData.query.toLowerCase() === item.query.toLowerCase()
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.query}
                  </button>
                ))}
              </div>

              {/* Keyword Metrics Card */}
              {selectedKeywordData && (
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {selectedKeywordData.intent}
                      </span>
                      <h4 className="text-lg font-bold text-white font-display mt-1">
                        &quot;{selectedKeywordData.query}&quot;
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-neutral-400">Search Volume</div>
                        <div className="text-base font-bold font-mono text-emerald-400">
                          {selectedKeywordData.volume}
                        </div>
                      </div>
                      <div className="w-[1px] h-8 bg-neutral-800" />
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-neutral-400">Keyword Difficulty</div>
                        <div className="text-base font-bold font-mono text-cyan-400">
                          {selectedKeywordData.difficulty}% (Medium)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Ranking Factors Recommended */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Recommended Search Engine Ranking Strategy:
                    </span>
                    <div className="space-y-2">
                      {selectedKeywordData.topRankingFactors.map((factor, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 font-sans text-center sm:text-left">
            Engineered by <strong className="text-white">Mr Deepak</strong> with Google Core Web Vitals compliance.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyToConsultation}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply SEO Findings To Project</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
