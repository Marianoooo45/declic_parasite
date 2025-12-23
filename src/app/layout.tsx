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
  title: {
    default: `${site.brand} | Expert Anti-Nuisibles ${site.city}`,
    template: `%s | ${site.brand}`,
  },
  description: `Dératisation & Désinsectisation à Orléans (45). Intervention 24h/7j. Devis Gratuit. Les experts anti-nuisibles du Loiret certifiés Certibiocide.`,
  metadataBase: new URL("https://www.declicparasites.fr"),
  alternates: { canonical: "./" },
  keywords: site.keywords.split(", "),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
  },
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
  // SCHEMA JSON-LD SIMPLIFIÉ (Objet unique, pas de tableau)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    "name": site.brand,
    "image": "https://www.declicparasites.fr/icon-192.png",
    "@id": "https://www.declicparasites.fr/#organization",
    "url": "https://www.declicparasites.fr",
    "email": site.email,
    "telephone": site.phone.replace(/\s+/g, ""), // Enlève les espaces pour le format international
    "priceRange": "Sur devis",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10 Rue Bannier",
      "addressLocality": "Orléans",
      "postalCode": "45000",
      "addressCountry": "FR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.90289,
      "longitude": 1.90389
    },
    "areaServed": site.serviceArea.map(city => ({
      "@type": "City",
      "name": city
    })),
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61584584848729",
      "https://share.google/mYRTAoO5txaWytDLj"
    ]
  };

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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