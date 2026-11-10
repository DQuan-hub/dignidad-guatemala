"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import socialFeedData from "@/data/social-feed.json";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export function BrandLogo({
  size = "md",
  showText = true,
  theme = "light",
  className,
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);
  const logoSrc =
    (socialFeedData as { brand?: { logo?: string } })?.brand?.logo ||
    "/brand/logo-dignidad.jpg";

  const dimensions = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative rounded-full overflow-hidden shrink-0 border-2 shadow-sm flex items-center justify-center bg-[#C81E1E]",
          theme === "light" ? "border-[#7F1116]/20" : "border-white/30",
          dimensions
        )}
      >
        {!imgError ? (
          <img
            src={logoSrc}
            alt="Logotipo Oficial de Dignidad Guatemala (#28 TSE)"
            width={56}
            height={56}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            aria-label="Logotipo Dignidad Guatemala"
          >
            <circle cx="50" cy="50" r="48" fill="#C83226" />
            <text
              x="50"
              y="56"
              textAnchor="middle"
              fill="#F5B800"
              fontWeight="900"
              fontStyle="italic"
              fontSize="16"
            >
              DIGNIDAD
            </text>
          </svg>
        )}
      </div>

      {showText && (
        <div className="leading-none">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-lg sm:text-xl font-extrabold font-display tracking-tight",
                theme === "light" ? "text-[#141413]" : "text-[#FAF8F5]"
              )}
            >
              DIGNIDAD GUATEMALA
            </span>
          </div>
          <span
            className={cn(
              "block font-mono text-[10px] uppercase tracking-widest mt-1 font-bold",
              theme === "light" ? "text-[#C83226]" : "text-[#F5B800]"
            )}
          >
            [PARTIDO #28 · TSE GUATEMALA]
          </span>
        </div>
      )}
    </div>
  );
}

