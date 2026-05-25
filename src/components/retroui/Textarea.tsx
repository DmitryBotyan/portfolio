import React, { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  placeholder = "Enter text...",
  className = "",
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className={cn(
        "px-4 py-2.5 w-full rounded-none border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] transition focus:outline-none focus:shadow-[1px_1px_0px_0px_var(--border)] focus:translate-x-0.5 focus:translate-y-0.5 bg-background font-sans placeholder:text-muted-foreground resize-none",
        className,
      )}
      {...props}
    />
  );
};
