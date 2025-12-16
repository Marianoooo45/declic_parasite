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
  description: `${site.brand} intervient en 24h pour dératisation et désinsectisation à ${site.city} et dans le ${site.departement}. Devis gratuit et agrément Certibiocide.`,
  alternates: { canonical: "https://www.declicparasites.fr/" },
  keywords: site.keywords.split(", "),

  // --- LE BLOC MANQUANT POUR TON FAVICON ---
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Fallback pour vieux navigateurs
      { url: '/icon.png', type: 'image/png', sizes: '32x32' }, // Standard
      // C'est CELUI-CI que Google cherche pour les résultats mobiles (192x192) :
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }, // Pour iPhone
    ],
  },
  // -----------------------------------------

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
    "image": "https://www.declicparasites.fr/icon-192.png", // J'ai aussi mis l'image HD ici
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

  // NOUVEAU : Configuration spécifique pour le Nom du Site dans les résultats Google
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": site.brand,
    "url": "https://www.declicparasites.fr",
    "alternateName": "Declic Parasites"
  };

  // On combine les deux schémas dans une liste pour Google
  const ldJson: string = JSON.stringify([localBusinessJsonLd, websiteJsonLd]);

  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
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