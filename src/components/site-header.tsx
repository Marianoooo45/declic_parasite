"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronDown, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { LogoDeclic } from "@/components/logo-declic";

const navigation = [
  { label: "Engagements", href: "/nos-engagements" },
  { label: "Zones", href: "/zones-intervention" },
  { label: "Conseils", href: "/blog" },
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
    if (window.matchMedia("(min-width:1024px)").matches) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(min-width:1024px)").matches) setOpen(false);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/services"
        className="font-medium transition-colors hover:text-primary"
      >
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
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
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
              <span className="text-sm font-semibold text-foreground group-hover:text-primary">
                {s.title}
              </span>
              <span className="text-xs leading-tight text-muted-foreground">
                {s.short}
              </span>
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-white p-3 text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex h-full w-80 max-w-[85%] flex-col p-0">
        <SheetHeader className="shrink-0 border-b border-border bg-secondary/30 px-6 py-4">
          <SheetTitle className="text-xs font-bold uppercase tracking-widest text-primary">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="space-y-6">
            <Link
              href="/"
              className="block text-base font-semibold text-foreground hover:text-primary"
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
                  >
                    <span className="block font-semibold">{s.title}</span>
                    <span className="text-xs text-muted-foreground">{s.short}</span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
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
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shrink-0 border-t border-border bg-secondary/20 p-6">
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="block">
            <Button size="lg" className="w-full bg-gradient-accent shadow-lg">
              <Phone className="h-5 w-5" />
              Appeler {site.phone}
            </Button>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}


export function SiteHeader() {
  const phoneHref = useMemo(() => `tel:${site.phone.replace(/\s+/g, "")}`, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border glass shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-6 md:h-24">
        <Link href="/" className="flex items-center" aria-label={site.brand}>
          <LogoDeclic className="h-9 w-auto md:h-16" />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 text-[15px] font-medium lg:flex"
        >
          <Link href="/" className="whitespace-nowrap transition-colors hover:text-primary">
            Accueil
          </Link>
          <ServicesDropdown />
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Icônes Desktop : Téléphone + Calendrier */}
          <a
            href={phoneHref}
            className="hidden lg:inline-flex"
            data-cta="nav-phone"
            aria-label={`Appeler ${site.phone}`}
          >
            <Button
              size="icon"
              variant="ghost"
              className="text-primary hover:bg-primary/10"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </a>

          <Link
            href="/contact#calendly"
            className="hidden lg:inline-flex"
            data-cta="nav-calendly"
            aria-label="Prendre rendez-vous"
          >
            <Button
              size="icon"
              variant="ghost"
              className="text-primary hover:bg-primary/10"
            >
              <Calendar className="h-5 w-5" />
            </Button>
          </Link>

          {/* CTA Principal Desktop */}
          <Link href="/contact" className="hidden lg:inline-flex" data-cta="nav-devis">
            <Button
              size="default"
              className="bg-gradient-accent font-semibold shadow-lg shadow-accent/20 hover:shadow-xl"
            >
              Devis gratuit
            </Button>
          </Link>

          {/* Mobile : Téléphone + Menu */}
          <a
            href={phoneHref}
            className="inline-flex lg:hidden"
            data-cta="nav-phone-mobile"
            aria-label={`Appeler ${site.phone}`}
          >
            <Button size="icon" className="bg-gradient-accent shadow-md">
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
