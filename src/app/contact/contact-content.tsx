"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: services[0]?.slug ?? "",
  message: "",
  consent: false,
};

type FormState = typeof initialForm;

type SubmissionStatus = "idle" | "loading" | "success" | "error" | "fallback";

export default function ContactPageContent() {
  const [formState, setFormState] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const phoneHref = useMemo(
    () => `tel:${site.phone.replace(/\s+/g, "")}`,
    [],
  );

  const selectedService = services.find((service) => service.slug === formState.service);
  const serviceLabel = selectedService?.title ?? (formState.service === "autre" ? "Autre demande" : formState.service);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!formState.name || !formState.email || !formState.phone || !formState.message) {
      setFeedback("Merci de renseigner tous les champs obligatoires.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setFeedback("Adresse email invalide.");
      setStatus("error");
      return;
    }

    if (!formState.consent) {
      setFeedback("Merci d'accepter la politique de confidentialité.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const payload = {
      ...formState,
      serviceLabel,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        setFeedback("Merci ! Votre demande a bien été envoyée. Nous revenons vers vous très vite.");
        setFormState({ ...initialForm });
        return;
      }

      fallbackToMailto();
    } catch (error) {
      console.error("contact-submit", error);
      fallbackToMailto();
    }
  };

  const fallbackToMailto = () => {
    setStatus("fallback");
    const subject = encodeURIComponent(`Demande de devis - ${serviceLabel || "Intervention nuisibles"}`);
    const body = encodeURIComponent(
      `Nom: ${formState.name}\nEmail: ${formState.email}\nTéléphone: ${formState.phone}\nService: ${serviceLabel}\n\nMessage:\n${formState.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setFeedback("Nous ouvrons votre messagerie pour finaliser l'envoi. Vous pouvez également nous appeler directement.");
  };

  return (
    <div className="relative min-h-screen bg-background">
      <section className="relative overflow-hidden py-20 text-white md:py-28">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80"
          alt="Technicien désinsectisation inspectant un logement"
          fill
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2919]/90 via-[#1d4e2b]/85 to-[#0f2718]/88" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            Réponse en moins d&apos;1h ouvrée
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Contact & devis : choisissez votre canal préféré
          </h1>
          <p className="mt-4 text-pretty text-lg text-white/85 md:text-xl">
            Formulaire en ligne, email direct ou appel téléphonique : nous nous adaptons à votre manière de communiquer pour
            sécuriser rapidement votre habitat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link href="#contact-form" className="inline-flex">
              <Button className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-accent/90">
                Remplir le formulaire
              </Button>
            </Link>
            <a href={`mailto:${site.email}`} className="inline-flex" data-cta="contact-mail">
              <Button
                variant="outline"
                className="rounded-full border-white/60 bg-white/15 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/25"
              >
                <Mail className="mr-2 h-5 w-5" /> Envoyer un mail
              </Button>
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a href={phoneHref} data-cta="contact-call" className="inline-flex">
              <Button
                variant="secondary"
                className="rounded-full border border-white/50 bg-white/15 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-white/25"
              >
                <Phone className="mr-2 h-5 w-5" /> Parler à un expert
              </Button>
            </a>
            <Link href="/services" className="inline-flex">
              <Button
                variant="ghost"
                className="rounded-full px-6 py-3 text-base font-semibold text-white hover:bg-white/15"
              >
                Voir nos services
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Formulaire guidé",
                description: "Détaillez votre situation en quelques champs, photos et préférences de rappel incluses.",
                icon: CheckCircle2,
              },
              {
                title: "Email direct",
                description: `Envoyez-nous un message sur ${site.email} : nous répondons avec un plan d'action personnalisé.`,
                icon: Mail,
              },
              {
                title: "Appel prioritaire",
                description: "Besoin d&apos;un diagnostic immédiat ? Un technicien vous rappelle pour caler une intervention.",
                icon: Phone,
              },
            ].map((item) => (
              <Card key={item.title} className="border-white/20 bg-white/10 text-white shadow-lg shadow-black/20 backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/85">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-3xl border border-primary/10 bg-white/95 p-8 shadow-xl md:p-10">
              <h2 className="text-balance text-3xl font-semibold text-primary md:text-4xl">
                Formulaire de contact
              </h2>
              <p className="mt-2 text-pretty text-base text-muted-foreground">
                Détaillez votre situation, nous revenons vers vous en moins d&apos;une heure ouvrée avec un plan d&apos;action personnalisé.
              </p>

              {feedback ? (
                <div
                  className={`mt-6 rounded-md border p-4 text-sm ${
                    status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : status === "fallback"
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {feedback}
                </div>
              ) : null}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} data-cta="contact-form" id="contact-form">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary">Nom</label>
                    <Input
                      name="name"
                      placeholder="Votre nom complet"
                      value={formState.name}
                      onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="vous@email.fr"
                      value={formState.email}
                      onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary">Téléphone</label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formState.phone}
                      onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary">Service souhaité</label>
                    <Select
                      name="service"
                      value={formState.service}
                      onValueChange={(value) => setFormState((prev) => ({ ...prev, service: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="autre">Autre demande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Décrivez votre problématique (lieu, type de nuisible, urgence...)"
                    value={formState.message}
                    onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-secondary/70 p-4 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary"
                    checked={formState.consent}
                    onChange={(event) => setFormState((prev) => ({ ...prev, consent: event.target.checked }))}
                    required
                  />
                  <label htmlFor="consent">
                    J'accepte que {site.brand} me contacte au sujet de ma demande. Mes données ne seront jamais revendues.
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary/90"
                  disabled={status === "loading"}
                  data-cta="contact-submit"
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-primary">Contact direct</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choisissez ce qui vous convient le mieux : mail pour détailler, appel pour décider rapidement.
                </p>
                <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3 rounded-2xl bg-primary/5 p-3">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href={`mailto:${site.email}`} className="hover:text-primary">
                        {site.email}
                      </a>
                      <p className="text-xs text-muted-foreground">Réponse sous 1h ouvrée avec un plan écrit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-accent/10 p-3">
                    <Phone className="mt-0.5 h-5 w-5 text-accent" />
                    <div>
                      <div className="font-semibold text-foreground">Téléphone</div>
                      <a href={phoneHref} className="hover:text-primary">
                        {site.phone}
                      </a>
                      <p className="text-xs text-muted-foreground">Privilégiez l'appel en cas d'urgence 24/7.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                    <div>
                      <div className="font-semibold text-foreground">Zone d’intervention</div>
                      <p>{site.serviceArea.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-accent" />
                    <div>
                      <div className="font-semibold text-foreground">Horaires</div>
                      <p>Lun–Ven : 7h30–19h • Sam : 8h–17h • Urgences 24/7</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-3xl border border-primary/10 bg-white p-0 shadow-lg">
                <div className="relative h-52 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-cc69c40007a1?auto=format&fit=crop&w=1400&q=80"
                    alt="Technicien équipé en combinaison lors d'une désinfection"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary">Un expert se déplace rapidement</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Véhicule banalisé, équipement Certibiocide et protocole adapté à votre logement ou votre commerce. Vous êtes
                    informé de chaque étape.
                  </p>
                </div>
              </Card>

              <Card className="rounded-3xl border border-primary/10 bg-secondary/60 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-primary">Pourquoi nous choisir ?</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {["Techniciens certifiés Certibiocide", "Protocoles compatibles HACCP", "Intervention 24–48h", "98% de clients satisfaits"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
