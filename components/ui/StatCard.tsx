import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <p className="font-mono text-2xl font-bold md:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-sage-muted md:text-base">{label}</p>
    </div>
  );
}
