import type { FenceListing } from "./types";

/** Images locales + compléments Unsplash (déjà autorisés dans next.config) */
export const siteImages = {
  /** Dispositif ménage — cour, mur */
  kitMenage: "/img/image2.jpeg",
  /** Installation façade / kit pro */
  kitResto: "/img/image.jpeg",
  /** Vue hectare — référence terrain */
  terrainHectare: "/img/terrain-hectare-reference.png",
  /** Installation Lomé — Église Saint-Pierre & Paul */
  installationLome: "/img/image3.jpeg",
  /** Quartier Lomé — jardins verticaux sur façades */
  quartierLome: "/img/image4.png",

  /** Pages & sections */
  hero: "/img/image2.jpeg",
  about: "/img/terrain-hectare-reference.png",
  prototypeCourBackdrop: "/img/image.jpeg",
  prototypeTerrainRef: "/img/terrain-hectare-reference.png",
  cloturesHero: "/img/image4.png",

  /** Services & addons */
  entretien: "/img/image3.jpeg",
  recharge:
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=900&q=80&auto=format&fit=crop",
  clotureService: "/img/image4.png",

  /** Illustrations principes / clôtures */
  irrigation:
    "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=900&q=80&auto=format&fit=crop",
  lumiere:
    "https://images.unsplash.com/photo-1530836369250-98d50b6f6a33?w=900&q=80&auto=format&fit=crop",
  compost:
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80&auto=format&fit=crop",
  clotureTole:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
  grillage:
    "https://images.unsplash.com/photo-1592155931584-901ac15763a3?w=900&q=80&auto=format&fit=crop",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/** @deprecated Préférer siteImages */
export const images = {
  dispositifMenage: siteImages.kitMenage,
  dispositifTerrain: siteImages.kitResto,
} as const;

const fenceImagePools: Record<FenceListing["wallType"], string[]> = {
  "Mur briques": [siteImages.installationLome, siteImages.kitResto],
  "Clôture tôle": [siteImages.quartierLome, siteImages.clotureTole],
  "Mur parpaing": [siteImages.terrainHectare, siteImages.kitResto],
  Grillage: [siteImages.quartierLome, siteImages.grillage],
};

export function getFenceListingImage(listing: FenceListing): string {
  if (listing.photos?.length) return listing.photos[0];
  const pool = fenceImagePools[listing.wallType];
  const numericId = parseInt(listing.id.replace(/\D/g, ""), 10) || 0;
  return pool[numericId % pool.length];
}

export function getFenceListingImages(listing: FenceListing): string[] {
  if (listing.photos?.length) return listing.photos;
  return [getFenceListingImage(listing)];
}

export function isRemoteImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
