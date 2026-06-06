"use client";

import { useMemo } from "react";
import { useSpring } from "@react-spring/three";
import {
  getGrowthProgress,
  type PlantType,
} from "@/lib/plantData";

export function usePlantGrowthScale(
  plantedDay: number | null,
  plantType: PlantType | null,
  currentDay: number
) {
  const progress = useMemo(
    () => getGrowthProgress(plantedDay, plantType, currentDay),
    [plantedDay, plantType, currentDay]
  );

  const targetScale = progress <= 0 ? 0.05 : 0.05 + progress * 0.95;

  const spring = useSpring({
    scale: targetScale,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return { progress, spring, targetScale };
}
