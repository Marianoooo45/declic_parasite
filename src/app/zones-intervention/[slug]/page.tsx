import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { cities, getCityBySlug } from "@/data/cities";
import { getNearbyCities } from "@/lib/geo"; // Clustering logic
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock as ClockIcon,
  MapPin,
  Phone,
  Shield,
  Zap,
} from "lucide-react";

const baseUrl = "https://www.declicparasites.fr";

export const revalidate = 86400;

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cityConfig = getCityBySlug(slug);

  if (!cityConfig) return { title: site.brand };

  const highlightedServices = services
    .slice(0, 4)
    .map((service) => service.title.toLowerCase());
  const title = `Dératisation & désinsectisation à ${cityConfig.name} (${cityConfig.zipCodes.join(
    ", "
  )})`;
  const description = `${site.brand} intervient à ${cityConfig.name
    } et alentours. Expert en nuisibles : ${highlightedServices.join(", ")}... Devis gratuit.`;
  const url = `${baseUrl}/zones-intervention/${cityConfig.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "fr_FR",
      url,
    },
  };
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cityConfig = getCityBySlug(slug);

  if (!cityConfig) notFound();

  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const highlightedServices = services.slice(0, 6);

  // Clustering: Find geographically closest cities
  const nearbyCities = getNearbyCities(cityConfig.slug, 8);

  const heroIntroExtra = cityConfig.heroIntroExtra ?? "";

  const expertiseIntro =
    cityConfig.expertiseIntro ??
    `${site.brand} accompagne les particuliers et professionnels à ${cityConfig.name
    } (${cityConfig.zipCodes[0]}). Notre équipe locale est capable d'intervenir en ${cityConfig.travelTime
    } pour sécuriser votre logement ou vos locaux.`;

  const localDetails =
    cityConfig.localDetails ??
    `Nos techniciens connaissent bien le secteur de ${cityConfig.name}. Que vous soyez en centre-ville, en zone pavillonnaire ou proche des espaces verts, nous adaptons notre protocole à votre environnement spécifique.`;

  const typicalContexts = cityConfig.typicalContexts ?? [
    "Maisons individuelles avec jardins et dépendances",
    "Immeubles avec caves, locaux techniques et parkings",
    "Commerces de proximité et restaurants",
    "Locaux professionnels et bureaux",
  ];

  // --- CONSTRUCTION DU SCHEMA JSON-LD (LocalBusiness) ---
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${site.brand} ${cityConfig.name}`,
    image: "https://www.declicparasites.fr/icon-192.png",
    "@id": `https://www.declicparasites.fr/zones-intervention/${cityConfig.slug}`,
    url: `https://www.declicparasites.fr/zones-intervention/${cityConfig.slug}`,
    telephone: site.phone.replace(/\s+/g, ""),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityConfig.name,
      postalCode: cityConfig.zipCodes[0],
      addressRegion: site.departement,
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: cityConfig.name,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: cityConfig.coordinates.lat,
      longitude: cityConfig.coordinates.lng,
    },
    itemReviewed: {
      "@type": "Thing",
      name: `Intervention anti-nuisibles à ${cityConfig.name}`,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: ["https://www.declicparasites.fr"],
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
        name: "Zones d'intervention",
        item: `${baseUrl}/zones-intervention`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityConfig.name,
        item: `${baseUrl}/zones-intervention/${cityConfig.slug}`,
      },
    ],
  };

  // --- CONSTRUCTION DU SCHEMA JSON-LD (FAQPage) ---
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Intervenez-vous rapidement à ${cityConfig.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, ${site.brand} intervient à ${cityConfig.name} (${cityConfig.zipCodes[0]}) et dans tout le Loiret. Nos techniciens sont basés localement et peuvent être sur place en environ ${cityConfig.travelTime}.`,
        },
      },
      {
        "@type": "Question",
        name: `Quels nuisibles traitez-vous à ${cityConfig.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Nous traitons tous types de nuisibles à ${cityConfig.name} : rats, souris, punaises de lit, cafards, blattes, guêpes, frelons asiatiques, puces et fourmis. Nous utilisons des méthodes agréées Certibiocide.`,
        },
      },
      {
        "@type": "Question",
        name: `Quel est le prix d'une dératisation à ${cityConfig.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Nos tarifs pour une intervention à ${cityConfig.name} débutent à partir de 89€. Le prix exact dépend du type de nuisible et de la surface à traiter. Le devis et le diagnostic sont gratuits.`,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessJsonLd,
            breadcrumbJsonLd,
            faqJsonLd,
          ]),
        }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1549744318-615e94c2ec5d?auto=format&fit=crop&w=2000&q=80"
          alt={`${cityConfig.name} - Zone d'intervention ${site.brand}`}
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          priority
          sizes="100vw"
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-accent" />
            Intervention à {cityConfig.zipCodes.join(", ")}
          </div>

          <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
            {site.brand} à {cityConfig.name}
          </h1>

          <p className="mt-6 text-pretty text-xl text-white/90 md:text-2xl">
            Experts Certibiocide pour la dératisation et la désinsectisation à{" "}
            <strong>{cityConfig.name}</strong>. Nos techniciens sont à environ{" "}
            <strong>{cityConfig.travelTime}</strong> de chez vous. Devis gratuit
            et suivi personnalisé.
            {heroIntroExtra && <> {heroIntroExtra}</>}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" data-cta={`zone-${cityConfig.slug}-form`}>
              <Button
                size="lg"
                className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90"
              >
                Demander un devis
              </Button>
            </Link>
            <a href={phoneHref} data-cta={`zone-${cityConfig.slug}-call`}>
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                {site.phone}
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, text: "Intervention Rapide" },
              { icon: ClockIcon, text: `~${cityConfig.travelTime} trajet` },
              { icon: Award, text: "98% satisfaits" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm"
              >
                <item.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS À [VILLE] */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <AnimatedSection className="space-y-6">
              <span className="text-sm font-bold uppercase tracking-widest text-accent">
                Expertise locale ({cityConfig.zipCodes[0]})
              </span>
              <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                Pourquoi nous confier votre intervention à {cityConfig.name} ?
              </h2>

              <p className="text-lg text-muted-foreground">{expertiseIntro}</p>

              <p className="text-base text-muted-foreground">{localDetails}</p>

              <div className="space-y-4">
                {[
                  {
                    icon: ClockIcon,
                    title: "Proximité et Réactivité",
                    desc: `Basés près d'Orléans, nous intervenons rapidement à ${cityConfig.name} (${cityConfig.travelTime} de route en moyenne).`,
                  },
                  {
                    icon: Shield,
                    title: "Traitements certifiés Certibiocide",
                    desc: "Protocoles respectant votre sécurité et l'environnement, adaptés à chaque contexte.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Diagnostic précis et suivi",
                    desc: "Recommandations personnalisées et contrôles inclus pour éviter toute récidive.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border-2 border-primary/20 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border-2 border-primary/20 bg-secondary/30 p-4 text-sm text-muted-foreground">
                <strong>Maillage local :</strong> Nous couvrons non seulement{" "}
                {cityConfig.name} mais aussi les communes directement voisines
                comme{" "}
                {nearbyCities
                  .slice(0, 3)
                  .map((c) => c.name)
                  .join(", ")}
                .
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="rounded-3xl border-2 border-primary/20 bg-white p-8 shadow-realistic">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Zone desservie
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {cityConfig.name}, {site.departement}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cityConfig.zipCodes.join(" / ")}
                    </p>
                  </div>
                </div>

                {cityConfig.neighborhoods &&
                  cityConfig.neighborhoods.length > 0 && (
                    <div className="mb-6">
                      <p className="mb-2 text-sm font-bold text-primary">
                        Principaux quartiers / lieux-dits :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cityConfig.neighborhoods.slice(0, 8).map((n) => (
                          <span
                            key={n}
                            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="space-y-3">
                  <a href={phoneHref} className="block">
                    <Button
                      size="lg"
                      className="h-14 w-full text-lg font-bold shadow-lg"
                    >
                      <Phone className="h-5 w-5" />
                      Appeler {site.phone}
                    </Button>
                  </a>
                  <Link href="/contact" className="block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 w-full border-2 border-primary text-lg font-bold text-primary hover:bg-primary hover:text-white"
                    >
                      Écrire un message
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NOS INTERVENTIONS */}
      <section className="bg-secondary/30 py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
              Nos interventions fréquentes à {cityConfig.name}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diagnostics complets, traitements adaptés et suivi pour éliminer
              durablement rats, souris, insectes et autres nuisibles.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlightedServices.map((service, i) => (
              <AnimatedSection key={service.slug} delay={0.05 * i}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="flex-1 text-sm text-muted-foreground">
                        {service.short}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                        Découvrir le service
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* CONTEXTE LOCAL / QUARTIERS & TYPES DE LIEUX */}
          <AnimatedSection className="mt-16 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                Situation et Risques à {cityConfig.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Chaque commune a ses particularités : type de bâti, proximité de
                la Loire, jardins, zones d&apos;activités... Voici quelques
                situations dans lesquelles nous intervenons très souvent ici.
              </p>
              <ul className="space-y-3">
                {typicalContexts.map((context, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{context}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-realistic">
              <h3 className="text-2xl font-bold text-primary">
                Intervention autour de {cityConfig.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Nos techniciens rayonnent également dans les communes limitrophes
                (Maillage Local) :
              </p>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/zones-intervention/${city.slug}`}
                  >
                    <span className="cursor-pointer rounded-full border border-primary/20 bg-secondary/40 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary font-bold text-primary hover:bg-primary hover:text-white"
              >
                Consulter tous nos services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
              Notre processus d&apos;intervention
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              De la prise de contact à la résolution complète
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Contact & diagnostic",
                desc: `Vous nous contactez. Nous nous déplaçons à ${cityConfig.name} pour un diagnostic gratuit et détaillé de votre situation.`,
              },
              {
                step: "2",
                title: "Traitement professionnel",
                desc: "Intervention discrète avec produits Certibiocide adaptés et sécurisés.",
              },
              {
                step: "3",
                title: "Suivi & garantie",
                desc: "Rapport avec photos, conseils de prévention et contrôles inclus jusqu'à résolution complète.",
              },
            ].map((item, i) => ( // Removed invalid 'i' key usage for 'key' prop on mapped elements within the array definition itself, moved to map output
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="relative h-full rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-realistic">
                  <div className="absolute -top-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-accent text-2xl font-bold text-white shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="mb-3 mt-6 text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-primary py-20 text-white">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <Zap className="mx-auto mb-6 h-16 w-16 text-accent" />

          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            Besoin d&apos;une intervention à {cityConfig.name} ?
          </h2>

          <p className="mt-6 text-xl text-white/90">
            Contactez notre équipe pour un diagnostic gratuit et un devis
            détaillé. Nous planifions avec vous une intervention rapide et
            efficace à {cityConfig.name}.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href={phoneHref} data-cta={`zone-${cityConfig.slug}-final-call`}>
              <Button
                size="lg"
                className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90"
              >
                <Phone className="h-5 w-5" />
                Appeler {site.phone}
              </Button>
            </a>
            <Link
              href="/contact"
              data-cta={`zone-${cityConfig.slug}-final-form`}
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


