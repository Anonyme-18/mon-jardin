import { SectionTitle } from "@/components/ui/SectionTitle";
import { PrototypeTerrainHectare3D } from "@/components/prototype-terrain/PrototypeTerrainHectare3D";

export const metadata = {
  title: "Prototype terrain 1 hectare — Mon Jardin",
  description:
    "Modélisation 3D d'une ferme verticale hydroponique low-tech sur 1 hectare à Lomé — rangées parallèles, cuve centrale, irrigation gravitaire.",
};

export default function PrototypeTerrainPage() {
  return (
    <section className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Installation professionnelle"
          title="1 hectare en vue aérienne"
          subtitle="Chaque module est un kit ménage Mon Jardin (bambou, 24 pots, 3 niveaux) — répété sur 1 ha avec 30 cm entre les lignes."
        />
        <PrototypeTerrainHectare3D />
        <p className="mt-4 text-center font-mono text-sm text-forest/60">
          Faites glisser pour tourner · Zoomez pour voir le détail du kit ménage · Cuve centrale d&apos;irrigation
        </p>
      </div>
    </section>
  );
}
