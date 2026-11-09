import { Component as BgGradient } from "@/components/ui/bg-gredient";
import VariableFontHoverHero from "@/components/ui/m-variable-font-hover-2";

export default function Default() {
  return (
    <div className="relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
      <BgGradient gradientFrom="#F4F1EA" gradientTo="#B8332A" />
      <VariableFontHoverHero />
    </div>
  );
}
