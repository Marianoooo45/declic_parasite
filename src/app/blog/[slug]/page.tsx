import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock3, MapPin } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { blogPosts } from "@/config/blog";
import { site } from "@/config/site";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: `Article introuvable | ${site.brand}`,
    };
  }

  return {
    title: `${post.title} | ${site.brand}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${site.brand}`,
      description: post.excerpt,
      images: [{ url: post.cover }],
      type: "article",
      url: `https://www.declicparasites.fr/blog/${post.slug}`,
    },
  };
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-primary py-14 text-white md:py-20">
        <div className="absolute inset-0 bg-grid-white/5" aria-hidden />
        <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-4 text-center md:px-6">
          <span className="mx-auto rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            Déclic Parasites – Blog
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight text-shadow-lg md:text-5xl">
            {post.title}
          </h1>
          <p className="text-pretty text-lg text-white/90 md:text-xl">{post.excerpt}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Orléans & Loiret
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" /> {post.readingTime}
            </span>
          </div>
        </div>
      </section>

      <section className="-mt-12 pb-12 md:pb-20">
        <div className="mx-auto max-w-5xl space-y-10 px-4 md:px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-realistic">
            <div className="relative h-72 w-full overflow-hidden md:h-[420px]">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 900px, 100vw"
                priority
              />
            </div>
            <div className="space-y-6 p-6 text-base leading-relaxed text-muted-foreground md:p-10">
              <p className="text-lg font-semibold text-primary">{post.intro}</p>

              <div className="grid gap-8">
                {post.sections.map((section, index) => (
                  <AnimatedSection key={section.heading} delay={index * 0.05}>
                    <article className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-primary">{section.heading}</h2>
                        {section.body.map((paragraph, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.image && (
                        <div className="relative h-56 overflow-hidden rounded-2xl border border-border bg-secondary/40 md:h-full">
                          <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 380px, 100vw"
                          />
                          {section.image.caption && (
                            <p className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 text-xs font-semibold text-white">
                              {section.image.caption}
                            </p>
                          )}
                        </div>
                      )}
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/40 p-6 shadow-realistic">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Prendre rendez-vous
              </p>
              <h3 className="text-xl font-bold text-primary">
                Besoin d'un devis ou d'un diagnostic rapide ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Notre équipe intervient sous 24–48h à Orléans et dans tout le Loiret.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              Retour au contact
              <ArrowLeft className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
