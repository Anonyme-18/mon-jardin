import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Kit, OrderFormData } from "./types";
import { kits } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} FCFA`;
}

export function generateOrderId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `MJ-2026-${digits}`;
}

export function getKitBySlug(slug: string): Kit | undefined {
  return kits.find((kit) => kit.slug === slug);
}

export function calculateOrderTotal(data: Partial<OrderFormData>): number {
  let total = 0;

  if (data.kitSlug) {
    const kit = getKitBySlug(data.kitSlug);
    if (kit) total += kit.price;
  }

  if (data.addEntretien) {
    const entretien = getKitBySlug("entretien");
    if (entretien) total += entretien.price;
  }

  if (data.addRecharge) {
    const recharge = getKitBySlug("recharge");
    if (recharge) total += recharge.price;
  }

  return total;
}

export function formatPhoneTogo(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("228")) {
    const rest = digits.slice(3, 11);
    const parts = rest.match(/.{1,2}/g) || [];
    return `+228 ${parts.join(" ")}`.trim();
  }

  if (digits.length <= 8) {
    const parts = digits.match(/.{1,2}/g) || [];
    return `+228 ${parts.join(" ")}`.trim();
  }

  return value;
}

export function isValidTogoPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("228");
}

export function getMinDeliveryDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export function isDateDisabled(date: Date): boolean {
  const minDate = getMinDeliveryDate();
  const check = new Date(date);
  check.setHours(0, 0, 0, 0);
  return check < minDate || isSunday(check);
}

export const LOME_NEIGHBORHOODS = [
  "Tokoin",
  "Bè",
  "Adidogomé",
  "Hanoukopé",
  "Agbalépédogan",
  "Nukafu",
  "Agoé",
  "Autre (préciser)",
] as const;

export const ORDER_STORAGE_KEY = "mon-jardin-order";
export const LAST_ORDER_KEY = "mon-jardin-last-order";
