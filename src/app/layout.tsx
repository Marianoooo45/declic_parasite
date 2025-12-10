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
  title: `${site.brand} | Expert Anti-Nuisibles ${site.city}`,
  description: `${site.brand} intervient en 24h pour dératisation et désinsectisation à ${site.city} et dans le ${site.departement}. Devis gratuit et agrément Certibiocide.`,
  alternates: { canonical: "https://www.declicparasites.fr/" },
  keywords: site.keywords.split(", "),
  openGraph: {
    title: `${site.brand} – ${site.city}`,
    description: `Experts nuisibles à ${site.city} (${site.departement}). Devis gratuit, intervention rapide.`,
    type: "website",
    locale: "fr_FR",
    url: "https://www.declicparasites.fr",
    siteName: site.brand,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Configuration optimisée pour le "Knowledge Panel" de Google
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl", // Type spécifique reconnu par Google
    "name": site.brand,
    "image": "https://www.declicparasites.fr/icon.png", // Utilise votre favicon comme logo
    "@id": "https://www.declicparasites.fr/#organization",
    "url": "https://www.declicparasites.fr",
    "email": site.email,
    "telephone": site.phone.replace(/\s+/g, ""),
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10 Rue Bannier",
      "addressLocality": "Orléans",
      "postalCode": "45000",
      "addressCountry": "FR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.90289, // Coordonnées centre Orléans
      "longitude": 1.90389
    },
    "areaServed": site.serviceArea.map(city => ({
      "@type": "City",
      "name": city
    })),
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61584584848729",
      "https://share.google/mYRTAoO5txaWytDLj" // Lien vers votre fiche Google Maps
    ]
  };

  const ldJson: string = JSON.stringify(localBusinessJsonLd);

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
        {/* Suppression du link preload inutile qui causait des conflits */}
      </head>
      <ClientBody className="flex min-h-screen flex-col text-base leading-relaxed">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <SiteFooter />
        </div>
        <FloatingCta />
      </ClientBody>
      
      <GoogleAnalytics gaId="G-7H51K6LB86" /> 
    </html>
  );
}