import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/config/site";
import { services } from "@/config/services";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

const baseUrl = "https://www.declicparasites.fr";
const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const revalidate = 86400;

// --- FIX NEXT 15 : params DOIT être une Promise ---
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

// --- metadata avec params asynchrone ---
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: site.brand };
  }

  const title = `${service.title} | ${site.brand}`;
  const description = service.description;
  const url = `${baseUrl}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: service.heroImage }],
    },
  };
}

// --- composant principal ---
export default async function ServicePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const pasIntro = [
    `Problème — ${service.title} menacent votre confort ou votre activité à ${site.city}. Les signaux d'alerte se multiplient et il devient urgent d'agir avant la prolifération.`,
    "Agiter — Sans plan d'action, les nuisibles se répandent, endommagent vos biens et transmettent des risques sanitaires pour votre famille ou vos clients.",
    `Solution — ${site.brand} intervient en 24–48h avec une méthodologie professionnelle Certibiocide et un suivi sur-mesure jusqu'à la résolution complète.`,
  ];
  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  // --- JSON-LD SEO ---
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    image: service.heroImage,
    description: service.description,
    areaServed: [site.city, site.departement],
    provider: {
      "@type": "LocalBusiness",
      name: site.brand,
      telephone: site.phone.replace(/\s+/g, ""),
      areaServed: site.serviceArea,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.split(",")[0],
        addressLocality: site.city,
        postalCode: "45000",
        addressCountry: "FR",
      },
    },
    offers: service.priceFrom
      ? {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: service.priceFrom,
          url: `${baseUrl}/services/${service.slug}`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
    keywords: service.schemaKeywords,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${baseUrl}/services/${service.slug}`,
      },
    ],
  };

  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="relative min-h-screen bg-white">
        {/* --- HERO --- */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Service {site.brand}
                </span>
                <h1 className="heading-balance mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-6 space-y-3 text-muted-foreground">
                  {pasIntro.map((paragraph, index) => (
                    <p key={index} className="max-w-2xl text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                      data-cta="service-quote"
                    >
                      Demander un devis
                    </Button>
                  </Link>
                  <a
                    href={phoneHref}
                    data-cta="service-call"
                    className="inline-flex"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10"
                    >
                      <Phone className="mr-2 h-4 w-4" /> Appeler {site.phone}
                    </Button>
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" /> +98% de clients
                    satisfaits
                  </span>
                  <Link
                    href="/#avis"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Voir les avis Google
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- AUTRES SECTIONS --- */}
        {/* (le reste de ton code reste inchangé ici) */}
      </div>
    </>
  );
}
