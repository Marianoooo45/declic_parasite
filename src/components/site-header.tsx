"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/config/services";
// Import du nouveau composant Logo
import { LogoDeclic } from "@/components/logo-declic";

const navigation = [
  { label: "Nos engagements", href: "/nos-engagements" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

const serviceItems = services.slice(0, 8);

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onDown(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        closeMenu();
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  const handleMouseEnter = () => {
    if (window.matchMedia("(min-width:1024px)").matches) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(min-width:1024px)").matches) {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/services" className="font-medium transition-colors hover:text-primary">
        Services
      </Link>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-services-menu"
        aria-label="Afficher les services"
        onClick={() => setOpen((v) => !v)}
        className="ml-1 rounded-md p-1 text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        ref={panelRef}
        id="nav-services-menu"
        role="menu"
        className={cn(
          "invisible absolute left-1/2 top-full z-50 mt-3 w-[26rem] max-w-[90vw] -translate-x-1/2 origin-top rounded-2xl border border-border bg-white p-3 shadow-realistic opacity-0 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "-translate-y-2"
        )}
      >
        <div className="grid gap-2 p-1 lg:grid-cols-2">
          {serviceItems.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              role="menuitem"
              className="group flex flex-col gap-1 rounded-xl border border-transparent bg-white p-3 transition-all hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm"
              onClick={() => setOpen(false)}
            >
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">{s.title}</span>
              <span className="text-xs leading-tight text-muted-foreground">{s.short}</span>
            </Link>
          ))}
        </div>
        <div className="mt-2 border-t border-border pt-2">
          <Link
            href="/services"
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            onClick={() => setOpen(false)}
          >
            Tous nos services
            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function onDoc(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (!dialogRef.current?.contains(t)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-xl border border-border bg-white p-2.5 text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className="ml-auto flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Menu
              </span>
              <button
                type="button"
                className="rounded-full p-2 text-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <nav className="space-y-6">
                <Link
                  href="/"
                  className="block text-base font-semibold text-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Accueil
                </Link>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Services
                  </p>
                  <div className="space-y-2">
                    {serviceItems.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block rounded-xl border border-border bg-secondary/30 p-3 text-sm transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block font-semibold">{s.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {s.short}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      Tous les services →
                    </Link>
                  </div>
                </div>

                {navigation.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="block text-base font-semibold text-foreground hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-border bg-secondary/20 p-6">
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="block">
                <Button size="lg" className="w-full bg-gradient-accent shadow-lg">
                  <Phone className="h-5 w-5" />
                  Appeler {site.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteHeader() {
  const phoneHref = useMemo(
    () => `tel:${site.phone.replace(/\s+/g, "")}`,
    []
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border glass shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-4 md:h-24">
        
        {/* SECTION LOGO MISE À JOUR */}
        <Link href="/" className="flex items-center" aria-label={site.brand}>
          {/* Le nouveau logo SVG qui contient tout le texte */}
          {/* J'ai augmenté un peu la taille (h-14 md:h-16) pour la lisibilité */}
          <LogoDeclic className="h-14 w-auto md:h-16" />
        </Link>
        {/* FIN SECTION LOGO */}

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 text-[15px] font-medium lg:flex"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>
          <ServicesDropdown />
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={phoneHref} className="hidden lg:inline-flex" data-cta="nav-phone">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 font-semibold text-primary hover:bg-primary/10"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </Button>
          </a>
          <Link href="/contact" className="hidden lg:inline-flex" data-cta="nav-devis">
            <Button
              size="lg"
              className="bg-gradient-accent font-semibold shadow-lg shadow-accent/20 hover:shadow-xl"
            >
              Devis Gratuit
            </Button>
          </Link>

          <a href={phoneHref} className="inline-flex lg:hidden" data-cta="nav-phone-mobile">
            <Button
              size="default"
              className="bg-gradient-accent font-semibold shadow-md"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;