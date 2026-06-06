"use client";

import { useEffect, useRef } from "react";
import { useSimulation } from "../hooks/useSimulation";
import { HOME_GUIDED_TOUR } from "@/lib/prototypeEnhancements";
import { X, Play, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

export function GuidedTourRunner() {
  const guidedTourActive = useSimulation((s) => s.guidedTourActive);
  const guidedTourStep = useSimulation((s) => s.guidedTourStep);
  const setGuidedTourStep = useSimulation((s) => s.setGuidedTourStep);
  const setCameraOverride = useSimulation((s) => s.setCameraOverride);
  const stopGuidedTour = useSimulation((s) => s.stopGuidedTour);
  const plantAll = useSimulation((s) => s.plantAll);
  const activateWater = useSimulation((s) => s.activateWater);
  const toggleSensors = useSimulation((s) => s.toggleSensors);
  const advanceDays = useSimulation((s) => s.advanceDays);
  const harvest = useSimulation((s) => s.harvest);
  const showSensors = useSimulation((s) => s.showSensors);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionDone = useRef(false);

  useEffect(() => {
    if (!guidedTourActive) return;

    const step = HOME_GUIDED_TOUR[guidedTourStep];
    if (!step) {
      stopGuidedTour();
      return;
    }

    setCameraOverride(step.camera);
    actionDone.current = false;

    const runAction = () => {
      if (actionDone.current) return;
      actionDone.current = true;

      switch (step.action) {
        case "plant":
          plantAll();
          break;
        case "water":
          activateWater();
          break;
        case "sensors":
          if (!showSensors) toggleSensors();
          break;
        case "advance":
          advanceDays(45);
          break;
        case "harvest":
          harvest();
          break;
        default:
          break;
      }
    };

    const actionTimer = setTimeout(runAction, 800);

    timerRef.current = setTimeout(() => {
      const next = guidedTourStep + 1;
      if (next >= HOME_GUIDED_TOUR.length) {
        stopGuidedTour();
      } else {
        setGuidedTourStep(next);
      }
    }, step.durationMs);

    return () => {
      clearTimeout(actionTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    guidedTourActive,
    guidedTourStep,
    setCameraOverride,
    setGuidedTourStep,
    stopGuidedTour,
    plantAll,
    activateWater,
    toggleSensors,
    advanceDays,
    harvest,
    showSensors,
  ]);

  if (!guidedTourActive) return null;

  const step = HOME_GUIDED_TOUR[guidedTourStep];
  if (!step) return null;

  const progress = ((guidedTourStep + 1) / HOME_GUIDED_TOUR.length) * 100;

  return (
    <div className="pointer-events-auto absolute left-1/2 top-20 z-10 w-[min(420px,calc(100%-2rem))] -translate-x-1/2">
      <div className="rounded-2xl border border-sage-border bg-white/95 p-4 shadow-lg backdrop-blur-md">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-forest/50">
              Visite guidée · {guidedTourStep + 1}/{HOME_GUIDED_TOUR.length}
            </p>
            <h3 className="font-display text-base font-semibold text-forest-dark">
              {step.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={stopGuidedTour}
            className="rounded-lg p-1 text-forest/50 hover:bg-sage hover:text-forest"
            aria-label="Quitter la visite"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-forest/80">{step.description}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sage">
          <div
            className="h-full rounded-full bg-forest transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function GuidedTourButton() {
  const guidedTourActive = useSimulation((s) => s.guidedTourActive);
  const startGuidedTour = useSimulation((s) => s.startGuidedTour);
  const stopGuidedTour = useSimulation((s) => s.stopGuidedTour);

  return (
    <button
      type="button"
      onClick={guidedTourActive ? stopGuidedTour : startGuidedTour}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
        guidedTourActive
          ? "bg-amber text-amber-dark"
          : "border-2 border-forest bg-white/80 text-forest hover:bg-sage"
      )}
    >
      {guidedTourActive ? (
        <>
          <SkipForward className="h-4 w-4" />
          Arrêter visite
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          Visite guidée (60 s)
        </>
      )}
    </button>
  );
}

export function WeatherBadge() {
  const season = useSimulation((s) => s.season);
  const toggleSeason = useSimulation((s) => s.toggleSeason);
  const water = useSimulation((s) => s.water);

  const isDry = season === "dry";

  return (
    <button
      type="button"
      onClick={toggleSeason}
      className={cn(
        "pointer-events-auto rounded-xl px-3 py-2 text-left font-mono text-xs shadow-sm backdrop-blur-md transition-colors",
        isDry
          ? "border border-amber/40 bg-amber/15 text-amber-dark"
          : "border border-sky-300/50 bg-sky-100/80 text-sky-900"
      )}
    >
      <p className="font-bold">
        {isDry ? "☀ Saison sèche" : "🌧 Saison des pluies"}
      </p>
      <p className="mt-0.5 text-[10px] opacity-80">
        Cuve {Math.round(water)}% · clic pour alterner
      </p>
    </button>
  );
}

export function SensorAlertsPanel() {
  const showSensors = useSimulation((s) => s.showSensors);
  const water = useSimulation((s) => s.water);
  const season = useSimulation((s) => s.season);

  if (!showSensors) return null;

  const humidity = water * 0.6 + (season === "rainy" ? 25 : 0);
  const alerts: { level: "warning" | "info"; message: string }[] = [];

  if (humidity < 40) {
    alerts.push({
      level: "warning",
      message: "Humidité basse — arroser cette semaine",
    });
  }
  if (water < 30) {
    alerts.push({
      level: "warning",
      message: "Réservoir critique — remplir la cuve",
    });
  }
  if (season === "dry" && water < 50) {
    alerts.push({
      level: "info",
      message: "Saison sèche Lomé — évaporation +40 %",
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="pointer-events-none flex flex-col gap-2">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg px-3 py-2 font-mono text-xs shadow-md backdrop-blur-sm",
            alert.level === "warning"
              ? "border border-amber/50 bg-amber/90 text-amber-dark"
              : "border border-sky-200 bg-white/90 text-forest"
          )}
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
}
