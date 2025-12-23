import { slugify } from "@/lib/slug";

export interface CityData {
    name: string;
    slug: string;
    zipCodes: string[];
    coordinates: { lat: number; lng: number };
    population?: number;
    travelTime: string;
    neighborhoods?: string[];
    heroIntroExtra?: string;
    expertiseIntro?: string;
    localDetails?: string;
    typicalContexts?: string[];
}

export const cities: CityData[] = [
    // --- ORLÉANS ---
    {
        name: "Orléans",
        slug: "orleans",
        zipCodes: ["45000", "45100"],
        coordinates: { lat: 47.9029, lng: 1.9090 },
        travelTime: "10 min",
        neighborhoods: ["Centre-ville", "Saint-Marceau", "La Source", "Argonne", "Madeleine", "Dunois"],
        heroIntroExtra:
            " Basés à Orléans, nous connaissons parfaitement les immeubles du centre historique, les caves en pierre, les bords de Loire et les quartiers résidentiels récents.",
        expertiseIntro:
            "À Orléans, les infestations se concentrent souvent dans les caves humides de l’hyper-centre, les greniers des maisons de ville et les locaux professionnels à forte rotation. Nous adaptons nos traitements à ces contraintes urbaines pour protéger durablement votre logement ou votre commerce.",
        localDetails:
            "Nos techniciens interviennent régulièrement dans les quartiers Dunois, Saint-Marceau, Madeleine, Carmes, Argonne, La Source et les zones d’activités. Chaque intervention tient compte de la configuration des lieux (cave, cour intérieure, parties communes, grenier, restaurant, bureaux…).",
        typicalContexts: [
            "Immeubles anciens avec caves en pierre et réseaux de gaines techniques",
            "Commerces de bouche (restaurants, boulangeries, bars) en centre-ville",
            "Locaux professionnels, agences et bureaux en rez-de-chaussée",
            "Maisons de ville avec jardins intérieurs et dépendances",
        ],
    },
    // --- OLIVET ---
    {
        name: "Olivet",
        slug: "olivet",
        zipCodes: ["45160"],
        coordinates: { lat: 47.8633, lng: 1.9004 },
        travelTime: "15 min",
        neighborhoods: ["Le Val", "Le Bourg", "Noras", "Lorette"],
        heroIntroExtra:
            " À Olivet, nos interventions tiennent compte des berges du Loiret, des jardins arborés et des nombreux pavillons familiaux.",
        expertiseIntro:
            "À Olivet, les rongeurs et insectes profitent des berges du Loiret, des jardins arborés et des habitats mitoyens pour se déplacer facilement. Nos traitements sont pensés pour limiter les risques de réinfestation entre voisins.",
        localDetails:
            "Nous intervenons aussi bien dans les lotissements récents que dans les maisons plus anciennes proches du Loiret. Une attention particulière est portée aux abris de jardin, terrasses, vides sanitaires et combles, souvent prisés par les nuisibles.",
        typicalContexts: [
            "Pavillons avec jardins arborés et animaux domestiques",
            "Maisons en bord de Loiret avec sous-sols et garages",
            "Résidences avec locaux poubelles partagés",
            "Copropriétés avec caves et parkings souterrains",
        ],
    },
    // --- FLEURY-LES-AUBRAIS ---
    {
        name: "Fleury-les-Aubrais",
        slug: "fleury-les-aubrais",
        zipCodes: ["45400"],
        coordinates: { lat: 47.9333, lng: 1.9167 },
        travelTime: "15 min",
        neighborhoods: ["Lignerolles", "La Forêt", "Centre"],
        heroIntroExtra:
            " À Fleury-les-Aubrais, nous intervenons régulièrement dans les quartiers résidentiels et autour de la gare, où les nuisibles trouvent de nombreux refuges.",
        expertiseIntro:
            "À Fleury-les-Aubrais, la proximité des axes de transport et de la gare crée des zones propices aux déplacements des rats et souris. Nous mettons en place des plans d’action adaptés aux immeubles collectifs et aux maisons mitoyennes.",
        localDetails:
            "Nos interventions couvrent les secteurs proches de la gare, les zones pavillonnaires, les résidences récentes et les zones d’activités. Chaque diagnostic tient compte du voisinage, des locaux techniques et des espaces verts.",
        typicalContexts: [
            "Immeubles proches de la gare avec caves et locaux poubelles",
            "Lotissements avec jardins mitoyens",
            "Pavillons avec dépendances et cabanons",
            "Bureaux et locaux d’activités le long des axes routiers",
        ],
    },
    // --- SARAN ---
    {
        name: "Saran",
        slug: "saran",
        zipCodes: ["45770"],
        coordinates: { lat: 47.9500, lng: 1.8833 },
        travelTime: "15 min",
        neighborhoods: ["Le Bourg", "Vilpot", "Chêne Maillard"],
        heroIntroExtra:
            " À Saran, nous connaissons bien les zones d’activités, les lotissements récents et les maisons individuelles sujettes aux passages de rongeurs.",
        expertiseIntro:
            "Les zones commerciales et d’activités de Saran attirent régulièrement les nuisibles, qui peuvent ensuite se déplacer vers les quartiers résidentiels. Nous travaillons autant pour les particuliers que pour les professionnels soucieux de leur image.",
        localDetails:
            "Nous intervenons dans les pavillons, les résidences, les commerces de proximité, les entrepôts et les locaux d’activité. Nos plans d’appâtage sont mis en place de façon sécurisée, hors de portée des enfants et animaux domestiques.",
        typicalContexts: [
            "Pavillons avec jardins ouverts sur champs ou bois",
            "Entrepôts et locaux logistiques",
            "Restaurants et commerces de zones commerciales",
            "Résidences collectives avec caves et parkings",
        ],
    },
    // --- INGRÉ ---
    {
        name: "Ingré",
        slug: "ingre",
        zipCodes: ["45140"],
        coordinates: { lat: 47.9169, lng: 1.8229 },
        travelTime: "15 min",
        neighborhoods: ["Le Bourg", "Villeneuve", "Ormes-Saint-Péravy"],
        heroIntroExtra:
            " À Ingré, nous intervenons aussi bien dans les lotissements calmes que dans les zones d’activités proches d’Orléans.",
        expertiseIntro:
            "À Ingré, les rongeurs circulent entre zones d’activités, jardins et haies mitoyennes. Nos interventions prennent en compte ce contexte semi-urbain pour stopper les infestations durablement.",
        localDetails:
            "Nous avons l’habitude d’intervenir dans les pavillons avec combles, garages et abris de jardin, mais aussi dans les locaux professionnels et petites entreprises installées sur la commune.",
        typicalContexts: [
            "Maisons individuelles avec combles et vides sanitaires",
            "Jardins avec haies mitoyennes et tas de bois",
            "Petites entreprises et ateliers",
            "Résidences avec locaux poubelles communs",
        ],
    },
    // --- SAINT-JEAN-DE-LA-RUELLE ---
    {
        name: "Saint-Jean-de-la-Ruelle",
        slug: "saint-jean-de-la-ruelle",
        zipCodes: ["45140"],
        coordinates: { lat: 47.9064, lng: 1.8747 },
        travelTime: "12 min",
        neighborhoods: ["Les Chaises", "Les Trois Fontaines", "Alisiers"],
        heroIntroExtra:
            " À Saint-Jean-de-la-Ruelle, nos techniciens interviennent souvent dans les immeubles, maisons de ville et quartiers proches d’Orléans.",
        expertiseIntro:
            "À Saint-Jean-de-la-Ruelle, les nuisibles profitent des immeubles collectifs, des caves, des locaux poubelles et des maisons mitoyennes. Nos traitements sont pensés pour limiter les passages de rongeurs entre bâtiments.",
        localDetails:
            "Nous intervenons sur l’ensemble de la commune : quartiers proches de la Loire, lotissements, résidences récentes, petits immeubles et zones commerciales.",
        typicalContexts: [
            "Immeubles avec caves et locaux techniques",
            "Maisons mitoyennes avec petits jardins",
            "Copropriétés avec parkings souterrains",
            "Commerces et restaurants de proximité",
        ],
    },
    // --- SAINT-JEAN-DE-BRAYE ---
    {
        name: "Saint-Jean-de-Braye",
        slug: "saint-jean-de-braye",
        zipCodes: ["45800"],
        coordinates: { lat: 47.9131, lng: 1.9703 },
        travelTime: "15 min",
        neighborhoods: ["Centre", "Pont Bordeau", "Le Hameau"],
        heroIntroExtra:
            " À Saint-Jean-de-Braye, nous intervenons des bords de Loire jusqu’aux quartiers plus résidentiels en retrait.",
        expertiseIntro:
            "Entre Loire, zones pavillonnaires et petits immeubles, Saint-Jean-de-Braye présente des configurations variées, souvent propices aux rats, souris et insectes. Nos diagnostics tiennent compte de cette diversité.",
        localDetails:
            "Nous couvrons les rues proches du centre, les bords de Loire, les secteurs plus calmes vers Orléans ou Chécy, ainsi que les petits commerces de quartier.",
        typicalContexts: [
            "Pavillons avec jardins et haies mitoyennes",
            "Immeubles avec caves et parties communes",
            "Maisons proches de la Loire ou du canal",
            "Petits commerces et restaurants de quartier",
        ],
    },
    // --- SAINT-JEAN-LE-BLANC ---
    {
        name: "Saint-Jean-le-Blanc",
        slug: "saint-jean-le-blanc",
        zipCodes: ["45650"],
        coordinates: { lat: 47.8925, lng: 1.9261 },
        travelTime: "12 min",
        neighborhoods: ["Montission", "Île Charlemagne"],
        heroIntroExtra:
            " À Saint-Jean-le-Blanc, nous connaissons bien les rues proches d’Orléans et les maisons situées le long de la Loire.",
        expertiseIntro:
            "À Saint-Jean-le-Blanc, les rongeurs et insectes trouvent des refuges dans les maisons de bourg, les pavillons et les immeubles en bord de Loire. Nos interventions sécurisent ces zones sensibles tout en préservant votre cadre de vie.",
        localDetails:
            "Nous intervenons régulièrement dans les secteurs proches de la Loire, les lotissements récents, ainsi que les habitations à la frontière avec Orléans et Saint-Pryvé-Saint-Mesmin.",
        typicalContexts: [
            "Maisons en bord de Loire avec sous-sols",
            "Pavillons avec jardins et terrasses",
            "Immeubles à proximité immédiate d’Orléans",
            "Résidences avec caves et locaux vélos",
        ],
    },
    // --- LA CHAPELLE-SAINT-MESMIN ---
    {
        name: "La Chapelle-Saint-Mesmin",
        slug: "la-chapelle-saint-mesmin",
        zipCodes: ["45380"],
        coordinates: { lat: 47.8890, lng: 1.8281 },
        travelTime: "18 min",
        neighborhoods: ["Bords de Loire", "Le Bourg", "Les Forges"],
        heroIntroExtra:
            " À La Chapelle-Saint-Mesmin, nous intervenons régulièrement le long de la Loire et dans les quartiers résidentiels proches d’Orléans.",
        expertiseIntro:
            "Entre Loire, zones pavillonnaires et axes routiers, La Chapelle-Saint-Mesmin est une commune où les nuisibles circulent facilement. Nous mettons en place des traitements ciblés pour protéger durablement votre habitation.",
        localDetails:
            "Nos interventions couvrent les lotissements, les maisons en bord de Loire, les immeubles et les commerces situés le long de la RD ou proches des zones d’activités.",
        typicalContexts: [
            "Maisons en bord de Loire ou près des levées",
            "Pavillons avec jardins ouverts",
            "Immeubles avec caves et parkings",
            "Commerces de bord de route et zones d’activités",
        ],
    },
    // --- SAINT-PRYVÉ-SAINT-MESMIN ---
    {
        name: "Saint-Pryvé-Saint-Mesmin",
        slug: "saint-pryve-saint-mesmin",
        zipCodes: ["45750"],
        coordinates: { lat: 47.8819, lng: 1.8683 },
        travelTime: "15 min",
        neighborhoods: ["Le Bourg", "Quatre-Vents"],
        heroIntroExtra:
            " À Saint-Pryvé-Saint-Mesmin, nos interventions tiennent compte des bords de Loire, des jardins et des maisons familiales.",
        expertiseIntro:
            "Entre Loire et zones résidentielles, Saint-Pryvé-Saint-Mesmin offre de nombreux abris aux rongeurs et insectes. Nous sécurisons les habitations en limitant les points d’entrée et en traitant les zones sensibles.",
        localDetails:
            "Nous intervenons dans les quartiers proches d’Orléans, les lotissements calmes et les maisons avec jardins donnant sur la Loire ou des espaces naturels.",
        typicalContexts: [
            "Maisons en bord de Loire ou proches des levées",
            "Pavillons avec terrasses et abris de jardin",
            "Résidences avec sous-sols ou garages en sous-sol",
            "Petits commerces de proximité",
        ],
    },
    // --- SAINT-DENIS-EN-VAL ---
    {
        name: "Saint-Denis-en-Val",
        slug: "saint-denis-en-val",
        zipCodes: ["45560"],
        coordinates: { lat: 47.8767, lng: 1.9567 },
        travelTime: "20 min",
        neighborhoods: [],
    },
    // --- SAINT-CYR-EN-VAL ---
    {
        name: "Saint-Cyr-en-Val",
        slug: "saint-cyr-en-val",
        zipCodes: ["45590"],
        coordinates: { lat: 47.8314, lng: 1.9689 },
        travelTime: "22 min",
        heroIntroExtra:
            " À Saint-Cyr-en-Val, nous intervenons dans un cadre plus résidentiel, entouré de forêts, champs et zones d’activités.",
        expertiseIntro:
            "Les rongeurs circulent facilement entre les bois, les champs et les habitations de Saint-Cyr-en-Val. Nous sécurisons les maisons, exploitations et locaux professionnels confrontés à ces nuisibles.",
        localDetails:
            "Nous travaillent dans les lotissements, les hameaux plus isolés, les fermes et les entreprises situées sur la commune et aux abords d’Orléans.",
        typicalContexts: [
            "Maisons avec grands terrains et dépendances",
            "Exploitations agricoles et bâtiments annexes",
            "Zones d’activités et entrepôts",
            "Pavillons récents avec combles et garages",
        ],
    },
    // --- SEMOY ---
    {
        name: "Semoy",
        slug: "semoy",
        zipCodes: ["45400"],
        coordinates: { lat: 47.9378, lng: 1.9630 },
        travelTime: "15 min",
        heroIntroExtra:
            " À Semoy, nous intervenons dans un environnement mêlant habitations calmes, espaces verts et proximité d’Orléans.",
        expertiseIntro:
            "À Semoy, les nuisibles profitent des jardins, des haies et des abords boisés pour circuler entre les habitations. Nos plans de traitement visent à couper ces voies de passage.",
        localDetails:
            "Nous intervenons aussi bien dans les rues proches d’Orléans que dans les secteurs plus calmes vers Chanteau ou Saint-Jean-de-Braye.",
        typicalContexts: [
            "Maisons individuelles avec jardins arborés",
            "Pavillons en bordure de bois ou champs",
            "Résidences avec caves et garages",
            "Petites entreprises locales",
        ],
    },
    // --- CHÉCY ---
    {
        name: "Chécy",
        slug: "checy",
        zipCodes: ["45430"],
        coordinates: { lat: 47.8933, lng: 2.0267 },
        travelTime: "20 min",
    },
    // --- BOIGNY-SUR-BIONNE ---
    {
        name: "Boigny-sur-Bionne",
        slug: "boigny-sur-bionne",
        zipCodes: ["45760"],
        coordinates: { lat: 47.9250, lng: 2.0167 },
        travelTime: "18 min",
    },
    // --- COMPLÉMENTS VILLES PROCHES ---
    { name: "Combleux", slug: "combleux", zipCodes: ["45800"], coordinates: { lat: 47.9056, lng: 1.9889 }, travelTime: "18 min" },
    { name: "Chanteau", slug: "chanteau", zipCodes: ["45400"], coordinates: { lat: 47.9764, lng: 1.9649 }, travelTime: "20 min" },
    { name: "Bou", slug: "bou", zipCodes: ["45430"], coordinates: { lat: 47.8744, lng: 2.0475 }, travelTime: "22 min" },
    { name: "Marigny-les-Usages", slug: "marigny-les-usages", zipCodes: ["45760"], coordinates: { lat: 47.9411, lng: 2.0094 }, travelTime: "20 min" },
    { name: "Ormes", slug: "ormes", zipCodes: ["45140"], coordinates: { lat: 47.9392, lng: 1.8192 }, travelTime: "18 min" },
    { name: "Chaingy", slug: "chaingy", zipCodes: ["45380"], coordinates: { lat: 47.8833, lng: 1.7700 }, travelTime: "20 min" },
    { name: "Saint-Ay", slug: "saint-ay", zipCodes: ["45130"], coordinates: { lat: 47.8581, lng: 1.7533 }, travelTime: "22 min" },
    { name: "Mareau-aux-Prés", slug: "mareau-aux-pres", zipCodes: ["45370"], coordinates: { lat: 47.8483, lng: 1.7967 }, travelTime: "22 min" },
    { name: "Mézières-lez-Cléry", slug: "mezieres-lez-clery", zipCodes: ["45370"], coordinates: { lat: 47.8183, lng: 1.8033 }, travelTime: "25 min" },
    { name: "Ardon", slug: "ardon", zipCodes: ["45160"], coordinates: { lat: 47.7783, lng: 1.8733 }, travelTime: "20 min" },
    { name: "Sandillon", slug: "sandillon", zipCodes: ["45640"], coordinates: { lat: 47.8450, lng: 2.0333 }, travelTime: "25 min" },
    { name: "Donnery", slug: "donnery", zipCodes: ["45450"], coordinates: { lat: 47.9133, lng: 2.1033 }, travelTime: "25 min" },
    { name: "Darvoy", slug: "darvoy", zipCodes: ["45150"], coordinates: { lat: 47.8700, lng: 2.1067 }, travelTime: "25 min" },
    { name: "Vennecy", slug: "vennecy", zipCodes: ["45760"], coordinates: { lat: 47.9483, lng: 2.0500 }, travelTime: "22 min" },
    { name: "Mardié", slug: "mardie", zipCodes: ["45430"], coordinates: { lat: 47.8971, lng: 2.0689 }, travelTime: "22 min" },
    { name: "Bucy-Saint-Liphard", slug: "bucy-saint-liphard", zipCodes: ["45140"], coordinates: { lat: 47.9350, lng: 1.7583 }, travelTime: "20 min" },
    { name: "Meung-sur-Loire", slug: "meung-sur-loire", zipCodes: ["45130"], coordinates: { lat: 47.8283, lng: 1.6967 }, travelTime: "25 min" },
];

export function getCityBySlug(slug: string): CityData | undefined {
    return cities.find((city) => city.slug === slug);
}
