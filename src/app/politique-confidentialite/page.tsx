import { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    Cookie,
    Database,
    FileCheck,
    Lock,
    Mail,
    Scale,
    Shield,
    User,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Politique de Confidentialité",
    description:
        "Politique de confidentialité et RGPD du site Déclic Parasites - Protection de vos données personnelles.",
    alternates: {
        canonical: "https://www.declicparasites.fr/politique-confidentialite",
    },
};

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
            {/* Hero compact */}
            <section className="bg-gradient-primary py-12 text-white lg:py-16">
                <div className="container mx-auto max-w-4xl px-4 md:px-6">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour à l'accueil
                    </Link>
                    <h1 className="text-3xl font-bold md:text-4xl">
                        Politique de Confidentialité
                    </h1>
                    <p className="mt-3 text-white/80">
                        Protection de vos données conformément au RGPD
                    </p>
                </div>
            </section>

            <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:py-16">
                <div className="space-y-8">
                    {/* Responsable du traitement */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Responsable du traitement
                            </h2>
                        </div>
                        <div className="grid gap-2 text-sm md:grid-cols-2">
                            <p>
                                <span className="font-semibold">Société :</span> Déclic
                                Parasites (SAS)
                            </p>
                            <p>
                                <span className="font-semibold">Capital :</span> 800 €
                            </p>
                            <p>
                                <span className="font-semibold">RCS :</span> 995 019 072 R.C.S.
                                Orléans
                            </p>
                            <p>
                                <span className="font-semibold">Adresse :</span> 295 rue du
                                Pressoir Aubry, 45160 Olivet
                            </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <a
                                href="mailto:contact@declicparasites.fr"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                                <Mail className="h-4 w-4" />
                                contact@declicparasites.fr
                            </a>
                            <a
                                href="tel:+33246915502"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
                            >
                                02 46 91 55 02
                            </a>
                        </div>
                    </div>

                    {/* Données collectées */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Database className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Données collectées
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-secondary/30 p-4">
                                <h3 className="mb-2 font-semibold text-foreground">
                                    Données fournies
                                </h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Civilité, nom et prénom</li>
                                    <li>• Adresse postale</li>
                                    <li>• Adresse email</li>
                                    <li>• Numéro de téléphone</li>
                                    <li>• Nature de votre demande</li>
                                </ul>
                            </div>
                            <div className="rounded-xl bg-secondary/30 p-4">
                                <h3 className="mb-2 font-semibold text-foreground">
                                    Données automatiques
                                </h3>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Adresse IP</li>
                                    <li>• Données de navigation</li>
                                    <li>• Type de navigateur</li>
                                    <li>• Système d'exploitation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Finalités */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <FileCheck className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Finalités du traitement
                            </h2>
                        </div>
                        <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                Répondre à vos demandes de devis
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                Planifier les interventions
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                Assurer le suivi client
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                Améliorer nos services
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                Respecter nos obligations légales
                            </li>
                        </ul>
                    </div>

                    {/* Base légale */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Scale className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Base légale du traitement
                            </h2>
                        </div>
                        <div className="grid gap-3 text-sm md:grid-cols-2">
                            <div className="rounded-lg border border-border p-3">
                                <p className="font-semibold text-foreground">Consentement</p>
                                <p className="text-muted-foreground">Formulaire de contact</p>
                            </div>
                            <div className="rounded-lg border border-border p-3">
                                <p className="font-semibold text-foreground">
                                    Exécution d'un contrat
                                </p>
                                <p className="text-muted-foreground">Prestation de services</p>
                            </div>
                            <div className="rounded-lg border border-border p-3">
                                <p className="font-semibold text-foreground">Intérêt légitime</p>
                                <p className="text-muted-foreground">
                                    Amélioration des services
                                </p>
                            </div>
                            <div className="rounded-lg border border-border p-3">
                                <p className="font-semibold text-foreground">
                                    Obligations légales
                                </p>
                                <p className="text-muted-foreground">
                                    Facturation, comptabilité
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Durée de conservation */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Durée de conservation
                            </h2>
                        </div>
                        <div className="grid gap-3 text-sm md:grid-cols-3">
                            <div className="text-center rounded-xl bg-secondary/30 p-4">
                                <p className="text-2xl font-bold text-primary">3 ans</p>
                                <p className="text-muted-foreground">Données de contact</p>
                            </div>
                            <div className="text-center rounded-xl bg-secondary/30 p-4">
                                <p className="text-2xl font-bold text-primary">5 ans</p>
                                <p className="text-muted-foreground">Données clients</p>
                            </div>
                            <div className="text-center rounded-xl bg-secondary/30 p-4">
                                <p className="text-2xl font-bold text-primary">13 mois</p>
                                <p className="text-muted-foreground">Données navigation</p>
                            </div>
                        </div>
                    </div>

                    {/* Vos droits */}
                    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">Vos droits RGPD</h2>
                        </div>
                        <div className="grid gap-2 text-sm md:grid-cols-2">
                            <p>
                                <span className="font-semibold">Accès :</span> obtenir une copie
                                de vos données
                            </p>
                            <p>
                                <span className="font-semibold">Rectification :</span> corriger
                                des données inexactes
                            </p>
                            <p>
                                <span className="font-semibold">Effacement :</span> demander la
                                suppression
                            </p>
                            <p>
                                <span className="font-semibold">Limitation :</span> limiter le
                                traitement
                            </p>
                            <p>
                                <span className="font-semibold">Portabilité :</span> récupérer
                                vos données
                            </p>
                            <p>
                                <span className="font-semibold">Opposition :</span> vous opposer
                                au traitement
                            </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <a
                                href="mailto:contact@declicparasites.fr"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/90"
                            >
                                <Mail className="h-4 w-4" />
                                Exercer mes droits
                            </a>
                            <a
                                href="https://www.cnil.fr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 font-semibold text-primary transition hover:bg-primary/10"
                            >
                                Contacter la CNIL
                            </a>
                        </div>
                    </div>

                    {/* Cookies & Sécurité */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <div className="mb-3 flex items-center gap-2">
                                <Cookie className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-foreground">Cookies</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <span className="font-semibold">Essentiels :</span>{" "}
                                    fonctionnement du site
                                </li>
                                <li>
                                    <span className="font-semibold">Analytiques :</span> Google
                                    Analytics (audience)
                                </li>
                            </ul>
                            <p className="mt-3 text-xs text-muted-foreground">
                                Configurez votre navigateur pour gérer les cookies.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <div className="mb-3 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-foreground">Sécurité</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Nous mettons en œuvre des mesures techniques et
                                organisationnelles pour protéger vos données. Notre site utilise
                                le protocole HTTPS.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-muted-foreground">
                        <p>
                            Nous ne vendons ni ne louons vos données personnelles à des tiers.
                        </p>
                        <p className="mt-1">Dernière mise à jour : Décembre 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
