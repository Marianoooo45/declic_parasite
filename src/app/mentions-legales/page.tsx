import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, Server, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Mentions Légales",
    description:
        "Mentions légales du site Déclic Parasites - Informations juridiques et légales.",
    alternates: {
        canonical: "https://www.declicparasites.fr/mentions-legales",
    },
};

export default function MentionsLegalesPage() {
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
                    <h1 className="text-3xl font-bold md:text-4xl">Mentions Légales</h1>
                    <p className="mt-3 text-white/80">
                        Informations légales conformes à la loi LCEN du 21 juin 2004
                    </p>
                </div>
            </section>

            <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 lg:py-16">
                <div className="space-y-8">
                    {/* Éditeur */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Éditeur du site
                            </h2>
                        </div>
                        <div className="grid gap-3 text-sm md:grid-cols-2">
                            <div>
                                <p className="font-semibold text-foreground">Raison sociale</p>
                                <p className="text-muted-foreground">Déclic Parasites</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Forme juridique</p>
                                <p className="text-muted-foreground">
                                    Société par Actions Simplifiée (SAS)
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Capital social</p>
                                <p className="text-muted-foreground">800,00 €</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">RCS</p>
                                <p className="text-muted-foreground">
                                    995 019 072 R.C.S. Orléans
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">N° EUID</p>
                                <p className="text-muted-foreground">FR4502.995019072</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Siège social</p>
                                <p className="text-muted-foreground">
                                    295 rue du Pressoir Aubry, 45160 Olivet
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Téléphone</p>
                                <p className="text-muted-foreground">
                                    <a href="tel:+33246915502" className="text-primary hover:underline">
                                        02 46 91 55 02
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Email</p>
                                <p className="text-muted-foreground">
                                    <a
                                        href="mailto:contact@declicparasites.fr"
                                        className="text-primary hover:underline"
                                    >
                                        contact@declicparasites.fr
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                            <p className="text-sm">
                                <span className="font-semibold">Directeur de la publication :</span>{" "}
                                Le Président de la société Déclic Parasites
                            </p>
                        </div>
                    </div>

                    {/* Hébergement */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Server className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">Hébergement</h2>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="font-semibold text-foreground">Hébergeur</p>
                                <p className="text-muted-foreground">
                                    Vercel Inc.
                                    <br />
                                    440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                                    <br />
                                    <a
                                        href="https://vercel.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        www.vercel.com
                                    </a>
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Nom de domaine</p>
                                <p className="text-muted-foreground">
                                    Enregistré auprès de OVH SAS
                                    <br />
                                    2 rue Kellermann, 59100 Roubaix, France
                                    <br />
                                    <a
                                        href="https://www.ovh.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        www.ovh.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activité */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">Activité</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Services de décontamination d'espaces intérieurs ou extérieurs, de
                            prévention et de lutte contre tous types de nuisibles et
                            parasites, ainsi que l'entretien, le nettoyage et la désinfection
                            des vide-ordures et locaux annexes.
                        </p>
                    </div>

                    {/* Propriété intellectuelle */}
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-primary">
                                Propriété intellectuelle
                            </h2>
                        </div>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                L'ensemble du contenu de ce site (textes, images, logos, vidéos,
                                éléments graphiques) est la propriété exclusive de Déclic
                                Parasites ou de ses partenaires.
                            </p>
                            <p>
                                Toute reproduction, représentation, modification, publication ou
                                adaptation de tout ou partie des éléments du site est interdite
                                sans autorisation écrite préalable de Déclic Parasites.
                            </p>
                        </div>
                    </div>

                    {/* Responsabilité & Liens */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h3 className="mb-3 font-bold text-foreground">
                                Limitation de responsabilité
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Déclic Parasites s'efforce de fournir des informations exactes
                                et à jour, mais ne peut garantir l'exactitude ou l'exhaustivité
                                des informations disponibles sur ce site.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h3 className="mb-3 font-bold text-foreground">
                                Liens hypertextes
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Le site peut contenir des liens vers d'autres sites. Déclic
                                Parasites décline toute responsabilité quant au contenu de ces
                                sites externes.
                            </p>
                        </div>
                    </div>

                    {/* Données personnelles */}
                    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8">
                        <h3 className="mb-3 font-bold text-primary">Données personnelles</h3>
                        <p className="text-sm text-muted-foreground">
                            Pour toute information relative à la collecte et au traitement de
                            vos données personnelles, consultez notre{" "}
                            <Link
                                href="/politique-confidentialite"
                                className="font-semibold text-primary hover:underline"
                            >
                                Politique de Confidentialité (RGPD)
                            </Link>
                            .
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-muted-foreground">
                        <p>Droit applicable : Droit français</p>
                        <p className="mt-1">Dernière mise à jour : Décembre 2025</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
