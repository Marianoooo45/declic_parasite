export type BlogPostSection = {
  heading: string;
  body: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  intro: string;
  sections: BlogPostSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "plan-action-anti-nuisibles-orleans-loiret",
    title: "Plan d'action anti-nuisibles à Orléans et dans le Loiret",
    excerpt:
      "Comment sécuriser votre logement ou commerce lorsque des nuisibles apparaissent ? Notre check-list locale vous accompagne étape par étape.",
    cover: "/blog/orleans-loiret-traitement-nuisibles.svg",
    publishedAt: "2024-05-15",
    readingTime: "5 min",
    tags: ["Désinsectisation", "Orléans", "Loiret", "Conseils"],
    intro:
      "Avec la douceur des saisons, les cafards, fourmis ou rongeurs se faufilent rapidement dans les habitations du Loiret. Voici notre méthode Déclic Parasites, conçue sur le terrain à Orléans, pour reprendre la main sans stress.",
    sections: [
      {
        heading: "1. Inspecter chaque zone avant d'agir",
        body: [
          "Repérez précisément les points d'entrée : bas de porte, passages de gaines, combles, arrière-cuisine. Une lampe frontale et un smartphone suffisent pour documenter ce que vous voyez.",
          "Sur Orléans et son agglomération, nous constatons que 70% des infestations commencent par un défaut d'étanchéité. Photographiez les traces, elles serviront au technicien pour cibler le traitement et vous faire gagner du temps.",
        ],
        image: {
          src: "/blog/orleans-loiret-equipe-traitement.svg",
          alt: "Technicien Déclic Parasites inspectant un logement à Orléans dans le Loiret",
          caption: "Inspection d'un faux-plafond avant pulvérisation rémanente.",
        },
      },
      {
        heading: "2. Choisir le bon protocole de traitement",
        body: [
          "Chaque espèce nécessite une stratégie dédiée : gel alimentaire pour les blattes, appâts sécurisés pour les rats, barrages insecticides pour les fourmis. Un protocole clair évite les surdosages et protège les occupants.",
          "Nos équipes du Loiret privilégient un schéma en deux passages : choc puis contrôle, avec traçabilité photo. Cette méthode certifiée Certibiocide limite les relâches de produit et rassure les assurances habitation.",
        ],
      },
      {
        heading: "3. Préparer la prévention dès la première visite",
        body: [
          "Le suivi est la clé : pose de grillages anti-rongeurs, joints silicone en cuisine, nettoyage renforcé des réserves. Dans le centre d'Orléans comme en zone rurale, ces gestes réduisent les risques de réinfestation de plus de 50%.",
          "Nous conseillons également un rappel client par téléphone ou SMS une semaine après intervention pour ajuster les pièges ou renforcer une zone sensible. Cette vigilance continue fait la différence sur la durée.",
        ],
      },
    ],
  },
];
