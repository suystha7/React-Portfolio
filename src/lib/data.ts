import {
  Atom,
  Braces,
  Cloud,
  Code2,
  Component,
  Database,
  Figma,
  FileCode2,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Network,
  Palette,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* =====================================================================
   ★ EDIT THIS FILE to make the portfolio yours — everything reads from here.
   ===================================================================== */

export const siteConfig = {
  name: "Your Name", // TODO: e.g. "Aarav Sharma"
  firstName: "Your",
  lastName: "Name",
  initials: "YN",
  role: "Frontend Developer",
  tagline:
    "I build fast, SEO-friendly and delightful web experiences with React, Next.js and Tailwind CSS.",
  location: "Kathmandu, Nepal",
  email: "you@example.com", // TODO: your email
  phone: "+977-98XXXXXXXX", // TODO: your phone
  github: "https://github.com/yourusername", // TODO
  linkedin: "https://linkedin.com/in/yourusername", // TODO
  twitter: "https://x.com/yourusername", // TODO (optional)
  resume: "/resume.pdf", // file in /public — replace with your real CV
  url: "https://yourportfolio.com", // TODO: your live domain (for SEO)
  availability: "Available for freelance & full-time roles",
  // Leave "" to use the animated initials avatar, or add "/profile.jpg" to /public:
  profileImage: "",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/** Words typed by the animated cursor text in the hero. */
export const typewriterWords = [
  "Frontend Developer",
  "React Specialist",
  "Next.js Developer",
  "UI Animation Lover",
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "+", label: "Technologies" },
];

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aboutHighlights: Highlight[] = [
  {
    icon: Code2,
    title: "Modern Frontend",
    description:
      "Pixel-perfect, responsive interfaces built with React, Next.js and TypeScript.",
  },
  {
    icon: Sparkles,
    title: "Motion & Interaction",
    description:
      "Buttery-smooth scroll reveals, micro-interactions and page transitions with Framer Motion.",
  },
  {
    icon: Globe,
    title: "SEO & Performance",
    description:
      "SSR/SSG, metadata, sitemaps and Core-Web-Vitals-friendly code that ranks and loads fast.",
  },
  {
    icon: Component,
    title: "Design Systems",
    description:
      "Reusable shadcn-style component libraries with Tailwind for consistent, scalable UIs.",
  },
];

export const aboutChecklist = [
  "Clean, component-driven architecture",
  "SEO-first builds with the Next.js App Router",
  "Accessible (a11y) & mobile-first layouts",
  "Git workflow, code reviews & deployment on Vercel",
];

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  location: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export const experience: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "Frontend Developer",
    place: "Freelance / Remote",
    location: "Kathmandu, Nepal",
    description:
      "Designing and shipping responsive marketing sites, dashboards and e-commerce frontends with Next.js, TypeScript and Tailwind. Obsessed with animation details, SEO and Lighthouse scores.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    current: true,
  },
  {
    period: "2021 — 2023",
    title: "Junior Frontend Developer",
    place: "Tech Studio Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    description:
      "Built reusable React components, converted Figma designs to pixel-perfect pages, and improved load performance across client projects.",
    tags: ["React", "JavaScript", "REST APIs", "Git"],
  },
  {
    period: "2020 — 2021",
    title: "Frontend Intern",
    place: "Digital Agency",
    location: "Lalitpur, Nepal",
    description:
      "Learned the fundamentals of HTML, CSS and JavaScript while assisting on landing pages and small business websites.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export const education: TimelineItem[] = [
  {
    period: "2019 — 2023",
    title: "BSc. in Computer Science & IT",
    place: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    description:
      "Graduated with a strong foundation in programming, data structures and web technologies. Final-year project: a full-stack e-learning platform.",
    tags: ["CS Fundamentals", "Web Tech", "DBMS"],
  },
  {
    period: "2022",
    title: "Meta Front-End Developer (Coursera)",
    place: "Online Certification",
    location: "Remote",
    description:
      "Professional certificate covering advanced React, UI principles, testing and version control.",
    tags: ["React", "Testing", "UX Basics"],
  },
  {
    period: "2017 — 2019",
    title: "+2 Science (HSEB/NEB)",
    place: "Higher Secondary School",
    location: "Nepal",
    description:
      "Completed higher secondary education with a focus on science and mathematics.",
    tags: ["Physics", "Maths"],
  },
];

export interface TechItem {
  name: string;
  category: string;
  level: number; // 0-100 proficiency bar
  icon: LucideIcon;
}

export const techStack: TechItem[] = [
  { name: "Next.js", category: "Framework", level: 90, icon: Globe },
  { name: "React", category: "Library", level: 92, icon: Atom },
  { name: "TypeScript", category: "Language", level: 86, icon: FileCode2 },
  { name: "JavaScript", category: "Language", level: 90, icon: Braces },
  { name: "Tailwind CSS", category: "Styling", level: 92, icon: Palette },
  { name: "Framer Motion", category: "Animation", level: 85, icon: Sparkles },
  { name: "shadcn/ui", category: "Components", level: 88, icon: Component },
  { name: "Zustand / Redux", category: "State", level: 80, icon: Layers },
  { name: "Node.js", category: "Backend", level: 78, icon: Server },
  { name: "REST APIs", category: "Backend", level: 85, icon: Network },
  { name: "MongoDB", category: "Database", level: 75, icon: Database },
  { name: "PostgreSQL", category: "Database", level: 72, icon: HardDrive },
  { name: "Git & GitHub", category: "Tools", level: 88, icon: GitBranch },
  { name: "Vercel", category: "Deploy", level: 85, icon: Cloud },
  { name: "Figma", category: "Design", level: 80, icon: Figma },
];

export const currentlyLearning = ["React Native", "Next.js Server Actions", "Three.js"];

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  features: string[];
  tags: string[];
  accent: { from: string; to: string };
  github: string;
  live: string;
  /** Optional real screenshots in /public/projects/*. Leave "" to use the auto mock UI. */
  desktopImage: string;
  mobileImage: string;
}

export const projects: Project[] = [
  {
    slug: "shopkart",
    title: "ShopKart — E-Commerce Store",
    category: "Full-Stack",
    year: "2024",
    description:
      "A complete shopping experience with product filters, cart, checkout and an admin dashboard. SEO-optimized product pages rendered with Next.js SSR.",
    features: [
      "Cart, wishlist & Stripe checkout flow",
      "SSR product pages with JSON-LD SEO",
      "Admin dashboard with sales charts",
    ],
    tags: ["Next.js", "Tailwind", "Stripe", "MongoDB"],
    accent: { from: "#2563EB", to: "#7C3AED" },
    github: "https://github.com/yourusername/shopkart",
    live: "https://shopkart-demo.vercel.app",
    desktopImage: "",
    mobileImage: "",
  },
  {
    slug: "pulseboard",
    title: "PulseBoard — SaaS Dashboard",
    category: "Frontend",
    year: "2024",
    description:
      "An analytics dashboard with animated charts, dark mode, and a fully responsive layout. Built as a reusable dashboard starter kit.",
    features: [
      "Animated charts & KPI cards",
      "Dark / light theme with persistence",
      "Collapsible sidebar + command palette",
    ],
    tags: ["React", "Framer Motion", "Recharts", "shadcn/ui"],
    accent: { from: "#F97316", to: "#EF4444" },
    github: "https://github.com/yourusername/pulseboard",
    live: "https://pulseboard-demo.vercel.app",
    desktopImage: "",
    mobileImage: "",
  },
  {
    slug: "wanderblog",
    title: "WanderBlog — Travel Blog",
    category: "Frontend",
    year: "2023",
    description:
      "A blazing-fast travel blog with MDX content, reading progress, and beautiful image galleries. Scores 100 on Lighthouse SEO.",
    features: [
      "MDX blog with syntax highlighting",
      "Reading progress + table of contents",
      "Auto sitemap & OG image generation",
    ],
    tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
    accent: { from: "#0EA5E9", to: "#10B981" },
    github: "https://github.com/yourusername/wanderblog",
    live: "https://wanderblog-demo.vercel.app",
    desktopImage: "",
    mobileImage: "",
  },
  {
    slug: "foodie",
    title: "Foodie — Food Delivery UI",
    category: "UI Concept",
    year: "2023",
    description:
      "A mobile-first food ordering concept with restaurant listings, live order tracking UI and playful micro-animations.",
    features: [
      "Mobile-first responsive layouts",
      "Animated cart drawer & toasts",
      "Order tracking timeline UI",
    ],
    tags: ["React", "Tailwind", "Framer Motion"],
    accent: { from: "#EC4899", to: "#F97316" },
    github: "https://github.com/yourusername/foodie-ui",
    live: "https://foodie-demo.vercel.app",
    desktopImage: "",
    mobileImage: "",
  },
];
