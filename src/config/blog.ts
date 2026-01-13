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
  // ARTICLE 6 : Punaises de lit (Nouveau)
  {
    slug: "punaises-de-lit-orleans-signes-traitement",
    title: "Punaises de lit à Orléans : Comment s'en débarrasser définitivement ?",
    excerpt:
      "Piqûres alignées, taches de sang... Les punaises de lit sont de retour à Orléans. Découvrez pourquoi les produits du commerce échouent et notre protocole vapeur + chimie.",
    cover: "/images/blog-punaises-lit.png",
    publishedAt: "2026-01-13",
    readingTime: "5 min",
    tags: ["Punaises de lit", "Orléans", "Traitement", "Conseils"],
    featured: true,
    intro:
      "C'est le fléau qui inquiète le plus les Orléanais ces derniers mois. Que vous soyez étudiant à <strong>La Source</strong>, hôtelier en centre-ville ou particulier, personne n'est à l'abri. La <a href='/services/traitement-punaises-de-lit' class='text-primary hover:text-accent underline'>punaise de lit</a> (Cimex lectularius) est un parasite tenace qui provoque stress et insomnies. Oubliez les remèdes de grand-mère : voici ce qui fonctionne vraiment pour sauver vos nuits.",
    sections: [
      {
        heading: "1. Comment être sûr que c'est des punaises ?",
        body: [
          "Le diagnostic est souvent tardif car la punaise est championne de cache-cache. Elle ne sort que la nuit, attirée par votre chaleur corporelle et le CO2 que vous rejetez.",
          "<strong>Les indices qui ne trompent pas :</strong>",
          "• <strong>Les piqûres :</strong> Souvent alignées (3 ou 4 boutons) ou groupées sur les zones découvertes (bras, jambes, dos).",
          "• <strong>Les taches :</strong> Petits points noirs (déjections) sur les lattes du sommier ou dans les coutures du matelas. Parfois des traînées de sang sur les draps (punaise écrasée dans votre sommeil).",
          "Si vous avez un doute, une <a href='/contact' class='text-primary hover:text-accent underline'>inspection professionnelle</a> est recommandée avant de jeter votre literie (ce qui est souvent inutile si traité correctement).",
        ],
        image: {
          src: "/images/blog-punaises-lit.png",
          alt: "Ccouture de matelas avec traces de déjections de punaises de lit",
          caption: "Inspectez minutieusement les coutures de votre matelas : c'est la cachette #1.",
        },
      },
      {
        heading: "2. La pire erreur : Les bombes fumigènes (Fumers)",
        body: [
          "C'est le réflexe classique : courir en magasin de bricolage acheter un fumigène. <strong>Arrêtez tout !</strong>",
          "Les punaises de lit ont développé des résistances aux insecticides grand public. Pire : le gaz irritant du fumigène va les faire fuir... chez vos voisins ou dans les autres pièces de votre logement. Vous transformez une infestation localisée (chambre) en infestation générale.",
          "De plus, ces produits ne tuent pas les œufs. Une seule femelle pond jusqu'à 5 œufs par jour. Le calcul est vite fait : l'infestation repartira de plus belle dans 3 semaines.",
        ],
      },
      {
        heading: "3. Notre protocole Orléans : La méthode Hybride",
        body: [
          "Pour éradiquer 100% de la colonie (adultes + œufs), nous utilisons chez <strong>Déclic Parasites</strong> une double approche :",
          "1. <strong>Traitement Thermique (Vapeur sèche) :</strong> La vapeur à 180°C tue instantanément les œufs et les adultes au contact, sans produit chimique. Idéal pour les matelas et textiles fragiles.",
          "2. <strong>Traitement Chimique (Pulvérisation) :</strong> Application d'un insecticide rémanent professionnel au sol et sur les plinthes pour créer une barrière mortelle pour les survivants qui sortiraient de leur cachette.",
          "Ce protocole nécessite obligatoirement <strong>2 passages</strong> espacés de 15 jours pour casser le cycle de reproduction.",
        ],
        image: {
          src: "/images/traitement-vapeur-punaises.png",
          alt: "Traitement thermique vapeur sèche contre les punaises de lit",
          caption: "La vapeur sèche à 180°C élimine 100% des œufs et adultes instantanément.",
        },
      },
      {
        heading: "4. Locataire ou Propriétaire : Qui paie ?",
        body: [
          "La <a href='https://www.service-public.fr/particuliers/vosdroits/F31301' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>loi ELAN</a> est claire : c'est au bailleur de fournir un logement décent sans nuisibles. En début de bail, c'est au propriétaire de payer (sauf s'il prouve votre négligence).",
          "Cependant, si vous êtes installé depuis longtemps, la responsabilité peut être partagée. Dans tous les cas, prévenez votre propriétaire ou syndic immédiatement. Une intervention rapide coûte toujours moins cher que de traiter tout un immeuble contaminé.",
        ],
      },
      {
        heading: "5. La prévention au retour de voyage",
        body: [
          "Vous revenez de vacances ou d'un déplacement pro ? Ne posez jamais votre valise sur votre lit. Suivez les <a href='https://www.ecologie.gouv.fr/punaises-lit-letat-vous-accompagne' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>recommandations officielles</a> :",
          "Lavez vos vêtements à 60°C minimum. Pour les textiles fragiles, un passage au congélateur (-20°C pendant 72h) est radical.",
          "Soyez vigilants lors d'achats de seconde main (meubles, vêtements) : inspectez tout la loupe avant de faire entrer l'objet chez vous.",
        ],
      },
    ],
    sources: [
      "Loi ELAN et nuisibles : https://www.service-public.fr/particuliers/vosdroits/F31301",
      "Ministère de la Santé - Punaises de lit : https://sante.gouv.fr/",
      "CS3D - Chambre Syndicale Désinfection : https://cs3d.info/",
    ],
  },
  // ARTICLE 5 : Urgence Dératisation (30 Dec 2025)
  {
    slug: "urgence-deratisation-orleans-rat-maison",
    title: "Orléans | Urgence dératisation : “j’ai vu un rat dans la maison”, quoi faire dans les 30 minutes ?",
    excerpt:
      "Panique à bord ! Vous venez de croiser un rat dans votre salon ? Pas de panique, suivez notre protocole d'urgence en 5 étapes avant l'arrivée du technicien.",
    cover: "https://cdn.slate.fr/uploads/store/story_196675/medium_landscape_196675.jpg",
    publishedAt: "2025-12-30",
    readingTime: "3 min",
    tags: ["Urgence", "Dératisation", "Orléans", "Sécurité"],
    featured: false,
    intro:
      "C’est le cauchemar de tout occupant : vous rentrez du travail, vous allumez la lumière et une ombre file sous le canapé. <a href='/urgence-deratisation-orleans' class='text-accent hover:underline font-bold'>Urgence dératisation Orléans</a> ! Avoir un <strong>rat maison Orléans</strong> n’est pas signe de saleté, mais c’est un risque sanitaire immédiat. Vous avez peut-être déjà lu notre guide pour <a href='/blog/comment-identifier-rat-souris-orleans' class='text-primary hover:text-accent underline'>différencier un rat d'une souris</a>, mais dans l'urgence, chaque seconde compte. Avant d'appeler notre ligne d'urgence (02 46 91 55 02), voici les gestes qui sauvent et ceux à éviter absolument.",
    sections: [
      {
        heading: "1. Ne le coincez surtout pas (Danger Morsure)",
        body: [
          "Le premier réflexe est souvent de vouloir le chasser avec un balai. <strong>Mauvaise idée !</strong> Un <a href='https://fr.wikipedia.org/wiki/Rattus_norvegicus' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>rat brun (surmulot)</a> acculé, surtout s'il se sent menacé (cri, gestes brusques), peut devenir agressif et sauter pour mordre. Ses incisives sont capables de traverser une chaussure.",
          "<strong>Le bon geste :</strong> Ouvrez une porte donnant sur l'extérieur si possible, mais surtout, laissez-lui une voie de sortie. Ne l'enfermez pas dans une petite pièce sans issue avec vous. Si vous l'avez vu filer sous un meuble, n'essayez pas de regarder dessous.",
        ],
      },
      {
        heading: "2. Isolez la pièce (Confinement)",
        body: [
          "Si le rat est entré dans une chambre ou le salon, fermez immédiatement la porte de cette pièce. Colmatez le bas de porte avec une serviette épaisse (qu'il ne pourra pas pousser).",
          "Cela empêche le rongeur d'explorer le reste de la maison. Les rats sont des explorateurs rapides : en 30 minutes, ils peuvent marquer leur territoire (urine) dans toute la cuisine si on les laisse faire.",
        ],
      },
      {
        heading: "3. Sécurisez la nourriture immédiatement",
        body: [
          "Le rat est probablement entré parce qu'il a senti de la nourriture. Si vous êtes dans la cuisine :",
          "• Mettez tout ce qui est accessible (pain, fruits, boîtes ouvertes) dans le frigo ou des placards hauts fermés.",
          "• Jetez immédiatement les poubelles à l'extérieur.",
          "• Nettoyez les miettes au sol.",
          "Si le rat ne trouve rien à manger, il sera plus facile à piéger car il aura faim lorsque nous poserons les appâts.",
        ],
      },
      {
        heading: "4. Pourquoi appeler un dératiseur Orléans urgence ?",
        body: [
          "Vous pourriez être tenté d'acheter une tapette demain matin. Mais attention :",
          "• <strong>Risque Incendie :</strong> En situation de stress, un rat enfermé va ronger tout ce qu'il trouve pour s'échapper, notamment les gaines électriques derrière les plinthes (risque de court-circuit, voir notre article sur la <a href='/blog/plan-action-anti-nuisibles-orleans-loiret' class='text-primary hover:text-accent underline'>sécurité de votre logement</a>).",
          "• <strong>Reproduction :</strong> S'il y en a un, il y a 80% de chances que d'autres suivent ou soient déjà là. Un <strong>dératiseur Orléans urgence</strong> saura identifier le point d'entrée pour le bloquer immédiatement. Acheter une tapette est souvent inefficace par rapport au <a href='/blog/prix-tarif-deratisation-desinsectisation-orleans-2025' class='text-primary hover:text-accent underline'>coût d'une intervention professionnelle garantie</a>.",
          "Notre équipe d'astreinte intervient 7j/7 pour ces situations de détresse psychologique et sanitaire.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&q=80&w=1200",
          alt: "Appel urgence dératiseur Orléans",
          caption: "En cas d'intrusion visible, l'intervention rapide est la seule garantie de sécurité."
        }
      },
      {
        heading: "5. En attendant le technicien...",
        body: [
          "Une fois notre technicien en route :",
          "• Éloignez les enfants et animaux domestiques de la zone.",
          "• Ne touchez à rien (surtout pas aux crottes ou traces d'urine) sans gants pour éviter tout risque de <a href='https://www.pasteur.fr/fr/centre-medical/fiches-maladies/leptospirose' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Leptospirose</a>.",
          "• Préparez-nous l'accès aux combles ou au vide sanitaire si vous en avez un, car c'est souvent là que se cache le nid principal.",
          "Gardez votre calme, nous sommes en lien avec le Service d'Hygiène de la <a href='https://www.orleans-metropole.fr/' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Mairie d'Orléans</a> pour les cas complexes.",
        ],
      },
    ],
  },
  // ARTICLE 1 : Rat vs Souris (Mis à jour avec tes images locales)
  {
    slug: "comment-identifier-rat-souris-orleans",
    title: "Rat ou Souris ? Les clés pour une identification certaine",
    excerpt:
      "Bruits dans les combles, crottes dans la cuisine... Vous avez un doute ? Apprenez à différencier le rat de la souris pour choisir le bon traitement dans le Loiret.",
    // J'utilise ton image de comparaison en couverture car elle est parlante
    cover: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2025-12-15",
    readingTime: "5 min",
    tags: ["Dératisation", "Rongeurs", "Orléans", "Conseils"],
    featured: true, // Je l'ai passé en TRUE pour le mettre en avant
    intro:
      "C'est la question que nos techniciens entendent le plus souvent lors de leurs interventions. Identifier correctement le rongeur qui s'invite chez vous n'est pas qu'une question de curiosité : c'est la base d'un <a href='/blog/plan-action-anti-nuisibles-orleans-loiret' class='text-primary hover:text-accent underline'>plan d'action efficace</a>. Entre le rat brun (surmulot) qui préfère les zones humides et la souris domestique capable de grimper aux étages, les méthodes de lutte sont radicalement différentes.",
    sections: [
      {
        heading: "1. Morphologie : Les différences physiques visibles",
        body: [
          "Si vous avez la 'chance' d'apercevoir l'intrus, son apparence est le premier indice. La <strong>souris domestique</strong> (<a href='https://fr.wikipedia.org/wiki/Mus_(genre)' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Mus musculus</a>) est petite (3 à 10 cm sans la queue) avec de grandes oreilles proportionnellement à sa tête. Elle est curieuse et très agile.",
          "Le <strong>rat</strong>, qu'il soit noir (des greniers) ou brun (des égouts), est beaucoup plus massif (jusqu'à 25-30 cm). Sa queue est plus épaisse et ses oreilles semblent plus petites par rapport à son corps. Dans le centre ancien, notamment autour de la <strong>Place du Martroi</strong> ou des rues piétonnes, nous croisons souvent le rat brun qui remonte des vieux réseaux d'assainissement.",
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
          "<strong>La Souris :</strong> Ses crottes ressemblent à des grains de riz noirs (3 à 6 mm), pointus aux extrémités. Si vous vous demandez \"<strong>crottes de souris que faire ?</strong>\", la première réponse est de ne pas toucher à mains nues. Côté bruit, vous entendrez des grattements légers la nuit ou des \"bruits dans les cloisons\" caractéristiques.",
          "<strong>Le Rat :</strong> Ses excréments sont bien plus gros (1 à 2 cm), en forme de noyau d'olive ou de banane. Un autre signe distinctif est l'odeur : une <strong>odeur d'urine de souris</strong> ou de rat persistante (ammoniaque) est souvent le signe d'une infestation installée. À proximité des bords de <a href='https://fr.wikipedia.org/wiki/Loire_(fleuve)' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>Loire</a>, attention aux terriers dans le jardin.",
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
          "Les <strong>souris</strong> recherchent la chaleur et la nourriture. On les trouve principalement dans les cuisines (derrière le frigo, sous l'évier), les garde-manger et les placards. Dans les immeubles du quartier <strong>Bourgogne</strong>, elles utilisent souvent les vieilles colonnes techniques mal isolées pour passer d'un étage à l'autre.",
          "Les <strong>rats</strong> ont besoin de boire quotidiennement. Ils privilégient les zones humides : caves en tuffeau typiques du Val de Loire, garages, vides sanitaires. Récemment, nous sommes intervenus dans plusieurs pavillons près du <strong>Parc Floral à La Source</strong> où les terriers se trouvaient sous les abris de jardin, attirés par les composteurs.",
        ],
      },
      {
        heading: "4. Pourquoi le traitement doit être différent ?",
        body: [
          "Confondre les deux espèces mène souvent à l'échec du traitement, et peut augmenter inutilement <a href='/blog/prix-tarif-deratisation-desinsectisation-orleans-2025' class='text-primary hover:text-accent underline'>le coût final de l'intervention</a>. Une tapette à souris ne tuera pas un rat (elle risque juste de le blesser et de le rendre méfiant). À l'inverse, un piège à rat est souvent trop peu sensible pour se déclencher au passage d'une souris légère.",
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
    title: "Tarifs Dératisation 2025 : Le vrai coût d'une intervention pro",
    excerpt:
      "Dératisation, punaises de lit, nids de guêpes... Découvrez les tarifs moyens pratiqués dans le Loiret et comprenez pourquoi un devis sur-mesure est votre seule garantie d'efficacité.",
    cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2025-12-01",
    readingTime: "4 min",
    tags: ["Tarifs", "Devis", "Dératisation", "Orléans"],
    featured: true,
    intro:
      "C'est la première question qu'on nous pose au téléphone : <em>« C'est combien pour enlever des rats ? »</em>. Méfiez-vous des prix d'appel trop alléchants (type « forfait à 49€ ») qui cachent souvent des frais de déplacement exorbitants ou un travail bâclé. Chez <strong>Déclic Parasites</strong>, nous prônons la transparence totale. Voici un guide clair pour comprendre le budget d'une intervention professionnelle efficace.",
    sections: [
      {
        heading: "1. Pourquoi est-il impossible de donner un prix fixe par téléphone ?",
        body: [
          "Imaginez appeler un garagiste et dire « Ma voiture fait un drôle de bruit, combien ça coûte ? ». Sans voir le véhicule, impossible de répondre honnêtement. C'est pareil pour les nuisibles.",
          "Le tarif d'une intervention dépend de trois facteurs que nous devons vérifier sur place ou par photos détaillées :",
          "• <strong>La surface à traiter :</strong> Dératiser un studio étudiant de 20m² à <strong>La Source</strong> n'implique pas la même quantité de produits qu'une grande maison familiale au <strong>sud de la Loire (Olivet, Saint-Pryvé)</strong> avec jardin et dépendances.",
          "• <strong>Le niveau d'infestation :</strong> Une colonie de rats installée depuis 6 mois nécessitera plusieurs passages et une sécurisation complexe (rebouchage), là où une souris isolée peut être traitée plus vite. C'est pourquoi apprendre à <a href='/blog/comment-identifier-rat-souris-orleans' class='text-primary hover:text-accent underline'>différencier rat et souris</a> est la première étape de notre diagnostic.",
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
          "🛏️ <strong>Punaises de lit :</strong> C'est le traitement le plus technique. À Orléans, nos tarifs débutent à <strong>130€</strong> pour une chambre. Pour un protocole complet (2 passages), comptez généralement entre <strong>350€ et 450€</strong>.",
          "🐝 <strong>Nids de guêpes et frelons :</strong> Selon la hauteur et la difficulté, l'intervention se situe souvent entre <strong>90€ et 180€</strong>. L'intervention est garantie : si le nid n'est pas détruit, nous revenons gratuitement. Attention, le <a href='https://agriculture.gouv.fr/le-frelon-asiatique' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-accent underline'>frelon asiatique</a> est classé danger sanitaire et nécessite un équipement spécial.",
          "🐜 <strong>Insectes rampants (Cafards/Fourmis) :</strong> À partir de <strong>110€</strong>. Vous voyez des <strong>cafards cuisine la nuit</strong> ou des <strong>blattes dans la salle de bain</strong> ? Notre traitement par gel est radical.",
        ],
      },
      {
        heading: "3. Le piège des prix « trop bas » et des plateformes nationales",
        body: [
          "En tapant « Dératiseur Orléans » sur Google, vous tomberez sur des plateformes nationales qui sous-traitent à des techniciens qu'ils ne connaissent parfois même pas. Le risque ? Un prix d'appel bas, mais une facture qui gonfle une fois le technicien sur place (« ah mais là c'est un cas spécial... »).",
          "En tant qu'artisan local basé rue Bannier, <strong>Déclic Parasites</strong> n'a pas d'intermédiaire. Le prix annoncé sur le devis est le prix que vous payez. Nous respectons scrupuleusement les règles de la DGCCRF sur le dépannage à domicile.",
          "De plus, utiliser des produits grand public (vendus en jardinerie) revient souvent plus cher sur le long terme car ils sont moins dosés que nos produits professionnels sous certificat <strong>Certibiocide</strong>. Une cliente de <strong>Fleury-les-Aubrais</strong> nous confiait avoir dépensé plus de 200€ en pièges et produits divers avant de nous appeler, sans résultat définitif.",
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
    title: "Protection Anti-Nuisibles : La Check-list de Sécurité",
    excerpt:
      "Comment sécuriser votre logement ou commerce lorsque des nuisibles apparaissent ? Notre check-list locale vous accompagne étape par étape.",
    cover: "https://www.cergy.fr/wp-content/uploads/2025/07/david-farkas-zFOVEGC0UCE-unsplash.jpg",
    publishedAt: "2025-11-15",
    readingTime: "6 min",
    tags: ["Désinsectisation", "Orléans", "Loiret", "Guide pratique"],
    featured: true,
    intro:
      "Avec la douceur des saisons et l'humidité de notre région, les nuisibles trouvent rapidement refuge dans nos habitations. Cafards dans les cuisines, rats dans les caves, fourmis envahissant les terrasses... Voici notre méthode Déclic Parasites, rodée sur le terrain, pour reprendre la main efficacement et durablement.",
    sections: [
      {
        heading: "1. Inspecter méthodiquement chaque zone avant d'agir",
        body: [
          "La première étape cruciale consiste à identifier précisément les points d'entrée et les zones d'activité des nuisibles. Munissez-vous d'une lampe torche et de votre smartphone pour documenter ce que vous observez : <strong>traces de grignotage câbles</strong>, isolants détruits, déjections...",
          "Lors de nos diagnostics, nous constatons que près de 70% des infestations commencent par un simple défaut d'étanchéité : bas de porte mal ajusté, passage de gaines non colmaté, aérations sans grillage. C'est classique dans les immeubles des années 70 du <strong>quartier Dunois</strong> où les gaines techniques sont de véritables autoroutes à rongeurs.",
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
          "Chaque espèce de nuisible nécessite une approche spécifique et des produits dédiés. (Voir notre guide pour <a href='/blog/comment-identifier-rat-souris-orleans' class='text-primary hover:text-accent underline'>identifier vos rongeurs à Orléans</a>). Les blattes germaniques qui prolifèrent parfois dans les cuisines collectives répondent mieux aux gels alimentaires. Les rats noirs, que nous croisons souvent dans les greniers à <strong>Saint-Jean-de-la-Ruelle</strong>, nécessitent une stratégie d'appâtage différente.",
          "Nos équipes ont développé un schéma d'intervention en deux passages systématiques : un traitement choc initial pour réduire drastiquement la population, suivi d'un contrôle et ajustement 15 jours plus tard. Cette méthode garantit un résultat durable.",
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
          "Nous constatons que ces mesures préventives réduisent les risques de réinfestation de plus de 60% sur 12 mois. C'est particulièrement vrai pour les commerces de bouche de la <strong>place du Châtelet</strong> où la gestion des déchets est critique.",
          "Un suivi téléphonique ou par SMS est systématiquement proposé une semaine après l'intervention. Cette vigilance continue permet d'ajuster rapidement les dispositifs si nécessaire, de renforcer une zone sensible détectée tardivement, ou simplement de rassurer nos clients sur l'absence de signes de retour. Cette approche proactive fait toute la différence sur la durée.",
        ],
      },
      {
        heading: "4. Adapter le traitement aux spécificités locales du Loiret",
        body: [
          "Le Loiret présente des particularités qui influencent directement notre façon d'intervenir. La proximité de la Loire crée des zones humides favorables aux rongeurs, notamment près du <strong>Pont Royal</strong> ou de l'<strong>Île Charlemagne</strong>.",
          "En hiver, les nuisibles cherchent refuge dans les habitations chauffées, multipliant les infestations de caves et de greniers. Au printemps et en été, les zones extérieures (jardins, terrasses, abris) deviennent des points d'entrée privilégiés. Nos interventions tiennent compte de ces cycles naturels pour maximiser l'efficacité des traitements.",
          "La densité du bâti ancien avec ses caves en pierre nécessite souvent une approche coordonnée. Nous facilitons cette coordination en proposant des diagnostics groupés (à ce sujet, lisez notre article sur <a href='/blog/rats-voisin-que-faire-orleans-loiret' class='text-primary hover:text-accent underline'>les conflits de voisinage liés aux rats</a>).",
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
          "Notre objectif est de construire une relation de confiance sur le long terme. Beaucoup de nos clients particuliers nous sollicitent ensuite pour des diagnostics préventifs annuels ou nous recommandent à leurs proches. Cette satisfaction client est le résultat d'une approche professionnelle, transparente et humaine.",
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

  // ARTICLE 4 : Voisinage et Nuisibles (01 Nov 2025)
  {
    slug: "rats-voisin-que-faire-orleans-loiret",
    title: "Conflit voisinage : recours légaux contre les rats et nuisibles",
    excerpt:
      "Conflits de voisinage et nuisibles : découvrez vos droits et les démarches amiables ou légales pour protéger votre logement si l'hygiène de votre voisin pose problème.",
    cover: "https://www.sncf-connect.com/assets/styles/ratio_2_1_max_width_961/public/media/2023-08/orleans-nuit.jpg?h=cbd88c82&itok=A4LIXbN2",
    publishedAt: "2025-11-01",
    readingTime: "5 min",
    tags: ["Voisinage", "Réglementation", "Conseils", "Orléans"],
    featured: false,
    intro:
      "C'est une situation délicate que nos techniciens rencontrent très souvent dans les zones résidentielles comme à <strong>Saint-Jean-le-Blanc</strong>, <strong>Semoy</strong> ou <strong>Saran</strong>. Votre maison est impeccable, mais vous avez <a href='/blog/comment-identifier-rat-souris-orleans' class='text-primary hover:text-accent underline'>identifié des rats</a> courant le long du mur mitoyen. Poulailler mal entretenu, accumulation de déchets, compost à ciel ouvert... L'hygiène douteuse de votre voisin menace votre tranquillité. Pas de panique, voici la marche à suivre.",
    sections: [
      {
        heading: "1. La démarche amiable : Le dialogue avant tout",
        body: [
          "Avant de sortir l'artillerie lourde administrative, commencez par une visite courtoise. Il est fréquent que votre voisin ne soit même pas conscient de l'ampleur du problème, surtout si le nid se trouve au fond de son jardin ou dans une dépendance qu'il fréquente peu.",
          "Expliquez-lui calmement vos observations (bruits, déjections, passages). Proposez-lui d'agir ensemble. Chez <strong>Déclic Parasites</strong>, nous avons l'habitude d'intervenir sur des propriétés mitoyennes. Un traitement simultané est la seule garantie d'efficacité. Si vous braquez votre voisin d'entrée de jeu, il risque de vous refuser l'accès, ce qui compliquera l'éradication.",
        ],
      },
      {
        heading: "2. Ce que dit la loi : Règlement Sanitaire Départemental",
        body: [
          "Si le dialogue échoue, la loi est de votre côté. Le Règlement Sanitaire Départemental (RSD) impose à tout occupant de maintenir son logement et ses extérieurs dans un état de propreté constant.",
          "L'article 119 interdit notamment de jeter ou déposer des graines ou nourriture en tout lieu public ou privé pour attirer les animaux errants, si cela risque d'attirer des rongeurs. Si votre voisin nourrit les pigeons de façon excessive ou laisse ses poubelles déborder, il est en infraction. Une mise en demeure par lettre recommandée est alors la première étape officielle.",
        ],
      },
      {
        heading: "3. Quels recours en cas de blocage ?",
        body: [
          "<strong>En copropriété / Appartement :</strong> Contactez votre syndic. Il est responsable de l'hygiène des parties communes et peut intervenir auprès du copropriétaire négligent pour le contraindre à agir, voire faire intervenir une entreprise aux frais de la copropriété avant de se retourner contre lui.",
          "<strong>En maison individuelle :</strong> Si le voisin refuse d'agir malgré vos relances, signalez la situation à la Mairie. À Orléans, le Service Communal d'Hygiène et de Santé (SCHS) peut venir constater l'insalubrité. Le Maire dispose de pouvoirs de police pour ordonner le nettoyage et la dératisation, parfois même d'office aux frais du propriétaire si l'urgence sanitaire est avérée.",
        ],
        image: {
          src: "https://leptitgavroche.fr/wp-content/uploads/2025/02/rue-de-bourgogne-orleans-france-orleans-france-june-pedestrian-borgogne-street-rue-de-bourgogne-full-restaurants-124049452.webp",
          alt: "Clôture mitoyenne entre deux jardins de banlieue",
          caption: "Les murs mitoyens et haies sont des zones de passage privilégiées pour les rongeurs.",
        },
      },
      {
        heading: "4. Protégez votre terrain (Herméticité)",
        body: [
          "En attendant que la situation se débloque chez le voisin, transformez votre maison en forteresse. Ne leur donnez aucune raison de s'installer chez vous : rentrez les gamelles des animaux la nuit, utilisez des composteurs fermés hermétiquement, et taillez la végétation qui touche votre façade.",
          "Inspectez minutieusement le mur mitoyen : un rat n'a besoin que de 2 cm pour passer, une souris de 6 mm. Rebouchez les moindres trous avec du grillage métallique ou du ciment. Si la source est à côté, ils chercheront à venir manger chez vous. Coupez-leur les vivres !",
        ],
      },
      {
        heading: "5. Le conseil de l'expert : La coordination est clé",
        body: [
          "Traiter son jardin alors que le nid est chez le voisin, c'est comme écopper un bateau sans boucher le trou. Vous capturerez quelques individus, mais la colonie se régénérera en permanence (une rate peut avoir 5 à 6 portées par an !).",
          "C'est pourquoi nous proposons souvent des devis 'voisinage' avec des <a href='/blog/prix-tarif-deratisation-desinsectisation-orleans-2025' class='text-primary hover:text-accent underline'>tarifs adaptés</a>. Parfois, il est même plus économique pour vous de prendre en charge une partie du traitement du voisin (s'il est de bonne foi mais n'a pas les moyens) plutôt que de subir des dégâts matériels coûteux chez vous (câbles rongés, isolation détruite) pendant des mois. C'est un calcul pragmatique pour retrouver votre sérénité.",
        ],
      },
    ],
    sources: [
      "Service Public - Troubles de voisinage : https://www.service-public.fr/particuliers/vosdroits/F612",
      "Orléans Métropole - SCHS : https://www.orleans-metropole.fr/",
      "Préfecture du Loiret - Règlements sanitaires : https://www.loiret.gouv.fr/",
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