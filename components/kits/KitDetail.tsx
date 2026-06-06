"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Kit } from "@/lib/types";

interface KitDetailProps {
  kit: Kit;
}

export function KitDetail({ kit }: KitDetailProps) {
  const details = [
    kit.surface && { label: "Surface", value: kit.surface },
    kit.yield && { label: "Rendement", value: kit.yield },
    kit.installation && { label: "Installation", value: kit.installation },
    kit.deliveryTime && { label: "Délai livraison", value: kit.deliveryTime },
    kit.delivery && { label: "Livraison", value: kit.delivery },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid gap-12 lg:grid-cols-2"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-sage-border">
          <Image
            src={kit.image}
            alt={kit.name}
            fill
            className="object-cover warm-image"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {kit.popular && (
            <div className="absolute left-6 top-6">
              <Badge variant="amber">Plus populaire</Badge>
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold text-forest-dark">
            {kit.name}
          </h1>
          <p className="mt-4 text-lg text-forest/70">{kit.description}</p>

          <p className="mt-6 font-mono text-3xl font-bold text-forest">
            {kit.priceLabel || formatPrice(kit.price)}
          </p>

          {kit.includes && (
            <div className="mt-8">
              <h2 className="mb-3 font-display text-lg font-semibold text-forest-dark">
                Composants inclus
              </h2>
              <div className="flex flex-wrap gap-2">
                {kit.includes.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          )}

          {details.length > 0 && (
            <div className="mt-8 space-y-4">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-3 rounded-xl border border-sage-border bg-white p-4 ring-1 ring-sage-border"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                  <div>
                    <p className="text-sm font-medium text-forest-dark">
                      {detail.label}
                    </p>
                    <p className="text-sm text-forest/70">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {kit.slug === "location-cloture" ? (
              <>
                <Button variant="amber" size="lg" asChild>
                  <Link href="/services/clotures">
                    Accéder à la plateforme <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/kits">Voir tous les services</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="amber" size="lg" asChild>
                  <Link href={`/commander?kit=${kit.slug}`}>
                    Commander ce kit <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/kits">Voir tous les kits</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
