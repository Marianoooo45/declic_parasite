import Link from "next/link";
import Image from "next/image";
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
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  Shield,
  Leaf,
  Zap,
  Check,
} from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/config/services";

const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => euroFormatter.format(value);

export const revalidate = 86400;

export default function Home() {
  const featuredServices = services.slice(0, 6);
  const footerServices = services.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ext.same-assets.com/3682338552/2516073472.jpeg"
            alt="Intervention antiparasitaire"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 text-sm text-white bg-white/15 border border-white/25 rounded-full mb-6">
              Service professionnel & écologique
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-shadow-md heading-balance">
              Protégez-vous des nuisibles
            </h1>
            <p className="text-xl text-white/90 mb-8 text-shadow-md">
              Solutions professionnelles et raisonnées pour éliminer{" "}
              <span className="text-primary font-semibold">
                rats, souris, cafards, punaises de lit, frelons
              </span>{" "}
              et autres nuisibles. Intervention rapide sous 24h à {site.city} et
              dans le {site.departement}.
            </p>

            {/* Location tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {site.serviceArea.map((location) => (
                <span
                  key={location}
                  className="px-3 py-1 text-sm text-white rounded-full bg-white/15 border border-white/25"
                >
                  {location}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  data-cta="hero-primary"
                >
                  Demander une intervention
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 bg-transparent text-white hover:bg-white/10"
                  data-cta="hero-secondary"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </div>

            {/* Testimonials preview */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <Image
                  src="https://ext.same-assets.com/3682338552/2543569328.jpeg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="https://ext.same-assets.com/3682338552/3664885857.jpeg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="https://ext.same-assets.com/3682338552/734188741.jpeg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="text-white">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold">
                  98% de clients satisfaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-primary">
              Nos services
            </span>
            <h2 className="heading-balance mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
              Solutions professionnelles de lutte antiparasitaire
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Intervention rapide et efficace à {site.city} et dans le {site.departement}. Devis gratuit, passage sous 24–48h.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Card
                key={service.slug}
                className="group flex h-full flex-col overflow-hidden border border-gray-200/80 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <h3 className="heading-balance text-xl font-semibold">{service.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.short}</p>
                  </div>
                  {service.priceFrom ? (
                    <p className="text-sm font-semibold text-primary">
                      À partir de {formatCurrency(service.priceFrom)}
                    </p>
                  ) : null}
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline"
                      data-cta="home-service-card"
                    >
                      Découvrir le service <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                data-cta="services-all"
              >
                Voir tous nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://ext.same-assets.com/3682338552/747423111.jpeg"
                alt="Technicien en intervention"
                width={600}
                height={700}
                className="rounded-lg"
              />
              <div className="absolute bottom-6 left-6 rounded-lg bg-white/95 p-4 text-foreground shadow-lg backdrop-blur">
                <div className="text-primary font-bold text-lg mb-1">
                  Plus de 15 ans
                </div>
                <div className="text-sm prose-muted">
                  d&apos;expérience professionnelle
                </div>
              </div>
            </div>
            <div>
              <span className="text-primary font-semibold mb-2 block uppercase tracking-wide text-sm">
                À propos de nous
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight heading-balance mb-6">
                Entreprise orléanaise spécialisée dans la lutte antiparasitaire
              </h2>
              <p className="prose-muted mb-4">
                {site.brand} protège foyers et entreprises du Loiret avec des
                méthodes raisonnées : diagnostic précis, traitement adapté,
                prévention durable.
              </p>
              <p className="prose-muted mb-6">
                Nos techniciens certifiés interviennent rapidement, avec des
                produits homologués et des protocoles conformes aux normes.
              </p>

              <div className="mb-6 rounded-lg border border-primary/20 bg-cyan-50/70 p-6" id="zones">
                <h3 className="font-semibold flex items-center gap-2 mb-3 text-primary">
                  <MapPin className="h-5 w-5 text-primary" />
                  Notre zone d&apos;intervention
                </h3>
                <p className="prose-muted mb-4">
                  {site.serviceArea.join(", ")}.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="prose-muted">
                    Techniciens certifiés Certibiocide & démarches compatibles
                    HACCP.
                  </span>
                </div>
              </div>

              <p className="prose-muted">
                Nous éliminons rats, souris, cafards, punaises de lit, frelons,
                guêpes, fourmis et autres nuisibles sans compromettre la santé
                de votre foyer ni l&apos;environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="bg-gray-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="heading-balance mb-6 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
            Pourquoi choisir {site.brand} ?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Des experts certifiés, des méthodes raisonnées et des interventions rapides
            pour des résultats durables et sécurisés.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Certifications",
                desc: "Certibiocide & protocoles HACCP",
                color: "bg-cyan-100 text-cyan-600",
              },
              {
                icon: Leaf,
                title: "Méthodes raisonnées",
                desc: "Solutions respectueuses & ciblées",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Shield,
                title: "Sécurité maximale",
                desc: "Produits homologués & procédures",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Zap,
                title: "Intervention rapide",
                desc: `Sous 24h dans le ${site.departement}`,
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="text-center p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${item.color}`}
                >
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 heading-balance">
                  {item.title}
                </h3>
                <p className="prose-muted text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                data-cta="why-contact"
              >
                Demander un devis gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="avis"
        className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 py-20 md:py-24 text-white"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://ext.same-assets.com/3682338552/1387163323.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-balance mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                Nos certifications et engagements
              </h2>
              <p className="heading-balance mb-8 text-lg text-white/80">
                {site.brand} applique des standards stricts en matière de santé,
                de sécurité et de traçabilité.
              </p>
              <ul className="space-y-3">
                {[
                  "Suivi personnalisé jusqu’à 6 mois",
                  "Compatibilité HACCP pour établissements alimentaires",
                  "Certibiocide à jour",
                  "Méthodes raisonnées & respectueuses",
                  "Techniciens formés en continu",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button
                  className="mt-8 bg-primary hover:bg-primary/90"
                  data-cta="certifications-contact"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Suivi 6 mois", icon: Shield },
                { title: "Compatible HACCP", icon: Shield },
                { title: "Méthodes raisonnées", icon: Leaf },
                { title: "Service 24/7", icon: Clock },
              ].map((cert, idx) => (
                <Card
                  key={idx}
                  className="border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <cert.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold heading-balance">{cert.title}</h4>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-green-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="heading-balance mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Nos tarifs transparents
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Des forfaits clairs adaptés à vos besoins, intervention garantie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Dératisation",
                subtitle: "Traitement rongeurs (rats, souris)",
                price: "99€",
              },
              {
                title: "Punaises de lit",
                subtitle: "Éradication et suivi",
                price: "99€",
              },
              {
                title: "Parasites d’intérieur",
                subtitle: "Puces, mites, acariens…",
                price: "99€",
              },
              {
                title: "Insectes volants",
                subtitle: "Guêpes, frelons, moustiques",
                price: "99€",
              },
            ].map((pricing, idx) => (
              <Card
                key={idx}
                className="flex h-full flex-col border-t-4 border-primary p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-primary mb-2 heading-balance">
                  {pricing.title}
                </h3>
                <p className="prose-muted text-sm mb-4">{pricing.subtitle}</p>
                <div className="text-3xl font-bold mb-6">
                  À partir de {pricing.price} !
                </div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Urgences sous 24h",
                    "Méthodes raisonnées disponibles",
                    "Garantie de résultat",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm prose-muted"
                    >
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    data-cta="pricing-card-quote"
                  >
                    Demander un devis
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-center prose-muted">
            Les tarifs varient selon la surface, le niveau d&apos;infestation et
            l&apos;accessibilité des zones. Devis personnalisé gratuit.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 py-20 md:py-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://ext.same-assets.com/3682338552/301579433.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="heading-balance mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Avis clients
            </h2>
            <p className="heading-balance mx-auto mb-6 max-w-2xl text-white/80">
              Ce que disent nos clients du Loiret
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold">5.0</span>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/70">(nouveaux avis)</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Marie D.",
                date: "5 novembre 2025",
                text: `Intervention rapide pour des punaises de lit. Équipe pro et rassurante. Merci ${site.brand} !`,
                img: "https://ext.same-assets.com/3682338552/1413338339.jpeg",
              },
              {
                name: "Antoine Cauzot",
                date: "29 octobre 2025",
                text: "Problème de cafards réglé en une visite, avec conseils de prévention.",
                img: "https://ext.same-assets.com/3682338552/1399058106.jpeg",
              },
              {
                name: "Sophie L.",
                date: "22 octobre 2025",
                text: "Nid de guêpes retiré proprement. Très pro.",
                img: "https://ext.same-assets.com/3682338552/2212862298.jpeg",
              },
            ].map((review, idx) => (
              <Card
                key={idx}
                className="border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-4 italic text-white/80">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.img}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold heading-balance">{review.name}</div>
                    <div className="text-sm text-white/70">{review.date}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center"
            >
              <Button
                variant="outline"
                className="border-white/70 text-white hover:bg-white/10"
                data-cta="reviews-contact"
              >
                Laisser un avis / Nous écrire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-primary">
              Contactez-nous
            </span>
            <h2 className="heading-balance mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Besoin d&apos;une intervention ?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Décrivez-nous votre situation, on vous rappelle rapidement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold heading-balance">Nos coordonnées</h3>

              <Card className="flex items-start gap-4 border border-gray-200/80 p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 heading-balance">Adresse</h4>
                  <p className="prose-muted text-sm">{site.address}</p>
                </div>
              </Card>

              <Card className="flex items-start gap-4 border border-gray-200/80 p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 heading-balance">Téléphone</h4>
                  <p className="prose-muted text-sm">{site.phone}</p>
                </div>
              </Card>

              <Card className="flex items-start gap-4 border border-gray-200/80 p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 heading-balance">Email</h4>
                  <p className="prose-muted text-sm">{site.email}</p>
                </div>
              </Card>

              <div className="rounded-lg border border-green-500/40 bg-green-50 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-green-800">Disponible maintenant</span>
                </div>
                <p className="mt-1 text-sm prose-muted">
                  Intervention rapide à {site.city} et alentours — appelez-nous !
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border border-gray-200/80 p-8 shadow-sm">
              <h3 className="text-2xl font-semibold heading-balance mb-6">
                Demander un devis gratuit
              </h3>
              <form
                className="space-y-4"
                method="POST"
                action="/api/contact"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <Input name="name" placeholder="Votre nom" required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="vous@email.fr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service souhaité
                  </label>
                  <Select name="service">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.slug} value={service.slug}>
                          {service.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="autres">Autre demande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Décrivez votre problème..."
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  data-cta="home-contact-submit"
                >
                  Envoyer ma demande
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <Image
                src="https://ext.same-assets.com/3682338552/158279188.png"
                alt={site.brand}
                width={150}
                height={40}
                className="mb-4"
              />
              <p className="text-gray-300 text-sm mb-4">
                {site.brand} — dératisation, désinsectisation et prévention à{" "}
                {site.city} et dans le {site.departement}.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-lg border border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-bold">Engagement qualité</span>
                </div>
                <p className="text-sm text-gray-300">
                  Produits homologués, procédures documentées.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 transition-colors hover:text-primary"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 transition-colors hover:text-primary"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#why"
                    className="text-gray-300 transition-colors hover:text-primary"
                  >
                    Pourquoi nous choisir
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4">Nos services</h4>
              <ul className="space-y-2 text-sm">
                {footerServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-gray-300 transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact & horaires</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{site.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{site.phone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{site.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">
                    Lun–Ven: 7h30–19h | Sam: 8h–17h
                  </span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-900/50 rounded-lg border border-red-500/30">
                <div className="font-bold text-sm mb-1">Urgences 24/7</div>
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 mt-2">
                    Appeler maintenant
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} {site.brand}. Tous droits
                réservés. | {site.siret}
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  Mentions légales
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Politique de confidentialité
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  CGV
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
