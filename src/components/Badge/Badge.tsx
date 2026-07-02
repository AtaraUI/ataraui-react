import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium",
  {
    variants: {
      variant: {
        default: "bg-(--color-primary-500) text-white",
        secondary: "bg-(--color-neutral-100) text-(--color-neutral-700)",
        outline:
          "border border-(--color-primary-500) text-(--color-primary-500)",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        destructive: "bg-red-100 text-red-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, size, ...props }: BadgeProps) => (
  <span
    className={cn(badgeVariants({ variant, size }), className)}
    {...props}
  />
);
Badge.displayName = "Badge";
