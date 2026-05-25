import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

const badgeVariants = cva("font-sans font-semibold rounded-none border-2 border-border inline-flex items-center", {
  variants: {
    variant: {
      default: "bg-muted text-foreground shadow-[2px_2px_0px_0px_var(--border)]",
      outline: "bg-transparent text-foreground",
      solid: "bg-foreground text-background shadow-[2px_2px_0px_0px_#555]",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  children,
  size = "sm",
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
