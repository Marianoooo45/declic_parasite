"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Nos engagements", href: "/#engagements" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

const serviceItems = services.slice(0, 8);

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const panel = panelRef.current;
    if (!panel) {
      return undefined;
    }

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
      }

      if (event.key === "Tab" && focusable.length > 0) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      const panelEl = panelRef.current;
      const triggerEl = triggerRef.current;
      if (!target) {
        return;
      }

      if (
        (!panelEl || !panelEl.contains(target)) &&
        (!triggerEl || !triggerEl.contains(target))
      ) {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      restoreFocusRef.current = null;
    };
  }, [open, closeMenu]);

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
          setOpen(false);
        }
      }}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href="/services"
        className="flex items-center gap-1 transition-colors hover:text-primary"
      >
        Services
      </Link>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-services-menu"
        className="rounded-full border border-transparent p-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-label="Afficher les services"
      >
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      <div
        ref={panelRef}
        role="menu"
        id="nav-services-menu"
        aria-label="Services"
        className={cn(
          "invisible absolute right-0 top-full z-50 mt-3 min-w-[18rem] origin-top rounded-2xl border border-primary/10 bg-white/95 p-3 text-sm shadow-2xl backdrop-blur opacity-0 transition-all duration-150 lg:mt-2",
          open && "visible translate-y-0 opacity-100",
          !open && "-translate-y-2",
        )}
      >
        <div
          className={cn(
            "grid gap-2 p-1",
            serviceItems.length > 6 ? "lg:grid-cols-2" : "grid-cols-1",
          )}
        >
          {serviceItems.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              role="menuitem"
              className="group flex flex-col rounded-xl border border-transparent p-3 transition-all hover:border-primary/20 hover:bg-primary/5"
              onClick={() => setOpen(false)}
              data-cta="nav-service"
            >
              <span className="font-semibold">{service.title}</span>
              <span className="text-xs text-muted-foreground">{service.short}</span>
            </Link>
          ))}
        </div>
        <div className="mt-2 border-t border-primary/10 pt-3">
          <Link
            href="/services"
            className="flex items-center justify-between rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/5"
            onClick={() => setOpen(false)}
            data-cta="nav-services-all"
          >
            Tous les services
            <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const focusable = () =>
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }

      if (event.key === "Tab") {
        const nodes = focusable();
        if (nodes.length === 0) {
          return;
        }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (target && !dialogRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      restoreFocusRef.current?.focus?.();
      restoreFocusRef.current = null;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-white/90 p-2 text-sm font-semibold text-primary shadow-md transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="mobile-nav"
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-primary/30" aria-hidden="true" />
          <div
            ref={dialogRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="ml-auto flex h-full w-80 max-w-[85%] flex-col bg-white/95 backdrop-blur shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded-full p-2 text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <nav className="space-y-5">
                <Link
                  href="/"
                  className="block text-base font-semibold text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Accueil
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Services
                  </p>
                  <div className="mt-3 space-y-3">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block rounded-xl border border-primary/10 bg-white/80 p-3 text-sm shadow-sm transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                        onClick={() => setOpen(false)}
                        data-cta="nav-service-mobile"
                      >
                        <span className="block font-semibold">{service.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {service.short}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-primary"
                      onClick={() => setOpen(false)}
                      data-cta="nav-services-all-mobile"
                    >
                      Tous les services
                    </Link>
                  </div>
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-base font-semibold text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-primary/10 bg-white/80 p-5">
              <div className="space-y-3">
                <Link href="/contact" data-cta="nav-mobile-quote" className="block">
                  <Button className="w-full rounded-full bg-primary py-3 text-base font-semibold shadow-md hover:bg-primary/90">
                    Devis gratuit
                  </Button>
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="block"
                  data-cta="nav-phone-mobile"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-primary/20 bg-white py-3 text-base font-semibold text-primary shadow-md hover:bg-primary/5"
                  >
                    Appeler {site.phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function SiteHeader() {
  const phoneHref = useMemo(
    () => `tel:${site.phone.replace(/\s+/g, "")}`,
    [],
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label={site.brand}
        >
          <Image
            src="/logo-declic.png"
            alt={`${site.brand} logo`}
            width={180}
            height={52}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden flex-1 items-center justify-center gap-5 text-sm font-medium text-foreground/80 lg:flex"
        >
          <Link
            href="/"
            className="transition-colors hover:text-primary"
          >
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

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" data-cta="nav-quote" className="inline-flex">
            <Button className="h-10 rounded-full bg-primary px-5 text-sm font-semibold shadow-md hover:bg-primary/90">
              Devis gratuit
            </Button>
          </Link>
          <a
            href={phoneHref}
            data-cta="nav-phone"
            className="inline-flex"
          >
            <Button
              variant="outline"
              className="h-10 rounded-full border-primary/20 bg-white px-5 text-sm font-semibold text-primary shadow-md hover:bg-primary/10"
            >
              {site.phone}
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={phoneHref}
            data-cta="nav-phone-mobile-short"
            className="inline-flex"
          >
            <Button
              size="sm"
              className="rounded-full bg-primary px-4 text-sm font-semibold shadow-md hover:bg-primary/90"
            >
              Appeler
            </Button>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
