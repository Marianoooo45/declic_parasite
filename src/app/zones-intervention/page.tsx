import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { slugify } from "@/lib/slug";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: `Zones d'intervention | ${site.brand} à ${site.city}`,
  description: `Interventions antiparasitaires à ${site.city} et dans le ${site.departement} : ${site.serviceArea.join(", ")}.`,
  alternates: { canonical: "https://www.declicparasites.fr/zones-intervention" },
  openGraph: {
    title: `Zones d'intervention – ${site.brand}`,
    description: `Couverture : ${site.serviceArea.join(", ")}.`,
    type: "website",
    locale: "fr_FR",
  },
};

export default function ZonesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://ext.same-assets.com/3682338552/2516073472.jpeg"
            alt="Zones d'intervention"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Zones d’intervention – {site.brand}
          </h1>
          <p className="text-white/90 max-w-3xl">
            Intervention rapide à <strong>{site.city}</strong> et dans le{" "}
            <strong>{site.departement}</strong>. Devis gratuit, passage sous 24–48h.
          </p>
          <div className="mt-6">
            <Link href="/#contact">
              <Button className="bg-primary hover:bg-primary/90">Demander une intervention</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Liste des villes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Communes desservies</h2>
          <p className="text-gray-600 mb-8">
            Nous couvrons les principales communes autour de {site.city}. Cliquez sur votre ville pour les informations détaillées.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {site.serviceArea.map((v) => (
              <Link key={v} href={`/zones-intervention/${slugify(v)}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="font-semibold">{v}</div>
                  <div className="text-sm text-gray-600">Déplacement sous 24h</div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-sm text-gray-600">
            Vous ne voyez pas votre commune ? Nous intervenons partout dans le Loiret.{" "}
            <Link href="/#contact" className="text-primary underline">Contactez-nous</Link>.
          </div>
        </div>
      </section>
    </main>
  );
}
