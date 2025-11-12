"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/config/services";

const navigation = [
  { label: "Nos engagements", href: "/#why" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

const serviceItems = services.slice(0, 8);

/* ---------- Services dropdown (desktop) ---------- */
function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) closeMenu();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/services" className="flex items-center gap-1 hover:text-primary">
        Services
      </Link>
      <button
        ref={triggerRef}
        type="button"
        className="rounded-md p-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-services-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      <div
        ref={panelRef}
        id="nav-services-menu"
        role="menu"
        className={cn(
          "invisible absolute right-0 top-full z-50 mt-3 min-w-[19rem] origin-top rounded-2xl border border-primary/10 bg-white text-sm shadow-2xl opacity-0 transition-all",
          open ? "visible translate-y-0 opacity-100" : "-translate-y-2"
        )}
      >
        <div
          className={cn(
            "grid max-h-[70vh] gap-2 overflow-y-auto p-3 pr-4",
            serviceItems.length > 6 ? "lg:grid-cols-2" : "grid-cols-1"
          )}
        >
          {serviceItems.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              role="menuitem"
              className="group flex flex-col rounded-xl border border-transparent bg-white p-3 hover:border-primary/10 hover:bg-primary/5"
              onClick={() => setOpen(false)}
            >
              <span className="font-semibold">{s.title}</span>
              <span className="text-xs text-muted-foreground">{s.short}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-primary/10 p-3">
          <Link
            href="/services"
            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
            onClick={() => setOpen(false)}
          >
            Tous les services
            <ChevronDown className="h-3 w-3 -rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile menu ---------- */
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
      if (!dialogRef.current?.contains(t)) setOpen(false);
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
        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div ref={dialogRef} className="ml-auto flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Menu</span>
              <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <nav className="space-y-5">
                <Link href="/" className="block text-base font-semibold" onClick={() => setOpen(false)}>
                  Accueil
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services</p>
                  <div className="mt-3 space-y-3">
                    {serviceItems.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block rounded-md border border-gray-100 p-3 text-sm hover:border-primary hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        <span className="block font-semibold">{s.title}</span>
                        <span className="text-xs text-muted-foreground">{s.short}</span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wide text-primary"
                      onClick={() => setOpen(false)}
                    >
                      Tous les services
                    </Link>
                  </div>
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-base font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-gray-200 p-5">
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="block">
                <Button className="w-full">Appeler {site.phone}</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Header ---------- */
export function SiteHeader() {
  const phoneHref = useMemo(() => `tel:${site.phone.replace(/\s+/g, "")}`, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-secondary/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link href="/" aria-label={site.brand} className="flex items-center gap-2">
          <Image
            src="/logo-declic.svg"
            alt={`${site.brand} logo`}
            width={180}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ServicesDropdown />
          {navigation.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={phoneHref} className="inline-flex">
            <Button className="bg-primary hover:bg-primary/90">{site.phone}</Button>
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a href={phoneHref} className="inline-flex">
            <Button size="sm" className="bg-primary hover:bg-primary/90">Appeler</Button>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
