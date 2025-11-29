"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function FloatingCta() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <div className="pointer-events-auto flex gap-3 rounded-full border-2 border-primary/20 bg-white p-2 shadow-2xl">
        <a
          href={phoneHref}
          data-cta="floating-call"
          className="flex-1"
        >
          <Button className="h-12 w-full gap-2 rounded-full bg-gradient-accent px-6 font-bold shadow-lg">
            <Phone className="h-5 w-5" />
            Appeler
          </Button>
        </a>
        <Link
          href="/contact"
          data-cta="floating-devis"
          className="flex-1"
        >
          <Button
            variant="outline"
            className="h-12 w-full gap-2 rounded-full border-2 border-primary bg-white font-bold text-primary shadow-md hover:bg-primary hover:text-white"
          >
            <Mail className="h-5 w-5" />
            Devis
          </Button>
        </Link>
      </div>
    </div>
  );
}