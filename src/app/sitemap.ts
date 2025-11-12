import { site } from "@/config/site";
import { slugify } from "@/lib/slug";

export default async function sitemap() {
  const base = "https://www.declicparasites.fr";
  const staticPages = [
    "", "/zones-intervention"
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
  }));

  const cityPages = site.serviceArea.map((name) => ({
    url: `${base}/zones-intervention/${slugify(name)}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...cityPages];
}
