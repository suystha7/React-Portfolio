import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/lib/data";
import PageLoader from "@/components/shared/PageLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/* ------------------------------- SEO ---------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role} | React & Next.js Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.tagline} Specializing in modern web development with React, Next.js, TypeScript, and Tailwind CSS. View my portfolio and projects.`,
  keywords: [
    siteConfig.name,
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "Web Developer Nepal",
    "Software Engineer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Portfolio Website",
    "React Portfolio",
    "Next.js Portfolio",
    "Tailwind CSS",
    "Framer Motion",
    "UI/UX Developer",
    "Responsive Web Design",
    "SEO Optimized",
    "Web Performance",
    "Modern Web Development",
    "Kathmandu Developer",
    "Nepal Software Developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: `${siteConfig.tagline} Professional portfolio showcasing modern web development projects.`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    creator: "@yourusername",
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { 
    canonical: siteConfig.url,
  },
  category: "Technology",
  verification: {
    // Add these after setting up Google Search Console
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

/* Enhanced JSON-LD structured data for better SEO */
const personSchema = {
  "@context": "https://schema.org",
  "@type": ["Person", "WebSite"],
  "@id": siteConfig.url,
  name: siteConfig.name,
  alternateName: `${siteConfig.firstName} ${siteConfig.lastName}`,
  jobTitle: siteConfig.role,
  description: siteConfig.tagline,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  image: `${siteConfig.url}${siteConfig.profileImage}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    addressCountry: "NP",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Tribhuvan University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Frontend Development",
    "Web Development",
    "UI/UX Design",
    "SEO",
    "Performance Optimization",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.twitter].filter(
    (u) => u && !u.includes("yourusername")
  ),
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${display.variable} font-sans antialiased`}
      >
        <PageLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
