import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { slugify } from "@/lib/slug";
import { ArrowRight, Check, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";

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
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden pb-20 pt-32 text-white">
        <Image src="/hero-texture.svg" alt="Texture de fond" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Zone d&apos;intervention</span>
          <h1 className="text-balance pt-4 text-4xl font-semibold leading-tight md:text-5xl">
            {site.brand} à {zone.city}
          </h1>
          <p className="mt-5 text-pretty text-lg text-white/85">
            Experts Certibiocide pour la dératisation et la désinsectisation à <strong>{zone.city}</strong>. Intervention sous
            24–48h dans tout le <strong>{site.departement}</strong>, devis gratuit et suivi personnalisé.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex">
              <Button className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/40 transition hover:bg-accent/90">
                Demander un devis
              </Button>
            </Link>
            <a href={phoneHref} className="inline-flex">
              <Button variant="outline" className="rounded-full border-white/60 bg-white/10 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-white/20">
                <Phone className="mr-2 h-4 w-4" /> {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <AnimatedSection className="space-y-6">
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
              Pourquoi nous confier votre intervention à {zone.city} ?
            </h2>
            <p className="text-pretty text-base text-muted-foreground">
              {site.brand} accompagne les particuliers, syndics et professionnels dans le {site.departement}. Notre équipe locale
              intervient à {zone.city} avec du matériel professionnel, un protocole précis et un suivi après passage jusqu&apos;à la
              résolution complète.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">
                  <Clock className="h-4 w-4" />
                </span>
                Intervention rapide sous 24–48h, adaptée à l&apos;urgence de la situation.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                Traitements certifiés Certibiocide respectant votre sécurité et l&apos;environnement.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-primary/10 p-1 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                Diagnostic précis, recommandations et suivi pour éviter toute récidive.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Nous couvrons également les communes voisines : {site.serviceArea.filter((city) => city !== zone.city).join(", ")}
              .
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:justify-self-end">
            <Card className="space-y-6 rounded-3xl border border-primary/15 bg-white/90 p-8 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 p-2 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Zone desservie</p>
                  <p className="text-lg font-semibold text-primary">{zone.city}, {site.departement}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Inspection, diagnostic et plan d&apos;action détaillé avant tout traitement.</p>
                <p>Intervention discrète, matériel professionnel et produits réglementés.</p>
                <p>Compte rendu complet et conseils de prévention personnalisés.</p>
              </div>
              <div className="space-y-3">
                <a href={phoneHref} className="inline-flex w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Phone className="mr-2 h-4 w-4" /> Appeler {site.phone}
                  </Button>
                </a>
                <Link href="/contact" className="inline-flex w-full">
                  <Button variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary/10">
                    Écrire un message
                  </Button>
                </Link>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold text-primary">Nos interventions fréquentes</h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Diagnostics complets, traitements adaptés et suivi pour éliminer durablement rats, souris, insectes et nuisibles à {zone.city}.
            </p>
          </AnimatedSection>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlightedServices.map((service) => (
              <AnimatedSection key={service.slug} className="h-full">
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col justify-between rounded-2xl border border-primary/10 bg-white/95 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                    </div>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                      Découvrir le service <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
              Tous nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <AnimatedSection className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-primary/10 bg-white px-8 py-10 text-center shadow-lg md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-primary md:text-3xl">Besoin d&apos;une intervention à {zone.city} ?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Contactez notre équipe pour un diagnostic gratuit et un devis détaillé. Nous planifions avec vous une intervention rapide et efficace.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={phoneHref} className="inline-flex">
              <Button className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-4 w-4" /> {site.phone}
              </Button>
            </a>
            <Link href="/contact" className="inline-flex">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                Demander un devis
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
