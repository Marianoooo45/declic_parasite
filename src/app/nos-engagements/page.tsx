import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { CheckCircle2, ClipboardList, Leaf, ShieldCheck, Timer } from "lucide-react";

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
  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-cc69c40007a1?auto=format&fit=crop&w=1900&q=80"
          alt="Technicien en combinaison inspectant une maison"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[#103220]/70 to-[#0c2418]/85" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 text-white md:grid-cols-[1.1fr_0.9fr] md:px-10 lg:px-12">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
              Engagements
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
              Notre promesse : protéger votre habitat comme si c'était le nôtre
            </h1>
            <p className="text-pretty text-lg text-white/85">
              Chaque intervention Déclic Parasites repose sur un diagnostic précis, des produits maîtrisés et un accompagnement
              humain. Nous intervenons à {site.city} et dans tout le {site.departement} avec le même niveau d'exigence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex">
                <Button className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-accent/90">
                  Programmer un échange
                </Button>
              </Link>
              <Link href="/services" className="inline-flex">
                <Button
                  variant="outline"
                  className="rounded-full border-white/60 bg-white/10 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/20"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </div>
            <div className="grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {["Techniciens certifiés Certibiocide", "Rapports et photos après chaque passage", "Interventions discrètes et planifiées", "Accompagnement particuliers & pros"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-accent" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1582719478439-1ef1a67fdcef?auto=format&fit=crop&w=1600&q=80"
                alt="Pulvérisation contrôlée dans une maison"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 520px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/40 p-4 text-sm text-white shadow-lg backdrop-blur">
                <p className="font-semibold">Procédures sécurisées</p>
                <p className="text-white/90">Plan d'intervention, vérification des zones sensibles et consignes claires avant chaque traitement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
        <div className="space-y-10 rounded-3xl border border-primary/10 bg-white/90 p-8 shadow-xl">
          <div className="space-y-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Nos piliers</span>
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">Une méthodologie rassurante</h2>
            <p className="text-pretty text-base text-muted-foreground">
              De la première prise de contact jusqu'au suivi après traitement, nous partageons chaque étape et validons les
              décisions importantes avec vous.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {engagements.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={0.08 * index}
                className="flex h-full flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 text-left shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
        <div className="grid gap-8 rounded-3xl border border-primary/10 bg-white/90 p-8 shadow-xl md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Étapes clés</span>
            <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">Un protocole clair avant, pendant et après</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              {["Diagnostic sur site et devis clair avant toute action", "Traitement ciblé (gel, nébulisation, pièges) selon le nuisible", "Conseils d'hygiène et plan de prévention personnalisés", "Contrôle de l'efficacité et retours rapides après passage"].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 text-left">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link href="/contact" className="inline-flex" data-cta="engagements-contact">
                <Button className="rounded-full bg-primary px-7 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90">
                  Parler à un technicien
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-primary/5">
            <Image
              src="https://images.unsplash.com/photo-1582719478250-22d09f9aa4e3?auto=format&fit=crop&w=1500&q=80"
              alt="Inspection d'une cuisine pour vérifier la présence de nuisibles"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-sm text-primary">
              <p className="font-semibold">Visite de contrôle</p>
              <p className="text-muted-foreground">Photos, points d'accès vérifiés et plan d'action partagé pour limiter le retour des nuisibles.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12">
        <div className="rounded-3xl border border-primary/10 bg-primary/95 px-8 py-12 text-center text-white shadow-2xl md:px-12">
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">Envie d'en savoir plus ou besoin d'un avis ?</h2>
          <p className="mt-3 text-pretty text-base text-white/85">
            Expliquez-nous votre situation : nous vous répondons par mail ou par téléphone selon votre préférence, avec un devis clair et
            un plan d'intervention.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex">
              <Button className="rounded-full bg-accent px-7 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-accent/90">
                Envoyer un message
              </Button>
            </Link>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="inline-flex" data-cta="engagements-call">
              <Button
                variant="outline"
                className="rounded-full border-white/60 bg-white/10 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/20"
              >
                Appeler le {site.phone}
              </Button>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
