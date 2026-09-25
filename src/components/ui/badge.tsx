import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-white",
        outline: "text-foreground",
        // Monochrome text on a neutral chip…
        soft: "border-transparent bg-black/[0.06] text-black dark:bg-white/10 dark:text-white",
        // …or on a softly tinted chip (text stays black/white).
        "soft-orange":
          "border-transparent bg-secondary/15 text-black dark:bg-secondary/20 dark:text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
