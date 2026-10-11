import { Project } from '../types';
import gymImage from '../assets/images/project_88gym_showcase_1791388022971.jpg';
import mallImage from '../assets/images/project_shreenath_mall_1791388041315.jpg';
import salonImage from '../assets/images/project_secretsalon_showcase_1791388056976.jpg';
import auraImage from '../assets/images/hero_digital_sculpture_1791388009977.jpg';

export const PROJECTS: Project[] = [
  {
    id: '88-gym',
    slug: '88-gym',
    title: '88 GYM',
    category: 'FITNESS / WEB DESIGN',
    shortDescription: 'Modern responsive gym website with a premium user interface and smooth navigation.',
    fullDescription: 'A high-impact digital presence engineered for 88 GYM, combining energetic visual aesthetics with streamlined class discovery, membership onboarding, and trainer profiles.',
    imageUrl: gymImage,
    liveUrl: 'https://88gym.netlify.app/',
    featured: true,
    year: '2025',
    client: '88 Gym Fitness Ltd.',
    servicesProvided: ['UI/UX Design', 'Full-Stack Development', 'Mobile Optimization', 'Performance Tuning'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
    metrics: [
      { label: 'Mobile Bounce Rate', value: '-38%' },
      { label: 'Trial Signups', value: '+142%' },
      { label: 'Page Load Speed', value: '0.8s' },
    ],
    challenge: 'The client needed a digital platform that matched the premium physical energy of their fitness facility while solving slow mobile loads and confusing class booking funnels.',
    solution: 'Designed an editorial dark aesthetic with high-contrast typography, frictionless class schedules, one-tap membership tiers, and instant WhatsApp booking integration.',
    outcome: 'Delivered an ultra-responsive web experience scoring 99 on Google Lighthouse, resulting in a 142% increase in monthly free trial registrations within 60 days.',
  },
  {
    id: 'shree-nath-mall',
    slug: 'shree-nath-mall',
    title: 'SHREE NATH MALL',
    category: 'BUSINESS / WEB DESIGN',
    shortDescription: 'Premium modern mall/business concept with cinematic visual presentation.',
    fullDescription: 'An architectural digital landmark for a premier retail and entertainment destination, featuring interactive store directories, event highlights, and cinematic leasing presentations.',
    imageUrl: mallImage,
    liveUrl: undefined, // placeholder as specified in prompt
    featured: true,
    year: '2025',
    client: 'Shree Nath Commercial Holdings',
    servicesProvided: ['Brand Strategy', 'Interactive Directory', '3D Floor Plan UX', 'Web Development'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas Visuals', 'Supabase'],
    metrics: [
      { label: 'Leasing Inquiries', value: '+85%' },
      { label: 'Directory Engagement', value: '3.4m avg' },
      { label: 'Lighthouse Score', value: '98/100' },
    ],
    challenge: 'A physical retail complex with over 120 retail outlets lacked a unified digital presence for visitors seeking directories, weekend events, and commercial retail leasing opportunities.',
    solution: 'Constructed an immersive virtual directory featuring categorized tenant filters, promotional cinema banners, and a dedicated high-converting retail leasing portal.',
    outcome: 'Transformed online brand perception, leading to over 240 qualified retail lease inquiries and seamless daily visitor navigation during peak holiday festivals.',
  },
  {
    id: 'secret-mens-salon',
    slug: 'secret-mens-salon',
    title: 'SECRET MENS SALON',
    category: 'SALON / BOOKING WEBSITE',
    shortDescription: 'Modern salon website concept focused on services, booking, contact, and customer experience.',
    fullDescription: 'An exclusive men’s grooming sanctuary web application highlighting bespoke grooming rituals, master barber profiles, real-time appointment inquiries, and curated retail products.',
    imageUrl: salonImage,
    liveUrl: undefined, // placeholder as specified in prompt
    featured: true,
    year: '2025',
    client: 'The Secret Grooming Co.',
    servicesProvided: ['Service Menu Architecture', 'Booking UX', 'Mobile-First Design', 'SEO'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Direct Online Bookings', value: '+210%' },
      { label: 'Average Ticket Value', value: '+35%' },
      { label: 'Local Search Rank', value: '#1 Organic' },
    ],
    challenge: 'The studio relied on frantic phone calls and unorganized social media DMs, causing double-bookings and missed appointments during high-traffic weekend windows.',
    solution: 'Crafted an atmospheric luxury salon experience featuring interactive treatment menus, barber bios, upfront pricing transparency, and structured appointment booking flows.',
    outcome: 'Eliminated booking friction, saving the studio team 15+ administrative hours per week while shifting 70% of appointment volume to seamless digital self-service.',
  },
  {
    id: 'aura-architects',
    slug: 'aura-architects',
    title: 'AURA ARCHITECTURE',
    category: 'ARCHITECTURE / PORTFOLIO',
    shortDescription: 'Minimalist editorial showcase for an award-winning residential architectural atelier.',
    fullDescription: 'Bespoke portfolio featuring full-bleed monograph imagery, blueprints inspection views, and minimalist spatial typography celebrating brutalist and organic architecture.',
    imageUrl: auraImage,
    liveUrl: undefined,
    featured: false,
    year: '2025',
    client: 'Aura Studio Architects',
    servicesProvided: ['Monograph Web Design', 'Interactive Floorplans', 'Performance Optimization'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebGL Canvas'],
    metrics: [
      { label: 'Private Client Inquiries', value: '+65%' },
      { label: 'Average Session Time', value: '4m 12s' },
      { label: 'Image Payload Saved', value: '74%' },
    ],
    challenge: 'Architectural photography files were massive and slow to load, frustrating high-net-worth clients exploring potential bespoke home commissions.',
    solution: 'Implemented progressive image hydration, custom aspect ratios, dark gallery transitions, and an elegant inquiry gate for private design tenders.',
    outcome: 'Achieved sub-second visual transitions while presenting 4K project photography with lossless fidelity across tablets, retina displays, and mobile screens.',
  }
];

