import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/kits", label: "Nos kits" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/a-propos", label: "À propos" },
];

const kitLinks = [
  { href: "/kits/kit-menage", label: "Kit Ménage" },
  { href: "/kits/kit-resto", label: "Kit Resto" },
  { href: "/kits/entretien", label: "Entretien" },
  { href: "/kits/recharge", label: "Recharge" },
  { href: "/services/clotures", label: "Location clôtures" },
];

export function Footer() {
  return (
    <footer className="bg-forest-dark text-sage-muted">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold text-white">
              🌿 Mon Jardin
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Dispositifs d&apos;agriculture verticale sans terrain ni électricité.
            </p>
            <p className="mt-2 text-sm">
              Agriculture verticale low-tech, Lomé
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Navigation</h3>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Nos kits</h3>
            <ul className="space-y-2">
              {kitLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>📞 +228 XX XX XX XX</li>
              <li>📧 contact@monjardin.tg</li>
              <li>📍 Lomé, Togo</li>
            </ul>
            <div className="mt-6">
              <Badge variant="forest" className="bg-forest-light">
                Groupe 16 — Road to INTELO 2026
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-forest pt-8 text-center text-sm">
          <p>© 2026 Mon Jardin. Tous droits réservés.</p>
          <p className="mt-1">Fait avec 🌿 à Lomé</p>
        </div>
      </div>
    </footer>
  );
}
