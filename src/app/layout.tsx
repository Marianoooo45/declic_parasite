import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

import ClientBody from "./ClientBody";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCta } from "@/components/floating-cta";
import { site } from "@/config/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: `${site.brand} | Dératisation & désinsectisation à ${site.city}`,
  description:
    `${site.brand} intervient à ${site.city} et dans le ${site.departement} : rats, souris, punaises de lit, cafards, frelons, guêpes, fourmis. Devis gratuit, intervention rapide 24–48h.`,
  alternates: { canonical: "https://www.declicparasites.fr/" }, // adapte au domaine
  openGraph: {
    title: `${site.brand} – ${site.city}`,
    description:
      `Experts nuisibles à ${site.city} (${site.departement}). Devis gratuit, intervention rapide.`,
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            sameAs: [], // réseaux si tu veux
          }),
        }}
      />
      <ClientBody className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col text-base leading-relaxed`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <SiteFooter />
        </div>
        <FloatingCta />
      </ClientBody>
    </html>
  );
}
