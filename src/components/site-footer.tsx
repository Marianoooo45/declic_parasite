import Link from "next/link";

import { services } from "@/config/services";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const featuredServices = services.slice(0, 6);

const footerNav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-16 border-t border-primary/10 bg-white/85 text-sm text-foreground/80 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              {site.brand}
            </p>
            <p className="max-w-lg text-lg font-semibold text-foreground">
              Artisan spécialiste de la dératisation et de la désinsectisation à {site.city}. Interventions rapides et
              accompagnement sur-mesure dans tout le {site.departement}.
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <span>{site.address}</span>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="font-semibold text-primary transition hover:text-primary/80"
                data-cta="footer-phone"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-primary"
                data-cta="footer-email"
              >
                {site.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {site.serviceArea.slice(0, 6).map((city) => (
                <span key={city} className="rounded-full bg-secondary px-3 py-1 text-primary">
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">Prestations principales</h3>
              <ul className="mt-4 space-y-3">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1 text-sm transition hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                      data-cta="footer-service"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Navigation</h3>
              <ul className="mt-4 space-y-3">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-primary/5 hover:text-primary"
                      data-cta="footer-nav"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-primary/5 p-4 text-sm">
                <p className="font-semibold text-primary">Disponibilité 24–48h</p>
                <p className="mt-1 text-muted-foreground">
                  Devis gratuit et réponse rapide sous 1h ouvrée. Intervention dans tout le {site.departement}.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-primary/90"
                  data-cta="footer-cta"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-primary/10 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brand}. Tous droits réservés.</p>
          <p>Certibiocide – Méthodes raisonnées – Intervention locale.</p>
        </div>
      </div>
    </footer>
  );
}
