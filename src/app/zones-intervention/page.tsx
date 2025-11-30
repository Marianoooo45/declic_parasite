import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { slugify } from "@/lib/slug";
import { Award, Clock, MapPin, Phone, Zap } from "lucide-react";

const title = `Zones d'intervention – ${site.brand}`;
const description = `Interventions antiparasitaires à ${site.city} et dans le ${site.departement} : ${site.serviceArea.join(", ")}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.declicparasites.fr/zones-intervention" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    url: "https://www.declicparasites.fr/zones-intervention",
  },
};

export default function ZonesPage() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 py-12 text-white lg:py-32">
        {/* MODIF : Retour à l'image haute définition contrastée (Technicien) + mix-blend-overlay comme sur l'Accueil */}
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
          alt="Technicien expert Déclic Parasites"
          fill
          className="absolute inset-0 object-cover opacity-25 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-accent" />
            Couverture complète du Loiret
          </div>
          
          <h1 className="text-balance text-4xl font-bold leading-tight text-shadow-lg md:text-6xl">
            Zones d'intervention {site.brand}
          </h1>
          
          <p className="mt-6 text-pretty text-lg text-white/90 md:text-2xl">
            Intervention rapide à <strong>{site.city}</strong> et dans le{" "}
            <strong>{site.departement}</strong>. Déplacement sous 24–48h avec devis gratuit 
            et suivi personnalisé.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" data-cta="zones-hero-form">
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                Demander un devis
              </Button>
            </Link>
            <a href={phoneHref} data-cta="zones-hero-call">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                {site.phone}
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, text: "Intervention 24-48h" },
              { icon: Clock, text: "Devis sous 1h" },
              { icon: Award, text: "Certifié Certibiocide" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <item.icon className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTE COMMUNES */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <AnimatedSection className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">
              Communes desservies
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-primary md:text-5xl">
              Toutes nos zones d'intervention
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Nous couvrons toutes les communes autour de {site.city}. Sélectionnez votre 
              ville pour accéder aux informations détaillées et planifier une intervention rapide.
            </p>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {site.serviceArea.map((city, index) => (
              <AnimatedSection key={city} delay={0.02 * index}>
                <Link href={`/zones-intervention/${slugify(city)}`}>
                  <div className="group h-full rounded-2xl border-2 border-primary/20 bg-white p-6 shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {city}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      Déplacement sous 24h
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      En savoir plus
                      <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 rounded-2xl border-2 border-primary/20 bg-secondary/30 p-8 text-center">
            <p className="text-base text-muted-foreground">
              <strong>Vous ne voyez pas votre commune ?</strong>
              <br />
              Nous intervenons sur l'ensemble du Loiret.{" "}
              <Link
                href="/contact"
                className="font-bold text-primary underline underline-offset-4 hover:text-accent"
              >
                Contactez-nous
              </Link>{" "}
              pour vérifier notre disponibilité.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* POURQUOI LOCAL - Avec MAPS */}
      <section className="bg-gradient-primary py-12 text-white lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-bold md:text-5xl">
                Pourquoi choisir un expert local ?
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Connaissance du territoire",
                    desc: "Nous connaissons parfaitement les problématiques locales : bâtiments anciens du centre-ville, proximité de la Loire, zones pavillonnaires..."
                  },
                  {
                    title: "Intervention rapide",
                    desc: "Basés à Orléans, nous intervenons en 24-48h maximum partout dans le Loiret, avec créneaux d'urgence disponibles 7j/7."
                  },
                  {
                    title: "Suivi personnalisé",
                    desc: "Un interlocuteur unique vous accompagne du diagnostic au suivi post-traitement, avec disponibilité locale pour tout retour."
                  },
                  {
                    title: "Équipement adapté",
                    desc: "Matériel professionnel et produits Certibiocide adaptés aux spécificités locales et à chaque type d'habitat."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-white/90">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRATION MAP GOOGLE */}
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl md:h-96 lg:h-full lg:min-h-[600px]">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.053912188613!2d1.9016143768356877!3d47.90257397920531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4e4d68e52579b%3A0x40bc2bda27f4d360!2sRue%20Bannier%2C%2045000%20Orl%C3%A9ans!5e0!3m2!1sfr!2sfr!4v1709907481234!5m2!1sfr!2sfr" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 h-full w-full grayscale-[25%] hover:grayscale-0 transition-all duration-500"
                 title="Localisation Déclic Parasite Orléans"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="rounded-3xl border-2 border-primary/20 bg-white p-8 shadow-realistic md:p-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-4xl">
              Notre couverture du Loiret en chiffres
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { number: site.serviceArea.length, label: "Communes couvertes", icon: MapPin },
                { number: "24-48h", label: "Délai d'intervention", icon: Clock },
                { number: "850+", label: "Interventions réalisées", icon: Award }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-primary md:text-5xl">{stat.number}</div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-secondary/30 py-12 lg:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-balance text-3xl font-bold text-primary md:text-5xl">
            Prêt à sécuriser votre habitat ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Appelez-nous ou remplissez le formulaire pour un devis gratuit et une intervention rapide
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href={phoneHref} data-cta="zones-final-call">
              <Button size="lg" className="h-14 bg-gradient-accent px-10 text-lg font-bold shadow-xl">
                <Phone className="h-5 w-5" />
                Appeler {site.phone}
              </Button>
            </a>
            <Link href="/contact" data-cta="zones-final-form">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-primary px-10 text-lg font-bold text-primary hover:bg-primary hover:text-white"
              >
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}