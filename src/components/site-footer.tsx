import Link from "next/link";
import { Award, Facebook, Mail, MapPin, Phone } from "lucide-react";

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

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 7.92-3.067 1.947-1.947 2.56-4.693 2.56-6.987 0-.693-.053-1.36-.173-2.027H12.48z" />
  </svg>
);

const PagesJaunesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="4" />
    <path d="M8 17l6-10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 12l-3 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function SiteFooter({ className }: { className?: string }) {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <footer
      className={cn(
        "border-t-2 border-primary/10 bg-gradient-to-br from-secondary/30 via-white to-secondary/20 text-foreground pb-24 md:pb-16",
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

            {/* RÉSEAUX SOCIAUX */}
            <div className="flex gap-4 pt-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61584584848729" 
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110 hover:bg-blue-700"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://share.google/mYRTAoO5txaWytDLj" 
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-md transition-transform hover:scale-110 hover:bg-gray-50"
                aria-label="Google Avis"
              >
                <GoogleIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.pagesjaunes.fr/" 
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white transition-transform hover:scale-110 hover:bg-yellow-500"
                aria-label="Pages Jaunes"
              >
                <PagesJaunesIcon className="h-5 w-5" />
              </Link>
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
                  {/* CORRECTION ACCESSIBILITÉ : size="default" (au lieu de sm) */}
                  <Button size="default" className="w-full bg-gradient-accent font-bold shadow-lg">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BAS (Mentions légales + RGPD uniquement) */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t-2 border-primary/10 pt-8 text-sm text-muted-foreground lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">
              © {new Date().getFullYear()} {site.brand}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <Link href="/mentions-legales" className="hover:text-primary hover:underline">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="hover:text-primary hover:underline">
                Politique de confidentialité (RGPD)
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Expert local certifié</span>
            </div>
            <p className="text-[10px] text-muted-foreground/80">
              Intervention 7j/7 dans tout le Loiret
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}