import { slugify } from "@/lib/slug";

export type Service = {
  title: string;
  slug?: string;
  short: string;
  description: string;
  heroImage: string;
  priceFrom?: number;
  benefits: string[];
  features: string[];
  faqs: { q: string; a: string }[];
  schemaKeywords?: string[];
  problemDescription: string;
  riskDescription: string;
  preparation?: string[];
};

const baseServices: Service[] = [
  {
    title: "Dératisation (Rats & Souris) à Orléans et dans le Loiret",
    slug: "deratisation",
    short: "Intervention rapide pour rats et souris à Orléans et Loiret",
    description:
      "Experts en dératisation à Orléans et dans le Loiret. Des bruits dans les cloisons ou des traces de grignotage ? Nous sécurisons votre logement ou votre commerce contre les rongeurs (rats, souris) avec un plan d'action complet et durable, certifié Certibiocide.",
    heroImage: "/services/deratisation.svg",
    priceFrom: 99,
    problemDescription: "Les rats et les souris s'invitent dans vos cloisons, vos combles ou vos stocks alimentaires. Une fois installés, ces rongeurs se multiplient à une vitesse fulgurante, causant des bruits nocturnes et des dégradations visibles.",
    riskDescription: "Au-delà des nuisances sonores, les rongeurs rongent les câbles électriques (risque d'incendie), souillent les surfaces et peuvent transmettre des maladies graves comme la leptospirose.",
    preparation: [
      "Identifier les zones où les bruits ou traces sont les plus fréquents",
      "Dégager l'accès aux zones suspectes (placards sous évier, garage, combles)",
      "Ne pas déplacer les nids ou excréments avant notre arrivée (pour diagnostic)",
      "Mettre les aliments entamés dans des boîtes hermétiques rigides",
    ],
    benefits: [
      "Diagnostic précis des points d'entrée",
      "Traitements sécurisés pour l'intérieur et l'extérieur",
      "Suivi et prévention anti-réinfestation",
      "Rapport détaillé pour assurances et bailleurs",
      "Disponibilité 24–48h sur tout le Loiret (Urgence dératisation)",
    ],
    features: [
      "Inspection complète et identification des espèces",
      "Pose de dispositifs anti-rongeurs homologués",
      "Sécurisation des denrées et zones sensibles",
      "Colmatage des accès et points de passage",
      "Conseils d'hygiène et de stockage personnalisés",
      "Suivi après intervention et ajustement si besoin",
      "Rapport photo remis après chaque passage",
    ],
    faqs: [
      {
        q: "Combien de temps pour éliminer totalement les rats ?",
        a: "La majorité des infestations sont maîtrisées en 1 à 2 visites. Nous adaptons la fréquence selon la taille du site et la pression extérieure.",
      },
      {
        q: "Les produits sont-ils dangereux pour les enfants et animaux ?",
        a: "Nous utilisons des postes sécurisés et des appâts certifiés Certibiocide. Ils sont placés hors de portée et contrôlés à chaque passage.",
      },
      {
        q: "Proposez-vous un rapport pour mon assurance ou mon syndic ?",
        a: "Oui, un rapport détaillé avec photos et recommandations est fourni systématiquement après intervention.",
      },
      {
        q: "Intervenez-vous pour les professionnels ?",
        a: "Nous accompagnons commerces, restaurants et collectivités avec des protocoles HACCP et des contrats de suivi sur mesure.",
      },
    ],
    schemaKeywords: [
      "dératisation Orléans",
      "traitement rats Loiret",
      "entreprise dératisation professionnelle",
    ],
  },
  {
    title: "Traitement punaises de lit à Orléans et dans le Loiret",
    slug: "traitement-punaises-de-lit",
    short: "Éradication certifiée des punaises de lit",
    description:
      "Des piqûres au réveil ? Nous combinons vapeur, insecticides ciblés et suivi pour éliminer totalement les punaises de lit et protéger votre sommeil.",
    heroImage: "/services/punaises.svg",
    priceFrom: 149,
    problemDescription: "Les punaises de lit transforment vos nuits en cauchemar. Cachées dans les coutures de matelas ou les lattes de sommier, elles sont quasiment impossibles à éliminer avec des produits du commerce.",
    riskDescription: "En plus des démangeaisons douloureuses, une infestation non traitée entraîne un stress psychologique important, de l'insomnie et un risque élevé de propager les parasites chez vos proches ou vos voisins.",
    preparation: [
      "Laver impérativement tout le linge de lit à 60°C minimum",
      "Passer l'aspirateur minutieusement (et jeter le sac immédiatement)",
      "Dégager les murs et vider les coffres de lit",
      "Éviter de jeter vos meubles : nous pouvons les traiter sur place",
    ],
    benefits: [
      "Méthode combinée vapeur + chimique",
      "Suivi sur 30 jours inclus",
      "Accompagnement préparation des lieux",
      "Produits homologués Certibiocide",
      "Intervention discrète et rapide",
    ],
    features: [
      "Audit de la literie, mobilier et plinthes",
      "Traitement vapeur haute température",
      "Application d'insecticide de contact et rémanent",
      "Piégeage et surveillance post-traitement",
      "Guide de préparation et lavage fourni",
      "Contrôle de suivi 14 jours après",
      "Conseils anti-réinfestation personnalisés",
    ],
    faqs: [
      {
        q: "Faut-il quitter le logement longtemps ?",
        a: "Vous pouvez réintégrer les pièces traitées après 4 heures d'aération. Nous vous guidons sur la préparation et la remise en service.",
      },
      {
        q: "Un seul passage suffit-il ?",
        a: "Nous prévoyons systématiquement une visite de contrôle. La plupart des foyers sont assainis en 2 passages rapprochés.",
      },
      {
        q: "Traitez-vous les immeubles et hôtels ?",
        a: "Oui, nous coordonnons des plans d'éradication complets pour hôtels, résidences et bailleurs sociaux.",
      },
      {
        q: "Pouvez-vous certifier l'éradication ?",
        a: "Un rapport avec photos et recommandations est délivré après la levée des punaises. Nous restons disponibles en cas de récidive.",
      },
    ],
    schemaKeywords: [
      "punaises de lit Orléans",
      "traitement punaises Loiret",
      "désinsectisation literie professionnelle",
    ],
  },
  {
    title: "Traitement cafards et blattes à Orléans et dans le Loiret",
    slug: "traitement-cafards-et-blattes",
    short: "Élimination rapide des blattes et cafards",
    description:
      "Des traces grasses ou des insectes nocturnes dans votre cuisine ? Nous supprimons les cafards et sécurisons votre hygiène alimentaire durablement.",
    heroImage: "/services/cafards.svg",
    priceFrom: 119,
    problemDescription: "Les cafards et les blattes s'insinuent dans les moindres recoins de vos cuisines ou salles de bain. Très résistants, ils se cachent dans l'électroménager et les gaines techniques pour proliférer à l'abri des regards.",
    riskDescription: "Vecteurs de bactéries et d'allergènes, leur présence pose un risque sanitaire majeur (Salmonelle, gastro-entérite) et dégrade l'image de marque des établissements recevant du public.",
    preparation: [
      "Vider les placards de cuisine de leurs denrées alimentaires",
      "Nettoyer les graisses derrière les appareils de cuisson",
      "Réparer les éventuelles fuites d'eau (sources d'abreuvement)",
      "Ne pas utiliser de sprays du commerce 48h avant notre visite",
    ],
    benefits: [
      "Plan HACCP compatible",
      "Gel professionel sans odeur",
      "Traitement des gaines techniques",
      "Rapport photo après intervention",
      "Passage possible en horaires décalés",
    ],
    features: [
      "Inspection nocturne ou thermique des foyers",
      "Application de gels insecticides de dernière génération",
      "Poudrage des gaines et interstices inaccessibles",
      "Installation de pièges de monitoring",
      "Conseils hygiène et étanchéité cuisine",
      "Suivi 15 jours et ajustement si besoin",
      "Traitement des locaux poubelles et annexes",
    ],
    faqs: [
      {
        q: "Les gels sont-ils sans odeur ?",
        a: "Oui, nous utilisons des produits professionnels inodores et sans résidus visibles, adaptés aux cuisines et commerces.",
      },
      {
        q: "Combien de visites prévoir ?",
        a: "Une infestation légère se traite en 1 passage. Nous incluons un contrôle pour les cas plus avancés.",
      },
      {
        q: "Intervenez-vous la nuit ?",
        a: "Nous proposons des créneaux tôt le matin ou tard le soir pour ne pas perturber votre activité.",
      },
      {
        q: "Fournissez-vous un rapport HACCP ?",
        a: "Oui, un rapport traçable conforme HACCP est remis avec les produits utilisés et les préconisations d'hygiène.",
      },
    ],
    schemaKeywords: [
      "désinsectisation cafards Orléans",
      "traitement blattes professionnel",
      "plan HACCP nuisibles",
    ],
  },
  {
    title: "Traitement fourmis invasives à Orléans et dans le Loiret",
    slug: "fourmis",
    short: "Suppression ciblée des colonies de fourmis",
    description:
      "Des fourmis envahissent vos pièces ou terrasses ? Nous neutralisons la colonie à la source pour empêcher tout retour durablement.",
    heroImage: "/services/fourmis.svg",
    priceFrom: 89,
    problemDescription: "Les colonies de fourmis tracent des colonnes ininterrompues jusque dans vos placards ou sur vos plans de travail. Une fois le nid installé sous vos fondations ou lambourdes, les solutions classiques ne suffisent plus.",
    riskDescription: "Certaines espèces peuvent s'attaquer aux isolants ou aux structures en bois. Leur présence en grand nombre devient vite insupportable, surtout dans les zones de préparation alimentaire ou les chambres.",
    preparation: [
      "Repérer les points d'entrée principaux des fourmis",
      "Nettoyer les surfaces avec de l'eau savonneuse pour effacer les pistes de phéromones",
      "Mettre les produits sucrés et protéinés dans des contenants étanches",
    ],
    benefits: [
      "Gel appétent longue durée",
      "Traitement intérieur/extérieur",
      "Protection des enfants et animaux",
      "Suivi préventif offert",
    ],
    features: [
      "Repérage des trajets et nids satellites",
      "Application de gels et appâts adaptés aux espèces",
      "Traitement des seuils, terrasses et murs",
      "Barrage anti-retour aux ouvertures",
      "Conseils pour supprimer les sources d'attraction",
      "Suivi 30 jours avec ajustement gratuit",
    ],
    faqs: [
      {
        q: "Le traitement résiste-t-il à la pluie ?",
        a: "Nous utilisons des appâts hydrofuges et renouvelons si besoin lors du suivi post-intervention.",
      },
      {
        q: "Peut-on rester dans la maison ?",
        a: "Oui, nos produits sont placés de manière sécurisée et ne nécessitent pas d'évacuation.",
      },
      {
        q: "Traitez-vous les fourmis charpentières ?",
        a: "Nous avons des solutions spécifiques pour les fourmis charpentières et pharaons, avec diagnostic structurel.",
      },
      {
        q: "Proposez-vous des contrats saisonniers ?",
        a: "Oui, un plan préventif est possible pour les commerces et copropriétés.",
      },
    ],
    schemaKeywords: [
      "traitement fourmis Orléans",
      "élimination fourmis maison",
      "appât fourmis professionnel",
    ],
  },
  {
    title: "Contrats professionnels HACCP à  Orléans et dans le Loiret",
    slug: "contrats-professionnels-haccp",
    short: "Plan de prévention nuisibles pour pros & collectivités",
    description:
      "Restaurants, hôtels, industries : nous mettons en place un plan HACCP complet avec visites régulières, traçabilité et reporting digital.",
    heroImage: "/services/haccp.svg",
    problemDescription: "Les établissements professionnels font face à des exigences sanitaires strictes. La simple vue d'un nuisible peut mettre en péril votre activité, entraîner des sanctions administratives ou ruiner votre réputation.",
    riskDescription: "Le non-respect des normes HACCP peut mener à une fermeture administrative. Sans un plan de lutte préventif documenté, il est impossible de prouver votre bonne foi aux services de contrôle vétérinaire.",
    preparation: [
      "Préparer vos plans de locaux et anciens rapports d'intervention",
      "Dégager l'accès aux zones de stockage et locaux poubelles",
      "Nommer un référent interne pour le suivi du registre sanitaire",
    ],
    benefits: [
      "Plan de maîtrise personnalisé",
      "Traçabilité digitale complète",
      "Techniciens référents dédiés",
      "Rapports conformes HACCP",
      "Veille réglementaire incluse",
    ],
    features: [
      "Audit initial des risques et obligations",
      "Mise en place de points de contrôle numérotés",
      "Visites programmées et interventions curatives",
      "Rapport en ligne avec photos et actions",
      "Formation du personnel sur les bonnes pratiques",
      "Réunions de suivi trimestrielles",
      "Assistance en cas de contrôle sanitaire",
      "Option astreinte 24/7 pour urgences",
    ],
    faqs: [
      {
        q: "À quelle fréquence intervenez-vous ?",
        a: "La fréquence est définie selon votre activité (mensuelle, bimensuelle ou trimestrielle) avec astreinte en cas d'urgence.",
      },
      {
        q: "Fournissez-vous les plans et attestations ?",
        a: "Oui, tous les documents HACCP et attestations de passage sont fournis en ligne et archivés.",
      },
      {
        q: "Proposez-vous des formations ?",
        a: "Nous formons vos équipes aux bons gestes de prévention nuisibles et à la lecture des rapports.",
      },
      {
        q: "Intervenez-vous sur plusieurs sites ?",
        a: "Nous gérons des parcs multi-sites avec reporting consolidé et interlocuteur unique.",
      },
    ],
    schemaKeywords: [
      "contrat dératisation HACCP",
      "plan de prévention nuisibles entreprise",
      "suivi nuisibles restaurant",
    ],
  },
  {
    title: "Traitement puces & parasites d'intérieur à Orléans et dans le Loiret",
    slug: "puces",
    short: "Assainissement des logements contre puces et acariens",
    description:
      "Morsures au niveau des chevilles ou animaux infestés ? Nous assainissons sols, textiles et recoins pour éliminer puces et parasites intérieurs.",
    heroImage: "/services/puces.svg",
    priceFrom: 109,
    problemDescription: "Les puces envahissent rapidement vos textiles, canapés et parquets. Leurs piqûres répétitives provoquent des allergies et un inconfort permanent pour les habitants comme pour les animaux de compagnie.",
    riskDescription: "Un traitement incomplet (seulement sur l'animal) garantit la réinfestation. Les larves et les œufs peuvent rester en dormance dans votre logement pendant des mois avant de causer une nouvelle vague d'infestation.",
    preparation: [
      "Passer l'aspirateur sur tous les textiles (tapis, canapés) et parquets",
      "Laver le panier et les couvertures des animaux à 60°C",
      "Assurer un traitement vétérinaire pour tous les animaux du foyer",
    ],
    benefits: [
      "Traitement ciblé des zones de repos",
      "Produits compatibles animaux",
      "Décontamination textile",
      "Suivi à 21 jours",
    ],
    features: [
      "Pulvérisation insecticide sur plinthes et sols",
      "Nébulisation fine des textiles et fauteuils",
      "Traitement du véhicule si nécessaire",
      "Conseils nettoyage et aspiration renforcée",
      "Plan de traitement animal conseillé",
      "Visite de contrôle 3 semaines après",
    ],
    faqs: [
      {
        q: "Faut-il traiter les animaux ?",
        a: "Oui, un traitement vétérinaire est indispensable pour éviter la réinfestation. Nous vous conseillons sur la coordination.",
      },
      {
        q: "Peut-on dormir sur place ?",
        a: "Les pièces sont accessibles après ventilation de 2 heures. Nous recommandons cependant de nettoyer la literie après 24 heures.",
      },
      {
        q: "Les produits tachent-ils les tissus ?",
        a: "Non, nos formulations sont transparentes et adaptées aux textiles courants. Un test est réalisé si nécessaire.",
      },
      {
        q: "Proposez-vous un contrôle ?",
        a: "Une visite de suivi est incluse pour vérifier l'efficacité et ajuster si besoin.",
      },
    ],
    schemaKeywords: [
      "traitement puces maison",
      "désinsectisation acariens Orléans",
      "pulvérisation anti puces professionnelle",
    ],
  },
];


export type ServiceWithSlug = Service & { slug: string };

export const services: ServiceWithSlug[] = baseServices.map((service) => ({
  ...service,
  slug: service.slug ?? slugify(service.title),
}));
