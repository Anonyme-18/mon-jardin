export type LoméSeason = "dry" | "rainy";

export interface GuidedTourStep {
  id: number;
  title: string;
  description: string;
  durationMs: number;
  camera: { position: [number, number, number]; lookAt: [number, number, number] };
  action?: "plant" | "water" | "sensors" | "advance" | "harvest" | "none";
}

export const HOME_GUIDED_TOUR: GuidedTourStep[] = [
  {
    id: 0,
    title: "Votre cour à Lomé",
    description:
      "Micro-ferme verticale en bambou — zéro électricité, mur ou clôture existant.",
    durationMs: 5000,
    camera: { position: [5, 3.5, 6], lookAt: [0, 1.2, 0] },
    action: "none",
  },
  {
    id: 1,
    title: "Plantation",
    description: "24 pots, 3 niveaux — tomates, laitues, piments selon votre choix.",
    durationMs: 8000,
    camera: { position: [2, 1.8, 3], lookAt: [0, 1.2, -0.3] },
    action: "plant",
  },
  {
    id: 2,
    title: "Irrigation gravitaire",
    description: "L'eau descend du réservoir sans pompe — 0 FCFA d'électricité.",
    durationMs: 9000,
    camera: { position: [2.5, 2.8, 1.5], lookAt: [1.2, 2.5, -0.4] },
    action: "water",
  },
  {
    id: 3,
    title: "Capteurs IoT low-tech",
    description: "Humidité, température, pH — alertes si arrosage nécessaire.",
    durationMs: 8000,
    camera: { position: [-1.5, 2, 4], lookAt: [0, 1.2, 0] },
    action: "sensors",
  },
  {
    id: 4,
    title: "Croissance — 45 jours",
    description: "Simulation accélérée du cycle de production à Lomé.",
    durationMs: 10000,
    camera: { position: [3.5, 2.5, 5], lookAt: [0, 1.5, -0.3] },
    action: "advance",
  },
  {
    id: 5,
    title: "Récolte & rentabilité",
    description: "Rentable dès le 2e mois — ×3 vs agriculture traditionnelle.",
    durationMs: 10000,
    camera: { position: [3, 2, 4.5], lookAt: [0, 1.2, 0] },
    action: "harvest",
  },
];

export const DRONE_WAYPOINTS: {
  position: [number, number, number];
  lookAt: [number, number, number];
  durationMs: number;
}[] = [
  { position: [70, 55, 70], lookAt: [0, 0, 0], durationMs: 4000 },
  { position: [-60, 45, 60], lookAt: [0, 0, 0], durationMs: 4000 },
  { position: [0, 75, 0], lookAt: [0, 0, 0], durationMs: 5000 },
  { position: [50, 35, -50], lookAt: [28, 0, 28], durationMs: 4000 },
  { position: [55, 42, 65], lookAt: [0, 0, 0], durationMs: 4000 },
];

export function estimateAnnualYieldKg(): number {
  return Math.round(2580 * 12 * 0.15 * 4);
}
