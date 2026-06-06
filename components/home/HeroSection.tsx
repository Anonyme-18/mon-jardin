"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/img/image2.jpeg"
        alt="Dispositif d'agriculture verticale Mon Jardin en bambou"
        fill
        priority
        className="object-cover warm-image"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-forest-dark/60" />
      <div className="grain-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge variant="amber" className="mb-6 bg-amber/20 text-amber">
            Lomé, Togo 2026
          </Badge>

          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Cultivez <em className="italic">chez vous</em>,
            <br />
            sans terrain,
            <br />
            sans électricité.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Mon Jardin installe votre dispositif vertical en bambou.
            Rendement ×3, rentable dès le 2e mois.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="amber" size="lg" asChild>
              <Link href="/commander">Commander mon kit →</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/comment-ca-marche">Voir comment ça marche</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-24 left-6 hidden rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm md:block lg:left-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="font-mono font-bold text-amber">+22%</span>
        <span className="ml-2 text-white/80">
          inflation alimentaire à Lomé
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-6 hidden rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm md:block lg:right-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-mono font-bold text-amber">0 FCFA</span>
        <span className="ml-2 text-white/80">d&apos;électricité</span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  );
}
