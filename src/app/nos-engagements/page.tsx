import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { Award, CheckCircle2, ClipboardList, Leaf, Phone, ShieldCheck, Timer, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: `Nos engagements | ${site.brand}`,
  description:
    "Découvrez les engagements Déclic Parasites : réactivité 24–48h, discrétion, protocoles certifiés et suivi personnalisé à Orléans et dans le Loiret.",
  openGraph: {
    title: `Nos engagements | ${site.brand}`,
    description:
      "Réactivité 24–48h, interventions discrètes et méthodes raisonnées pour protéger votre habitat contre les nuisibles.",
    type: "website",
    url: "https://www.declicparasites.fr/nos-engagements",
  },
};

const engagements = [
  {
    title: "Réactivité 24–48h",
    description: "Créneaux d'urgence et déplacements depuis Orléans pour sécuriser votre logement au plus vite.",
    icon: Timer,
  },
  {
    title: "Méthodes raisonnées",
    description: "Produits Certibiocide, application ciblée et prévention pour limiter les nuisances et préserver votre intérieur.",
    icon: Leaf,
  },
  {
    title: "Discrétion & traçabilité",
    description: "Véhicule banalisé, compte-rendu détaillé avec photos et recommandations après chaque passage.",
    icon: ClipboardList,
  },
  {
    title: "Résultat garanti",
    description: "Suivi jusqu'à disparition des nuisibles, retours rapides et ajustements compris si nécessaire.",
    icon: ShieldCheck,
  },
];

export default function NosEngagementsPage() {
  const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

  return (
    <div className="space-y-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
          alt="Technicien en combinaison inspectant une maison"
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          sizes="100vw"
          priority
        />
        
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <AnimatedSection className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Award className="h-4 w-4 text-accent" />
              Nos engagements professionnels
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
                Notre promesse : protéger votre habitat comme si c'était le nôtre
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-pretty text-xl text-white/90">
                Chaque intervention {site.brand} repose sur un diagnostic précis, des produits
                maîtrisés et un accompagnement humain. Nous intervenons à {site.city} et dans
                tout le {site.departement} avec le même niveau d'exigence.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="flex flex-wrap gap-4">
              <Link href="/contact" data-cta="engagements-contact">
                <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                  Programmer un échange
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="grid gap-4 sm:grid-cols-2">
              {[
                "Techniciens certifiés Certibiocide",
                "Rapports et photos après chaque passage",
                "Interventions discrètes et planifiées",
                "Accompagnement particuliers & pros"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.1} className="relative overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl">
            <div className="relative h-96 lg:h-full lg:min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pulvérisation contrôlée dans une maison"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border-2 border-white/30 bg-black/40 p-6 backdrop-blur-sm">
                <p className="text-lg font-bold text-white">Procédures sécurisées</p>
                <p className="mt-2 text-sm text-white/90">
                  Plan d'intervention, vérification des zones sensibles et consignes claires
                  avant chaque traitement.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* NOS 4 PILIERS */}
      <AnimatedSection className="py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-accent">Nos piliers</span>
            <h2 className="mt-3 text-balance text-4xl font-bold text-primary md:text-5xl">
              Une méthodologie rassurante
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              De la première prise de contact jusqu'au suivi après traitement, nous partageons 
              chaque étape et validons les décisions importantes avec vous.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {engagements.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={0.1 * index}
              >
                <div className="h-full rounded-2xl border-2 border-primary/20 bg-white p-6 shadow-realistic transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PROTOCOLE EN 4 ÉTAPES */}
      <AnimatedSection className="bg-secondary/30 py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-sm font-bold uppercase tracking-widest text-accent">Étapes clés</span>
              <h2 className="text-balance text-4xl font-bold text-primary md:text-5xl">
                Un protocole clair avant, pendant et après
              </h2>
              
              <div className="space-y-4">
                {[
                  "Diagnostic sur site et devis clair avant toute action",
                  "Traitement ciblé (gel, nébulisation, pièges) selon le nuisible",
                  "Conseils d'hygiène et plan de prévention personnalisés",
                  "Contrôle de l'efficacité et retours rapides après passage"
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border-2 border-primary/20 bg-white p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent text-lg font-bold text-white">
                      {i + 1}
                    </div>
                    <p className="pt-1.5 font-medium text-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/contact" data-cta="engagements-process-contact">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-lg">
                    <Phone className="h-5 w-5" />
                    Parler à un technicien
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 shadow-2xl">
              <div className="relative h-96 lg:h-full lg:min-h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80"
                  alt="Inspection d'une cuisine pour vérifier la présence de nuisibles"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border-2 border-primary/30 bg-white/90 p-6 backdrop-blur-sm">
                  <p className="text-lg font-bold text-primary">Visite de contrôle</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Photos, points d'accès vérifiés et plan d'action partagé pour limiter 
                    le retour des nuisibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CERTIFICATIONS */}
      <AnimatedSection className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-3xl border-2 border-primary/20 bg-white p-10 shadow-realistic md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-balance text-3xl font-bold text-primary md:text-4xl">
                Certifications & garanties professionnelles
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Nos techniciens respectent les normes les plus strictes du secteur
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Certibiocide",
                  desc: "Certification obligatoire pour l'utilisation professionnelle de produits biocides. Renouvellement annuel et formation continue."
                },
                {
                  icon: ClipboardList,
                  title: "HACCP compatible",
                  desc: "Protocoles adaptés aux normes d'hygiène alimentaire pour restaurants, commerces et industries agroalimentaires."
                },
                {
                  icon: Award,
                  title: "Assurance pro",
                  desc: "Responsabilité civile professionnelle et garantie décennale pour votre tranquillité et celle de votre assurance."
                }
              ].map((cert, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-primary/10 bg-secondary/30 p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                    <cert.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA FINAL */}
      <AnimatedSection className="bg-gradient-primary py-20 text-white">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <Zap className="mx-auto mb-6 h-16 w-16 text-accent" />
          
          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            Envie d'en savoir plus ou besoin d'un avis ?
          </h2>
          
          <p className="mt-6 text-pretty text-xl text-white/90">
            Expliquez-nous votre situation : nous vous répondons par mail ou par téléphone 
            selon votre préférence, avec un devis clair et un plan d'intervention.
          </p>
          
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" data-cta="engagements-final-form">
              <Button size="lg" className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90">
                Envoyer un message
              </Button>
            </Link>
            <a href={phoneHref} data-cta="engagements-final-call">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                Appeler {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
