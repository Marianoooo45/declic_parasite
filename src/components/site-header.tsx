"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Pourquoi nous choisir", href: "#why" },
  { label: "Zones d'intervention", href: "/zones-intervention" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={site.brand}>
          <Image
            src="https://ext.same-assets.com/3682338552/3131086727.png"
            alt={`${site.brand} logo`}
            width={160}
            height={42}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navigation.map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
            <Button className="bg-primary hover:bg-primary/90">
              {site.phone}
            </Button>
          </a>
        </div>

        <div className="lg:hidden">
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Appeler
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
