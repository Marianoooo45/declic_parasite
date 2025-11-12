import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { ArrowRight, EyeOff, Handshake, LifeBuoy, MapPin, PhoneCall, ShieldCheck, Timer } from "lucide-react";

export const revalidate = 86400;

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden">
        <Image
          src="/services/deratisation.svg"
          alt="Intervention de désinsectisation"
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2616]/95 via-[#1d4e2b]/85 to-[#154225]/80" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-28 text-white md:flex-row md:items-center md:py-36">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {site.brand}
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Protégez votre habitat des nuisibles avec un artisan certifié à {site.city}
            </h1>
            <p className="text-pretty text-lg text-white/85 md:text-xl">
              Intervention de dératisation, désinsectisation et désinfection sur tout le {site.departement}. Diagnostic précis, produits Certibiocide et suivi personnalisé jusqu&apos;à la disparition complète des nuisibles.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              {site.serviceArea.slice(0, 5).map((zone) => (
                <span key={zone} className="rounded-full border border-white/30 px-3 py-1">
                  {zone}
                </span>
              ))}
              {site.serviceArea.length > 5 ? (
                <Link
                  href="/zones-intervention"
                  className="inline-flex items-center rounded-full border border-white/40 px-3 py-1 text-white transition hover:bg-white/10"
                >
                  + {site.serviceArea.length - 5} autres villes
                </Link>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex">
                <Button size="lg" className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-accent/90">
                  Devis gratuit
                </Button>
              </Link>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex" data-cta="hero-call">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/60 bg-white/10 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/20"
                >
                  <PhoneCall className="h-5 w-5" /> Appeler maintenant
                </Button>
              </a>
            </div>
          </div>
          <AnimatedSection className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Pourquoi {site.brand} ?</p>
                <p className="mt-3 text-lg text-white/85">
                  Intervention sous 24–48h, protocole Certibiocide et rapport complet pour particuliers, commerces et collectivités.
                </p>
              </div>
              <div className="grid gap-4 text-sm">
                {["Diagnostic précis sur site", "Méthodes raisonnées & sécurisées", "Suivi client jusqu&apos;à la résolution"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-white">
                Découvrir nos prestations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection id="engagements" className="mx-auto w-full max-w-6xl px-6">
        <div className="space-y-12 rounded-3xl border border-primary/10 bg-white/80 p-10 shadow-xl backdrop-blur">
          <div className="space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">Nos engagements</span>
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">Un service local haut de gamme et rassurant</h2>
            <p className="mx-auto max-w-3xl text-pretty text-base text-muted-foreground">
              Nous accompagnons particuliers, copropriétés et professionnels avec des méthodes éprouvées, un suivi transparent et des interventions discrètes à {site.city} et dans les communes voisines.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Réactivité 24–48h",
                description: "Prise en charge immédiate, créneaux d&apos;urgence selon la gravité.",
                icon: Timer,
              },
              {
                title: "Discrétion totale",
                description: "Véhicules banalisés, confidentialité absolue pour votre sérénité.",
                icon: EyeOff,
              },
              {
                title: "Résultat garanti",
                description: "Méthodes Certibiocide, contrôles inclus et ajustements gratuits.",
                icon: ShieldCheck,
              },
              {
                title: "Suivi client dédié",
                description: "Un interlocuteur unique qui vous accompagne avant, pendant et après.",
                icon: Handshake,
              },
            ].map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={0.1 * index}
                className="flex h-full flex-col gap-4 rounded-3xl border border-primary/10 bg-white p-6 text-left shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">Nos services</span>
          <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">Solutions antiparasitaires sur-mesure</h2>
          <p className="mx-auto max-w-3xl text-pretty text-base text-muted-foreground">
            Dératisation, traitement des insectes, désinfection et contrats HACCP : nous adaptons nos protocoles à votre habitation ou à votre activité avec des produits professionnels sécurisés.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <AnimatedSection
              key={service.slug}
              delay={0.05 * index}
              className="group h-full rounded-3xl border border-primary/10 bg-white/90 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex h-full flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.short}</p>
                </div>
                {service.priceFrom ? (
                  <p className="text-sm font-semibold text-accent">
                    À partir de {euroFormatter.format(service.priceFrom)}
                  </p>
                ) : null}
                <div className="mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    data-cta="home-service-card"
                  >
                    Découvrir <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center md:flex-row">
          <Link href="/services" className="inline-flex">
            <Button className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90">
              Consulter toutes nos prestations
            </Button>
          </Link>
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex" data-cta="services-call-banner">
            <Button
              variant="outline"
              className="rounded-full border-primary/20 bg-white px-8 py-3 text-base font-semibold text-primary shadow-md hover:bg-primary/10"
            >
              <PhoneCall className="h-5 w-5" /> {site.phone}
            </Button>
          </a>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-2xl">
          <div className="grid gap-8 p-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                Zones d&apos;intervention
              </span>
              <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                Présents à {site.city} et dans tout le {site.departement}
              </h2>
              <p className="text-pretty text-base text-white/80">
                Nous intervenons dans les principales communes du Loiret : {site.serviceArea.slice(0, 6).join(", ")}... et bien d&apos;autres. Un technicien local vous accompagne pour un diagnostic rapide sur place.
              </p>
              <Link
                href="/zones-intervention"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary shadow-lg transition hover:bg-accent hover:text-accent-foreground"
              >
                Voir les villes couvertes <MapPin className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-white/85">
              <p className="font-semibold uppercase tracking-[0.3em] text-white/70">Processus en 3 étapes</p>
              <ul className="mt-4 space-y-4">
                {["Diagnostic précis sur site", "Traitement ciblé et sécurisé", "Suivi jusqu&apos;à la résolution"].map((step) => (
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
