"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { site } from "@/config/site";
import { services } from "@/config/services";
import {
  Award,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Zap,
} from "lucide-react";

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

  const selectedService = services.find(
    (service) => service.slug === formState.service,
  );
  const serviceLabel =
    selectedService?.title ??
    (formState.service === "autre" ? "Autre demande" : formState.service);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (
      !formState.name ||
      !formState.email ||
      !formState.phone ||
      !formState.message
    ) {
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
        setFeedback(
          "Merci ! Votre demande a bien été envoyée. Nous revenons vers vous très vite.",
        );
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
    const subject = encodeURIComponent(
      `Demande de devis - ${
        serviceLabel || "Intervention nuisibles"
      }`,
    );
    const body = encodeURIComponent(
      `Nom: ${formState.name}\nEmail: ${
        formState.email
      }\nTéléphone: ${
        formState.phone
      }\nService: ${serviceLabel}\n\nMessage:\n${formState.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setFeedback(
      "Nous ouvrons votre messagerie pour finaliser l'envoi. Vous pouvez également nous appeler directement.",
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-24 text-white lg:py-28">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80"
          alt="Technicien désinsectisation inspectant un logement"
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          sizes="100vw"
          priority
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Zap className="h-4 w-4 text-accent" />
            Réponse en moins d&apos;1h ouvrée
          </div>

          <h1 className="text-balance text-5xl font-bold leading-tight text-shadow-lg md:text-6xl">
            Contact &amp; devis gratuit
          </h1>

          <p className="mt-6 text-pretty text-xl text-white/90 md:text-2xl">
            Formulaire en ligne, email direct ou appel téléphonique : choisissez
            votre canal préféré pour sécuriser rapidement votre habitat.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="#contact-form">
              <Button
                size="lg"
                className="h-14 bg-accent px-10 text-lg font-bold shadow-2xl hover:bg-accent/90"
              >
                <Send className="h-5 w-5" />
                Remplir le formulaire
              </Button>
            </Link>
            <a href={`mailto:${site.email}`} data-cta="contact-mail">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-2 border-white bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Mail className="h-5 w-5" />
                Envoyer un email
              </Button>
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Par téléphone",
                desc: `Diagnostic immédiat au ${site.phone}`,
              },
              {
                icon: Mail,
                title: "Par email",
                desc: `Réponse sous 1h à ${site.email}`,
              },
              {
                icon: Send,
                title: "Par formulaire",
                desc: "Détaillez votre situation en 2 min",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-white/20 bg-white/10 p-4 text-left backdrop-blur-sm"
              >
                <item.icon className="mb-2 h-6 w-6 text-accent" />
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="text-xs text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Formulaire guidé",
                description:
                  "Détaillez votre situation en quelques champs, photos et préférences de rappel incluses.",
                icon: CheckCircle2,
              },
              {
                title: "Email direct",
                description: `Envoyez-nous un message sur ${site.email} : nous répondons avec un plan d'action personnalisé.`,
                icon: Mail,
              },
              {
                title: "Appel prioritaire",
                description:
                  "Besoin d'un diagnostic immédiat ? Un technicien vous rappelle pour caler une intervention.",
                icon: Phone,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-white/20 bg-white/10 text-white shadow-lg shadow-black/20 backdrop-blur"
              >
                <div className="flex items-start gap-3 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/85">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE + INFO */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            {/* FORMULAIRE */}
            <div className="rounded-3xl border-2 border-primary/20 bg-white p-8 shadow-realistic md:p-10">
              <h2 className="text-balance text-3xl font-bold text-primary md:text-4xl">
                Formulaire de contact
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Détaillez votre situation, nous revenons vers vous en moins
                d&apos;une heure ouvrée avec un plan d&apos;action
                personnalisé.
              </p>

              {feedback && (
                <div
                  className={`mt-6 rounded-xl border-2 p-4 text-sm font-medium ${
                    status === "success"
                      ? "border-green-500 bg-green-50 text-green-800"
                      : status === "fallback"
                      ? "border-amber-500 bg-amber-50 text-amber-800"
                      : "border-red-500 bg-red-50 text-red-800"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <form
                id="contact-form"
                className="mt-8 space-y-6 scroll-mt-72"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Nom <span className="text-accent">*</span>
                    </label>
                    <Input
                      name="name"
                      placeholder="Votre nom complet"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="h-12 border-2"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Email <span className="text-accent">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="vous@email.fr"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="h-12 border-2"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Téléphone <span className="text-accent">*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                      className="h-12 border-2"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Service souhaité
                    </label>
                    <Select
                      name="service"
                      value={formState.service}
                      onValueChange={(value) =>
                        setFormState((prev) => ({
                          ...prev,
                          service: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            key={service.slug}
                            value={service.slug}
                          >
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="autre">
                          Autre demande
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-primary">
                    Message <span className="text-accent">*</span>
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Décrivez votre problématique : lieu, type de nuisible, niveau d'urgence..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={6}
                    required
                    className="border-2"
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl border-2 border-primary/20 bg-secondary/30 p-4">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-5 w-5 rounded border-2 border-primary text-primary focus:ring-2 focus:ring-primary"
                    checked={formState.consent}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        consent: e.target.checked,
                      }))
                    }
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground"
                  >
                    J&apos;accepte que {site.brand} me contacte au sujet de ma
                    demande. Mes données ne seront jamais revendues.
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-14 w-full text-lg font-bold shadow-lg"
                  disabled={status === "loading"}
                  data-cta="contact-submit"
                >
                  {status === "loading" ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Envoyer ma demande
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* COLONNE INFO */}
            <div className="space-y-6">
              {/* CONTACT DIRECT */}
              <div className="rounded-3xl border-2 border-primary/20 bg-white p-6 shadow-lg">
                <h3 className="text-xl font-bold text-primary">
                  Contact direct
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choisissez ce qui vous convient : email pour détailler, appel
                  pour décider rapidement.
                </p>

                <div className="mt-6 space-y-4">
                  <a href={`mailto:${site.email}`} className="block">
                    <div className="flex items-start gap-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-4 transition-all hover:border-primary hover:bg-primary/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">
                          Email
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {site.email}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Réponse sous 1h ouvrée
                        </p>
                      </div>
                    </div>
                  </a>

                  <a href={phoneHref} className="block">
                    <div className="flex items-start gap-4 rounded-xl border-2 border-accent/30 bg-accent/5 p-4 transition-all hover:border-accent hover:bg-accent/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">
                          Téléphone
                        </div>
                        <div className="text-sm font-bold text-accent">
                          {site.phone}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Urgence 24/7 disponible
                        </p>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-xl border-2 border-border bg-secondary/30 p-4">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-bold text-foreground">
                        Zone d&apos;intervention
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {site.serviceArea.slice(0, 5).join(", ")}...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border-2 border-border bg-secondary/30 p-4">
                    <Clock className="mt-1 h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-bold text-foreground">
                        Horaires
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lun–Ven : 7h30–19h • Sam : 8h–17h
                      </p>
                      <p className="text-xs font-semibold text-accent">
                        Urgences 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPERT */}
              <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                    alt="Technicien équipé lors d'une intervention"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">
                    Un expert se déplace
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Véhicule banalisé, équipement Certibiocide et protocole
                    adapté à votre logement ou commerce. Vous êtes informé de
                    chaque étape.
                  </p>
                </div>
              </div>

              {/* GARANTIES */}
              <div className="rounded-3xl border-2 border-primary/20 bg-secondary/30 p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-bold text-primary">
                  Nos garanties
                </h3>
                <ul className="space-y-3">
                  {[
                    "Techniciens certifiés Certibiocide",
                    "Protocoles compatibles HACCP",
                    "Intervention 24–48h garantie",
                    "98% de clients satisfaits",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
