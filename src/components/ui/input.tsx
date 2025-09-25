import * as React from "react";

import { cn } from "@/utils/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "border";
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  let defaultVariant;

  if (variant == "default") {
    defaultVariant = cn(
      "border-t-0 border-l-0 border-r-0 border-b-[0.5px] shadow-none rounded-none border-b-primary focus-visible:ring-0 focus-visible:border-b-primary focus-visible:border-b-[1.5px] focus-visible:outline-none px-0",
      className
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        defaultVariant
      )}
      {...props}
    />
  );
}

export { Input };
