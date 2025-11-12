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
import Image from "next/image";
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
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://ext.same-assets.com/3682338552/3131086727.png"
              alt={`${site.brand} Logo`}
              width={160}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </div>
          <ul className="hidden lg:flex items-center gap-8 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Accueil
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-primary">
                Pourquoi nous choisir
              </a>
            </li>
            <li>
                <Link href="/zones-intervention" className="hover:text-primary">
                    Zones d&apos;intervention
                </Link>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>
              <Button className="bg-primary hover:bg-primary/90">
                <Phone className="h-4 w-4 mr-2" />
                {site.phone}
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ext.same-assets.com/3682338552/2516073472.jpeg"
            alt="Intervention antiparasitaire"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary rounded-full text-sm mb-6">
              Service professionnel & écologique
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Protégez-vous des nuisibles
            </h1>
            <p className="text-xl text-white/90 mb-8">
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
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm border border-white/20"
                >
                  {location}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Demander une intervention
                </Button>
              </a>
              <a href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 bg-[#232b9f]"
                >
                  Découvrir nos services
                </Button>
              </a>
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
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">
              Nos Services
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Solutions professionnelles de lutte antiparasitaire
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Intervention rapide et efficace à {site.city} et dans le{" "}
              {site.departement}. Devis gratuit, passage sous 24–48h.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Rongeurs",
                desc: "Dératisation contre rats et souris : diagnostic, traitement et prévention.",
                img: "https://ext.same-assets.com/3682338552/1948484312.jpeg",
                icon: "🐭",
              },
              {
                title: "Punaises de lit",
                desc: "Traitements complets et suivis pour éradiquer durablement.",
                img: "https://ext.same-assets.com/3682338552/3358422514.jpeg",
                icon: "🛏️",
              },
              {
                title: "Cafards",
                desc: "Élimination professionnelle des blattes avec garantie de résultat.",
                img: "https://ext.same-assets.com/3682338552/1543100924.jpeg",
                icon: "🪳",
              },
              {
                title: "Fourmis",
                desc: "Traitements ciblés des colonies et prévention des réinfestations.",
                img: "https://ext.same-assets.com/3682338552/3460722811.jpeg",
                icon: "🐜",
              },
              {
                title: "Mouches",
                desc: "Solutions efficaces contre mouches domestiques et moucherons.",
                img: "https://ext.same-assets.com/3682338552/3369907977.jpeg",
                icon: "🪰",
              },
              {
                title: "Insectes volants",
                desc: "Destruction de nids de guêpes et frelons. Intervention d’urgence.",
                img: "https://ext.same-assets.com/3682338552/2493716904.jpeg",
                icon: "🐝",
              },
              {
                title: "Contrats pro",
                desc: "Restaurants, hôtels, commerces : plans HACCP & visites régulières.",
                img: "https://ext.same-assets.com/3682338552/3045999635.jpeg",
                icon: "🏢",
              },
              {
                title: "Parasites d’intérieur",
                desc: "Puces, mites, acariens : identification et traitement adaptés.",
                img: "https://ext.same-assets.com/3682338552/2913864722.jpeg",
                icon: "🏠",
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <a
                    href="#contact"
                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    En savoir plus <span>→</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Voir tous nos services
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
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
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-primary font-bold text-lg mb-1">
                  Plus de 15 ans
                </div>
                <div className="text-gray-600 text-sm">
                  d&apos;expérience professionnelle
                </div>
              </div>
            </div>
            <div>
              <span className="text-primary font-semibold mb-2 block">
                À propos de nous
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Entreprise orléanaise spécialisée dans la lutte antiparasitaire
              </h2>
              <p className="text-gray-600 mb-4">
                {site.brand} protège foyers et entreprises du Loiret avec des
                méthodes raisonnées : diagnostic précis, traitement adapté,
                prévention durable.
              </p>
              <p className="text-gray-600 mb-6">
                Nos techniciens certifiés interviennent rapidement, avec des
                produits homologués et des protocoles conformes aux normes.
              </p>

              <div className="bg-cyan-50 border-l-4 border-primary p-6 rounded-lg mb-6" id="zones">
                <h3 className="font-bold flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  Notre zone d&apos;intervention
                </h3>
                <p className="text-gray-600 mb-4">
                  {site.serviceArea.join(", ")}.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>
                    Techniciens certifiés Certibiocide & démarches compatibles
                    HACCP.
                  </span>
                </div>
              </div>

              <p className="text-gray-600">
                Nous éliminons rats, souris, cafards, punaises de lit, frelons,
                guêpes, fourmis et autres nuisibles sans compromettre la santé
                de votre foyer ni l&apos;environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Pourquoi choisir {site.brand} ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="text-center p-8 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Demander un devis gratuit
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
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
              <h2 className="text-4xl font-bold mb-6">
                Nos certifications et engagements
              </h2>
              <p className="text-gray-300 mb-8">
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
              <a href="#contact">
                <Button className="mt-8 bg-primary hover:bg-primary/90">
                  Nous contacter
                </Button>
              </a>
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
                  className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <cert.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">{cert.title}</h4>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nos tarifs transparents</h2>
            <p className="text-gray-600">
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
                className="p-6 hover:shadow-lg transition-shadow border-t-4 border-primary"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {pricing.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{pricing.subtitle}</p>
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
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Demander un devis
                  </Button>
                </a>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            Les tarifs varient selon la surface, le niveau d&apos;infestation et
            l&apos;accessibilité des zones. Devis personnalisé gratuit.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://ext.same-assets.com/3682338552/301579433.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Avis clients</h2>
            <p className="text-gray-300 mb-6">
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
                <p className="text-sm text-gray-300">(nouveaux avis)</p>
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
                className="p-6 bg-white/10 backdrop-blur-sm border-white/20"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.img}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-gray-400">{review.date}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center"
            >
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Laisser un avis / Nous écrire
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">
              Contactez-nous
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Besoin d&apos;une intervention ?
            </h2>
            <p className="text-gray-600">
              Décrivez-nous votre situation, on vous rappelle rapidement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>

              <Card className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Adresse</h4>
                  <p className="text-gray-600">{site.address}</p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Téléphone</h4>
                  <p className="text-gray-600">{site.phone}</p>
                </div>
              </Card>

              <Card className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-gray-600">{site.email}</p>
                </div>
              </Card>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-bold">Disponible maintenant</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Intervention rapide à {site.city} et alentours — appelez-nous !
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">
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
                      <SelectItem value="deratisation">
                        Dératisation
                      </SelectItem>
                      <SelectItem value="punaises">Punaises de lit</SelectItem>
                      <SelectItem value="cafards">Cafards</SelectItem>
                      <SelectItem value="fourmis">Fourmis</SelectItem>
                      <SelectItem value="autres">Autres</SelectItem>
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
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
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
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#why" className="text-gray-300 hover:text-primary transition-colors">
                    Pourquoi nous choisir
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4">Nos services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Dératisation {site.city}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Traitement punaises de lit
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Traitement cafards
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Frelons et guêpes
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-300 hover:text-primary transition-colors">
                    Contrats professionnels
                  </a>
                </li>
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
