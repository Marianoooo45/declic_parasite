import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Clock,
    Phone,
    Shield,
    Zap
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const baseUrl = "https://www.declicparasites.fr";

export const metadata: Metadata = {
    title: "Urgence Dératisation Orléans | Intervention Rats & Souris 24/48h",
    description: "Besoin d'une dératisation urgente à Orléans ? Intervention rapide sous 24/48h. Découvrez quoi faire immédiatement en cas de présence de rats ou souris.",
    alternates: {
        canonical: `${baseUrl}/urgence-deratisation-orleans`,
    },
};

export default function UrgenceDeratisationPage() {
    const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

    return (
        <div className="min-h-screen">
            {/* HERO URGENCE */}
            <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-32">
                <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
                    alt="Urgence dératisation Orléans"
                    fill
                    className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
                    priority
                />
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="max-w-3xl">
                        <AnimatedSection className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm text-white">
                            <Zap className="h-5 w-5 text-accent" />
                            Intervention d'urgence 24/48h à Orléans
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h1 className="mb-6 text-balance text-5xl font-extrabold leading-tight text-shadow-lg md:text-7xl">
                                Urgence Dératisation : <br />
                                <span className="text-accent">Rats ou souris ? Agissez maintenant.</span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="mb-10 text-pretty text-xl text-white/90">
                                Une présence de rongeurs détectée ? Ne laissez pas l'infestation s'installer.
                                Nos techniciens interviennent en urgence dans tout le Loiret pour sécuriser votre foyer ou commerce.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3} className="flex flex-col gap-4 sm:flex-row">
                            <a href={phoneHref} className="flex-1 sm:flex-none">
                                <Button size="lg" className="h-16 w-full bg-gradient-accent px-10 text-xl font-extrabold shadow-xl hover:shadow-2xl transition-all">
                                    <Phone className="mr-2 h-6 w-6" />
                                    Appeler : {site.phone}
                                </Button>
                            </a>
                            <Link href="/contact" className="flex-1 sm:flex-none">
                                <Button size="lg" variant="outline" className="h-16 w-full border-2 border-white bg-white/10 px-10 text-xl font-bold text-white backdrop-blur-sm hover:bg-white/20">
                                    Devis express gratuit
                                </Button>
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* QUE FAIRE TOUT DE SUITE */}
            <section className="py-20 bg-secondary/30">
                <div className="mx-auto max-w-4xl px-6">
                    <AnimatedSection className="rounded-3xl border-2 border-primary/10 bg-white p-8 shadow-realistic md:p-12">
                        <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-primary">
                            <AlertTriangle className="h-8 w-8 text-accent" />
                            Réflexes d'urgence : que faire ?
                        </h2>
                        <div className="grid gap-6">
                            {[
                                { title: "Ne pas toucher les rongeurs", desc: "Les rats et souris transmettent des maladies. Ne manipulez jamais un spécimen, même mort, sans équipement." },
                                { title: "Isoler vos denrées", desc: "Mettez vos aliments dans des bocaux en verre ou des boîtes hermétiques. Videz les placards situés au ras du sol." },
                                { title: "Localiser les bruits", desc: "Identifiez les zones et les heures de passage. Cela permet à notre technicien de cibler le traitement immédiatement." },
                                { title: "Ne pas boucher les accès", desc: "Attendez notre passage. Boucher un trou sans traiter emprisonne les rongeurs qui créeront d'autres dégâts ailleurs." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 rounded-2xl bg-secondary/50 p-6 transition-all hover:bg-secondary/70">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* POURQUOI APPELER DÉCLIC */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h2 className="mb-16 text-4xl font-bold text-primary">Pourquoi nous appeler en urgence ?</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { icon: Clock, title: "Réactivité 24/48h", desc: "Nous priorisons les urgences sanitaires pour une intervention rapide à Orléans et dans tout le Loiret." },
                            { icon: Shield, title: "Discrétion Absolue", desc: "Véhicules non logotés sur demande pour protéger l'image de votre commerce ou votre tranquillité." },
                            { icon: CheckCircle2, title: "Garantie de Résultat", desc: "Protocoles certifiés Certibiocide pour une éradication totale et durable dès le premier passage." }
                        ].map((item, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} className="rounded-3xl border-2 border-primary/10 p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-primary/30">
                                <item.icon className="mx-auto mb-6 h-14 w-14 text-accent" />
                                <h3 className="mb-4 text-2xl font-bold text-primary">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <AnimatedSection className="rounded-3xl bg-gradient-primary p-10 text-white shadow-realistic md:p-16 text-center">
                        <h2 className="mb-6 text-4xl font-bold md:text-5xl">Stoppez l'infestation maintenant</h2>
                        <p className="mb-10 text-xl text-white/90">Diagnostic immédiat et devis gratuit par téléphone.</p>
                        <div className="flex flex-col items-center gap-6">
                            <a href={phoneHref}>
                                <Button size="lg" className="h-16 bg-gradient-accent px-12 text-2xl font-bold shadow-2xl hover:scale-105 transition-transform">
                                    <Phone className="mr-3 h-7 w-7" />
                                    {site.phone}
                                </Button>
                            </a>
                            <p className="text-sm font-medium text-white/70">Disponible 24–48h sur tout le secteur d'Orléans</p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
