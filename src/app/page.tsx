import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { 
  ArrowRight, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Shield, 
  Star,
  Users,
  Zap
} from "lucide-react";

export const revalidate = 86400;

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const featuredServices = services.slice(0, 6);
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <div className="space-y-0">
      {/* HERO IMMERSIF */}
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 text-white lg:min-h-[90vh]">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
          alt="Technicien professionnel Déclic Parasites en intervention à Orléans"
          fill
          className="absolute inset-0 object-cover opacity-25 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        
        <div className="absolute right-4 top-7 z-10 animate-pulse">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold shadow-lg">
            <Zap className="h-5 w-5" />
            Disponible 7j/7
          </span>
        </div>

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 lg:min-h-[90vh]">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Award className="h-4 w-4 text-accent" />
              Certifié Certibiocide — Expert local depuis 2018
            </div>

            <h1 className="text-balance text-5xl font-bold leading-[1.1] tracking-tight text-shadow-lg md:text-6xl lg:text-7xl">
              Urgence nuisibles à Orléans ?
            </h1>

            <p className="text-pretty text-xl leading-relaxed text-white/90 md:text-2xl">
              <strong>Rats, punaises de lit, cafards, guêpes...</strong>
              <br />
              Intervention rapide 24-48h • Devis gratuit • Méthodes certifiées
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={phoneHref} data-cta="hero-call">
                <Button size="lg" className="h-14 bg-accent px-8 text-lg font-bold shadow-2xl hover:bg-accent/90 hover:shadow-accent/30">
                  <Phone className="h-5 w-5" />
                  Appeler {site.phone}
                </Button>
              </a>
              <Link href="/contact" data-cta="hero-form">
                <Button size="lg" variant="outline" className="h-14 border-2 border-white bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20">
                  Devis Express
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {[
                { icon: Shield, text: "Certibiocide" },
                { icon: Star, text: "98% satisfaits" },
                { icon: Clock, text: "Réponse <1h" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <item.icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-white/70">Zones :</span>
              {site.serviceArea.slice(0, 6).map((zone) => (
                <span key={zone} className="rounded-full border border-white/30 px-3 py-1 font-medium">
                  {zone}
                </span>
              ))}
              <Link href="/zones-intervention" className="rounded-full border border-white/30 px-3 py-1 font-medium hover:bg-white/10">
                + {site.serviceArea.length - 6} communes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BANDE URGENCE STICKY */}
      <div className="sticky top-20 z-40 border-b-2 border-accent/20 bg-gradient-accent py-3 text-center text-white shadow-lg md:top-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <span className="text-sm font-bold md:text-base">
              🚨 Urgence nuisibles ? Intervention sous 24h
            </span>
            <a href={phoneHref} className="inline-flex" data-cta="banner-call">
              <Button size="sm" variant="secondary" className="bg-white font-bold text-accent hover:bg-white/90">
                <Phone className="h-4 w-4" />
                {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* PROBLÈMES COURANTS */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
              Vous avez remarqué...
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Signes d'infestation ? Agissez avant la prolifération
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                symptom: "Bruits dans les murs",
                pest: "Rats & Souris",
                image: "https://images.unsplash.com/photo-1616627547584-bf28cfedf253?auto=format&fit=crop&w=800&q=80",
                link: "/services/deratisation"
              },
              {
                symptom: "Piqûres au réveil",
                pest: "Punaises de lit",
                image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=800&q=80",
                link: "/services/traitement-punaises-de-lit"
              },
              {
                symptom: "Traces dans la cuisine",
                pest: "Cafards & Blattes",
                image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
                link: "/services/traitement-cafards-et-blattes"
              },
              {
                symptom: "Nid visible",
                pest: "Guêpes & Frelons",
                image: "https://images.unsplash.com/photo-1594399741693-22d5626d3d3e?auto=format&fit=crop&w=800&q=80",
                link: "/services/guepes-frelons"
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={item.link} className="group block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.pest}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-sm font-semibold text-white/90">{item.symptom}</p>
                        <p className="text-xl font-bold text-white">{item.pest}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        En savoir plus
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">Nos prestations</span>
            <h2 className="mt-3 text-balance text-4xl font-bold text-primary md:text-5xl">
              Solutions professionnelles anti-nuisibles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Interventions certifiées Certibiocide • Devis gratuit • Suivi personnalisé
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                      {service.priceFrom && (
                        <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-white shadow-lg">
                          dès {euroFormatter.format(service.priceFrom)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                      <p className="flex-1 text-sm text-muted-foreground">{service.short}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        Découvrir le service
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-primary font-semibold text-primary hover:bg-primary hover:text-white">
                Voir tous nos services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS — CHIFFRES */}
      <section className="bg-gradient-primary py-20 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold md:text-5xl">
              Pourquoi Orléans nous fait confiance
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Artisan local, expertise professionnelle, résultats garantis
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: Users, number: "850+", label: "Interventions réalisées" },
              { icon: Clock, number: "24-48h", label: "Délai d'intervention" },
              { icon: Zap, number: "7j/7", label: "Disponibilité urgence" },
              { icon: Star, number: "98%", label: "Clients satisfaits" }
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <stat.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="text-5xl font-bold">{stat.number}</div>
                  <div className="mt-2 text-white/80">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-3xl font-bold">Basés à Orléans</h3>
                <p className="mt-4 text-white/90">
                  Nous connaissons parfaitement les problématiques locales de nuisibles : 
                  bâtiments anciens du centre-ville, proximité de la Loire, zones pavillonnaires...
                </p>
                <p className="mt-4 text-white/90">
                  Notre équipe locale intervient rapidement dans tout le Loiret avec matériel 
                  professionnel et protocoles adaptés à chaque situation.
                </p>
                <Link href="/zones-intervention" className="mt-6 inline-flex">
                  <Button size="lg" className="bg-accent font-bold hover:bg-accent/90">
                    <MapPin className="h-5 w-5" />
                    Voir nos zones d'intervention
                  </Button>
                </Link>
              </div>
              <div className="relative h-64 overflow-hidden rounded-xl md:h-full md:min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1549744318-615e94c2ec5d?auto=format&fit=crop&w=1200&q=80"
                  alt="Rue Bannier Orléans - Zone d'intervention Déclic Parasites"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS 3 ÉTAPES */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
              Intervention en 3 étapes simples
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Contact & Diagnostic",
                desc: "Appelez-nous ou remplissez le formulaire. Nous vous rappelons sous 1h pour évaluer la situation et caler un rendez-vous."
              },
              {
                step: "2",
                title: "Intervention professionnelle",
                desc: "Traitement ciblé avec produits certifiés Certibiocide. Discrétion garantie, véhicule banalisé."
              },
              {
                step: "3",
                title: "Suivi & Garantie",
                desc: "Rapport détaillé avec photos, conseils prévention et suivi jusqu'à résolution complète du problème."
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="relative h-full rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-realistic">
                  <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-accent text-2xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-3 mt-4 text-xl font-bold text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
            Protégez votre habitat dès aujourd'hui
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Devis gratuit • Intervention rapide • Résultat garanti
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href={phoneHref} data-cta="footer-call">
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-xl hover:shadow-2xl">
                <Phone className="h-5 w-5" />
                Appeler {site.phone}
              </Button>
            </a>
            <Link href="/contact" data-cta="footer-form">
              <Button size="lg" variant="outline" className="h-14 border-2 border-primary px-10 text-lg font-bold text-primary hover:bg-primary hover:text-white">
                Remplir le formulaire
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}