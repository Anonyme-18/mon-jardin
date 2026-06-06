"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const arguments_ = [
  { icon: TrendingUp, text: "Rendement ×3" },
  { icon: Zap, text: "0 FCFA d'électricité" },
  { icon: Leaf, text: "Rentable dès le mois 2" },
];

export function CTASection() {
  return (
    <section className="bg-forest-dark py-24 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Prêt à installer votre dispositif ?
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {arguments_.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sage-muted"
              >
                <Icon className="h-5 w-5 text-amber" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button variant="amber" size="lg" asChild>
              <Link href="/commander">Commander mon kit →</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
