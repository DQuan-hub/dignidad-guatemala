"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { EjeProgramatico } from "@/data/ejes-programaticos";

interface KelvoraAxisRowProps {
  eje: EjeProgramatico;
  index: number;
}

export function KelvoraAxisRow({ eje, index }: KelvoraAxisRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/ejes/${eje.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block w-full border-t border-[#141413]/15 py-7 sm:py-9 px-4 sm:px-6 transition-colors duration-300 hover:bg-[#FAF8F5]"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-8">
        
        {/* Lado Izquierdo: [01] + Titular Editorial */}
        <div className="flex items-start sm:items-center gap-5 sm:gap-8">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#57534E] font-bold shrink-0 pt-1 sm:pt-0">
            [{eje.numero}]
          </span>

          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#141413] group-hover:text-[#C83226] transition-colors duration-300">
              {eje.titulo}{" "}
              <span className="font-serif italic font-normal text-[#C83226]">
                — {eje.palabraClaveCursiva}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] font-medium line-clamp-1 lg:hidden">
              {eje.subtitulo}
            </p>
          </div>
        </div>

        {/* Centro: Resumen breve en Desktop */}
        <div className="hidden lg:block max-w-sm xl:max-w-md">
          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-2">
            {eje.subtitulo}
          </p>
        </div>

        {/* Lado Derecho: Miniatura flotante on hover + Flecha Rectangular */}
        <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
          {/* Miniatura que se revela con suavidad */}
          <div className="relative w-28 h-16 sm:w-36 sm:h-20 rounded-none overflow-hidden hidden sm:block border border-[#141413]/20 bg-[#141413]">
            <img
              src={eje.imagenHero}
              alt={eje.pieFotoHero || eje.titulo}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? "scale-110 opacity-100" : "scale-100 opacity-60 grayscale-[40%]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Botón rectangular con flecha diagonal */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-none border border-[#141413]/25 flex items-center justify-center bg-white group-hover:bg-[#C83226] group-hover:border-[#C83226] group-hover:text-white transition-all duration-300 shadow-2xs">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#141413] group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function KelvoraAxisList({ ejes }: { ejes: EjeProgramatico[] }) {
  return (
    <div className="w-full border-b border-[#141413]/15">
      {ejes.map((eje, idx) => (
        <KelvoraAxisRow key={eje.slug} eje={eje} index={idx} />
      ))}
    </div>
  );
}

export default KelvoraAxisRow;
