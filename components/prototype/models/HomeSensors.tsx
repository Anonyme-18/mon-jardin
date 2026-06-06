"use client";

import { SensorNodes } from "@/components/prototype/shared/SensorNodes";
import { HOME_SENSORS } from "@/lib/sensorData";
import { useSimulation } from "../hooks/useSimulation";

export function HomeSensors() {
  const showSensors = useSimulation((s) => s.showSensors);
  const water = useSimulation((s) => s.water);
  const day = useSimulation((s) => s.day);
  const season = useSimulation((s) => s.season);

  return (
    <SensorNodes
      sensors={HOME_SENSORS}
      active={showSensors}
      context={{ water, day, seasonRain: season === "rainy" ? 25 : 0 }}
      htmlDistanceFactor={7}
      nodeScale={0.07}
    />
  );
}
