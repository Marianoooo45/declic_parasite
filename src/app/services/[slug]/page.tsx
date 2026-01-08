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
    title: service.title,
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
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    provider: {
      "@type": "LocalBusiness",
      name: site.brand,
      image: "https://www.declicparasites.fr/icon-192.png",
      telephone: site.phone.replace(/\s+/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "10 Rue Bannier",
        addressLocality: "Orléans",
        postalCode: "45000",
        addressCountry: "FR",
      },
      priceRange: "€€",
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
            sizes="(max-width: 768px) 100vw, 100vw"
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

        {/* PROBLÈME → SOLUTION  */}
        <section className="bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <AnimatedSection delay={0}>
                <div className="h-full rounded-2xl border-2 border-red-500/20 bg-white p-8 shadow-realistic">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-red-700">Problème</h3>
                  <p className="leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.problemDescription }} />

                  {service.emergencyCTA && (
                    <div className="mt-6">
                      <Link href={service.emergencyCTA.href}>
                        <Button variant="destructive" className="w-full font-bold shadow-sm hover:shadow-md">
                          <Zap className="mr-2 h-4 w-4" />
                          {service.emergencyCTA.text}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="h-full rounded-2xl border-2 border-amber-500/20 bg-white p-8 shadow-realistic">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                    <span className="text-3xl">🚨</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-amber-700">Risques</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {service.riskDescription}
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
                Intervention à Orléans : comment ça se passe ?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Un processus maîtrisé pour une efficacité garantie en 24–48h
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4 mb-16">
              {[
                { step: "1", title: "Diagnostic", desc: "Analyse sur site pour identifier l'espèce et l'ampleur." },
                { step: "2", title: "Stratégie", desc: "Plan d'action ciblé selon votre environnement." },
                { step: "3", title: "Traitement", desc: "Mise en place des solutions biocides ou mécaniques." },
                { step: "4", title: "Suivi", desc: "Contrôle post-intervention et conseils prévention." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-white/10 text-2xl font-bold text-accent">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </div>
              ))}
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

        {/* CUSTOM SECTIONS (SEO & DETAILS) */}
        {service.customSections && service.customSections.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid gap-10 lg:grid-cols-2">
                {service.customSections.map((section, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <div className="rounded-3xl border-2 border-primary/10 bg-white p-8 shadow-lg">
                      <h2 className="mb-4 text-2xl font-bold text-primary">
                        {section.title}
                      </h2>
                      <div
                        className="prose prose-p:text-muted-foreground prose-strong:text-primary max-w-none text-base leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PRÉPARATION (SI EXISTE) */}
        {service.preparation && (
          <section className="py-20 bg-amber-50/50">
            <div className="mx-auto max-w-7xl px-6">
              <div className="bg-white rounded-3xl border-2 border-amber-200 p-8 md:p-12 shadow-xl">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center gap-3">
                      <Zap className="h-8 w-8 text-amber-500" />
                      Ce que vous devez préparer
                    </h2>
                    <p className="text-lg text-amber-900/70 mb-8">
                      Pour garantir l'efficacité maximale du traitement, merci de suivre ces quelques étapes avant l'arrivée de notre technicien :
                    </p>
                    <ul className="grid gap-4 md:grid-cols-2">
                      {service.preparation.map((step, i) => (
                        <li key={i} className="flex gap-3 items-start bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-900 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PREUVES DE CONFIANCE */}
        <section className="py-20 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-12">Nos engagements qualité & sécurité</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Agrément Certibiocide</h3>
                <p className="text-sm text-muted-foreground">Expert certifié par le Ministère de la Transition Écologique pour l'usage raisonné des produits biocides.</p>
              </div>
              <div className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rapport détaillé</h3>
                <p className="text-sm text-muted-foreground">Après chaque intervention, vous recevez un rapport complet avec photos et recommandations pour votre assurance ou syndic.</p>
              </div>
              <div className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Garantie Résultat</h3>
                <p className="text-sm text-muted-foreground">Nous assurons un suivi jusqu'à l'éradication totale des nuisibles. Satisfait ou nouvelle intervention offerte.</p>
              </div>
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

        {/* MAILLAGE LOCAL */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl border-2 border-primary/10 p-8 text-center bg-secondary/10">
              <h2 className="text-2xl font-bold text-primary mb-6">Nos interventions {service.title} dans le Loiret (45)</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Orléans", slug: "orleans" },
                  { name: "Olivet", slug: "olivet" },
                  { name: "Fleury-les-Aubrais", slug: "fleury-les-aubrais" },
                  { name: "Saint-Jean-de-la-Ruelle", slug: "saint-jean-de-la-ruelle" },
                  { name: "Saran", slug: "saran" },
                  { name: "Saint-Jean-de-Braye", slug: "saint-jean-de-braye" },
                  { name: "Ingré", slug: "ingre" }
                ].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/zones-intervention/${city.slug}`}
                    className="px-4 py-2 rounded-full bg-white border border-primary/20 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    {service.title} à {city.name}
                  </Link>
                ))}
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