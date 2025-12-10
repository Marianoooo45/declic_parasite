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
    <div className="space-y-0 overflow-x-hidden">
      {/* HERO IMMERSIF */}
      <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 text-white lg:min-h-[90vh]">
        <Image
          src="https://images.contentstack.io/v3/assets/blt4cb7085064c0b32f/blt6614b4a12e79a8a2/668d2eb242bfac020686b5fd/1200X628_conseil_comment_choisir_exterminateur.jpg"
          alt="Technicien professionnel Déclic Parasites en intervention à Orléans"
          fill
          className="absolute inset-0 object-cover opacity-25 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        
        <div className="absolute right-4 top-7 z-10 animate-pulse">
          {/* CORRECTION ACCESSIBILITÉ : Ajout de text-foreground pour le contraste */}
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold shadow-lg text-foreground">
            <Zap className="h-5 w-5" />
            Disponible 7j/7
          </span>
        </div>

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 md:px-6 lg:min-h-[90vh]">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Award className="h-4 w-4 text-accent" />
              Certifié Certibiocide — Expert local
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-shadow-lg md:text-6xl lg:text-7xl">
              Dératisation, Désinsectisation : Urgence à Orléans ?
            </h1>

            <p className="text-pretty text-xl leading-relaxed text-white/90 md:text-2xl">
              <strong>Rats, punaises de lit, cafards, guêpes...</strong>
              <br />
              Intervention rapide 24-48h • Devis gratuit • Méthodes certifiées
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={phoneHref} data-cta="hero-call">
                <Button size="lg" className="h-14 w-full bg-accent px-8 text-lg font-bold shadow-2xl hover:bg-accent/90 hover:shadow-accent/30 sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Appeler {site.phone}
                </Button>
              </a>
              <Link href="/contact" data-cta="hero-form">
                <Button size="lg" variant="outline" className="h-14 w-full border-2 border-white bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto">
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
                  <item.icon className="h-5 w-5 shrink-0 text-accent" />
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
      <section className="bg-secondary/30 py-12 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-primary md:text-5xl">
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
                pest: "Rats & Souris Loiret",
                image: "https://images.unsplash.com/photo-1657656206271-12b0b877a47b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                link: "/services/deratisation-rats-souris"
              },
              {
                symptom: "Piqûres au réveil",
                pest: "Punaises de Loiret",
                image: "https://images.unsplash.com/photo-1680162984776-841184954e9e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                link: "/services/traitement-punaises-de-lit"
              },
              {
                symptom: "Traces dans la cuisine",
                pest: "Cafards & Blattes Loiret",
                image: "https://images.unsplash.com/photo-1727198634627-645ef5356455?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                link: "/services/traitement-cafards-et-blattes"
              },
              {
                symptom: "Nid visible",
                pest: "Guêpes & Frelons Loiret",
                image: "https://images.unsplash.com/photo-1755039022246-d7e7f58b54c7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      <section className="py-12 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">Nos prestations</span>
            <h2 className="mt-3 text-balance text-3xl font-bold text-primary md:text-5xl">
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
      <section className="bg-gradient-primary py-12 text-white lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold md:text-5xl">
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

          <div className="mt-16 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">Basés à Orléans</h3>
                <p className="mt-4 text-white/90">
                  Nous connaissons parfaitement les problématiques locales de nuisibles : 
                  bâtiments anciens du centre-ville, proximité de la Loire, zones pavillonnaires...
                </p>
                <p className="mt-4 text-white/90">
                  Notre équipe locale intervient rapidement dans tout le Loiret avec matériel 
                  professionnel et protocoles adaptés à chaque situation.
                </p>
                <Link href="/zones-intervention" className="mt-6 block w-full sm:inline-flex sm:w-auto">
                  <Button size="lg" className="h-auto w-full whitespace-normal bg-accent py-4 font-bold hover:bg-accent/90 sm:w-auto">
                    <MapPin className="mr-2 h-5 w-5 shrink-0" />
                    <span>Voir nos zones d'intervention</span>
                  </Button>
                </Link>
              </div>
              
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl md:h-full md:min-h-[320px]">
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
        </div>
      </section>

      {/* PROCESS 3 ÉTAPES */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-primary md:text-5xl">
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
      <section className="bg-secondary/50 py-12 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-balance text-3xl font-bold text-primary md:text-5xl">
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