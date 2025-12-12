import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock3, MapPin } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { blogPosts } from "@/config/blog";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Blog & Conseils | ${site.brand}`,
  description:
    "Actualités et conseils anti-nuisibles à Orléans et dans le Loiret : protocoles, prévention et retours de terrain Déclic Parasites.",
  openGraph: {
    title: `Blog & Conseils | ${site.brand}`,
    description:
      "Articles SEO pour préparer vos interventions anti-nuisibles à Orléans et dans le Loiret.",
    type: "website",
    url: "https://www.declicparasites.fr/blog",
  },
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function BlogPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-primary py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-grid-white/5" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-4 text-center md:px-6">
          <span className="mx-auto rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            Blog & SEO local
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight text-shadow-lg md:text-5xl">
            Conseils anti-nuisibles à Orléans & dans le Loiret
          </h1>
          <p className="text-lg text-white/90 md:text-xl">
            Retours de terrain, protocoles et bonnes pratiques partagés par nos techniciens
            pour sécuriser votre logement ou votre commerce.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-18 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-realistic">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={i === 0}
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-white shadow-lg">
                      Déclic Parasites
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
                        <MapPin className="h-3.5 w-3.5" /> Orléans & Loiret
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" /> {post.readingTime}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-primary">{post.title}</h2>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-accent to-primary" />
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                      >
                        Lire l'article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
