// src/app/services/[slug]/page.tsx
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

// Pas de types locaux => on n’ombre pas ceux de Next
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return { title: site.brand };

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
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
    offers:
      typeof service.priceFrom === "number"
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${baseUrl}/services/${service.slug}`,
      },
    ],
  };

  const faqJsonLd =
    Array.isArray(service.faqs) && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div className="relative min-h-screen bg-white">
        {/* HERO */}
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
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{service.description}</p>
                <div className="mt-6 space-y-3 text-muted-foreground">
                  {pasIntro.map((paragraph, i) => (
                    <p key={i} className="max-w-2xl text-sm">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" data-cta="service-quote">
                      Demander un devis
                    </Button>
                  </Link>
                  <a href={phoneHref} data-cta="service-call" className="inline-flex">
                    <Button size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                      <Phone className="mr-2 h-4 w-4" /> Appeler {site.phone}
                    </Button>
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" /> +98% de clients satisfaits
                  </span>
                  <Link href="/#avis" className="inline-flex items-center gap-1 text-primary hover:underline">
                    Voir les avis Google <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative h-80 overflow-hidden rounded-3xl shadow-lg">
                {service.heroImage ? (
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
                    Image indisponible
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        {Array.isArray(service.benefits) && service.benefits.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">Les bénéfices clés</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Ce que nous mettons en place pour vous offrir un environnement sain et durablement protégé.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.benefits.map((benefit) => (
                  <span key={benefit} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURES */}
        {Array.isArray(service.features) && service.features.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                Notre intervention détaillée
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Chaque étape est documentée et ajustée selon votre site : nous vous guidons avant, pendant et après la prestation pour sécuriser vos espaces.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {service.features.map((feature) => (
                  <Card key={feature} className="flex items-start gap-3 border border-gray-200/70 bg-white p-5 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">{feature}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PRICE */}
        {typeof service.priceFrom === "number" && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Card className="flex flex-col gap-8 border-primary/30 bg-primary/5 p-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                    À partir de {euroFormatter.format(service.priceFrom)}
                  </h2>
                  <p className="mt-2 max-w-xl text-muted-foreground">
                    Tarif indicatif incluant déplacement, diagnostic complet et plan d&apos;action personnalisé.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Garantie de résultat et suivi 30 jours
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> Intervention sous 24–48h partout dans le {site.departement}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:items-end">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" data-cta="service-price-contact">
                      Obtenir mon devis précis
                    </Button>
                  </Link>
                  <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Découvrir nos autres prestations <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* FAQ */}
        {Array.isArray(service.faqs) && service.faqs.length > 0 && (
          <section className="bg-gray-900 py-16 text-white">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">Questions fréquentes</h2>
                  <p className="mt-3 text-white/80">
                    Besoin de précisions avant de programmer l&apos;intervention ? Nos techniciens restent joignables et vous accompagnent jusqu&apos;à la résolution complète.
                  </p>
                </div>
                <Accordion type="single" collapsible className="w-full rounded-xl border border-white/10 bg-white/5 p-4">
                  {service.faqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-base font-semibold text-white">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-white/80">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 rounded-3xl bg-slate-900 p-8 text-white md:grid-cols-2 md:p-12">
              <div>
                <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">Parlons de votre situation</h2>
                <p className="mt-3 text-white/80">
                  Un conseiller vous rappelle en moins d&apos;une heure ouvrée pour planifier l&apos;intervention idéale.
                </p>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" data-cta="service-final-cta">
                    Demander un devis gratuit
                  </Button>
                </Link>
                <a href={phoneHref} className="inline-flex" data-cta="service-final-call">
                  <Button size="lg" variant="outline" className="border-white/70 text-white hover:bg-white/10">
                    <Phone className="mr-2 h-4 w-4" /> {site.phone}
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="heading-balance text-2xl font-extrabold tracking-tight md:text-3xl">
                Autres services qui pourraient vous intéresser
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedServices.map((related) => (
                  <Card key={related.slug} className="group overflow-hidden border border-gray-200/70 p-6">
                    <h3 className="heading-balance text-lg font-semibold">{related.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{related.short}</p>
                    <Link
                      href={`/services/${related.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
                      data-cta="service-related"
                    >
                      Découvrir <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STICKY CTA MOBILE */}
        <div className="fixed bottom-5 right-4 z-50 flex gap-3 md:hidden">
          <Link href="/contact">
            <Button size="sm" className="bg-primary px-5 py-2 hover:bg-primary/90" data-cta="service-sticky-quote">
              Devis express
            </Button>
          </Link>
          <a href={phoneHref} className="inline-flex" data-cta="service-sticky-call">
            <Button size="sm" variant="outline" className="border-primary/40 text-primary">
              <Phone className="mr-1 h-4 w-4" /> Appeler
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
