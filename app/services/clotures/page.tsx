import { SectionTitle } from "@/components/ui/SectionTitle";
import { FenceMarketplace } from "@/components/services/FenceMarketplace";

export const metadata = {
  title: "Location de clôtures — Mon Jardin",
  description:
    "Louez votre mur ou clôture à Lomé, ou trouvez une surface pour installer votre kit d'agriculture verticale.",
};

export default function CloturesPage() {
  return (
    <div className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Service"
          title="Location de clôtures & murs"
          subtitle="Pas de mur chez vous ? Louez une clôture. Vous en avez une ? Mettez-la à disposition et gagnez un revenu passif."
        />
        <FenceMarketplace />
      </div>
    </div>
  );
}
