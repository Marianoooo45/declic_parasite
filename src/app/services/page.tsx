import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { ArrowRight, Award, Clock, Phone, Shield, Sprout, Zap } from "lucide-react";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const metadata: Metadata = {
  title: `Services | ${site.brand}`,
  description:
    "Catalogue des prestations de dératisation, désinsectisation et prévention de Déclic Parasites à Orléans. Interventions rapides sous 24–48h, devis gratuit.",
  alternates: {
    canonical: "https://www.declicparasites.fr/services",
  },
  openGraph: {
    title: `Services | ${site.brand}`,
    description:
      "Découvrez toutes nos prestations professionnelles de lutte antiparasitaire à Orléans et dans le Loiret.",
    type: "website",
    url: "https://www.declicparasites.fr/services",
  },
};

export default function ServicesPage() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
          alt="Technicien professionnel en intervention"
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          priority
          sizes="100vw"
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <AnimatedSection className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Award className="h-4 w-4 text-accent" />
            Prestations professionnelles certifiées
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
              Nos services anti-nuisibles
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mt-6 text-pretty text-xl text-white/90 md:text-2xl">
              Diagnostics précis, interventions rapides et protocoles sur mesure pour protéger
              vos logements, commerces et collectivités dans tout le {site.departement}.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={phoneHref} data-cta="services-hero-call">
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                <Phone className="h-5 w-5" />
                {site.phone}
              </Button>
            </a>
            <Link href="/contact" data-cta="services-hero-form">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                Demander un devis gratuit
              </Button>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, text: "Intervention 24-48h" },
              { icon: Shield, text: "Certibiocide" },
              { icon: Clock, text: "Devis sous 1h" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <item.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* GRID SERVICES */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <AnimatedSection className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">Nos interventions</span>
            <h2 className="mt-3 text-balance text-4xl font-bold text-primary md:text-5xl">
              Expertise complète anti-nuisibles
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Chaque prestation inclut diagnostic gratuit, traitement professionnel,
              rapport détaillé et suivi personnalisé jusqu'à résolution complète.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.slug}
                delay={0.05 * index}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {service.priceFrom && (
                        <div className="absolute right-4 top-4 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white shadow-lg">
                          dès {euroFormatter.format(service.priceFrom)}
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.short}
                      </p>

                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                          Découvrir
                          <ArrowRight className="h-4 w-4" />
                        </span>
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <AnimatedSection className="bg-secondary/30 py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
              Pourquoi choisir {site.brand} ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Artisan local certifié, expertise technique et transparence totale
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Certibiocide & HACCP",
                desc: "Conformité réglementaire pour particuliers et professionnels. Protocoles adaptés à chaque contexte.",
              },
              {
                icon: Sprout,
                title: "Méthodes raisonnées",
                desc: "Solutions ciblées, produits maîtrisés et compatibles avec la présence d'enfants et animaux.",
              },
              {
                icon: Award,
                title: "Suivi documenté",
                desc: "Rapports détaillés avec photos, conseils prévention et traçabilité complète des interventions.",
              },
              {
                icon: Zap,
                title: "Intervention 24-48h",
                desc: "Techniciens basés à Orléans pour une réactivité maximale sur tout le Loiret.",
              }
            ].map((item, index) => (
              <AnimatedSection key={index} delay={0.08 * index}>
                <div className="h-full rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <AnimatedSection className="overflow-hidden rounded-3xl bg-gradient-primary text-white shadow-2xl">
            <div className="grid gap-8 p-10 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-accent" />
                  Accompagnement premium
                </div>

                <h2 className="text-balance text-4xl font-bold md:text-5xl">
                  Besoin d'un plan d'action immédiat ?
                </h2>

                <p className="text-pretty text-lg text-white/90">
                  Expliquez-nous votre situation, un technicien vous rappelle sous une heure
                  ouvrée avec les premières recommandations et un devis gratuit adapté.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/contact" data-cta="services-final-form">
                    <Button size="lg" className="h-14 bg-white px-8 font-bold text-primary shadow-xl hover:bg-accent hover:text-white">
                      Contact express
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <a href={phoneHref} data-cta="services-final-call">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 border-2 border-white bg-white/10 px-8 font-bold text-white backdrop-blur-sm hover:bg-white/20"
                    >
                      <Phone className="h-5 w-5" />
                      {site.phone}
                    </Button>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white/80">
                  Processus en 3 étapes
                </p>
                <ul className="space-y-4">
                  {[
                    "Diagnostic sur site gratuit",
                    "Traitement ciblé et sécurisé",
                    "Suivi jusqu'à résolution"
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold">
                        {i + 1}
                      </div>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}