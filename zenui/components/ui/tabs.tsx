"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-[50px] p-1 bg-white/60 backdrop-blur border border-gray-200/60 shadow-sm mx-auto",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex min-w-[6.75rem] items-center justify-center rounded-[50px] px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-all border text-gray-600 bg-white/60 border-gray-200/70 hover:bg-white/75 hover:border-gray-300/70",
        "data-[state=active]:text-white data-[state=active]:border-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400/90 data-[state=active]:to-emerald-300/90 data-[state=active]:shadow-[0_8px_24px_rgba(124,58,237,0.15),_0_4px_12px_rgba(16,185,129,0.12)]",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
