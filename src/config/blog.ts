// config/blog.ts

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
  intro: string; // Premier paragraphe enrichi (HTML autorisé)
  sections: BlogPostSection[]; // Corps de l'article
  sources?: string[]; // Sources et références
  author?: string; // Optionnel : nom de l'auteur
  featured?: boolean; // Pour mettre en avant certains articles
};

export const blogPosts: BlogPost[] = [
  // ARTICLE 1 : Rat vs Souris (Mis à jour avec tes images locales)
  {
    slug: "comment-identifier-rat-souris-orleans",
    title: "Rat ou Souris ? Le guide complet pour les identifier à Orléans",
    excerpt:
      "Bruits dans les combles, crottes dans la cuisine... Vous avez un doute ? Apprenez à différencier le rat de la souris pour choisir le bon traitement dans le Loiret.",
    // J'utilise ton image de comparaison en couverture car elle est parlante
    cover: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2025-12-15",
    readingTime: "5 min",
    tags: ["Dératisation", "Rongeurs", "Orléans", "Conseils"],
    featured: true, // Je l'ai passé en TRUE pour le mettre en avant
    intro:
      "C'est la question que nos techniciens entendent le plus souvent lors de leurs interventions à <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a> et dans son agglomération. Identifier correctement le rongeur qui s'invite chez vous n'est pas qu'une question de curiosité : c'est la base d'une dératisation réussie. Entre le <a href='https://fr.wikipedia.org/wiki/Rattus_norvegicus' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>rat brun (surmulot)</a> qui préfère les zones humides des bords de Loire et la <a href='https://fr.wikipedia.org/wiki/Souris_grise' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>souris domestique</a> capable de grimper au 4ème étage d'un immeuble haussmannien, les méthodes de lutte sont radicalement différentes.",
    sections: [
      {
        heading: "1. Morphologie : Les différences physiques visibles",
        body: [
          "Si vous avez la 'chance' d'apercevoir l'intrus, son apparence est le premier indice. La <strong>souris domestique</strong> (<a href='https://fr.wikipedia.org/wiki/Mus_(genre)' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Mus musculus</a>) est petite (3 à 10 cm sans la queue) avec de grandes oreilles proportionnellement à sa tête. Elle est curieuse et très agile.",
          "Le <strong>rat</strong>, qu'il soit noir (des greniers) ou brun (des égouts), est beaucoup plus massif (jusqu'à 25-30 cm). Sa queue est plus épaisse et ses oreilles semblent plus petites par rapport à son corps. Dans le centre ancien d'<a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a>, nous croisons souvent le <strong>rat brun</strong> qui remonte des sous-sols, tandis que la souris se faufile aisément derrière les plinthes des appartements modernes.",
          "Attention aux bébés rats : ils peuvent ressembler à des souris adultes, mais leurs pattes et leur tête sont disproportionnées (comme un chiot).",
        ],
        image: {
          // Utilisation de ton image locale (pense à bien la renommer !)
          src: "/comparaison-rat-souris.png",
          alt: "Schéma comparatif visuel entre un rat brun d'Orléans et une souris",
          caption: "La souris (plus petite, grandes oreilles) vs le rat (corps massif, queue épaisse).",
        },
      },
      {
        heading: "2. Les indices qui ne trompent pas : Crottes et Bruits",
        body: [
          "Souvent, vous ne verrez pas l'animal, mais ses traces. C'est là que l'expertise d'un professionnel fait la différence. La forme et la taille des déjections sont des signatures uniques.",
          "<strong>La Souris :</strong> Ses crottes ressemblent à des grains de riz noirs (3 à 6 mm), pointus aux extrémités. On en trouve beaucoup (50 à 80 par jour !), éparpillées partout. Côté bruit, vous entendrez des grattements légers ('trottinements') dans les cloisons ou les faux plafonds.",
          "<strong>Le Rat :</strong> Ses excréments sont bien plus gros (1 à 2 cm), en forme de noyau d'olive ou de banane, souvent regroupés en latrines. Les bruits sont plus lourds : on a l'impression que quelqu'un marche ou court dans les combles. À proximité des bords de <a href='https://fr.wikipedia.org/wiki/Loire_(fleuve)' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loire</a>, la présence de rats est aussi souvent signalée par des terriers creusés dans le jardin.",
        ],
        image: {
          // Utilisation de ton image locale des crottes
          src: "/crotte-rat-souris.jpg",
          alt: "Photo comparative : crotte de rat orléanais vs crotte de souris",
          caption: "La taille des déjections est l'indicateur le plus fiable pour différencier rat et souris.",
        },
      },
      {
        heading: "3. Où chercher ? Les spécificités du bâti Orléanais",
        body: [
          "Le lieu de découverte est un indice majeur. Dans le <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a>, l'humidité joue un rôle clé.",
          "Les <strong>souris</strong> recherchent la chaleur et la nourriture. On les trouve principalement dans les cuisines (derrière le frigo, sous l'évier), les garde-manger et les placards. Dans les immeubles du centre-ville d'<a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a>, elles utilisent les colonnes techniques pour passer d'un étage à l'autre.",
          "Les <strong>rats</strong> ont besoin de boire quotidiennement. Ils privilégient les zones humides : caves en tuffeau, garages, vides sanitaires, ou les jardins proches des points d'eau. Le rat noir, plus agile, peut toutefois se nicher dans les greniers isolés avec de la laine de verre.",
        ],
      },
      {
        heading: "4. Pourquoi le traitement doit être différent ?",
        body: [
          "Confondre les deux espèces mène souvent à l'échec du traitement. Une tapette à souris ne tuera pas un rat (elle risque juste de le blesser et de le rendre méfiant). À l'inverse, un piège à rat est souvent trop peu sensible pour se déclencher au passage d'une souris légère.",
          "Le comportement alimentaire diffère aussi : le rat est néophobe (il a peur du nouveau) et mettra plusieurs jours avant de toucher à un appât. La souris est curieuse et grignote tout. C'est pourquoi chez <strong>Déclic Parasites</strong>, nous adaptons nos postes d'appâtage sécurisés et nos formulations (pâtes ou blocs) spécifiquement selon l'espèce identifiée lors de notre diagnostic gratuit.",
          "En cas de doute, ou si vous craignez pour la salubrité de votre logement (risques de <a href='https://www.pasteur.fr/fr/centre-medical/fiches-maladies/leptospirose' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>leptospirose</a> via l'urine de rat), n'hésitez pas à faire appel à un expert certifié.",
        ],
        image: {
          // Utilisation de ton image locale des postes d'appâtage
          src: "/poste-rat-souris.jpg",
          alt: "Différence entre un poste sécurisé rat et un poste souris",
          caption: "Le choix du matériel (poste rat plus grand vs poste souris compact) est crucial pour l'efficacité.",
        },
      },
    ],
    sources: [
      "Institut Pasteur - La Leptospirose : https://www.pasteur.fr/fr/centre-medical/fiches-maladies/leptospirose",
      "Orléans Métropole - Gestion des déchets et nuisibles : https://www.orleans-metropole.fr/",
      "Mus Musculus (Souris grise) - Wikipedia : https://fr.wikipedia.org/wiki/Souris_grise",
      "Rattus Norvegicus (Rat brun) - Wikipedia : https://fr.wikipedia.org/wiki/Rattus_norvegicus",
    ],
  },

  // ARTICLE 2 : Le guide des Prix 2025 (SEO Transactionnel)
  {
    slug: "prix-tarif-deratisation-desinsectisation-orleans-2025",
    title: "Combien coûte une intervention anti-nuisibles à Orléans en 2025 ?",
    excerpt:
      "Dératisation, punaises de lit, nids de guêpes... Découvrez les tarifs moyens pratiqués dans le Loiret et comprenez pourquoi un devis sur-mesure est votre seule garantie d'efficacité.",
    cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2025-12-01",
    readingTime: "4 min",
    tags: ["Tarifs", "Devis", "Dératisation", "Orléans"],
    featured: true,
    intro:
      "C'est la première question qu'on nous pose au téléphone : <em>« C'est combien pour enlever des rats ? »</em>. À <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Orléans</a>, comme ailleurs, méfiez-vous des prix d'appel trop alléchants (type « forfait à 49€ ») qui cachent souvent des frais de déplacement exorbitants ou un travail bâclé. Chez <strong>Déclic Parasites</strong>, nous prônons la transparence totale. Voici un guide clair pour comprendre le budget d'une intervention professionnelle dans le <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a>.",
    sections: [
      {
        heading: "1. Pourquoi est-il impossible de donner un prix fixe par téléphone ?",
        body: [
          "Imaginez appeler un garagiste et dire « Ma voiture fait un drôle de bruit, combien ça coûte ? ». Sans voir le véhicule, impossible de répondre honnêtement. C'est pareil pour les nuisibles.",
          "Le tarif d'une intervention dépend de trois facteurs que nous devons vérifier sur place ou par photos détaillées :",
          "• <strong>La surface à traiter :</strong> Dératiser un studio de 20m² rue de Bourgogne n'implique pas la même quantité de produits qu'une maison de 150m² à <a href='https://www.ville-olivet.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Olivet</a> avec jardin et dépendances.",
          "• <strong>Le niveau d'infestation :</strong> Une colonie de rats installée depuis 6 mois nécessitera plusieurs passages et une sécurisation complexe (rebouchage), là où une souris isolée peut être traitée plus vite.",
          "• <strong>L'accessibilité :</strong> Un nid de frelons à hauteur d'homme se traite en 30 minutes. S'il est sous une toiture à 8 mètres de haut nécessitant une échelle spécifique, le coût technique évolue.",
        ],
        image: {
          src: "/devis-transparent-orleans.jpg", // Ajoute une photo de toi faisant un devis ou au téléphone
          alt: "Technicien Déclic Parasites établissant un diagnostic gratuit à Orléans",
          caption: "Chaque situation est unique : c'est pourquoi notre diagnostic initial est gratuit.",
        },
      },
      {
        heading: "2. Les fourchettes de prix moyennes constatées à Orléans (2025)",
        body: [
          "Bien que chaque devis soit unique, voici les ordres de grandeur pour une prestation de qualité professionnelle dans l'agglomération orléanaise (incluant déplacement, produits certifiés et main d'œuvre) :",
          "🐀 <strong>Dératisation (Rats/Souris) :</strong> Comptez généralement entre <strong>120€ et 250€</strong> pour un traitement complet (comprenant souvent 2 passages). Ce prix inclut la mise en place de postes sécurisés et les conseils d'herméticité.",
          "🛏️ <strong>Punaises de lit :</strong> C'est le traitement le plus technique. Pour un appartement type T2/T3, les tarifs débutent souvent autour de <strong>350€ - 450€</strong> pour un protocole chimique complet (2 passages obligatoires). Nous suivons les recommandations du site gouvernemental <a href='https://www.ecologie.gouv.fr/punaises-lit-letat-vous-accompagne' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Stop Punaises</a> pour garantir l'éradication.",
          "🐝 <strong>Nids de guêpes et frelons :</strong> Selon la hauteur et la difficulté, l'intervention se situe souvent entre <strong>90€ et 180€</strong>. L'intervention est garantie : si le nid n'est pas détruit, nous revenons gratuitement. Attention, le <a href='https://agriculture.gouv.fr/le-frelon-asiatique' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>frelon asiatique</a> est classé danger sanitaire et nécessite un équipement spécial.",
          "🐜 <strong>Insectes rampants (Cafards/Fourmis) :</strong> À partir de <strong>110€</strong> pour un traitement par gel professionnel (très efficace et discret).",
        ],
      },
      {
        heading: "3. Le piège des prix « trop bas » et des plateformes nationales",
        body: [
          "En tapant « Dératiseur Orléans » sur Google, vous tomberez sur des plateformes nationales qui sous-traitent à des techniciens qu'ils ne connaissent parfois même pas. Le risque ? Un prix d'appel bas, mais une facture qui gonfle une fois le technicien sur place (« ah mais là c'est un cas spécial... »).",
          "En tant qu'artisan local basé rue Bannier, <strong>Déclic Parasites</strong> n'a pas d'intermédiaire. Le prix annoncé sur le devis est le prix que vous payez. Nous respectons scrupuleusement les règles de la <a href='https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Depannage-a-domicile' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>DGCCRF sur le dépannage à domicile</a>.",
          "De plus, utiliser des produits grand public (vendus en jardinerie) revient souvent plus cher sur le long terme car ils sont moins dosés que nos produits professionnels sous certificat <strong><a href='https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Certibiocide</a></strong> (délivré par le Ministère de la Transition Écologique). Vous en achetez des kilos sans résultat définitif.",
        ],
        image: {
          src: "/produits-pro-vs-commerce.jpg", // Photo de ton matériel pro ou camion
          alt: "Matériel professionnel de désinsectisation utilisé dans le Loiret",
          caption: "L'efficacité professionnelle : un investissement pour votre tranquillité.",
        },
      },
      {
        heading: "4. Votre meilleur atout : Le Diagnostic Gratuit",
        body: [
          "Pourquoi payer pour savoir combien ça va coûter ? Chez nous, l'estimation est offerte.",
          "Nous vous posons les bonnes questions par téléphone (02 46 91 55 02) et si besoin, nous nous déplaçons pour évaluer la situation. Vous recevez un devis clair, net et précis avant le moindre début d'intervention.",
          "N'attendez pas que les dégâts matériels (câbles rongés, isolation souillée) fassent grimper la facture globale. Une intervention précoce est toujours plus économique !",
        ],
      },
    ],
    sources: [
      "Ministère de la Transition Écologique - Certibiocide : https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides",
      "DGCCRF - Fiche pratique Dépannage à domicile : https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Depannage-a-domicile",
      "Stop Punaises (Gouvernement) : https://www.ecologie.gouv.fr/punaises-lit-letat-vous-accompagne",
    ],
  },
  // ARTICLE 3 : Plan d'action (Le plus ancien - 15 Nov 2025)
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
          "Nos équipes du <a href='https://www.loiret.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loiret</a> ont développé un schéma d'intervention en deux passages systématiques : un traitement choc initial pour réduire drastiquement la population, suivi d'un contrôle et ajustement 15 jours plus tard. Cette méthode, certifiée <a href='https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Certibiocide</a>, garantit un résultat durable tout en limitant l'exposition aux produits biocides.",
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
          "Pour les professionnels (restaurants, hôtels, commerces alimentaires), nous proposons des contrats de maintenance préventive avec visites programmées et interventions curatives illimitées. Ces contrats incluent la traçabilité <a href='https://agriculture.gouv.fr/guides-de-bonnes-pratiques-dhygiene-gbph' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>HACCP</a>, indispensable lors des contrôles sanitaires, ainsi que l'accès à une ligne d'urgence 24/7.",
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
      "Certification Certibiocide - Ministère de la Transition écologique : https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides",
      "HACCP (Hazard Analysis Critical Control Point) - DGCCRF : https://agriculture.gouv.fr/guides-de-bonnes-pratiques-dhygiene-gbph",
    ],
  },
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