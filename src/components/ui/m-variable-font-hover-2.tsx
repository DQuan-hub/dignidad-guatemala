"use client";
import { VariableFontHover } from "@/components/ui/variable-font-hover";

export default function VariableFontHoverHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-muted-foreground text-sm font-mono-code uppercase tracking-widest">
        Pasa el cursor sobre el titular · Dignidad #28 TSE
      </p>
      <VariableFontHover
        className="cursor-default text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#8B1518]"
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        label="Dignidad desde los Pueblos."
        staggerDuration={0.02}
        staggerFrom="first"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        transition={{ duration: 0.5, type: "spring" }}
      />
      <VariableFontHover
        className="cursor-default text-4xl sm:text-5xl lg:text-6xl text-[#C81E1E]/75 tracking-tight"
        fromFontVariationSettings="'wght' 900, 'slnt' -10"
        label="Rumbo a Guatemala 2027."
        staggerDuration={0.02}
        staggerFrom="last"
        toFontVariationSettings="'wght' 100, 'slnt' 0"
        transition={{ duration: 0.5, type: "spring" }}
      />
    </div>
  );
}

