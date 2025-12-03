import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { slugify } from "@/lib/slug";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Shield,
  Zap,
} from "lucide-react";

const baseUrl = "https://www.declicparasites.fr";

// --- CONFIG PAR VILLE (texte local + communes voisines) ---

type ZoneConfig = {
  heroIntroExtra?: string;
  expertiseIntro?: string;
  localDetails?: string;
  nearbyCommunes?: string[];
  typicalContexts?: string[];
};

// Liste large de communes dans le rayon ~20 km
const genericNearbyCommunes: string[] = [
  // Métropole d'Orléans
  "Orléans",
  "Saint-Jean-de-la-Ruelle",
  "Saint-Jean-de-Braye",
  "Saint-Jean-le-Blanc",
  "Saint-Pryvé-Saint-Mesmin",
  "Fleury-les-Aubrais",
  "Saran",
  "Ingré",
  "La Chapelle-Saint-Mesmin",
  "Olivet",
  "Saint-Cyr-en-Val",
  "Saint-Denis-en-Val",
  "Saint-Hilaire-Saint-Mesmin",
  "Chécy",
  "Boigny-sur-Bionne",
  "Semoy",
  "Chanteau",
  "Combleux",
  "Bou",
  "Marigny-les-Usages",
  "Ormes",
  // Autres communes dans un rayon ~20km
  "Chaingy",
  "Saint-Ay",
  "Mareau-aux-Prés",
  "Mézières-lez-Cléry",
  "Ardon",
  "Sandillon",
  "Donnery",
  "Darvoy",
  "Vennecy",
  "Mardié",
  "Bucy-Saint-Liphard",
];

// 🔥 MASTER LIST : toutes les villes pour lesquelles on veut une vraie page
// => union de site.serviceArea + genericNearbyCommunes
export const zoneEntries = Array.from(
  new Set<string>([...site.serviceArea, ...genericNearbyCommunes]),
).map((city) => ({
  city,
  slug: slugify(city),
}));

const zoneConfigs: Record<string, ZoneConfig> = {
  // --- ORLÉANS ---
  Orléans: {
    heroIntroExtra:
      " Basés à Orléans, nous connaissons parfaitement les immeubles du centre historique, les caves en pierre, les bords de Loire et les quartiers résidentiels récents.",
    expertiseIntro:
      "À Orléans, les infestations se concentrent souvent dans les caves humides de l’hyper-centre, les greniers des maisons de ville et les locaux professionnels à forte rotation. Nous adaptons nos traitements à ces contraintes urbaines pour protéger durablement votre logement ou votre commerce.",
    localDetails:
      "Nos techniciens interviennent régulièrement dans les quartiers Dunois, Saint-Marceau, Madeleine, Carmes, Argonne, La Source et les zones d’activités. Chaque intervention tient compte de la configuration des lieux (cave, cour intérieure, parties communes, grenier, restaurant, bureaux…).",
    nearbyCommunes: [
      "Saint-Jean-de-la-Ruelle",
      "Saint-Jean-le-Blanc",
      "Saint-Jean-de-Braye",
      "Saint-Pryvé-Saint-Mesmin",
      "Fleury-les-Aubrais",
      "Saran",
      "Ingré",
      "La Chapelle-Saint-Mesmin",
      "Olivet",
      "Saint-Denis-en-Val",
      "Saint-Cyr-en-Val",
      "Semoy",
      "Chécy",
      "Boigny-sur-Bionne",
      "Combleux",
      "Chanteau",
    ],
    typicalContexts: [
      "Immeubles anciens avec caves en pierre et réseaux de gaines techniques",
      "Commerces de bouche (restaurants, boulangeries, bars) en centre-ville",
      "Locaux professionnels, agences et bureaux en rez-de-chaussée",
      "Maisons de ville avec jardins intérieurs et dépendances",
    ],
  },

  // --- OLIVET ---
  Olivet: {
    heroIntroExtra:
      " À Olivet, nos interventions tiennent compte des berges du Loiret, des jardins arborés et des nombreux pavillons familiaux.",
    expertiseIntro:
      "À Olivet, les rongeurs et insectes profitent des berges du Loiret, des jardins arborés et des habitats mitoyens pour se déplacer facilement. Nos traitements sont pensés pour limiter les risques de réinfestation entre voisins.",
    localDetails:
      "Nous intervenons aussi bien dans les lotissements récents que dans les maisons plus anciennes proches du Loiret. Une attention particulière est portée aux abris de jardin, terrasses, vides sanitaires et combles, souvent prisés par les nuisibles.",
    nearbyCommunes: [
      "Orléans",
      "Saint-Pryvé-Saint-Mesmin",
      "Saint-Hilaire-Saint-Mesmin",
      "Saint-Denis-en-Val",
      "Saint-Cyr-en-Val",
      "Mareau-aux-Prés",
      "Mézières-lez-Cléry",
      "Ardon",
      "Chaingy",
      "Saint-Ay",
    ],
    typicalContexts: [
      "Pavillons avec jardins arborés et animaux domestiques",
      "Maisons en bord de Loiret avec sous-sols et garages",
      "Résidences avec locaux poubelles partagés",
      "Copropriétés avec caves et parkings souterrains",
    ],
  },

  // --- FLEURY-LES-AUBRAIS ---
  "Fleury-les-Aubrais": {
    heroIntroExtra:
      " À Fleury-les-Aubrais, nous intervenons régulièrement dans les quartiers résidentiels et autour de la gare, où les nuisibles trouvent de nombreux refuges.",
    expertiseIntro:
      "À Fleury-les-Aubrais, la proximité des axes de transport et de la gare crée des zones propices aux déplacements des rats et souris. Nous mettons en place des plans d’action adaptés aux immeubles collectifs et aux maisons mitoyennes.",
    localDetails:
      "Nos interventions couvrent les secteurs proches de la gare, les zones pavillonnaires, les résidences récentes et les zones d’activités. Chaque diagnostic tient compte du voisinage, des locaux techniques et des espaces verts.",
    nearbyCommunes: [
      "Orléans",
      "Saran",
      "Ingré",
      "Semoy",
      "Saint-Jean-de-Braye",
      "Saint-Jean-de-la-Ruelle",
      "Saint-Jean-le-Blanc",
      "Chanteau",
      "Boigny-sur-Bionne",
      "Ormes",
    ],
    typicalContexts: [
      "Immeubles proches de la gare avec caves et locaux poubelles",
      "Lotissements avec jardins mitoyens",
      "Pavillons avec dépendances et cabanons",
      "Bureaux et locaux d’activités le long des axes routiers",
    ],
  },

  // --- SARAN ---
  Saran: {
    heroIntroExtra:
      " À Saran, nous connaissons bien les zones d’activités, les lotissements récents et les maisons individuelles sujettes aux passages de rongeurs.",
    expertiseIntro:
      "Les zones commerciales et d’activités de Saran attirent régulièrement les nuisibles, qui peuvent ensuite se déplacer vers les quartiers résidentiels. Nous travaillons autant pour les particuliers que pour les professionnels soucieux de leur image.",
    localDetails:
      "Nous intervenons dans les pavillons, les résidences, les commerces de proximité, les entrepôts et les locaux d’activité. Nos plans d’appâtage sont mis en place de façon sécurisée, hors de portée des enfants et animaux domestiques.",
    nearbyCommunes: [
      "Fleury-les-Aubrais",
      "Orléans",
      "Ingré",
      "Ormes",
      "Chevilly",
      "Semoy",
      "Chanteau",
      "Bucy-Saint-Liphard",
    ],
    typicalContexts: [
      "Pavillons avec jardins ouverts sur champs ou bois",
      "Entrepôts et locaux logistiques",
      "Restaurants et commerces de zones commerciales",
      "Résidences collectives avec caves et parkings",
    ],
  },

  // --- INGRÉ ---
  Ingré: {
    heroIntroExtra:
      " À Ingré, nous intervenons aussi bien dans les lotissements calmes que dans les zones d’activités proches d’Orléans.",
    expertiseIntro:
      "À Ingré, les rongeurs circulent entre zones d’activités, jardins et haies mitoyennes. Nos interventions prennent en compte ce contexte semi-urbain pour stopper les infestations durablement.",
    localDetails:
      "Nous avons l’habitude d’intervenir dans les pavillons avec combles, garages et abris de jardin, mais aussi dans les locaux professionnels et petites entreprises installées sur la commune.",
    nearbyCommunes: [
      "Orléans",
      "La Chapelle-Saint-Mesmin",
      "Saran",
      "Fleury-les-Aubrais",
      "Saint-Jean-de-la-Ruelle",
      "Ormes",
      "Chaingy",
      "Bucy-Saint-Liphard",
    ],
    typicalContexts: [
      "Maisons individuelles avec combles et vides sanitaires",
      "Jardins avec haies mitoyennes et tas de bois",
      "Petites entreprises et ateliers",
      "Résidences avec locaux poubelles communs",
    ],
  },

  // --- SAINT-PRYVÉ-SAINT-MESMIN ---
  "Saint-Pryvé-Saint-Mesmin": {
    heroIntroExtra:
      " À Saint-Pryvé-Saint-Mesmin, nos interventions tiennent compte des bords de Loire, des jardins et des maisons familiales.",
    expertiseIntro:
      "Entre Loire et zones résidentielles, Saint-Pryvé-Saint-Mesmin offre de nombreux abris aux rongeurs et insectes. Nous sécurisons les habitations en limitant les points d’entrée et en traitant les zones sensibles.",
    localDetails:
      "Nous intervenons dans les quartiers proches d’Orléans, les lotissements calmes et les maisons avec jardins donnant sur la Loire ou des espaces naturels.",
    nearbyCommunes: [
      "Orléans",
      "Olivet",
      "Saint-Hilaire-Saint-Mesmin",
      "Saint-Jean-le-Blanc",
      "La Chapelle-Saint-Mesmin",
      "Mareau-aux-Prés",
      "Mézières-lez-Cléry",
    ],
    typicalContexts: [
      "Maisons en bord de Loire ou proches des levées",
      "Pavillons avec terrasses et abris de jardin",
      "Résidences avec sous-sols ou garages en sous-sol",
      "Petits commerces de proximité",
    ],
  },

  // --- SAINT-JEAN-DE-LA-RUELLE ---
  "Saint-Jean-de-la-Ruelle": {
    heroIntroExtra:
      " À Saint-Jean-de-la-Ruelle, nos techniciens interviennent souvent dans les immeubles, maisons de ville et quartiers proches d’Orléans.",
    expertiseIntro:
      "À Saint-Jean-de-la-Ruelle, les nuisibles profitent des immeubles collectifs, des caves, des locaux poubelles et des maisons mitoyennes. Nos traitements sont pensés pour limiter les passages de rongeurs entre bâtiments.",
    localDetails:
      "Nous intervenons sur l’ensemble de la commune : quartiers proches de la Loire, lotissements, résidences récentes, petits immeubles et zones commerciales.",
    nearbyCommunes: [
      "Orléans",
      "La Chapelle-Saint-Mesmin",
      "Ingré",
      "Fleury-les-Aubrais",
      "Saint-Pryvé-Saint-Mesmin",
      "Saint-Jean-le-Blanc",
    ],
    typicalContexts: [
      "Immeubles avec caves et locaux techniques",
      "Maisons mitoyennes avec petits jardins",
      "Copropriétés avec parkings souterrains",
      "Commerces et restaurants de proximité",
    ],
  },

  // --- SAINT-JEAN-LE-BLANC ---
  "Saint-Jean-le-Blanc": {
    heroIntroExtra:
      " À Saint-Jean-le-Blanc, nous connaissons bien les rues proches d’Orléans et les maisons situées le long de la Loire.",
    expertiseIntro:
      "À Saint-Jean-le-Blanc, les rongeurs et insectes trouvent des refuges dans les maisons de bourg, les pavillons et les immeubles en bord de Loire. Nos interventions sécurisent ces zones sensibles tout en préservant votre cadre de vie.",
    localDetails:
      "Nous intervenons régulièrement dans les secteurs proches de la Loire, les lotissements récents, ainsi que les habitations à la frontière avec Orléans et Saint-Pryvé-Saint-Mesmin.",
    nearbyCommunes: [
      "Orléans",
      "Saint-Pryvé-Saint-Mesmin",
      "Saint-Denis-en-Val",
      "Olivet",
      "Saint-Jean-de-la-Ruelle",
      "Saint-Cyr-en-Val",
    ],
    typicalContexts: [
      "Maisons en bord de Loire avec sous-sols",
      "Pavillons avec jardins et terrasses",
      "Immeubles à proximité immédiate d’Orléans",
      "Résidences avec caves et locaux vélos",
    ],
  },

  // --- SAINT-JEAN-DE-BRAYE ---
  "Saint-Jean-de-Braye": {
    heroIntroExtra:
      " À Saint-Jean-de-Braye, nous intervenons des bords de Loire jusqu’aux quartiers plus résidentiels en retrait.",
    expertiseIntro:
      "Entre Loire, zones pavillonnaires et petits immeubles, Saint-Jean-de-Braye présente des configurations variées, souvent propices aux rats, souris et insectes. Nos diagnostics tiennent compte de cette diversité.",
    localDetails:
      "Nous couvrons les rues proches du centre, les bords de Loire, les secteurs plus calmes vers Orléans ou Chécy, ainsi que les petits commerces de quartier.",
    nearbyCommunes: [
      "Orléans",
      "Semoy",
      "Chécy",
      "Mardié",
      "Combleux",
      "Boigny-sur-Bionne",
      "Saint-Denis-en-Val",
    ],
    typicalContexts: [
      "Pavillons avec jardins et haies mitoyennes",
      "Immeubles avec caves et parties communes",
      "Maisons proches de la Loire ou du canal",
      "Petits commerces et restaurants de quartier",
    ],
  },

  // --- SEMOY ---
  Semoy: {
    heroIntroExtra:
      " À Semoy, nous intervenons dans un environnement mêlant habitations calmes, espaces verts et proximité d’Orléans.",
    expertiseIntro:
      "À Semoy, les nuisibles profitent des jardins, des haies et des abords boisés pour circuler entre les habitations. Nos plans de traitement visent à couper ces voies de passage.",
    localDetails:
      "Nous intervenons aussi bien dans les rues proches d’Orléans que dans les secteurs plus calmes vers Chanteau ou Saint-Jean-de-Braye.",
    nearbyCommunes: [
      "Orléans",
      "Fleury-les-Aubrais",
      "Saint-Jean-de-Braye",
      "Chanteau",
      "Boigny-sur-Bionne",
      "Marigny-les-Usages",
    ],
    typicalContexts: [
      "Maisons individuelles avec jardins arborés",
      "Pavillons en bordure de bois ou champs",
      "Résidences avec caves et garages",
      "Petites entreprises locales",
    ],
  },

  // --- LA CHAPELLE-SAINT-MESMIN ---
  "La Chapelle-Saint-Mesmin": {
    heroIntroExtra:
      " À La Chapelle-Saint-Mesmin, nous intervenons régulièrement le long de la Loire et dans les quartiers résidentiels proches d’Orléans.",
    expertiseIntro:
      "Entre Loire, zones pavillonnaires et axes routiers, La Chapelle-Saint-Mesmin est une commune où les nuisibles circulent facilement. Nous mettons en place des traitements ciblés pour protéger durablement votre habitation.",
    localDetails:
      "Nos interventions couvrent les lotissements, les maisons en bord de Loire, les immeubles et les commerces situés le long de la RD ou proches des zones d’activités.",
    nearbyCommunes: [
      "Orléans",
      "Saint-Jean-de-la-Ruelle",
      "Ingré",
      "Saint-Pryvé-Saint-Mesmin",
      "Chaingy",
      "Saint-Ay",
    ],
    typicalContexts: [
      "Maisons en bord de Loire ou près des levées",
      "Pavillons avec jardins ouverts",
      "Immeubles avec caves et parkings",
      "Commerces de bord de route et zones d’activités",
    ],
  },

  // --- SAINT-CYR-EN-VAL ---
  "Saint-Cyr-en-Val": {
    heroIntroExtra:
      " À Saint-Cyr-en-Val, nous intervenons dans un cadre plus résidentiel, entouré de forêts, champs et zones d’activités.",
    expertiseIntro:
      "Les rongeurs circulent facilement entre les bois, les champs et les habitations de Saint-Cyr-en-Val. Nous sécurisons les maisons, exploitations et locaux professionnels confrontés à ces nuisibles.",
    localDetails:
      "Nous travaillons dans les lotissements, les hameaux plus isolés, les fermes et les entreprises situées sur la commune et aux abords d’Orléans.",
    nearbyCommunes: [
      "Orléans",
      "Olivet",
      "Saint-Denis-en-Val",
      "Saint-Jean-le-Blanc",
      "Ardon",
      "Sandillon",
    ],
    typicalContexts: [
      "Maisons avec grands terrains et dépendances",
      "Exploitations agricoles et bâtiments annexes",
      "Zones d’activités et entrepôts",
      "Pavillons récents avec combles et garages",
    ],
  },
};

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

  const highlightedServices = services
    .slice(0, 4)
    .map((service) => service.title.toLowerCase());
  const title = `Dératisation & désinsectisation à ${zone.city} | ${site.brand}`;
  const description = `${site.brand} se déplace à ${zone.city} et dans tout le ${site.departement} pour lutter contre les nuisibles : ${highlightedServices.join(
    ", ",
  )}... Intervention rapide 24–48h et devis gratuit.`;
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

  const zoneConfig: ZoneConfig = zoneConfigs[zone.city] ?? {};

  const expertiseIntro =
    zoneConfig.expertiseIntro ??
    `${site.brand} accompagne les particuliers, syndics et professionnels dans le ${site.departement}. Notre équipe locale intervient à ${zone.city} avec du matériel professionnel, un protocole précis et un suivi après passage jusqu'à la résolution complète.`;

  const localDetails = zoneConfig.localDetails ?? "";

  const heroIntroExtra = zoneConfig.heroIntroExtra ?? "";

  const nearbyCommunes =
    zoneConfig.nearbyCommunes && zoneConfig.nearbyCommunes.length > 0
      ? zoneConfig.nearbyCommunes
      : genericNearbyCommunes.filter((city) => city !== zone.city);

  const typicalContexts =
    zoneConfig.typicalContexts && zoneConfig.typicalContexts.length > 0
      ? zoneConfig.typicalContexts
      : [
          "Maisons individuelles avec jardins et dépendances",
          "Immeubles avec caves, locaux techniques et parkings",
          "Commerces de proximité et restaurants",
          "Locaux professionnels et bureaux",
        ];

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
            Zone d&apos;intervention
          </div>

          <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
            {site.brand} à {zone.city}
          </h1>

          <p className="mt-6 text-pretty text-xl text-white/90 md:text-2xl">
            Experts Certibiocide pour la dératisation et la désinsectisation à{" "}
            <strong>{zone.city}</strong>. Intervention sous 24–48h dans tout le{" "}
            <strong>{site.departement}</strong>, devis gratuit et suivi
            personnalisé.
            {heroIntroExtra && <> {heroIntroExtra}</>}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" data-cta={`zone-${zone.slug}-form`}>
              <Button
                size="lg"
                className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90"
              >
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
                Expertise locale
              </span>
              <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                Pourquoi nous confier votre intervention à {zone.city} ?
              </h2>

              <p className="text-lg text-muted-foreground">{expertiseIntro}</p>

              {localDetails && (
                <p className="text-base text-muted-foreground">
                  {localDetails}
                </p>
              )}

              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "Intervention rapide sous 24–48h",
                    desc: "Prise en charge immédiate, créneaux d'urgence selon la gravité de la situation.",
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

              <p className="rounded-xl border-2 border-primary/20 bg-secondary/30 p-4 text-sm text-muted-foreground">
                <strong>Nous couvrons également les communes voisines :</strong>{" "}
                {nearbyCommunes.join(", ")}.
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
                    <span>
                      Inspection, diagnostic et plan d&apos;action détaillé
                      avant tout traitement
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>
                      Intervention discrète, matériel professionnel et produits
                      réglementés
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>
                      Compte rendu complet et conseils de prévention
                      personnalisés
                    </span>
                  </div>
                </div>

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
              Nos interventions fréquentes à {zone.city}
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
                Quartiers & situations typiques à {zone.city}
              </h3>
              <p className="text-sm text-muted-foreground">
                Chaque commune a ses particularités : type de bâti, proximité de
                la Loire, jardins, zones d&apos;activités... Voici quelques
                situations dans lesquelles nous intervenons très souvent à{" "}
                {zone.city}.
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
                Communes autour de {zone.city} où nous intervenons
              </h3>
              <p className="text-sm text-muted-foreground">
                Notre rayon d&apos;action couvre Orléans et jusqu&apos;à environ
                20 km autour. Voici quelques communes où nous nous déplaçons
                régulièrement :
              </p>
              <div className="flex flex-wrap gap-2">
                {nearbyCommunes.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-primary/20 bg-secondary/40 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {city}
                  </span>
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
                desc: `Vous nous contactez. Nous nous déplaçons à ${zone.city} pour un diagnostic gratuit et détaillé de votre situation.`,
              },
              {
                step: "2",
                title: "Traitement professionnel",
                desc: "Intervention discrète avec produits Certibiocide adaptés. Protocole sur-mesure selon le type de nuisible.",
              },
              {
                step: "3",
                title: "Suivi & garantie",
                desc: "Rapport avec photos, conseils de prévention et contrôles inclus jusqu'à résolution complète du problème.",
              },
            ].map((item, i) => (
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
            Besoin d&apos;une intervention à {zone.city} ?
          </h2>

          <p className="mt-6 text-xl text-white/90">
            Contactez notre équipe pour un diagnostic gratuit et un devis
            détaillé. Nous planifions avec vous une intervention rapide et
            efficace.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href={phoneHref} data-cta={`zone-${zone.slug}-final-call`}>
              <Button
                size="lg"
                className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90"
              >
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
