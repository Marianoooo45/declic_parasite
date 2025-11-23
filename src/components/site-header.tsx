"use client";

import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

/* --------- NAV DATA --------- */
=======
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { services } from "@/config/services";

>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
const navigation = [
  { label: "Nos engagements", href: "/#why" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "/contact" },
];

const serviceItems = services.slice(0, 8);

<<<<<<< HEAD
/* --------- SERVICES DROPDOWN --------- */
=======
/* ---------- Services dropdown (desktop) ---------- */
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
<<<<<<< HEAD
    function onDown(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        closeMenu();
      }
=======
    function onDoc(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) closeMenu();
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
<<<<<<< HEAD
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
=======
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <div
<<<<<<< HEAD
      className="relative flex items-center"
      onMouseEnter={() => window.matchMedia("(min-width:1024px)").matches && setOpen(true)}
      onMouseLeave={() => window.matchMedia("(min-width:1024px)").matches && setOpen(false)}
    >
      <Link href="/services" className="transition-colors hover:text-primary">
=======
      className="relative flex items-center gap-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/services" className="flex items-center gap-1 hover:text-primary">
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
        Services
      </Link>
      <button
        ref={triggerRef}
        type="button"
        className="rounded-md p-1 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-services-menu"
<<<<<<< HEAD
        className="ml-1 rounded-md p-1 text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setOpen((v) => !v)}
        aria-label="Afficher les services"
=======
        onClick={() => setOpen((v) => !v)}
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
      >
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      <div
        ref={panelRef}
        id="nav-services-menu"
<<<<<<< HEAD
        className={cn(
          "invisible absolute right-0 top-full z-50 mt-2 min-w-[18rem] origin-top rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-xl opacity-0 transition-all duration-150",
          open ? "visible translate-y-0 opacity-100" : "-translate-y-2"
        )}
      >
        <div className={cn("grid gap-2 p-1", serviceItems.length > 6 ? "lg:grid-cols-2" : "grid-cols-1")}>
=======
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
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
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
<<<<<<< HEAD
            className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/5"
=======
            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
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

<<<<<<< HEAD
/* --------- MOBILE MENU --------- */
=======
/* ---------- Mobile menu ---------- */
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
<<<<<<< HEAD
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
=======
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
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
  }, [open]);

  return (
    <>
      <button
        type="button"
<<<<<<< HEAD
        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
=======
        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
<<<<<<< HEAD
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className="ml-auto flex h-full w-80 max-w-[85%] flex-col bg-white/95 backdrop-blur shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Menu</span>
              <button
                type="button"
                className="rounded-full p-2 text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
=======
          <div className="absolute inset-0 bg-black/40" />
          <div ref={dialogRef} className="ml-auto flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Menu</span>
              <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100" onClick={() => setOpen(false)}>
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
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
<<<<<<< HEAD
                        className="block rounded-md border border-gray-100 p-3 text-sm transition hover:border-primary hover:text-primary"
=======
                        className="block rounded-md border border-gray-100 p-3 text-sm hover:border-primary hover:text-primary"
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
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
<<<<<<< HEAD

                {navigation.map((n) => (
                  <Link key={n.href} href={n.href} className="block text-base font-semibold" onClick={() => setOpen(false)}>
                    {n.label}
=======
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-base font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-gray-200 p-5">
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="block">
<<<<<<< HEAD
                <Button size="sm" className="w-full">
                  Appeler {site.phone}
                </Button>
=======
                <Button className="w-full">Appeler {site.phone}</Button>
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

<<<<<<< HEAD
/* --------- HEADER --------- */
=======
/* ---------- Header ---------- */
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
export function SiteHeader() {
  const phoneHref = useMemo(() => `tel:${site.phone.replace(/\s+/g, "")}`, []);

  return (
<<<<<<< HEAD
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-md"
      /* nav height contrôlée via h-14/md:h-16 */
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:h-16">
        {/* LOGO */}
        <Link href="/" className="flex items-center" aria-label={site.brand}>
=======
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-secondary/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link href="/" aria-label={site.brand} className="flex items-center gap-2">
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
          <Image
            src="/logo-declic.svg"
            alt={`${site.brand} logo`}
<<<<<<< HEAD
            width={140}
            height={40}
=======
            width={180}
            height={48}
            className="h-10 w-auto md:h-12"
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
            priority
            className="h-8 w-auto md:h-9"
            sizes="(min-width: 1024px) 140px, 120px"
          />
        </Link>

<<<<<<< HEAD
        {/* NAV LINKS (desktop) */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link href="/" className="transition-colors hover:text-primary">Accueil</Link>
          <ServicesDropdown />
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
=======
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <ServicesDropdown />
          {navigation.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
            </Link>
          ))}
        </nav>

<<<<<<< HEAD
        {/* CTA (desktop) */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={phoneHref} className="inline-flex" data-cta="nav-phone">
            <Button size="sm" className="bg-primary px-4 hover:bg-primary/90">
              {site.phone}
            </Button>
          </a>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 lg:hidden">
          <a href={phoneHref} className="inline-flex" data-cta="nav-phone-mobile-short">
=======
        <div className="hidden items-center gap-3 lg:flex">
          <a href={phoneHref} className="inline-flex">
            <Button className="bg-primary hover:bg-primary/90">{site.phone}</Button>
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a href={phoneHref} className="inline-flex">
>>>>>>> a92b469ae669a5ff3911fce5f108ec667dcae32f
            <Button size="sm" className="bg-primary hover:bg-primary/90">Appeler</Button>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
