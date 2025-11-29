import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
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
  Award,
  CheckCircle2,
  Clock,
  Phone,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

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

      <div className="relative min-h-screen">
        {/* HERO IMMERSIF */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 py-24 text-white lg:py-32">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="absolute inset-0 object-cover opacity-25 mix-blend-overlay"
            priority
            sizes="100vw"
          />

          <div className="absolute right-6 top-6 z-10">
            <div className="rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
              <Zap className="inline h-4 w-4" /> Intervention 24-48h
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  <Award className="h-4 w-4 text-accent" />
                  Service {site.brand}
                </div>

                <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
                  {service.title}
                </h1>

                <p className="text-pretty text-xl leading-relaxed text-white/90">
                  {service.description}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a href={phoneHref} data-cta="service-hero-call">
                    <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                      <Phone className="h-5 w-5" />
                      Appeler maintenant
                    </Button>
                  </a>
                  <Link href="/contact" data-cta="service-hero-form">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      Devis gratuit
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Shield, text: "Certifié Certibiocide" },
                    { icon: Star, text: "98% satisfaits" },
                    { icon: Clock, text: "Devis sous 1h" },
                    { icon: Award, text: "Garantie résultat" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                      <item.icon className="h-5 w-5 text-accent" />
                      <span className="text-sm font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODIF: h-64 sur mobile */}
              <div className="relative h-64 overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl md:h-96 lg:h-full lg:min-h-[500px]">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                {service.priceFrom && (
                  <div className="absolute right-6 top-6 rounded-full bg-accent px-6 py-3 text-lg font-bold text-white shadow-xl">
                    dès {euroFormatter.format(service.priceFrom)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PROBLÈME → SOLUTION */}
        <section className="bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <AnimatedSection delay={0}>
                <div className="h-full rounded-2xl border-2 border-red-500/20 bg-white p-8 shadow-realistic">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-red-700">Problème</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {service.title} menacent votre confort ou votre activité à {site.city}. 
                    Les signaux d'alerte se multiplient et il devient urgent d'agir avant la prolifération.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="h-full rounded-2xl border-2 border-amber-500/20 bg-white p-8 shadow-realistic">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                    <span className="text-3xl">🚨</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-amber-700">Risques</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Sans plan d'action, les nuisibles se répandent, endommagent vos biens 
                    et transmettent des risques sanitaires pour votre famille ou vos clients.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="h-full rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-realistic">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-primary">Solution</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {site.brand} intervient en 24–48h avec une méthodologie professionnelle 
                    Certibiocide et un suivi sur-mesure jusqu'à la résolution complète.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* BÉNÉFICES CLÉS */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                Les bénéfices clés
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ce que nous mettons en place pour vous offrir un environnement sain et protégé
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit, i) => (
                <AnimatedSection key={benefit} delay={0.05 * i}>
                  <div className="flex items-start gap-3 rounded-xl border-2 border-primary/20 bg-white p-4 shadow-lg transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
                    <span className="font-semibold text-foreground">{benefit}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* NOTRE INTERVENTION */}
        <section className="bg-gradient-primary py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-4xl font-bold md:text-5xl">
                Notre intervention détaillée
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Chaque étape documentée et ajustée selon votre site
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {service.features.map((feature, i) => (
                <AnimatedSection key={feature} delay={0.05 * i}>
                  <div className="flex items-start gap-4 rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <p className="leading-relaxed">{feature}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* TARIF */}
        {service.priceFrom && (
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
              <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-realistic">
                <div className="grid gap-0 md:grid-cols-[1.3fr_0.7fr]">
                  <div className="p-10 md:p-12">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
                      <Star className="h-4 w-4" />
                      Tarif indicatif
                    </div>
                    
                    <div className="mb-4 text-5xl font-bold text-primary md:text-6xl">
                      {euroFormatter.format(service.priceFrom)}
                    </div>
                    
                    <p className="mb-6 text-lg text-muted-foreground">
                      Tarif de base incluant déplacement, diagnostic complet et plan d'action personnalisé.
                    </p>

                    <div className="space-y-3">
                      {[
                        { icon: Shield, text: "Garantie de résultat et suivi 30 jours" },
                        { icon: Clock, text: "Intervention sous 24–48h dans le Loiret" },
                        { icon: Award, text: "Rapport détaillé avec photos" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4 bg-secondary/30 p-10">
                    <Link href="/contact" data-cta="service-price-form">
                      <Button size="lg" className="h-14 w-full text-lg font-bold shadow-lg">
                        Obtenir mon devis précis
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                    <a href={phoneHref} data-cta="service-price-call">
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-14 w-full border-2 border-primary text-lg font-bold text-primary hover:bg-primary hover:text-white"
                      >
                        <Phone className="h-5 w-5" />
                        {site.phone}
                      </Button>
                    </a>
                    <Link
                      href="/services"
                      className="mt-2 text-center text-sm font-semibold text-primary hover:underline"
                    >
                      Voir nos autres prestations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faqs.length > 0 && (
          <section className="bg-secondary/30 py-20">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-12 text-center">
                <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                  Questions fréquentes
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Besoin de précisions ? Nos techniciens restent joignables
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="rounded-2xl border-2 border-primary/20 bg-white px-6 shadow-lg"
                  >
                    <AccordionTrigger className="text-left text-lg font-bold text-primary hover:text-accent">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* CTA FINAL */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="overflow-hidden rounded-3xl bg-gradient-primary text-white shadow-2xl">
              <div className="grid gap-10 p-10 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    <Zap className="h-4 w-4 text-accent" />
                    Conseil personnalisé
                  </div>
                  
                  <h2 className="text-balance text-4xl font-bold md:text-5xl">
                    Parlons de votre situation
                  </h2>
                  
                  <p className="text-lg text-white/90">
                    Un conseiller vous rappelle en moins d'une heure ouvrée pour préparer 
                    une intervention discrète, efficace et adaptée à votre lieu.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Diagnostic précis sur site",
                      "Plan d'action certifié",
                      "Suivi après intervention",
                      "Déplacement Loiret"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold">Contact rapide</h3>
                  <p className="text-sm text-white/90">
                    Laissez-nous vos coordonnées ou appelez directement
                  </p>
                  
                  <Link href="/contact" data-cta="service-final-form">
                    <Button size="lg" className="h-14 w-full bg-accent text-lg font-bold hover:bg-accent/90">
                      Demander un devis gratuit
                    </Button>
                  </Link>
                  
                  <a href={phoneHref} data-cta="service-final-call">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 w-full border-2 border-white bg-white/10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <Phone className="h-5 w-5" />
                      {site.phone}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES CONNEXES */}
        {relatedServices.length > 0 && (
          <section className="bg-secondary/30 py-20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12">
                <h2 className="text-balance text-3xl font-bold text-primary md:text-4xl">
                  Autres services qui pourraient vous intéresser
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {relatedServices.map((related, i) => (
                  <AnimatedSection key={related.slug} delay={0.1 * i}>
                    <Link href={`/services/${related.slug}`} className="group block h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={related.heroImage}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(min-width: 768px) 33vw, 100vw"
                          />
                          {related.priceFrom && (
                            <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-white shadow-lg">
                              dès {euroFormatter.format(related.priceFrom)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6">
                          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                            {related.title}
                          </h3>
                          <p className="flex-1 text-sm text-muted-foreground">{related.short}</p>
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                            Découvrir
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}