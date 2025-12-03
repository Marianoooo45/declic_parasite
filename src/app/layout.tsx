import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; 

import ClientBody from "./ClientBody";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCta } from "@/components/floating-cta";
import { site } from "@/config/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: `${site.brand} | Expert Anti-Nuisibles...`,
  description: `${site.brand} intervient...`,
  alternates: { canonical: "https://www.declicparasites.fr/" },
  keywords: site.keywords.split(", "),
  openGraph: {
    title: `${site.brand} – ${site.city}`,
    description: `Experts nuisibles à ${site.city} (${site.departement}). Devis gratuit, intervention rapide.`,
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    name: site.brand,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.split(",")[0],
      addressLocality: site.city,
      postalCode: "45000",
      addressCountry: "FR",
    },
    url: "https://www.declicparasites.fr",
    email: site.email,
    telephone: site.phone.replace(/\s+/g, ""),
    areaServed: site.serviceArea,
    priceRange: "€€",
    sameAs: [],
  };

  const ldJson: string = JSON.stringify(localBusinessJsonLd);

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
        {/* CORRECTION PERFORMANCE : Préchargement de l'image LCP */}
        <link
          rel="preload"
          href="https://images.contentstack.io/v3/assets/blt4cb7085064c0b32f/blt6614b4a12e79a8a2/668d2eb242bfac020686b5fd/1200X628_conseil_comment_choisir_exterminateur.jpg"
          as="image"
          fetchpriority="high"
        />
      </head>
      <ClientBody className="flex min-h-screen flex-col text-base leading-relaxed">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          {/* Compense le header fixe (h-16 md:h-20) */}
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <SiteFooter />
        </div>
        <FloatingCta />
      </ClientBody>
      
      <GoogleAnalytics gaId="G-7H51K6LB86" /> 
    </html>
  );
}