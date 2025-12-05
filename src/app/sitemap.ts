import { site } from "@/config/site";
import { services } from "@/config/services";
import { slugify } from "@/lib/slug";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.declicparasites.fr";

  // 1. Liste complète des communes supplémentaires (copiée de votre page)
  const genericNearbyCommunes = [
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

  // 2. Fusion et dédoublonnage pour avoir la liste Maître de toutes les villes
  const allCities = Array.from(
    new Set([...site.serviceArea, ...genericNearbyCommunes])
  );

  // 3. Pages Statiques
  const staticPages = [
    "",
    "/services",
    "/nos-engagements",
    "/contact",
    "/zones-intervention",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  // 4. Pages des Villes (Zones d'intervention)
  const cityPages = allCities.map((name) => ({
    url: `${base}/zones-intervention/${slugify(name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 5. Pages des Services (Dératisation, Punaises, etc.)
  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Retourne le tableau complet concaténé
  return [...staticPages, ...cityPages, ...servicePages];
}