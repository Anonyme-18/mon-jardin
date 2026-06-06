"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LAST_ORDER_KEY } from "@/lib/utils";
import type { SavedOrder } from "@/lib/types";

function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 1,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-forest"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: "100vh",
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    }
  }, []);

  const whatsappUrl =
    "https://wa.me/?text=Je+viens+de+commander+mon+kit+Mon+Jardin+%F0%9F%8C%BF";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cream py-24 pt-32">
      <Confetti />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-lg px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-forest"
        >
          <Check className="h-10 w-10 text-white" />
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-forest-dark md:text-4xl">
          Commande enregistrée !
        </h1>

        {order && (
          <>
            <p className="mt-4 font-mono text-lg text-forest">
              N° {order.orderId}
            </p>
            <p className="mt-4 text-forest/70">
              Notre équipe vous contactera sous 24h au{" "}
              <span className="font-medium text-forest-dark">
                {order.phone}
              </span>
            </p>
          </>
        )}

        {!order && (
          <p className="mt-4 text-forest/70">
            Notre équipe vous contactera sous 24h.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" asChild>
            <Link href="/">Retour accueil</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/commander">Commander un autre kit</Link>
          </Button>
        </div>

        <div className="mt-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.03]"
          >
            Partager sur WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
