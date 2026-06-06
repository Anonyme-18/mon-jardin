import type { Kit, Stat, Testimonial } from "./types";
import { siteImages, images } from "./images";

export { images };

export const kits: Kit[] = [
  {
    slug: "kit-menage",
    name: "Kit Ménage Standard",
    price: 75000,
    description:
      "Dispositif vertical en bambou — 3 niveaux, irrigation intégrée, réservoir et composteur",
    surface: "2–3 m² de mur ou clôture",
    yield: "×3 vs agriculture traditionnelle",
    includes: [
      "Structure bambou 3 niveaux",
      "Toiture polycarbonate",
      "Irrigation goutte-à-goutte",
      "Réservoir d'eau",
      "Composteur intégré",
    ],
    installation: "Incluse — Lomé",
    deliveryTime: "5–7 jours ouvrés",
    popular: false,
    image: siteImages.kitMenage,
    category: "kit",
  },
  {
    slug: "kit-resto",
    name: "Kit Resto Pro",
    price: 250000,
    description:
      "Installation professionnelle multi-rangs — structures renforcées, cuve centrale d'irrigation",
    surface: "6–8 m² de façade ou terrain dédié",
    yield: "×3 — production continue par rotation",
    includes: [
      "Structures multi-niveaux renforcées",
      "Cuve d'irrigation centrale",
      "Rangées espacées de 30 cm",
      "Tuyauterie PVC",
      "Formation équipe incluse",
    ],
    installation: "Incluse + Formation équipe",
    deliveryTime: "7–10 jours ouvrés",
    popular: true,
    image: siteImages.kitResto,
    category: "kit",
  },
  {
    slug: "entretien",
    name: "Contrat Entretien Mensuel",
    price: 15000,
    priceLabel: "15 000 FCFA/mois",
    description:
      "2 visites/mois sur votre dispositif — compost organique, traitement bio",
    subscribeWith: ["kit-menage", "kit-resto"],
    image: siteImages.entretien,
    category: "service",
  },
  {
    slug: "recharge",
    name: "Recharge Compost & Semis",
    price: 5000,
    description: "Terreau enrichi + sacs de culture de rechange pour votre dispositif",
    delivery: "Sous 48h à Lomé",
    image: siteImages.recharge,
    category: "addon",
  },
  {
    slug: "location-cloture",
    name: "Location de clôture / mur",
    price: 2500,
    priceLabel: "À partir de 2 500 FCFA/mois",
    description:
      "Propriétaires : mettez votre mur ou clôture en location. Cultivateurs : trouvez une surface pour installer votre kit.",
    surface: "4–12 m² de mur ou clôture",
    installation: "Mise en relation via la plateforme",
    deliveryTime: "Disponibilité sous 48h",
    image: siteImages.clotureService,
    category: "service",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Kofi A.",
    role: "Restaurateur",
    neighborhood: "Tokoin",
    quote:
      "Le Kit Resto Pro installé sur notre façade — mes dépenses en légumes ont baissé de 40%. Le dispositif tourne sans électricité.",
    initials: "KA",
  },
  {
    id: "2",
    name: "Akosua M.",
    role: "Ménagère",
    neighborhood: "Bè",
    quote:
      "Mon dispositif en bambou tient sur le mur de la cour. J'arrose une fois par semaine via le réservoir, c'est tout.",
    initials: "AM",
  },
  {
    id: "3",
    name: "Mawuena D.",
    role: "Maraîcher",
    neighborhood: "Adidogomé",
    quote:
      "Plus de loyer de terrain à payer. Mon installation de 6 m² produit assez pour revendre au marché de Hanoukopé.",
    initials: "MD",
  },
];

export const stats: Stat[] = [
  {
    value: "×3",
    label: "Rendement",
    prefix: "×",
    numericValue: 3,
  },
  {
    value: "0 FCFA",
    label: "Électricité",
    numericValue: 0,
  },
  {
    value: "Mois 2",
    label: "Rentabilité",
  },
  {
    value: "34",
    label: "Clients validés",
    numericValue: 34,
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Vous choisissez votre kit",
    description:
      "Kit Ménage ou Resto Pro, avec options entretien et recharge.",
    icon: "ShoppingBag" as const,
  },
  {
    step: 2,
    title: "Notre équipe installe",
    description:
      "Montage du dispositif en bambou sur votre mur, façade ou terrain à Lomé.",
    icon: "Wrench" as const,
  },
  {
    step: 3,
    title: "Vous utilisez votre dispositif",
    description:
      "Arrosage hebdomadaire via le réservoir, zéro électricité, 100% bio.",
    icon: "Sprout" as const,
  },
  {
    step: 4,
    title: "Production en 45 jours",
    description:
      "Votre installation est opérationnelle — première production entre 45 et 60 jours.",
    icon: "CheckCircle2" as const,
  },
];

export const teamMembers = [
  {
    name: "Afi K.",
    role: "Fondatrice & Agronome",
    bio: "Spécialiste en dispositifs d'agriculture périmétrique hydroponique low-tech.",
  },
  {
    name: "Yawa T.",
    role: "Responsable Installation",
    bio: "5 ans d'expérience en structures bambou à Lomé.",
  },
  {
    name: "Kodjo M.",
    role: "Relations Clients",
    bio: "Accompagne restaurants et ménages de Tokoin à Adidogomé.",
  },
];

export const aboutFacts = [
  { label: "Inflation alimentaire Lomé", value: "+22%" },
  { label: "Restaurants intéressés", value: "88%" },
  { label: "Mise en production", value: "45–60 j" },
  { label: "Coût électricité", value: "0 FCFA" },
];
