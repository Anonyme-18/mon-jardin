"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  italicWord?: string;
}

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
  italicWord,
}: SectionTitleProps) {
  const renderTitle = () => {
    if (!italicWord || !title.includes(italicWord)) {
      return title;
    }

    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <em className="italic">{italicWord}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-forest">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-forest-dark md:text-4xl lg:text-5xl">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-forest/70">{subtitle}</p>
      )}
    </motion.div>
  );
}
