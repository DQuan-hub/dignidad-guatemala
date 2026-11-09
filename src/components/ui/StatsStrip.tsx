"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: "Partido #28",
    label: "Inscrito ante el TSE",
    sublabel: "Registro legal vigente con respaldo comunitario nacional",
  },
  {
    value: "22 Deptos.",
    label: "Presencia en Guatemala",
    sublabel: "Coordinadoras departamentales y comités municipales",
  },
  {
    value: "4 Pueblos",
    label: "Maya, Xinka, Garífuna y Mestizo",
    sublabel: "Unidad plurinacional del campo y la ciudad",
  },
  {
    value: "Ruta 2027",
    label: "Participación Ciudadana",
    sublabel: "Asambleas abiertas y puertas abiertas en cada municipio",
  },
];

export function StatsStrip({ className }: { className?: string }) {
  return (
    <section
      aria-label="Datos clave de Dignidad Guatemala"
      className={cn("mx-auto w-full max-w-[1100px] px-6 sm:px-10", className)}
    >
      <div className="rounded-3xl border border-[#181313]/8 bg-white p-6 sm:p-8 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#181313]/8">
          {DEFAULT_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-1",
                idx > 0 && "pt-5 sm:pt-0 sm:pl-6 lg:pl-8"
              )}
            >
              <span className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#B81D13]">
                {stat.value}
              </span>
              <h2 className="text-sm font-semibold text-[#181313]">
                {stat.label}
              </h2>
              <p className="text-xs text-[#181313]/60 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
