"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

// Íconos SVG geométricos oficiales
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="0" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.887 2.872 2.895 2.895 0 0 1-2.896-2.892 2.897 2.897 0 0 1 2.896-2.893c.278 0 .545.038.8.11V9.37a6.34 6.34 0 0 0-.8-.051 6.34 6.34 0 0 0-6.34 6.333 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.332-6.34V9.012a8.214 8.214 0 0 0 4.77 1.517V7.085a4.767 4.767 0 0 1-1-.399z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.444.116-1.745.419-.348.35-.417.925-.417 1.889v1.672h4.595l-.597 3.667h-3.998v7.98h-4.462z" />
    </svg>
  );
}

const SOCIAL_CHANNELS = [
  {
    platform: "X (Twitter)",
    handle: "@dignidadgt",
    url: "https://x.com/dignidadgt?s=11",
    tag: "COMUNICADOS",
    status: "EN VIVO",
    headline: "Pronunciamientos, hilos programáticos y cobertura en tiempo real de asambleas.",
    icon: XIcon,
    accent: "#141413",
  },
  {
    platform: "Instagram",
    handle: "@dignidad.guate",
    url: "https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw==",
    tag: "FOTOGRAFÍA",
    status: "EN VIVO",
    headline: "Crónicas visuales del Altiplano, mujeres tejedoras y jornadas comunitarias.",
    icon: InstagramIcon,
    accent: "#C83226",
  },
  {
    platform: "TikTok",
    handle: "@dignidad100",
    url: "https://www.tiktok.com/@dignidad100",
    tag: "VIDEOS VERTICALES",
    status: "EN VIVO",
    headline: "Vocerías de base, saludos desde las milpas y explicaciones del Plan 2027.",
    icon: TikTokIcon,
    accent: "#141413",
  },
  {
    platform: "Facebook",
    handle: "Dignidad Guatemala",
    url: "https://www.facebook.com/profile.php?id=61590226876540",
    tag: "COMUNIDAD",
    status: "OFICIAL",
    headline: "Transmisiones en directo de asambleas departamentales y convocatorias.",
    icon: FacebookIcon,
    accent: "#C83226",
  },
];

export function EditorialSocialStrip({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Canales oficiales de redes sociales de Dignidad Guatemala"
      className={`w-full bg-[#FAF8F5] text-[#141413] border-y border-[#141413] ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#141413]">
        {SOCIAL_CHANNELS.map((ch, idx) => {
          const Icon = ch.icon;
          return (
            <article
              key={ch.platform}
              className="group relative p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:bg-[#EFECE6] transition-colors"
            >
              {/* Encabezado de Celda: Indicador EN VIVO y Plataforma */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C83226] animate-pulse rounded-none" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C83226]">
                    {ch.status}
                  </span>
                  <span className="text-[#141413]/30 font-mono text-xs">/</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#57534E]">
                    {ch.tag}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-[#141413]/40">
                  0{idx + 1}
                </span>
              </div>

              {/* Contenido: Nombre, Handle y Resumen */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#141413] text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#141413] leading-none">
                      {ch.platform}
                    </h3>
                    <p className="font-mono text-xs text-[#C83226] font-semibold tracking-tight mt-0.5">
                      {ch.handle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                  {ch.headline}
                </p>
              </div>

              {/* Botón Seguir */}
              <div className="pt-2">
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-3.5 py-2.5 bg-white border border-[#141413] font-mono text-xs font-bold uppercase tracking-wider text-[#141413] group-hover:bg-[#C83226] group-hover:text-white group-hover:border-[#C83226] transition-colors"
                >
                  <span>Seguir {ch.handle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default EditorialSocialStrip;
