import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "amber" | "forest";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-sage text-forest",
        variant === "amber" && "bg-amber/20 text-amber",
        variant === "forest" && "bg-forest text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
