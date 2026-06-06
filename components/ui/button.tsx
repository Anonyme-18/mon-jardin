import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-forest px-8 py-3 text-white hover:bg-forest-dark",
        secondary:
          "rounded-full border-2 border-forest bg-transparent px-8 py-3 text-forest hover:bg-sage",
        amber:
          "rounded-full bg-amber px-8 py-3 font-medium text-amber-dark hover:scale-[1.03]",
        ghost: "rounded-full text-forest hover:bg-sage",
        outline:
          "rounded-full border-2 border-white bg-transparent px-8 py-3 text-white hover:bg-white/10",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
