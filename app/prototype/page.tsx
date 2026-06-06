import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrototypeVirtuel3D } from "@/components/prototype/PrototypeVirtuel3D";

export const metadata = {
  title: "Prototype virtuel 3D — Mon Jardin",
  description:
    "Simulez un cycle complet de culture hydroponique low-tech à Lomé — plantation, irrigation, récolte.",
};

export default function PrototypePage() {
  return (
    <section className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Prototype virtuel"
          title="Voyez Mon Jardin en action"
          subtitle="Simulez un cycle complet de culture — de la plantation à la récolte."
        />
        <PrototypeVirtuel3D />
        <p className="mt-4 text-center font-mono text-sm text-forest/60">
          Cliquez sur les pots pour planter · Faites glisser pour tourner la vue
        </p>
        <p className="mt-6 text-center">
          <a
            href="/prototype/terrain"
            className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-6 py-2 text-sm font-medium text-forest transition-colors hover:bg-sage"
          >
            Voir le prototype terrain 1 hectare →
          </a>
        </p>
      </div>
    </section>
  );
}
