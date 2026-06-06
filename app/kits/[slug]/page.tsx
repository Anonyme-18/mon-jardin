import { notFound } from "next/navigation";
import { KitDetail } from "@/components/kits/KitDetail";
import { kits } from "@/lib/data";

interface KitPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return kits.map((kit) => ({ slug: kit.slug }));
}

export function generateMetadata({ params }: KitPageProps) {
  const kit = kits.find((k) => k.slug === params.slug);
  if (!kit) return { title: "Kit non trouvé" };

  return {
    title: `${kit.name} — Mon Jardin`,
    description: kit.description,
  };
}

export default function KitPage({ params }: KitPageProps) {
  const kit = kits.find((k) => k.slug === params.slug);

  if (!kit) {
    notFound();
  }

  return (
    <div className="bg-cream pt-20">
      <KitDetail kit={kit} />
    </div>
  );
}
