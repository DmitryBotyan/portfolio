import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";

export const buttonVariants = cva(
  "font-head transition-all rounded-none outline-hidden cursor-pointer duration-200 font-medium flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        default:
          "shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] active:shadow-none bg-foreground text-background border-2 border-border transition hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1",
        secondary:
          "shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] active:shadow-none bg-background text-foreground border-2 border-border transition hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1",
        outline:
          "shadow-[3px_3px_0px_0px_var(--border)] hover:shadow-[1px_1px_0px_0px_var(--border)] active:shadow-none bg-transparent border-2 border-border transition hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1",
        ghost: "bg-transparent hover:bg-muted border-2 border-transparent",
        link: "bg-transparent hover:underline underline-offset-4 border-0 shadow-none p-0",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      asChild = false,
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
