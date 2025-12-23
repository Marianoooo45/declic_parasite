import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Info,
    ListChecks,
    Phone,
    ShieldAlert,
    XCircle
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const baseUrl = "https://www.declicparasites.fr";

export const metadata: Metadata = {
    title: "Punaises de Lit Orléans : Check-list & Erreurs à éviter",
    description: "Comment préparer votre logement avant un traitement contre les punaises de lit à Orléans ? Découvrez notre check-list complète et les 5 erreurs fatales à éviter.",
    alternates: {
        canonical: `${baseUrl}/traitement-punaises-de-lit-orleans-checklist`,
    },
};

export default function PunaisesChecklistPage() {
    const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

    return (
        <div className="min-h-screen">
            {/* HERO CHECKLIST */}
            <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
                <Image
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80"
                    alt="Punaises de lit préparation"
                    fill
                    className="absolute inset-0 object-cover opacity-10 mix-blend-overlay"
                    priority
                />
                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    <div className="mx-auto max-w-3xl">
                        <AnimatedSection className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                            <ShieldAlert className="h-5 w-5 text-accent" />
                            Guide Expert : Punaises de Lit à Orléans
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h1 className="mb-6 text-balance text-5xl font-extrabold leading-tight text-shadow-lg md:text-7xl">
                                Check-list Pré-Traitement : <br />
                                <span className="text-accent">Réussir votre désinsectisation</span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="mb-10 text-pretty text-xl text-white/90 md:text-2xl">
                                Un traitement contre les punaises de lit ne réussit que si la préparation est impeccable.
                                Suivez ce guide pour éliminer définitivement les parasites de votre foyer.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3} className="flex flex-col gap-4 justify-center sm:flex-row">
                            <a href={phoneHref}>
                                <Button size="lg" className="h-16 w-full bg-gradient-accent px-10 text-xl font-bold shadow-xl hover:scale-105 transition-transform">
                                    Besoin d'aide ? {site.phone}
                                </Button>
                            </a>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ERREURS À ÉVITER */}
            <section className="py-20 bg-secondary/30">
                <div className="mx-auto max-w-5xl px-6">
                    <AnimatedSection className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-primary md:text-4xl">5 Erreurs fatales à éviter absolument</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Ne facilitez pas la tâche aux parasites</p>
                    </AnimatedSection>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            { title: "Utiliser des bombes insecticides", desc: "Les sprays du commerce font fuir les punaises dans les murs et les prises, rendant le traitement pro beaucoup plus difficile." },
                            { title: "Déménager ou dormir ailleurs", desc: "Vous emporterez les punaises avec vous ou elles se mettront en dormance en attendant votre retour. Restez dans votre logement." },
                            { title: "Jeter sa literie sans précaution", desc: "En sortant le matelas sans l'emballer, vous semez des œufs et des punaises dans les parties communes de votre immeuble." },
                            { title: "Secouer le linge à l'extérieur", desc: "Cela ne déloge pas les œufs de punaises mais propage l'infestation à vos voisins et sur vos balcons." },
                            { title: "Attendre trop longtemps", desc: "Une seule femelle pond jusqu'à 5 œufs par jour. Plus vous attendez, plus le traitement sera complexe et coûteux." }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.05} className="flex gap-4 rounded-3xl border border-primary/10 bg-white p-6 shadow-realistic transition-all hover:border-red-200">
                                <XCircle className="h-8 w-8 shrink-0 text-red-500" />
                                <div>
                                    <h3 className="font-bold text-primary text-lg">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* LA CHECK-LIST COMPLÈTE */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-6">
                    <AnimatedSection className="rounded-3xl border-2 border-primary/20 bg-white p-8 shadow-realistic md:p-12">
                        <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-primary">
                            <ListChecks className="h-8 w-8 text-accent" />
                            Check-list : Avant le passage du technicien
                        </h2>

                        <div className="space-y-10">
                            <div className="relative pl-8 before:absolute before:left-[11px] before:top-8 before:h-[calc(100%-32px)] before:w-0.5 before:bg-primary/10">
                                <h3 className="mb-6 text-xl font-extrabold text-primary flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[12px]">1</span>
                                    Gestion du Textile (Le plus important)
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Lavez tout le linge à 60°C minimum (draps, rideaux, vêtements).",
                                        "Séchez au sèche-linge pendant au moins 45 minutes à haute température.",
                                        "Stockez le linge propre dans des sacs poubelle neufs et hermétiquement fermés hors des chambres."
                                    ].map((step, i) => (
                                        <li key={i} className="flex gap-3 items-start group">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                                            <span className="text-muted-foreground leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative pl-8">
                                <h3 className="mb-6 text-xl font-extrabold text-primary flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[12px]">2</span>
                                    Préparation du Mobilier
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Dégagez les murs : laissez un espace de 50cm entre les meubles et les parois.",
                                        "Videz intégralement les coffres de lit et les tables de nuit.",
                                        "Passez l'aspirateur sur les plinthes et la structure du lit (jetez le sac immédiatement dehors)."
                                    ].map((step, i) => (
                                        <li key={i} className="flex gap-3 items-start group">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                                            <span className="text-muted-foreground leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 rounded-2xl bg-primary/5 p-6 border border-primary/10 flex items-start gap-4">
                            <Info className="h-6 w-6 shrink-0 text-primary" />
                            <p className="text-sm text-primary/80 leading-relaxed italic">
                                <strong>Important :</strong> Un logement bien préparé multiplie par deux les chances de succès dès le premier passage. Nos techniciens Déclic Parasites utilisent une combinaison de chaleur et de traitements certifiés pour une efficacité maximale.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA INTERVENTION */}
            <section className="py-20 bg-secondary/10 text-center">
                <div className="mx-auto max-w-4xl px-6">
                    <AnimatedSection className="rounded-3xl bg-white p-10 shadow-realistic border border-primary/10">
                        <h2 className="text-3xl font-bold text-primary mb-6">Ne laissez pas les punaises gagner</h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Nous avons aidé des centaines de foyers à Orléans à retrouver le sommeil grâce à nos protocoles haute performance.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <a href={phoneHref}>
                                <Button size="lg" className="h-16 bg-gradient-accent px-10 text-xl font-bold shadow-xl hover:shadow-2xl transition-all">
                                    <Phone className="mr-2 h-6 w-6" />
                                    Diagnostic Gratuit
                                </Button>
                            </a>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="h-16 border-2 border-primary text-xl font-bold text-primary hover:bg-primary/5">
                                    Demander un devis
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
