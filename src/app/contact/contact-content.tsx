"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { site } from "@/config/site";
import { services } from "@/config/services";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Zap,
} from "lucide-react";

// MODIFICATION : Ajout des champs civilité, prénom, nom et adresse
const initialForm = {
  civility: "M.",
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  contactPreference: "telephone",
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

    // MODIFICATION : Validation des nouveaux champs
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.address ||
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

    const contactPreferenceLabel =
      {
        telephone: "Téléphone",
        email: "Email",
        sms: "SMS",
        whatsapp: "WhatsApp",
      }[formState.contactPreference] || formState.contactPreference;

    const messageWithPreference = `${formState.message}\n\nPréférence de rappel : ${contactPreferenceLabel}`;

    const payload = {
      ...formState,
      // On reconstruit un nom complet pour l'API si besoin
      fullName: `${formState.civility} ${formState.firstName} ${formState.lastName}`,
      message: messageWithPreference,
      serviceLabel,
      contactPreferenceLabel,
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
      `Demande de devis - ${serviceLabel || "Intervention nuisibles"}`,
    );

    const contactPreferenceLabel =
      {
        telephone: "Téléphone",
        email: "Email",
        sms: "SMS",
        whatsapp: "WhatsApp",
      }[formState.contactPreference] || formState.contactPreference;

    // MODIFICATION : Corps du mail mis à jour avec les nouvelles infos
    const body = encodeURIComponent(
      `Client: ${formState.civility} ${formState.firstName} ${formState.lastName}\n` +
      `Adresse: ${formState.address}\n` +
      `Email: ${formState.email}\n` +
      `Téléphone: ${formState.phone}\n` +
      `Service: ${serviceLabel}\n` +
      `Préférence de rappel: ${contactPreferenceLabel}\n\n` +
      `Message:\n${formState.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setFeedback(
      "Nous ouvrons votre messagerie pour finaliser l'envoi. Vous pouvez également nous appeler directement.",
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-primary py-12 text-white lg:py-28">
        <Image
          src="https://plus.unsplash.com/premium_photo-1682126082802-983618de1dd9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8"
          alt="Technicien désinsectisation inspectant un logement"
          fill
          className="absolute inset-0 object-cover opacity-20 mix-blend-overlay"
          sizes="100vw"
          priority
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <AnimatedSection className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Zap className="h-4 w-4 text-accent" />
            Réponse en moins d&apos;1h ouvrée
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <h1 className="text-balance text-4xl font-bold leading-tight text-shadow-lg md:text-6xl">
              Contact &amp; devis gratuit
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mt-6 text-pretty text-lg text-white/90 md:text-2xl">
              Formulaire en ligne, email direct ou appel téléphonique : choisissez
              votre canal préféré pour sécuriser rapidement votre habitat.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
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
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <AnimatedSection
                key={i}
                delay={0.05 * i}
                className="rounded-xl border-2 border-white/20 bg-white/10 p-4 text-left backdrop-blur-sm"
              >
                <item.icon className="mb-2 h-6 w-6 text-accent" />
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="text-xs text-white/80">{item.desc}</p>
              </AnimatedSection>
            ))}
          </AnimatedSection>

          <AnimatedSection
            delay={0.3}
            className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3"
          >
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
            ].map((item, i) => (
              <AnimatedSection
                key={item.title}
                delay={0.05 * i}
                className="h-full"
              >
                <Card
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
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* FORMULAIRE + INFO */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            {/* FORMULAIRE */}
            <AnimatedSection className="rounded-3xl border-2 border-primary/20 bg-white p-5 shadow-realistic md:p-10">
              <h2 className="text-balance text-2xl font-bold text-primary md:text-4xl">
                Formulaire de contact
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Détaillez votre situation, nous revenons vers vous en moins
                d&apos;une heure ouvrée avec un plan d&apos;action
                personnalisé.
              </p>

              {feedback && (
                <div
                  className={`mt-6 rounded-xl border-2 p-4 text-sm font-medium ${status === "success"
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
                {/* 1. CIVILITÉ & IDENTITÉ (Nouvelle structure) */}
                <div className="grid gap-6 md:grid-cols-[100px_1fr_1fr]">
                  {/* Civilité */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Civilité
                    </label>
                    <Select
                      name="civility"
                      value={formState.civility}
                      onValueChange={(value) =>
                        setFormState((prev) => ({
                          ...prev,
                          civility: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme.">Mme.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prénom */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Prénom <span className="text-accent">*</span>
                    </label>
                    <Input
                      name="firstName"
                      placeholder="Jean"
                      value={formState.firstName}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      required
                      className="h-12 border-2"
                    />
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-primary">
                      Nom <span className="text-accent">*</span>
                    </label>
                    <Input
                      name="lastName"
                      placeholder="Dupont"
                      value={formState.lastName}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      required
                      className="h-12 border-2"
                    />
                  </div>
                </div>

                {/* 2. ADRESSE (Nouveau champ) */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-primary">
                    Adresse postale <span className="text-accent">*</span>
                  </label>
                  <Input
                    name="address"
                    placeholder="Numéro, Rue, Code Postal, Ville"
                    value={formState.address}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    required
                    className="h-12 border-2"
                  />
                </div>

                {/* 3. CONTACT */}
                <div className="grid gap-6 md:grid-cols-2">
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
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-primary">
                    Comment voulez-vous être recontacté ?
                    <span className="text-accent"> *</span>
                  </label>
                  <Select
                    name="contactPreference"
                    value={formState.contactPreference}
                    onValueChange={(value) =>
                      setFormState((prev) => ({
                        ...prev,
                        contactPreference: value,
                      }))
                    }
                  >
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue placeholder="Choisissez votre canal préféré" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telephone">Appel téléphonique</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 4. SERVICE */}
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

                {/* 5. MESSAGE */}
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
                  <Checkbox
                    id="consent"
                    checked={formState.consent}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({
                        ...prev,
                        consent: checked === true,
                      }))
                    }
                    className="mt-0.5"
                    required
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm font-normal text-muted-foreground cursor-pointer"
                  >
                    J&apos;accepte que {site.brand} me contacte au sujet de ma
                    demande. Mes données ne seront jamais revendues.
                  </Label>
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
            </AnimatedSection>

            {/* COLONNE INFO */}
            <AnimatedSection delay={0.1} className="space-y-6">
              {/* CONTACT DIRECT */}
              <AnimatedSection className="rounded-3xl border-2 border-primary/20 bg-white p-5 shadow-lg md:p-6">
                <h3 className="text-xl font-bold text-primary">
                  Contact direct
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choisissez ce qui vous convient : email pour détailler, appel
                  pour décider rapidement.
                </p>

                <div className="mt-6 space-y-4">
                  <AnimatedSection className="space-y-4">
                    <a href={`mailto:${site.email}`} className="block">
                      <AnimatedSection className="flex items-start gap-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-4 transition-all hover:border-primary hover:bg-primary/10">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="font-bold text-foreground">
                            Email
                          </div>
                          <div className="truncate text-sm font-semibold text-primary">
                            {site.email}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Réponse sous 1h ouvrée
                          </p>
                        </div>
                      </AnimatedSection>
                    </a>

                    <a href={phoneHref} className="block">
                      <AnimatedSection delay={0.05} className="flex items-start gap-4 rounded-xl border-2 border-accent/30 bg-accent/5 p-4 transition-all hover:border-accent hover:bg-accent/10">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
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
                      </AnimatedSection>
                    </a>

                    <AnimatedSection delay={0.1} className="flex items-start gap-4 rounded-xl border-2 border-border bg-secondary/30 p-4">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div className="flex-1">
                        <div className="font-bold text-foreground">
                          Zone d&apos;intervention
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {site.serviceArea.slice(0, 5).join(", ")}...
                        </p>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.15} className="flex items-start gap-4 rounded-xl border-2 border-border bg-secondary/30 p-4">
                      <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
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
                    </AnimatedSection>
                  </AnimatedSection>
                </div>
              </AnimatedSection>

              {/* EXPERT */}
              <AnimatedSection delay={0.2} className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-white shadow-lg">
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
              </AnimatedSection>

              {/* GARANTIES */}
              <AnimatedSection delay={0.25} className="rounded-3xl border-2 border-primary/20 bg-secondary/30 p-6 shadow-lg">
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
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}