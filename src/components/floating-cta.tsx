"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function FloatingCta() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-50 flex flex-col gap-3 md:hidden">
      <a
        href={phoneHref}
        data-cta="floating-call"
        className="pointer-events-auto"
      >
        <Button className="flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold shadow-lg shadow-primary/20">
          <span aria-hidden>📞</span> Appeler
        </Button>
      </a>
      <Link
        href="/contact"
        data-cta="floating-quote"
        className="pointer-events-auto"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border-primary/20 bg-white/90 px-6 py-4 text-base font-semibold text-primary shadow-lg shadow-primary/10 backdrop-blur"
        >
          <span aria-hidden>💬</span> Devis express
        </Button>
      </Link>
    </div>
  );
}
