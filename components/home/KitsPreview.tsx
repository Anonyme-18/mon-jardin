"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KitCard } from "@/components/kits/KitCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { kits } from "@/lib/data";

const previewKits = kits.filter(
  (k) => k.slug === "kit-menage" || k.slug === "kit-resto" || k.slug === "entretien"
);

export function KitsPreview() {
  return (
    <section className="bg-cream-warm py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Choisissez votre kit"
          subtitle="Deux solutions, zéro contrainte."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {previewKits.map((kit, index) => (
            <motion.div
              key={kit.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <KitCard kit={kit} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" asChild>
            <Link href="/kits">Voir tous les kits →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
