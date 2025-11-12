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

type ServiceRouteParams = {
  slug: string;
};

type ServicePageProps = {
  params: Promise<ServiceRouteParams>;
};

export function generateStaticParams(): ServiceRouteParams[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: site.brand,
    };
  }

  const title = `${service.title} | ${site.brand}`;
  const description = service.description;
  const url = `${baseUrl}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: service.heroImage,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

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
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: baseUrl,
      },
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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <div className="relative min-h-screen bg-white">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-secondary" aria-hidden />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-tr from-primary/10 via-transparent to-transparent lg:block" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Service {site.brand}
              </span>
              <h1 className="text-balance text-4xl font-semibold text-primary md:text-5xl">
                {service.title}
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                {service.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" data-cta="service-quote" className="inline-flex">
                  <Button className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90">
                    Devis gratuit
                  </Button>
                </Link>
                <a href={phoneHref} data-cta="service-call" className="inline-flex">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary/30 bg-white px-8 py-3 text-base font-semibold text-primary shadow-md hover:bg-primary/10"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Appeler
                  </Button>
                </a>
              </div>
              <div className="grid gap-4 text-sm text-muted-foreground lg:grid-cols-2">
                {pasIntro.map((paragraph, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-sm"
                  >
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> +98% de clients satisfaits
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
            <div className="relative h-80 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
              Les bénéfices clés
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Ce que nous mettons en place pour vous offrir un environnement sain et durablement protégé.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/60 py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
              Notre intervention détaillée
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Chaque étape est documentée et ajustée selon votre site : nous vous guidons avant, pendant et après la prestation pour sécuriser vos espaces.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.features.map((feature) => (
                <Card
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/95 p-5 shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-muted-foreground">{feature}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {service.priceFrom ? (
          <section className="py-16">
            <div className="mx-auto w-full max-w-6xl px-6">
              <Card className="flex flex-col gap-8 rounded-3xl border border-primary/20 bg-primary/5 p-8 shadow-xl md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
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
                    <Button
                      size="lg"
                      className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90"
                      data-cta="service-price-contact"
                    >
                      Obtenir mon devis précis
                    </Button>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Découvrir nos autres prestations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </div>
          </section>
        ) : null}

        <section className="bg-primary py-16 text-white">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                  Questions fréquentes
                </h2>
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

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 rounded-3xl border border-primary/15 bg-secondary/80 p-8 shadow-xl md:grid-cols-[1.15fr_0.85fr] md:p-12">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  Conseil personnalisé
                </span>
                <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
                  Parlons de votre situation
                </h2>
                <p className="max-w-xl text-base text-primary/80">
                  Un conseiller vous rappelle en moins d&apos;une heure ouvrée pour préparer une intervention discrète, efficace et adaptée à votre lieu.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Diagnostic précis sur site", "Plan d&apos;action certifié Certibiocide", "Suivi après intervention", "Déplacement dans tout le département"].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/80 p-4 text-sm text-primary/80 shadow-sm"
                    >
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-lg md:p-8">
                <div className="space-y-3 text-primary">
                  <h3 className="text-lg font-semibold">Contact rapide</h3>
                  <p className="text-sm text-primary/70">
                    Laissez-nous vos coordonnées ou appelez directement nos experts pour une prise en charge immédiate.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="inline-flex" data-cta="service-final-cta">
                    <Button className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90">
                      Demander un devis gratuit
                    </Button>
                  </Link>
                  <a href={phoneHref} className="inline-flex" data-cta="service-final-call">
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/30 bg-white px-6 py-3 text-base font-semibold text-primary shadow-md hover:bg-primary/10"
                    >
                      <Phone className="mr-2 h-4 w-4" /> {site.phone}
                    </Button>
                  </a>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl bg-primary/5 p-5 text-sm text-primary md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span>Intervention sous 24–48h et suivi client dédié</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <span>Garanties claires et traçabilité des traitements</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-balance text-2xl font-semibold text-primary md:text-3xl">
                Autres services qui pourraient vous intéresser
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {relatedServices.map((related) => (
                  <Card
                    key={related.slug}
                    className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-primary/10 bg-white/90 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-primary">{related.title}</h3>
                      <p className="text-sm text-muted-foreground">{related.short}</p>
                    </div>
                    <Link href={`/services/${related.slug}`} className="inline-flex" data-cta="service-related">
                      <Button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary/90">
                        Découvrir
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
