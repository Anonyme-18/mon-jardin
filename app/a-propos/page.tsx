"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentImage } from "@/components/ui/ContentImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { aboutFacts, teamMembers } from "@/lib/data";
import { siteImages } from "@/lib/images";

export default function AProposPage() {
  return (
    <div className="bg-cream pt-32">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Badge variant="amber" className="mb-4">
                Lomé, Togo 2026
              </Badge>
              <h1 className="font-display text-4xl font-bold text-forest-dark md:text-5xl">
                Cultiver autrement,{" "}
                <em className="italic">à Lomé</em>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-forest/70">
                Mon Jardin est une startup d&apos;agriculture verticale low-tech.
                Face à une inflation alimentaire de +22% à Lomé, nous concevons
                et installons des dispositifs hydroponiques en bambou — sans
                terrain ni électricité.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-forest/70">
                Notre mission : rendre l&apos;autoproduction accessible aux
                ménages de Bè, aux restaurants de Tokoin et aux maraîchers
                d&apos;Adidogomé.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <ContentImage
                src={siteImages.about}
                alt="Ferme verticale Mon Jardin sur 1 hectare — rangées parallèles et cuve centrale"
                aspect="portrait"
                className="rounded-xl ring-1 ring-sage-border"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-forest py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {aboutFacts.map((fact, index) => (
              <motion.div
                key={fact.label}
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
                <p className="font-mono text-2xl font-bold text-amber md:text-3xl">
                  {fact.value}
                </p>
                <p className="mt-2 text-sm text-sage-muted">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle title="Notre équipe" subtitle="Groupe 16 — Road to INTELO 2026" />

          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="rounded-xl border border-sage-border bg-white p-8 text-center ring-1 ring-sage-border"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest font-display text-xl font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-display text-lg font-semibold text-forest-dark">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-forest">{member.role}</p>
                <p className="mt-3 text-sm text-forest/70">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl font-bold text-forest-dark">
            Rejoignez les 34 clients équipés déjà
          </h2>
          <p className="mt-4 text-forest/70">
            88% des restaurants interrogés à Lomé sont intéressés par nos kits.
          </p>
          <Button variant="amber" size="lg" className="mt-8" asChild>
            <Link href="/commander">Commander mon kit →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
