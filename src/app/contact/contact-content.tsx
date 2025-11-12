"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

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
import {
  CheckCircle2,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Shield,
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
    <div className="relative min-h-screen bg-white">
      <section className="bg-slate-900 py-20 text-white md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-balance text-4xl font-extrabold tracking-tight md:text-5xl">
              Contact & Devis
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Réponse rapide sous 1h ouvrée, intervention 24–48h sur {site.departement}.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Certibiocide & HACCP
              </span>
              <span className="inline-flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" /> Méthodes raisonnées
              </span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={phoneHref} data-cta="contact-call" className="inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" /> Appeler {site.phone}
                </Button>
              </a>
              <Link href="/services" className="inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  Voir nos services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="border border-gray-200/80 p-8 shadow-sm">
              <h2 className="heading-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                Formulaire de contact
              </h2>
              <p className="mt-2 text-muted-foreground">
                Détaillez votre situation, nous revenons vers vous en moins d'une heure ouvrée.
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

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} data-cta="contact-form">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Nom</label>
                    <Input
                      name="name"
                      placeholder="Votre nom complet"
                      value={formState.name}
                      onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Email</label>
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
                    <label className="mb-2 block text-sm font-semibold">Téléphone</label>
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
                    <label className="mb-2 block text-sm font-semibold">Service souhaité</label>
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
                  <label className="mb-2 block text-sm font-semibold">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Décrivez votre problématique (lieu, type de nuisible, urgence...)"
                    value={formState.message}
                    onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
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
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={status === "loading"}
                  data-cta="contact-submit"
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="border border-gray-200/80 p-6 shadow-sm">
                <h3 className="heading-balance text-xl font-semibold">Contact direct</h3>
                <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Téléphone</div>
                      <a href={phoneHref} className="hover:text-primary">
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href={`mailto:${site.email}`} className="hover:text-primary">
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Zone d’intervention</div>
                      <p>{site.serviceArea.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Horaires</div>
                      <p>Lun–Ven : 7h30–19h • Sam : 8h–17h • Urgences 24/7</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border border-gray-200/80 p-6 shadow-sm">
                <h3 className="heading-balance text-xl font-semibold">Pourquoi nous choisir ?</h3>
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

      <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <a href={phoneHref} className="block" data-cta="contact-sticky-call">
          <Button className="w-full bg-primary text-white hover:bg-primary/90">
            <Phone className="mr-2 h-4 w-4" /> Appeler {site.phone}
          </Button>
        </a>
      </div>
    </div>
  );
}
