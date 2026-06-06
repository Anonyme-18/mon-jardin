import type { FenceListing } from "./types";

export const FENCE_LISTINGS_KEY = "mon-jardin-fence-listings";

export const defaultFenceListings: FenceListing[] = [
  {
    id: "cl-001",
    ownerName: "Komla T.",
    neighborhood: "Tokoin",
    surfaceM2: 8,
    wallType: "Mur briques",
    exposition: "Plein soleil",
    pricePerMonth: 5000,
    description:
      "Mur de clôture en briques latérite, cour fermée. Idéal pour un Kit Ménage — accès eau à proximité.",
    available: true,
  },
  {
    id: "cl-002",
    ownerName: "Efua K.",
    neighborhood: "Bè",
    surfaceM2: 5,
    wallType: "Clôture tôle",
    exposition: "Mi-ombre",
    pricePerMonth: 3500,
    description:
      "Clôture tôle sur 5 m de long, hauteur 2 m. Quartier calme, disponible dès maintenant.",
    available: true,
  },
  {
    id: "cl-003",
    ownerName: "Sénou A.",
    neighborhood: "Adidogomé",
    surfaceM2: 12,
    wallType: "Mur parpaing",
    exposition: "Plein soleil",
    pricePerMonth: 8000,
    description:
      "Grande façade parpaing, exposition sud. Convient pour Kit Resto Pro ou plusieurs kits ménage.",
    available: true,
  },
  {
    id: "cl-004",
    ownerName: "Afi D.",
    neighborhood: "Hanoukopé",
    surfaceM2: 4,
    wallType: "Grillage",
    exposition: "Plein soleil",
    pricePerMonth: 2500,
    description:
      "Grillage rigide 4 m², accès direct depuis la rue. Parfait pour débuter sans investir dans un mur.",
    available: true,
  },
  {
    id: "cl-005",
    ownerName: "Yao M.",
    neighborhood: "Agoé",
    surfaceM2: 6,
    wallType: "Mur briques",
    exposition: "Ombre partielle",
    pricePerMonth: 4000,
    description:
      "Mur de cour partagée, ombragé l'après-midi. Adapté laitues et herbes aromatiques.",
    available: false,
  },
];

export function loadFenceListings(): FenceListing[] {
  if (typeof window === "undefined") return defaultFenceListings;

  try {
    const stored = localStorage.getItem(FENCE_LISTINGS_KEY);
    if (!stored) return defaultFenceListings;

    const custom = JSON.parse(stored) as FenceListing[];
    const defaultIds = new Set(defaultFenceListings.map((l) => l.id));
    const merged = [
      ...defaultFenceListings,
      ...custom.filter((l) => !defaultIds.has(l.id)),
    ];
    return merged;
  } catch {
    return defaultFenceListings;
  }
}

export function saveCustomFenceListing(listing: FenceListing): void {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(FENCE_LISTINGS_KEY);
  const custom: FenceListing[] = stored ? JSON.parse(stored) : [];
  custom.push(listing);
  localStorage.setItem(FENCE_LISTINGS_KEY, JSON.stringify(custom));
}
