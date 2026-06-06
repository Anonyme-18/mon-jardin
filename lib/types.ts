export interface Kit {
  slug: string;
  name: string;
  price: number;
  priceLabel?: string;
  description: string;
  surface?: string;
  yield?: string;
  includes?: string[];
  installation?: string;
  deliveryTime?: string;
  delivery?: string;
  popular?: boolean;
  subscribeWith?: string[];
  image: string;
  category: "kit" | "service" | "addon";
}

export interface FenceListing {
  id: string;
  ownerName: string;
  phone?: string;
  neighborhood: string;
  surfaceM2: number;
  wallType: "Mur briques" | "Clôture tôle" | "Mur parpaing" | "Grillage";
  exposition: "Plein soleil" | "Mi-ombre" | "Ombre partielle";
  pricePerMonth: number;
  description: string;
  available: boolean;
  /** Photos du mur (base64 ou URL) — stockées en localStorage pour les annonces utilisateur */
  photos?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  quote: string;
  initials: string;
}

export interface Stat {
  value: string;
  numericValue?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export type ClientType = "Particulier" | "Restaurant/Commerce" | "Maraîcher";

export interface OrderFormData {
  kitSlug: string;
  addEntretien: boolean;
  addRecharge: boolean;
  fullName: string;
  phone: string;
  email?: string;
  clientType: ClientType;
  neighborhood: string;
  customNeighborhood?: string;
  address: string;
  preferredDate: string;
  specialInstructions?: string;
}

export interface SavedOrder extends OrderFormData {
  orderId: string;
  total: number;
  createdAt: string;
}

export type OrderStep = 1 | 2 | 3 | 4;
