"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Track
        "peer relative inline-flex items-center shrink-0 rounded-full border border-transparent outline-none transition-all duration-300",
        // Sizing (responsive)
        "h-5 w-10 sm:h-4 sm:w-8",
        // Backgrounds by state
        "data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:hover:brightness-105",
        "data-[state=checked]:bg-[linear-gradient(90deg,#9b5cff,#8a5aff)] data-[state=checked]:hover:brightness-110",
        // Accessibility focus ring
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        // Cursor / disabled
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Knob
          "pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform duration-300",
          // Size (responsive)
          "h-4 w-4 sm:h-[14px] sm:w-[14px]",
          // Position animation
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
