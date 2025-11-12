import { site } from "@/config/site";
import { slugify } from "@/lib/slug";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Check, Phone, Shield, Leaf, Clock, ArrowRight } from "lucide-react";

export const revalidate = 86400; // 24h

// --- data helpers ---
const allCities = site.serviceArea.map((name) => ({
  name,
  slug: slugify(name),
}));

function getCity(slug: string) {
  return allCities.find((c) => c.slug === slug);
}

export async function generateStaticParams() {
  return allCities.map((c) => ({ slug: c.slug }));
}

// ⚠️ Next 15: params peut être un Promise — on l'attend
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug)?.name ?? site.city;
  const title = `Dératisation & désinsectisation à ${city} | ${site.brand}`;
  const description = `${site.brand} intervient à ${city} et dans le ${site.departement} : rats, souris, cafards, punaises de lit, frelons. Devis gratuit, intervention 24–48h.`;
  const url = `https://www.declicparasites.fr/zones-intervention/${slug}`;

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

export default async function CityPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const city = getCity(slug);
  const cityName = city?.name ?? site.city;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Lutte antiparasitaire",
    areaServed: cityName,
    provider: {
      "@type": "LocalBusiness",
      name: site.brand,
      telephone: site.phone.replace(/\s+/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.split(",")[0],
        addressLocality: site.city,
        postalCode: "45000",
        addressCountry: "FR",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations nuisibles",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dératisation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Punaises de lit" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cafards" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Guêpes / frelons" } },
      ],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.declicparasites.fr/" },
      { "@type": "ListItem", position: 2, name: "Zones d'intervention", item: "https://www.declicparasites.fr/zones-intervention" },
      { "@type": "ListItem", position: 3, name: cityName, item: `https://www.declicparasites.fr/zones-intervention/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero ville */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://ext.same-assets.com/3682338552/1387163323.jpeg"
            alt={`Intervention antiparasitaire à ${cityName}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4">
          <nav className="text-white/80 mb-4 text-sm">
            <Link href="/" className="hover:underline">Accueil</Link> <span className="mx-1">/</span>
            <Link href="/zones-intervention" className="hover:underline">Zones d&apos;intervention</Link> <span className="mx-1">/</span>
            <span className="text-white">{cityName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {site.brand} – {cityName}
          </h1>
          <p className="text-white/90 max-w-3xl">
            Dératisation, désinsectisation et prévention à {cityName}. Intervention rapide sous 24–48h, devis gratuit.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/#contact"><Button className="bg-primary hover:bg-primary/90">Demander un devis</Button></Link>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <Phone className="h-4 w-4 mr-2" /> {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contenu SEO */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Texte principal */}
          <article className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Nos prestations à {cityName}</h2>
            <p className="text-gray-700 mb-4">
              {site.brand} intervient à {cityName} et dans tout le {site.departement} pour éliminer
              rats, souris, cafards, punaises de lit, guêpes et frelons. Nos techniciens certifiés
              réalisent un diagnostic précis, appliquent un traitement adapté et vous donnent des
              conseils de prévention pour éviter les réinfestations.
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              {[
                "Diagnostic et devis gratuits",
                "Produits homologués, méthodes raisonnées",
                "Passage sous 24–48h selon urgence",
                "Suivi et garantie de résultat",
              ].map((t, i) => (
                <li key={i} className="flex gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Dératisation", desc: "Rats, souris : appâts sécurisés, colmatage, prévention." },
                { title: "Punaises de lit", desc: "Traitement complet + suivi jusqu’à éradication." },
                { title: "Cafards / blattes", desc: "Gel, pulvérisation ciblée et conseils d’hygiène." },
                { title: "Guêpes / frelons", desc: "Destruction de nids en façade, toiture, jardin." },
              ].map((s, i) => (
                <Card key={i} className="p-4">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.desc}</div>
                </Card>
              ))}
            </div>
          </article>

          {/* Encadré contact / zone */}
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="font-semibold">Zone couverte</div>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                {site.serviceArea.join(", ")}.
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Certibiocide & HACCP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span>Méthodes raisonnées</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Intervention 24–48h</span>
                </div>
              </div>

              <div className="mt-5">
                <Link href="/#contact">
                  <Button className="w-full">Demander un devis</Button>
                </Link>
              </div>
              <div className="mt-3">
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" /> {site.phone}
                  </Button>
                </a>
              </div>

              <div className="mt-6 text-xs text-gray-600">
                Besoin d’une autre commune ?{" "}
                <Link href="/zones-intervention" className="text-primary underline inline-flex items-center">
                  Voir toutes les zones <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
