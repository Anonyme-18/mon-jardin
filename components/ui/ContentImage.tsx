import Image from "next/image";
import { cn } from "@/lib/utils";
interface ContentImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspect?: "video" | "square" | "portrait" | "auto";
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/3]",
  auto: "",
};

export function ContentImage({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  aspect = "portrait",
}: ContentImageProps) {
  const wrapperClass = cn(
    "relative overflow-hidden",
    aspect !== "auto" && aspectClasses[aspect],
    className
  );

  if (aspect === "auto") {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        priority={priority}
        className={cn("h-auto w-full object-cover warm-image", className)}
        sizes={sizes}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover warm-image"
        sizes={sizes}
      />
    </div>
  );
}
