import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentImage } from "@/components/ui/ContentImage";
import { FenceMarketplace } from "@/components/services/FenceMarketplace";
import { siteImages } from "@/lib/images";

export const metadata = {
  title: "Location de clôtures — Mon Jardin",
  description:
    "Louez votre mur ou clôture à Lomé, ou trouvez une surface pour installer votre kit d'agriculture verticale.",
};

export default function CloturesPage() {
  return (
    <div className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid items-center gap-8 lg:grid-cols-2">
          <SectionTitle
            eyebrow="Service"
            title="Location de clôtures & murs"
            subtitle="Deux espaces : cultivateur (trouver un mur) ou bailleur (louer le vôtre). Basculez en un clic."
            align="left"
            className="mb-0"
          />
          <ContentImage
            src={siteImages.cloturesHero}
            alt="Dispositif Mon Jardin installé sur un mur de cour à Lomé"
            aspect="portrait"
            className="rounded-xl ring-1 ring-sage-border"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <FenceMarketplace />
      </div>
    </div>
  );
}
