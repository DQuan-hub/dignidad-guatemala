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
        "inline-flex items-center gap-2 px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider border",
        variant === "light"
          ? "bg-white text-[#141413] border-[#141413]/30 shadow-2xs"
          : "bg-[#141413] text-[#F5B800] border-white/20",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-none shrink-0",
          variant === "light" ? "bg-[#C83226]" : "bg-[#F5B800]"
        )}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}
