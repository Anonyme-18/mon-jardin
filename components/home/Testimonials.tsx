"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Ils utilisent déjà Mon Jardin"
          subtitle="34 clients validés — 88% des restaurants interrogés sont intéressés."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15,
              }}
              className="rounded-xl border border-sage-border bg-white p-8 ring-1 ring-sage-border"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-forest font-display text-lg font-bold text-white">
                {testimonial.initials}
              </div>
              <blockquote className="font-display text-lg italic leading-relaxed text-forest-dark">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="font-medium text-forest-dark">{testimonial.name}</p>
                <p className="text-sm text-forest/60">
                  {testimonial.role}, {testimonial.neighborhood}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
