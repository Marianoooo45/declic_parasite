import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { slugify } from "@/lib/slug";

const title = `Zones d’intervention – ${site.brand}`;
const description = `Interventions antiparasitaires à ${site.city} et dans le ${site.departement} : ${site.serviceArea.join(", ")}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.declicparasites.fr/zones-intervention" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    url: "https://www.declicparasites.fr/zones-intervention",
  },
};

export default function ZonesPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden pb-16 pt-28 text-white">
        <Image
          src="/hero-texture.svg"
          alt="Carte des zones d'intervention"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Zones d&apos;intervention {site.brand}
          </h1>
          <p className="mt-4 text-pretty text-lg text-white/85">
            Intervention rapide à <strong>{site.city}</strong> et dans le <strong>{site.departement}</strong>. Déplacement sous 24–48h avec devis gratuit et suivi personnalisé.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="inline-flex">
              <Button className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/30 hover:bg-accent/90">
                Demander un devis
              </Button>
            </Link>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex">
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

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold text-primary">Communes desservies</h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Nous couvrons toutes les communes autour de {site.city}. Sélectionnez votre ville pour accéder aux informations détaillées et planifier une intervention rapide.
            </p>
          </AnimatedSection>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {site.serviceArea.map((v, index) => (
              <AnimatedSection key={v} delay={0.02 * index}>
                <Link href={`/zones-intervention/${slugify(v)}`}>
                  <Card className="h-full rounded-2xl border border-primary/10 bg-white/95 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="text-lg font-semibold text-primary">{v}</div>
                    <div className="text-sm text-muted-foreground">Déplacement sous 24h</div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center text-sm text-muted-foreground">
            Vous ne voyez pas votre commune ? Nous intervenons sur l&apos;ensemble du Loiret.
            {" "}
            <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
              Contactez-nous
            </Link>
            .
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
