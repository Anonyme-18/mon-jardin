"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/kits", label: "Nos kits" },
  { href: "/services/clotures", label: "Location clôtures" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/prototype", label: "Prototype 3D" },
  { href: "/prototype/terrain", label: "Terrain 1 ha" },
  { href: "/a-propos", label: "À propos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cream shadow-sm backdrop-blur-md"
            : "bg-transparent backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className={cn(
              "font-display text-xl font-bold transition-colors",
              scrolled ? "text-forest-dark" : "text-white"
            )}
          >
            🌿 Mon Jardin
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber",
                  scrolled ? "text-forest" : "text-white/90"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="amber" size="sm" asChild>
              <Link href="/commander">Commander mon kit</Link>
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "rounded-full p-2 md:hidden",
              scrolled ? "text-forest" : "text-white"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-forest-dark/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[80%] max-w-sm flex-col bg-forest-dark p-8 md:hidden"
            >
              <button
                type="button"
                className="mb-8 self-end rounded-full p-2 text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="amber" className="mt-4" asChild>
                  <Link href="/commander" onClick={() => setMobileOpen(false)}>
                    Commander mon kit
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
