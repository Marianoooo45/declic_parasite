import type { Metadata } from "next";

import { site } from "@/config/site";

import ContactPageContent from "./contact-content";

export const metadata: Metadata = {
  title: `Contact & Devis | ${site.brand}`,
  description:
    "Contactez Déclic Parasites pour une intervention anti-nuisibles à Orléans et dans le Loiret. Réponse rapide sous 1h ouvrée, devis gratuit.",
  alternates: {
    canonical: "https://www.declicparasites.fr/contact",
  },
  openGraph: {
    title: `Contact & Devis | ${site.brand}`,
    description:
      "Formulaire de contact et coordonnées Déclic Parasites : devis gratuit, intervention 24–48h.",
    type: "website",
    url: "https://www.declicparasites.fr/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
