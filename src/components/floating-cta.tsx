"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function FloatingCta() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    // On réduit la marge du bas (bottom-4) et on limite la largeur max pour les grands téléphones
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-full border border-primary/10 bg-white/90 p-1.5 shadow-xl backdrop-blur-md">
        {/* Bouton Appeler - Mis en avant avec le dégradé */}
        <a
          href={phoneHref}
          data-cta="floating-call"
          className="flex-1"
        >
          <Button className="h-11 w-full gap-2 rounded-full bg-gradient-accent text-sm font-bold shadow-md transition-transform active:scale-95">
            <Phone className="h-4 w-4" />
            Appeler
          </Button>
        </a>

        {/* Bouton Devis - Style Outline propre */}
        <Link
          href="/contact"
          data-cta="floating-devis"
          className="flex-1"
        >
          <Button
            variant="outline"
            className="h-11 w-full gap-2 rounded-full border-primary/20 bg-transparent text-sm font-bold text-primary hover:bg-primary/5 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            Devis
          </Button>
        </Link>
      </div>
    </div>
  );
}