import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-20 text-center">
      <h1 className="font-display text-4xl font-bold text-forest-dark">
        Page non trouvée
      </h1>
      <p className="mt-4 text-forest/70">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Button variant="primary" className="mt-8" asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
