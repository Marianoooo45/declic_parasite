import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { ArrowRight, Eye, LifeBuoy, ShieldCheck, Sprout, Timer } from "lucide-react";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const metadata: Metadata = {
  title: `Services | ${site.brand}`,
  description:
    "Catalogue des prestations de dératisation, désinsectisation et prévention de Déclic Parasites à Orléans. Interventions rapides sous 24–48h, devis gratuit.",
  openGraph: {
    title: `Services | ${site.brand}`,
    description:
      "Découvrez toutes nos prestations professionnelles de lutte antiparasitaire à Orléans et dans le Loiret.",
    type: "website",
    url: "https://www.declicparasites.fr/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2919]/95 via-[#1d4e2b]/85 to-[#154225]/80" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white md:px-8 lg:px-12">
          <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Prestations professionnelles
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Nos services de dératisation, désinsectisation et prévention nuisibles
          </h1>
          <p className="mt-6 text-pretty text-lg text-white/85">
            Diagnostics précis, interventions rapides et protocoles sur mesure pour protéger vos logements, commerces et collectivités dans tout le {site.departement}.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/contact" className="inline-flex" data-cta="services-quote">
              <Button className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/30 hover:bg-accent/90">
                Demander un devis gratuit
              </Button>
            </Link>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="inline-flex"
              data-cta="services-call"
            >
              <Button
                variant="outline"
                className="rounded-full border-white/60 bg-white/10 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/20"
              >
                {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.slug}
                delay={0.05 * index}
                className="group flex h-full min-h-[25rem] flex-col rounded-3xl border border-primary/10 bg-white/95 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 p-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-primary">{service.title}</h2>
                    <p className="text-sm text-muted-foreground">{service.short}</p>
                  </div>
                  {service.priceFrom ? (
                    <p className="text-sm font-semibold text-accent">
                      À partir de {euroFormatter.format(service.priceFrom)}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                      data-cta="services-card"
                    >
                      Découvrir le service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
        <div className="rounded-3xl border border-primary/10 bg-white/90 p-10 shadow-xl md:p-14">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
                Pourquoi choisir {site.brand} ?
              </h2>
              <p className="text-pretty text-base text-muted-foreground">
                Artisan local certifié Certibiocide, nous combinons expertise technique, suivi personnalisé et transparence pour garantir un résultat durable.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[{
                title: "Certibiocide & HACCP",
                description: "Conformité réglementaire pour particuliers et professionnels.",
                icon: ShieldCheck,
              },
              {
                title: "Méthodes raisonnées",
                description: "Solutions ciblées et compatibles enfants & animaux.",
                icon: Sprout,
              },
              {
                title: "Suivi documenté",
                description: "Rapports détaillés, photos et conseils personnalisés.",
                icon: Eye,
              },
              {
                title: "Intervention 24–48h",
                description: "Techniciens basés à {site.city} pour une réactivité maximale.",
                icon: Timer,
              }].map((item, index) => (
                <AnimatedSection
                  key={item.title}
                  delay={0.08 * index}
                  className="rounded-2xl border border-primary/10 bg-secondary/60 p-5 text-sm shadow-sm"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <item.icon className="h-5 w-5" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto mt-20 w-full max-w-5xl px-4 md:px-8 lg:px-12">
        <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-2xl">
          <div className="grid gap-8 p-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                Accompagnement premium
              </span>
              <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                Besoin d&apos;un plan d&apos;action immédiat ?
              </h2>
              <p className="text-pretty text-base text-white/80">
                Expliquez-nous votre situation, un technicien vous rappelle sous une heure ouvrée avec les premières recommandations et un devis gratuit.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="inline-flex" data-cta="services-final-cta">
                  <Button className="rounded-full bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition hover:bg-accent hover:text-accent-foreground">
                    Contact express
                  </Button>
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="inline-flex"
                  data-cta="services-final-call"
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-white/20"
                  >
                    {site.phone}
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-white/85">
              <p className="font-semibold uppercase tracking-[0.35em] text-white/70">Processus en 3 étapes</p>
              <ul className="mt-4 space-y-4">
                {["Diagnostic sur site", "Traitement ciblé et sécurisé", "Suivi jusqu&apos;à la résolution"].map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <LifeBuoy className="mt-1 h-5 w-5 text-accent" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
