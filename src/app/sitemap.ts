import { site } from "@/config/site";
import { services } from "@/config/services";
import { slugify } from "@/lib/slug";

export default async function sitemap() {
  const base = "https://www.declicparasites.fr";
  const staticPages = [
    "",
    "/services",
    "/nos-engagements",
    "/contact",
    "/zones-intervention",
  ].map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
  }));

  const cityPages = site.serviceArea.map((name) => ({
    url: `${base}/zones-intervention/${slugify(name)}`,
    lastModified: new Date(),
  }));

  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...cityPages, ...servicePages];
}
