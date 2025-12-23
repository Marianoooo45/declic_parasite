import { site } from "@/config/site";
import { services } from "@/config/services";
import { blogPosts } from "@/config/blog";
import { cities } from "@/data/cities";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.declicparasites.fr";

  // 1. Pages Statiques
  const staticPages = [
    "",
    "/services",
    "/nos-engagements",
    "/contact",
    "/zones-intervention",
    "/blog",
    "/urgence-deratisation-orleans",
    "/traitement-punaises-de-lit-orleans-checklist",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  // 2. Pages des Villes (Zones d'intervention)
  // On utilise la source de vérité unifiée src/data/cities.ts
  const cityPages = cities.map((city) => ({
    url: `${base}/zones-intervention/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Pages des Services (Dératisation, Punaises, etc.)
  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Retourne le tableau complet concaténé
  return [...staticPages, ...cityPages, ...servicePages, ...blogPages];
}
