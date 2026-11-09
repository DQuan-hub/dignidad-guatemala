import React from "react";
import { cn } from "@/lib/utils";

interface BgGradientProps {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientSize?: string;
  gradientPosition?: string;
  gradientStop?: string;
}

export const Component = ({ 
  className,
  gradientFrom = "#F4F1EA", // Dignidad base color
  gradientTo = "#B8332A",   // Dignidad Red brand logo color
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "40%"
}: BgGradientProps) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 w-full h-full -z-10 bg-white pointer-events-none",
        className
      )}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`
      }}
    />
  );
};

export default Component;

