import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { ArrowRight, Leaf, Shield, ShieldCheck, Timer } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Nos services
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Diagnostics précis, traitements ciblés et prévention durable contre les nuisibles. Interventions rapides à {site.city} et dans tout le {site.departement}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  data-cta="services-quote"
                >
                  Demander un devis
                </Button>
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="inline-flex"
                data-cta="services-call"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white hover:bg-white/10"
                >
                  Appeler {site.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.slug}
                className="group flex h-full flex-col overflow-hidden border border-gray-200/80 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="heading-balance text-xl font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                  {service.priceFrom ? (
                    <p className="mt-4 text-sm font-semibold text-primary">
                      À partir de {euroFormatter.format(service.priceFrom)}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
                      data-cta="services-card"
                    >
                      Découvrir le service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="heading-balance mb-10 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Pourquoi choisir {site.brand} ?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Certibiocide à jour",
                description: "Techniciens formés en continu aux dernières normes.",
                icon: ShieldCheck,
              },
              {
                title: "Approche raisonnée",
                description: "Priorité aux solutions ciblées et respectueuses.",
                icon: Leaf,
              },
              {
                title: "Sécurité maximale",
                description: "Procédures strictes et rapports détaillés.",
                icon: Shield,
              },
              {
                title: "Intervention 24–48h",
                description: "Disponibilité rapide sur tout le Loiret.",
                icon: Timer,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="flex h-full flex-col items-center justify-center gap-3 border border-gray-200/70 bg-white p-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="heading-balance text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 overflow-hidden rounded-3xl bg-slate-900 p-8 text-white md:grid-cols-2 md:p-12">
            <div>
              <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                Devis gratuit sous 24h
              </h2>
              <p className="mt-4 text-white/80">
                Expliquez-nous votre situation, un technicien vous rappelle rapidement avec un plan d&apos;action personnalisé et un devis gratuit.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  data-cta="services-final-cta"
                >
                  Demander un devis gratuit
                </Button>
              </Link>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="inline-flex"
                data-cta="services-final-call"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white hover:bg-white/10"
                >
                  {site.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
