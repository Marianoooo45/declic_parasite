import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { slugify } from "@/lib/slug";
import { ArrowRight, Award, CheckCircle2, Clock, MapPin, Phone, Shield, Zap } from "lucide-react";

const baseUrl = "https://www.declicparasites.fr";
const zoneEntries = site.serviceArea.map((city) => ({ city, slug: slugify(city) }));

export const revalidate = 86400;

export function generateStaticParams() {
  return zoneEntries.map((zone) => ({ slug: zone.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = zoneEntries.find((item) => item.slug === slug);

  if (!zone) return { title: site.brand };

  const highlightedServices = services.slice(0, 4).map((service) => service.title.toLowerCase());
  const title = `Dératisation & désinsectisation à ${zone.city} | ${site.brand}`;
  const description = `${site.brand} se déplace à ${zone.city} et dans tout le ${site.departement} pour lutter contre les nuisibles : ${highlightedServices.join(", ")}... Intervention rapide 24–48h et devis gratuit.`;
  const url = `${baseUrl}/zones-intervention/${zone.slug}`;

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
  const zone = zoneEntries.find((item) => item.slug === slug);

  if (!zone) notFound();

  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const highlightedServices = services.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1549744318-615e94c2ec5d?auto=format&fit=crop&w=2000&q=80"
          alt={`${zone.city} - Zone d'intervention ${site.brand}`}
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-accent" />
            Zone d'intervention
          </div>
          
          <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
            {site.brand} à {zone.city}
          </h1>
          
          <p className="mt-6 text-pretty text-xl text-white/90 md:text-2xl">
            Experts Certibiocide pour la dératisation et la désinsectisation à{" "}
            <strong>{zone.city}</strong>. Intervention sous 24–48h dans tout le{" "}
            <strong>{site.departement}</strong>, devis gratuit et suivi personnalisé.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" data-cta={`zone-${zone.slug}-form`}>
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                Demander un devis
              </Button>
            </Link>
            <a href={phoneHref} data-cta={`zone-${zone.slug}-call`}>
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
              { icon: Zap, text: "Intervention 24-48h" },
              { icon: Shield, text: "Certibiocide" },
              { icon: Award, text: "98% satisfaits" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
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
                Expertise locale
              </span>
              <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                Pourquoi nous confier votre intervention à {zone.city} ?
              </h2>
              
              <p className="text-lg text-muted-foreground">
                {site.brand} accompagne les particuliers, syndics et professionnels dans le{" "}
                {site.departement}. Notre équipe locale intervient à {zone.city} avec du matériel 
                professionnel, un protocole précis et un suivi après passage jusqu'à la résolution complète.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Intervention rapide sous 24–48h",
                    desc: "Prise en charge immédiate, créneaux d'urgence selon la gravité de la situation."
                  },
                  {
                    icon: Shield,
                    title: "Traitements certifiés Certibiocide",
                    desc: "Protocoles respectant votre sécurité et l'environnement, adaptés à chaque contexte."
                  },
                  {
                    icon: CheckCircle2,
                    title: "Diagnostic précis et suivi",
                    desc: "Recommandations personnalisées et contrôles inclus pour éviter toute récidive."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border-2 border-primary/20 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-primary">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="rounded-xl border-2 border-primary/20 bg-secondary/30 p-4 text-sm text-muted-foreground">
                <strong>Nous couvrons également les communes voisines :</strong>{" "}
                {site.serviceArea.filter((city) => city !== zone.city).slice(0, 8).join(", ")}...
              </p>
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
                      {zone.city}, {site.departement}
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Inspection, diagnostic et plan d'action détaillé avant tout traitement</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Intervention discrète, matériel professionnel et produits réglementés</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>Compte rendu complet et conseils de prévention personnalisés</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={phoneHref} className="block">
                    <Button size="lg" className="h-14 w-full text-lg font-bold shadow-lg">
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
              Nos interventions fréquentes à {zone.city}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diagnostics complets, traitements adaptés et suivi pour éliminer durablement 
              rats, souris, insectes et nuisibles.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlightedServices.map((service, i) => (
              <AnimatedSection key={service.slug} delay={0.05 * i}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
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
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="flex-1 text-sm text-muted-foreground">{service.short}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        Découvrir le service
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-primary font-bold text-primary hover:bg-primary hover:text-white">
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
              Notre processus d'intervention
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              De la prise de contact à la résolution complète
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Contact & Diagnostic",
                desc: `Vous nous contactez. Nous nous déplaçons à ${zone.city} pour un diagnostic gratuit et détaillé de votre situation.`
              },
              {
                step: "2",
                title: "Traitement professionnel",
                desc: "Intervention discrète avec produits Certibiocide adaptés. Protocole sur-mesure selon le type de nuisible."
              },
              {
                step: "3",
                title: "Suivi & Garantie",
                desc: "Rapport avec photos, conseils prévention et contrôles inclus jusqu'à résolution complète du problème."
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className="relative h-full rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-realistic">
                  <div className="absolute -top-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-accent text-2xl font-bold text-white shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="mb-3 mt-6 text-xl font-bold text-primary">{item.title}</h3>
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
            Besoin d'une intervention à {zone.city} ?
          </h2>
          
          <p className="mt-6 text-xl text-white/90">
            Contactez notre équipe pour un diagnostic gratuit et un devis détaillé. 
            Nous planifions avec vous une intervention rapide et efficace.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href={phoneHref} data-cta={`zone-${zone.slug}-final-call`}>
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                <Phone className="h-5 w-5" />
                Appeler {site.phone}
              </Button>
            </a>
            <Link href="/contact" data-cta={`zone-${zone.slug}-final-form`}>
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