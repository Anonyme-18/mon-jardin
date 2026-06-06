import type { FenceListing } from "./types";

export const FENCE_LISTINGS_KEY = "mon-jardin-fence-listings";
export const FENCE_OWNER_KEY = "mon-jardin-fence-owner";
export const FENCE_MY_LISTINGS_KEY = "mon-jardin-fence-my-ids";
export const FENCE_ROLE_KEY = "mon-jardin-fence-role";

export type FenceMarketplaceRole = "client" | "bailleur";

export interface FenceOwnerProfile {
  name: string;
  phone: string;
}

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

function readCustomListings(): FenceListing[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FENCE_LISTINGS_KEY);
    return stored ? (JSON.parse(stored) as FenceListing[]) : [];
  } catch {
    return [];
  }
}

function writeCustomListings(listings: FenceListing[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FENCE_LISTINGS_KEY, JSON.stringify(listings));
}

export function loadFenceListings(): FenceListing[] {
  if (typeof window === "undefined") return defaultFenceListings;

  const custom = readCustomListings();
  const defaultIds = new Set(defaultFenceListings.map((l) => l.id));
  return [
    ...defaultFenceListings,
    ...custom.filter((l) => !defaultIds.has(l.id)),
  ];
}

export function saveCustomFenceListing(listing: FenceListing): void {
  if (typeof window === "undefined") return;

  const custom = readCustomListings();
  custom.push(listing);
  writeCustomListings(custom);
}

export function saveOwnerProfile(profile: FenceOwnerProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FENCE_OWNER_KEY, JSON.stringify(profile));
}

export function loadOwnerProfile(): FenceOwnerProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(FENCE_OWNER_KEY);
    return raw ? (JSON.parse(raw) as FenceOwnerProfile) : null;
  } catch {
    return null;
  }
}

export function addMyListingId(id: string): void {
  if (typeof window === "undefined") return;
  const ids = loadMyListingIds();
  if (!ids.includes(id)) {
    localStorage.setItem(
      FENCE_MY_LISTINGS_KEY,
      JSON.stringify([...ids, id])
    );
  }
}

export function loadMyListingIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FENCE_MY_LISTINGS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function getMyListings(all: FenceListing[]): FenceListing[] {
  const ids = new Set(loadMyListingIds());
  return all.filter((l) => ids.has(l.id));
}

export function updateCustomListing(
  id: string,
  patch: Partial<FenceListing>
): boolean {
  if (typeof window === "undefined") return false;

  const custom = readCustomListings();
  const index = custom.findIndex((l) => l.id === id);
  if (index === -1) return false;

  custom[index] = { ...custom[index], ...patch };
  writeCustomListings(custom);
  return true;
}

export function saveFenceRole(role: FenceMarketplaceRole): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FENCE_ROLE_KEY, role);
}

export function loadFenceRole(): FenceMarketplaceRole {
  if (typeof window === "undefined") return "client";
  const role = localStorage.getItem(FENCE_ROLE_KEY);
  return role === "bailleur" ? "bailleur" : "client";
}
