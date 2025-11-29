import Link from "next/link";
import { Award, Mail, MapPin, Phone } from "lucide-react";

import { services } from "@/config/services";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const featuredServices = services.slice(0, 6);

const footerNav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Nos engagements", href: "/nos-engagements" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter({ className }: { className?: string }) {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <footer
      className={cn(
        "border-t-2 border-primary/10 bg-gradient-to-br from-secondary/30 via-white to-secondary/20 text-foreground",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* COLONNE PRINCIPALE */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {site.brand}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                Experts anti-nuisibles à Orléans
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                Intervention rapide pour dératisation, désinsectisation et traitement des nuisibles 
                dans tout le Loiret. Certifié Certibiocide, méthodes professionnelles garanties.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">{site.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">Téléphone</p>
                  <a
                    href={phoneHref}
                    className="text-lg font-bold text-accent transition hover:text-accent/80"
                    data-cta="footer-phone"
                  >
                    {site.phone}
                  </a>
                  <p className="text-xs text-muted-foreground">Disponible 7j/7 — Réponse rapide</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-primary transition hover:underline"
                    data-cta="footer-email"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Zones d'intervention principales
              </p>
              <div className="flex flex-wrap gap-2">
                {site.serviceArea.slice(0, 8).map((city) => (
                  <span key={city} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {city}
                  </span>
                ))}
              </div>
              {site.serviceArea.length > 8 && (
                <Link 
                  href="/zones-intervention" 
                  className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  + {site.serviceArea.length - 8} autres communes →
                </Link>
              )}
            </div>
          </div>

          {/* COLONNE NAVIGATION */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                Nos services
              </h4>
              <ul className="space-y-2">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 text-sm transition hover:text-primary"
                      data-cta="footer-service"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary opacity-50 transition group-hover:opacity-100" />
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    Voir tous les services →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-foreground">
                Navigation
              </h4>
              <ul className="space-y-2">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm transition hover:text-primary"
                      data-cta="footer-nav"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary opacity-50 transition group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border-2 border-accent/20 bg-accent/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <p className="font-bold text-foreground">Intervention rapide</p>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Devis gratuit sous 1h ouvrée
                  <br />
                  Disponibilité 7j/7 pour urgences
                </p>
                <Link href="/contact" className="inline-flex w-full" data-cta="footer-cta">
                  <Button size="sm" className="w-full bg-gradient-accent font-bold shadow-lg">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BAS */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t-2 border-primary/10 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">
              © {new Date().getFullYear()} {site.brand}. Tous droits réservés.
            </p>
            <p className="mt-1 text-xs">
              Entreprise certifiée Certibiocide — Méthodes professionnelles garanties
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Expert local depuis 2018</span>
          </div>
        </div>
      </div>
    </footer>
  );
}