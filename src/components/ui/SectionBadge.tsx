import React from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  code?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function SectionBadge({
  children,
  variant = "light",
  className,
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-tight border",
        variant === "light"
          ? "bg-white text-[#7F1116] border-[#181313]/10 shadow-2xs"
          : "bg-white/10 text-[#FFD600] border-white/15",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full shrink-0",
          variant === "light" ? "bg-[#B81D13]" : "bg-[#FFD600]"
        )}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}
