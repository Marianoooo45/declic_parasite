import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { site } from "@/config/site";

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
        // @ts-ignore
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
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
