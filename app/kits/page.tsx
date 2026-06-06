"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KitCard } from "@/components/kits/KitCard";
import { KitFilter } from "@/components/kits/KitFilter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { kits } from "@/lib/data";

type FilterType = "all" | "kit" | "service" | "addon";

export default function KitsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredKits =
    filter === "all"
      ? kits
      : filter === "service"
        ? kits.filter(
            (k) => k.category === "service" || k.slug === "location-cloture"
          )
        : kits.filter((k) => k.category === filter);

  return (
    <div className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Nos kits"
          subtitle="Solutions adaptées aux ménages, restaurants et maraîchers de Lomé."
        />

        <div className="mb-12">
          <KitFilter active={filter} onChange={setFilter} />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredKits.map((kit, index) => (
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
      </div>
    </div>
  );
}
