import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock3, MapPin, User } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { blogPosts } from "@/config/blog";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog & Conseils",
  description:
    "Actualités et conseils anti-nuisibles à Orléans et dans le Loiret : protocoles, prévention et retours de terrain Déclic Parasites.",
  alternates: {
    canonical: "https://www.declicparasites.fr/blog",
  },
  openGraph: {
    title: `Blog & Conseils | ${site.brand}`,
    description:
      "Articles pour préparer vos interventions anti-nuisibles à Orléans et dans le Loiret.",
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
      {/* HERO MODERNE */}
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-primary text-white lg:min-h-[90vh]">
        {/* Image de fond subtile */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=2000&q=80"
            alt="Bureau moderne avec ordinateur portable"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Motif géométrique */}
        <div className="absolute inset-0 bg-grid-white/5" aria-hidden />

        <div className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center items-center gap-8 px-4 py-20 text-center md:px-6 lg:min-h-[90vh]">
          <AnimatedSection>
            <span className="mx-auto rounded-full bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
              📚 Blog & Conseils
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-balance text-4xl font-bold leading-tight text-shadow-lg md:text-6xl lg:text-7xl">
              Nos conseils d'experts anti-nuisibles
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Retours de terrain, protocoles éprouvés et bonnes pratiques partagés par nos
              techniciens pour sécuriser votre logement ou votre commerce à Orléans et dans le Loiret.
            </p>
          </AnimatedSection>

          {/* Stats en bas du hero */}
          {/* Stats en bas du hero */}
          <AnimatedSection delay={0.3}>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              {[
                { value: blogPosts.length, label: "Articles" },
                { value: "850+", label: "Interventions" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-accent drop-shadow md:text-4xl">
                    {stat.value}
                  </div>

                  <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-accent/90" />

                  <div className="mt-2 text-sm font-semibold text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LISTE DES ARTICLES - DESIGN MODERNE */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">

          {/* En-tête de section */}
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              Tous nos articles
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Guides pratiques et retours d'expérience de nos experts terrain
            </p>
          </AnimatedSection>

          {/* Grid d'articles */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-border bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl">

                  {/* Image de couverture */}
                  <Link href={`/blog/${post.slug}`} className="relative block">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        priority={i === 0}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Badge flottant */}
                      <div className="absolute right-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase text-white shadow-lg">
                        {site.brand}
                      </div>

                      {/* Temps de lecture en bas */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </div>
                    </div>
                  </Link>

                  {/* Contenu de la carte */}
                  <div className="flex flex-1 flex-col gap-4 p-6">

                    {/* Métadonnées */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
                        <MapPin className="h-3.5 w-3.5" />
                        Orléans & Loiret
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>

                    {/* Titre */}
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold leading-tight text-primary transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Extrait */}
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer avec CTA */}
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Expert {site.brand}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3 group-hover:text-accent"
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

          {/* Message si peu d'articles */}
          {blogPosts.length < 3 && (
            <AnimatedSection delay={0.3} className="mt-12 text-center">
              <div className="mx-auto max-w-2xl rounded-3xl border-2 border-primary/20 bg-secondary/30 p-8">
                <p className="text-lg font-semibold text-primary">
                  📝 Nouveaux articles en préparation
                </p>
                <p className="mt-3 text-muted-foreground">
                  Notre équipe rédige régulièrement de nouveaux guides et retours d'expérience.
                  Revenez bientôt pour découvrir plus de conseils d'experts !
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA FINAL - EXPERTISE */}
      <section className="bg-gradient-primary py-16 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <AnimatedSection>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
              ⚡ Besoin d'aide ?
            </div>

            <h2 className="text-balance text-3xl font-bold md:text-5xl">
              Une question sur votre situation ?
            </h2>

            <p className="mt-6 text-lg text-white/90 md:text-xl">
              Nos techniciens sont disponibles pour analyser votre cas et vous proposer
              un plan d'action adapté. Devis gratuit sous 1h ouvrée.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact" data-cta="blog-cta-form">
                <button className="h-14 rounded-full bg-accent px-10 text-lg font-bold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-accent/90">
                  Demander un diagnostic
                </button>
              </Link>
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} data-cta="blog-cta-call">
                <button className="h-14 rounded-full border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  📞 {site.phone}
                </button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}