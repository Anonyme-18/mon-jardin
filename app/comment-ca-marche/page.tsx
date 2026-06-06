"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Wrench,
  Sprout,
  CheckCircle2,
  Droplets,
  Sun,
  Recycle,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/lib/data";
import { siteImages } from "@/lib/images";
import { ContentImage } from "@/components/ui/ContentImage";
import { PrototypeVirtuel3D } from "@/components/prototype/PrototypeVirtuel3D";

const iconMap = {
  ShoppingBag,
  Wrench,
  Sprout,
  CheckCircle2,
};

const principles = [
  {
    icon: Droplets,
    title: "Hydroponie périmétrique",
    description:
      "L'eau circule par gravité dans des gouttières en bambou. Pas de pompe, pas d'électricité.",
    image: siteImages.irrigation,
    imageAlt: "Irrigation goutte-à-goutte sur plants",
  },
  {
    icon: Sun,
    title: "Lumière naturelle",
    description:
      "Votre dispositif capte le soleil de Lomé. Mise en production : 45 à 60 jours.",
    image: siteImages.installationLome,
    imageAlt: "Dispositif vertical Mon Jardin à Lomé — Église Saint-Pierre & Paul",
  },
  {
    icon: Recycle,
    title: "Compost organique",
    description:
      "Terreau enrichi localement. Recharge disponible sous 48h à Lomé pour 5 000 FCFA.",
    image: siteImages.compost,
    imageAlt: "Compost et terreau pour recharge de culture",
  },
];

export default function CommentCaMarchePage() {
  return (
    <div className="bg-cream pt-32">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            title="Comment ça marche"
            subtitle="Agriculture verticale low-tech — zéro électricité, ×3 le rendement."
          />

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
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest text-white">
                    <Icon className="h-9 w-9" />
                  </div>
                  <span className="font-mono text-sm text-amber">
                    Étape {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-forest-dark">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-forest/70">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            title="La technologie low-tech"
            subtitle="Simple, durable, adaptée au climat togolais."
          />

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="overflow-hidden rounded-xl border border-sage-border bg-white ring-1 ring-sage-border"
              >
                <ContentImage
                  src={principle.image}
                  alt={principle.imageAlt}
                  aspect="video"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-8">
                <principle.icon className="mb-4 h-10 w-10 text-forest" />
                <h3 className="font-display text-lg font-semibold text-forest-dark">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm text-forest/70">
                  {principle.description}
                </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="prototype" className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Prototype virtuel"
            title="Voyez Mon Jardin en action"
            subtitle="Simulez un cycle complet de culture — de la plantation à la récolte."
          />
          <PrototypeVirtuel3D />
          <p className="mt-4 text-center font-mono text-sm text-forest/60">
            Cliquez sur les pots pour planter · Faites glisser pour tourner la vue
          </p>
        </div>
      </section>

      <section className="bg-forest-dark py-24 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-bold">
            Prêt à démarrer ?
          </h2>
          <p className="mt-4 text-sage-muted">
            Installation incluse à Lomé. Rentable dès le 2e mois.
          </p>
          <Button variant="amber" size="lg" className="mt-8" asChild>
            <Link href="/commander">Commander mon kit →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
