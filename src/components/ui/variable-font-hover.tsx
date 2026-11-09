"use client";

import React, { useState } from "react";
import { motion, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VariableFontHoverProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
}

function parseAxisValue(settings: string, axis: string): number | undefined {
  const regex = new RegExp(`['"]${axis}['"]\\s+(-?\\d+(?:\\.\\d+)?)`);
  const match = settings.match(regex);
  return match ? parseFloat(match[1]) : undefined;
}

export function VariableFontHover({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = { duration: 0.5, type: "spring" },
  staggerDuration = 0.02,
  staggerFrom = "first",
  className,
  onClick,
}: VariableFontHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = Array.from(label);
  const total = chars.length;

  const fromWeight = parseAxisValue(fromFontVariationSettings, "wght");
  const toWeight = parseAxisValue(toFontVariationSettings, "wght");
  const fromSlant = parseAxisValue(fromFontVariationSettings, "slnt");
  const toSlant = parseAxisValue(toFontVariationSettings, "slnt");

  const getDelay = (index: number): number => {
    if (staggerDuration <= 0 || total <= 1) return 0;
    if (staggerFrom === "first") {
      return index * staggerDuration;
    }
    if (staggerFrom === "last") {
      return (total - 1 - index) * staggerDuration;
    }
    if (staggerFrom === "center") {
      const center = (total - 1) / 2;
      return Math.abs(index - center) * staggerDuration;
    }
    if (typeof staggerFrom === "number") {
      return Math.abs(index - staggerFrom) * staggerDuration;
    }
    return index * staggerDuration;
  };

  return (
    <motion.span
      className={cn(
        "inline-flex flex-wrap justify-center font-variable select-none",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {chars.map((char, index) => {
        const letterVariants: Variants = {
          rest: {
            fontVariationSettings: fromFontVariationSettings,
            ...(fromWeight !== undefined ? { fontWeight: fromWeight } : {}),
            ...(fromSlant !== undefined ? { skewX: fromSlant } : {}),
          },
          hover: {
            fontVariationSettings: toFontVariationSettings,
            ...(toWeight !== undefined ? { fontWeight: toWeight } : {}),
            ...(toSlant !== undefined ? { skewX: toSlant } : {}),
          },
        };

        return (
          <motion.span
            key={`${char}-${index}`}
            aria-hidden="true"
            variants={letterVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            transition={{
              ...transition,
              delay: getDelay(index),
            }}
            className="inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
export default VariableFontHover;

