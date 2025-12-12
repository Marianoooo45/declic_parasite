// config/blog.ts - Structure améliorée pour faciliter les ajouts futurs

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
  publishedAt: string; // Format YYYY-MM-DD
  readingTime: string; // Ex: "5 min"
  tags: string[]; // Tags pour le SEO et la catégorisation
  intro: string; // Premier paragraphe enrichi
  sections: BlogPostSection[]; // Corps de l'article
  sources?: string[]; // Sources et références
  author?: string; // Optionnel : nom de l'auteur
  featured?: boolean; // Pour mettre en avant certains articles
};

/**
 * GUIDE POUR AJOUTER UN NOUVEL ARTICLE :
 * 
 * 1. Créez un nouvel objet BlogPost dans le tableau blogPosts ci-dessous
 * 2. Choisissez un slug unique (ex: "comment-prevenir-rats-orleans")
 * 3. Ajoutez une image de couverture (idéalement 1200x630px)
 * 4. Structurez votre contenu en sections avec heading + body
 * 5. Ajoutez des images aux sections pour illustrer vos propos
 * 6. Utilisez des tags pertinents pour le SEO
 * 
 * BONNES PRATIQUES IMAGES :
 * - Image de couverture : format paysage 16:9, haute qualité
 * - Images de sections : format portrait ou carré, illustrent le propos
 * - Alt text descriptif et SEO-friendly
 * - Légendes courtes et informatives
 * 
 * STRUCTURE RECOMMANDÉE :
 * - Introduction (intro) : 2-3 phrases qui résument l'article
 * - 3 à 5 sections pour un article standard
 * - Alternez sections avec et sans images pour la fluidité
 * - Paragraphes courts et scannables (3-4 lignes max)
 */

export const blogPosts: BlogPost[] = [
  {
    slug: "plan-action-anti-nuisibles-orleans-loiret",
    title: "Plan d'action anti-nuisibles à Orléans et dans le Loiret",
    excerpt:
      "Comment sécuriser votre logement ou commerce lorsque des nuisibles apparaissent ? Notre check-list locale vous accompagne étape par étape.",
    cover: "https://www.cergy.fr/wp-content/uploads/2025/07/david-farkas-zFOVEGC0UCE-unsplash.jpg",
    publishedAt: "2025-11-15",
    readingTime: "6 min",
    tags: ["Désinsectisation", "Orléans", "Loiret", "Guide pratique"],
    featured: true,
    intro:
      "Avec la douceur des saisons et les spécificités climatiques du Loiret, les nuisibles trouvent rapidement refuge dans nos habitations. Cafards dans les cuisines orléanaises, rats dans les caves du centre historique, fourmis envahissant les terrasses... Voici notre méthode Déclic Parasites, rodée sur le terrain à <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a>, pour reprendre la main efficacement et durablement.",
    sections: [
      {
        heading: "1. Inspecter méthodiquement chaque zone avant d'agir",
        body: [
          "La première étape cruciale consiste à identifier précisément les points d'entrée et les zones d'activité des nuisibles. Munissez-vous d'une lampe torche et de votre smartphone pour documenter ce que vous observez : traces de déjections, chemins de passage, zones de grignotage, fissures dans les murs.",
          "À <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a> et dans son agglomération, nos diagnostics révèlent que près de 70% des infestations commencent par un simple défaut d'étanchéité : bas de porte mal ajusté, passage de gaines non colmaté, aérations sans grillage, joints de fenêtre dégradés. Dans les bâtiments anciens du centre-ville, les caves voûtées et les vides sanitaires sont particulièrement vulnérables.",
          "Photographiez systématiquement ces indices. Ces images serviront de base au technicien pour élaborer un plan d'action ciblé et vous permettront de suivre l'évolution de la situation dans le temps. Un bon diagnostic fait gagner jusqu'à 50% de temps sur le traitement.",
        ],
        image: {
          src: "https://www.docteur-nuisibles.com/assets/img/blog/conseilsimple-blog3.jpg",
          alt: "Technicien professionnel inspectant les recoins d'un logement avec une lampe torche",
          caption: "L'inspection minutieuse permet d'identifier tous les points d'entrée et zones à risque.",
        },
      },
      {
        heading: "2. Choisir le protocole de traitement adapté à chaque nuisible",
        body: [
          "Chaque espèce de nuisible nécessite une approche spécifique et des produits dédiés. Les <a href='https://fr.wikipedia.org/wiki/Blattella_germanica' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>blattes germaniques</a> qui prolifèrent dans les cuisines d'<a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a> répondent mieux aux gels alimentaires appliqués au plus près de leurs refuges. Les <a href='https://fr.wikipedia.org/wiki/Rattus_rattus' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>rats noirs</a>, fréquents dans les combles des maisons orléanaises, nécessitent des appâts sécurisés placés sur leurs trajets habituels. Les <a href='https://fr.wikipedia.org/wiki/Monomorium_pharaonis' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>fourmis pharaons</a> requièrent un traitement en barrage avec des insecticides rémanents.",
          "Nos équipes du <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a> ont développé un schéma d'intervention en deux passages systématiques : un traitement choc initial pour réduire drastiquement la population, suivi d'un contrôle et ajustement 15 jours plus tard. Cette méthode, certifiée <a href='https://www.ecologie.gouv.fr/biocides' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Certibiocide</a>, garantit un résultat durable tout en limitant l'exposition aux produits biocides.",
          "Chaque intervention est tracée avec photos avant/après, fiches techniques des produits utilisés et plan de localisation des points de traitement. Cette documentation complète rassure les assurances habitation et permet un suivi rigoureux de l'efficacité du protocole.",
        ],
        image: {
          src: "https://www.lexpert-des-nuisibles.fr/pub/20230314_164149.jpg",
          alt: "Application professionnelle de gel insecticide dans une cuisine",
          caption: "Application ciblée de gel biocide dans les zones à risque d'une cuisine professionnelle.",
        },
      },
      {
        heading: "3. Mettre en place une stratégie de prévention dès la première visite",
        body: [
          "Le traitement seul ne suffit pas : la prévention est la clé d'un résultat durable. Dès la première intervention, nos techniciens identifient les facteurs favorisant l'infestation et proposent des solutions concrètes : pose de grillages anti-rongeurs sur les bouches d'aération, application de joints silicone en cuisine et salle de bain, installation de seuils de porte adaptés.",
          "Dans le centre d'<a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a> comme en zone rurale du <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a>, nous constatons que ces mesures préventives réduisent les risques de réinfestation de plus de 60% sur 12 mois. Pour les commerces de bouche et restaurants, nous recommandons également un nettoyage renforcé des zones de stockage, l'utilisation de conteneurs hermétiques pour les denrées, et la formation du personnel aux bonnes pratiques d'hygiène.",
          "Un suivi téléphonique ou par SMS est systématiquement proposé une semaine après l'intervention. Cette vigilance continue permet d'ajuster rapidement les dispositifs si nécessaire, de renforcer une zone sensible détectée tardivement, ou simplement de rassurer nos clients sur l'absence de signes de retour. Cette approche proactive fait toute la différence sur la durée.",
        ],
      },
      {
        heading: "4. Adapter le traitement aux spécificités locales du Loiret",
        body: [
          "Le <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a> présente des particularités qui influencent directement notre façon d'intervenir. La proximité de <a href='https://fr.wikipedia.org/wiki/Loire_(fleuve)' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>la Loire</a> crée des zones humides favorables aux rongeurs et aux insectes rampants. Les variations de température entre les bords du fleuve et les plateaux de <a href='https://fr.wikipedia.org/wiki/Beauce' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Beauce</a> obligent à ajuster les protocoles selon la saison.",
          "En hiver, les nuisibles cherchent refuge dans les habitations chauffées, multipliant les infestations de caves et de greniers. Au printemps et en été, les zones extérieures (jardins, terrasses, abris) deviennent des points d'entrée privilégiés. Nos interventions tiennent compte de ces cycles naturels pour maximiser l'efficacité des traitements.",
          "À <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a>, la densité du bâti ancien avec ses caves en pierre, ses cours intérieures et ses immeubles mitoyens nécessite souvent une approche coordonnée avec les voisins ou les syndics de copropriété. Nous facilitons cette coordination en proposant des diagnostics groupés et des traitements simultanés pour éviter les migrations de nuisibles d'un logement à l'autre.",
        ],
        image: {
          src: "https://img.freepik.com/photos-premium/vue-panoramique-aerienne-orleans-france_78361-12672.jpg",
          alt: "Vue aérienne d'Orléans avec la Loire",
          caption: "La proximité de la Loire influence les stratégies de traitement anti-nuisibles dans le Loiret.",
        },
      },
      {
        heading: "5. Assurer un suivi post-intervention rigoureux",
        body: [
          "Le succès d'une intervention anti-nuisibles se mesure dans la durée. C'est pourquoi nous incluons systématiquement un suivi sur 30 jours minimum, avec des points de contrôle réguliers et des ajustements si nécessaire. Nos clients reçoivent un rapport détaillé après chaque passage, avec recommandations personnalisées et photos des zones traitées.",
          "Pour les professionnels (restaurants, hôtels, commerces alimentaires), nous proposons des contrats de maintenance préventive avec visites programmées et interventions curatives illimitées. Ces contrats incluent la traçabilité <a href='https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/HACCP' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>HACCP</a>, indispensable lors des contrôles sanitaires, ainsi que l'accès à une ligne d'urgence 24/7.",
          "Notre objectif est de construire une relation de confiance sur le long terme. Beaucoup de nos clients particuliers nous sollicitent ensuite pour des diagnostics préventifs annuels ou nous recommandent à leurs proches. Cette satisfaction client, mesurée à 98% dans le <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a>, est le résultat d'une approche professionnelle, transparente et humaine.",
        ],
      },
    ],
    sources: [
      "Orléans Métropole - Site officiel de la métropole orléanaise : https://www.orleans-metropole.fr/",
      "Département du Loiret - Site officiel du conseil départemental : https://www.loiret.fr/",
      "Blattella germanica (Blatte germanique) - Wikipedia : https://fr.wikipedia.org/wiki/Blattella_germanica",
      "Rattus rattus (Rat noir) - Wikipedia : https://fr.wikipedia.org/wiki/Rattus_rattus",
      "Monomorium pharaonis (Fourmi pharaon) - Wikipedia : https://fr.wikipedia.org/wiki/Monomorium_pharaonis",
      "La Loire (fleuve) - Wikipedia : https://fr.wikipedia.org/wiki/Loire_(fleuve)",
      "Beauce (région naturelle) - Wikipedia : https://fr.wikipedia.org/wiki/Beauce",
      "Certification Certibiocide - Ministère de la Transition écologique : https://www.ecologie.gouv.fr/biocides",
      "HACCP (Hazard Analysis Critical Control Point) - DGCCRF : https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/HACCP",
    ],
  },

  /**
   * TEMPLATE POUR UN NOUVEL ARTICLE :
   * 
   * Décommentez et complétez le template ci-dessous pour ajouter facilement un nouvel article.
   * Pensez à respecter la structure et les bonnes pratiques mentionnées en haut de ce fichier.
   */
  
  /*
  {
    slug: "votre-slug-unique",
    title: "Titre accrocheur de votre article",
    excerpt: "Description courte qui donne envie de cliquer (150-160 caractères idéalement).",
    cover: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2024-12-20",
    readingTime: "5 min",
    tags: ["Tag1", "Tag2", "Tag3"],
    featured: false, // true pour mettre en avant sur la page d'accueil
    author: "Expert Déclic Parasites", // Optionnel
    intro: "Premier paragraphe qui résume l'article et capte l'attention du lecteur...",
    sections: [
      {
        heading: "Première section : titre H2 descriptif",
        body: [
          "Premier paragraphe de la section...",
          "Deuxième paragraphe de la section...",
          "Troisième paragraphe si nécessaire...",
        ],
        image: {
          src: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=800&q=80",
          alt: "Description accessible de l'image pour le SEO",
          caption: "Légende courte et informative de l'image.",
        },
      },
      {
        heading: "Deuxième section sans image",
        body: [
          "Contenu de la section...",
        ],
        // Pas d'image dans cette section
      },
      // Ajoutez autant de sections que nécessaire
    ],
    sources: [
      "Titre de la source 1 : URL complète",
      "Titre de la source 2 : URL complète",
    ],
  },
  */
];

/**
 * FONCTIONS UTILITAIRES POUR LA GESTION DU BLOG
 */

// Récupérer les articles mis en avant
export const getFeaturedPosts = () => 
  blogPosts.filter(post => post.featured);

// Récupérer les articles par tag
export const getPostsByTag = (tag: string) => 
  blogPosts.filter(post => post.tags.includes(tag));

// Récupérer les articles récents (N derniers)
export const getRecentPosts = (count: number = 3) => 
  blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);

// Récupérer tous les tags uniques
export const getAllTags = () => 
  Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort();

// Statistiques du blog
export const getBlogStats = () => ({
  totalPosts: blogPosts.length,
  totalTags: getAllTags().length,
  averageReadingTime: Math.round(
    blogPosts.reduce((sum, post) => 
      sum + parseInt(post.readingTime.replace(' min', '')), 0
    ) / blogPosts.length
  ),
});