"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Wrench, Sprout, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { howItWorksSteps } from "@/lib/data";

const iconMap = {
  ShoppingBag,
  Wrench,
  Sprout,
  CheckCircle2,
};

export function HowItWorks() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Comment ça marche"
          subtitle="De la commande à l'installation en 4 étapes simples."
        />

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 border-t-2 border-dashed border-sage-border md:block" />

          <div className="grid gap-12 md:grid-cols-4">
            {howItWorksSteps.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest text-white">
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber text-xs font-bold text-amber-dark">
                      {step.step}
                    </span>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-forest-dark">
                    {step.title}
                  </h3>
                  <p className="text-sm text-forest/70">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
