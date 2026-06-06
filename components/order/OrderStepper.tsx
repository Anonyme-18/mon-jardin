"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStep } from "@/lib/types";

const steps = [
  { number: 1, label: "Votre kit" },
  { number: 2, label: "Vos informations" },
  { number: 3, label: "Livraison" },
  { number: 4, label: "Confirmation" },
];

interface OrderStepperProps {
  currentStep: OrderStep;
}

export function OrderStepper({ currentStep }: OrderStepperProps) {
  return (
    <div className="mb-12">
      <div className="hidden md:flex md:items-center md:justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isCompleted && "bg-amber text-amber-dark",
                    isActive && "bg-forest text-white",
                    !isCompleted && !isActive && "border-2 border-sage-border bg-white text-forest/40"
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isActive ? "text-forest" : "text-forest/50"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-0.5 flex-1",
                    isCompleted ? "bg-amber" : "bg-sage-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  isCompleted && "bg-amber text-amber-dark",
                  isActive && "bg-forest text-white",
                  !isCompleted && !isActive && "border-2 border-sage-border text-forest/40"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-forest" : "text-forest/50"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
