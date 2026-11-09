"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Download,
  FileText,
  Play,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SocialVideoCard } from "@/components/ui/SocialVideoCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { VariableFontHover } from "@/components/ui/variable-font-hover";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import socialFeedData from "@/data/social-feed.json";
import { DOCUMENTOS_OFICIALES } from "@/data/liderazgos-historia";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

type ArchiveFilter =
  | "todo"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "comunicados";

const FILTER_TABS: { id: ArchiveFilter; label: string }[] = [
  { id: "todo", label: "Todo el Archivo" },
  { id: "tiktok", label: "TikTok (@dignidad100)" },
  { id: "instagram", label: "Instagram (@dignidad.guate)" },
  { id: "facebook", label: "Facebook Oficial" },
  { id: "comunicados", label: "Comunicados TSE" },
];

export default function VocesYRedesPage() {
  const posts = getSocialFeedPosts(socialFeedData as never);
  const tiktokPosts = posts.filter(
    (p) => p.platform === "tiktok" && p.type === "video"
  );

  const [activeTab, setActiveTab] = useState<ArchiveFilter>("todo");
  const [query, setQuery] = useState("");
  const [featuredVerticalVideo, setFeaturedVerticalVideo] =
    useState<SocialMediaPost>(tiktokPosts[0] || posts[0]);
  const [modalPost, setModalPost] = useState<SocialMediaPost | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchPlatform =
        activeTab === "todo" ||
        (activeTab === "tiktok" && post.platform === "tiktok") ||
        (activeTab === "instagram" && post.platform === "instagram") ||
        (activeTab === "facebook" && post.platform === "facebook");

      if (!matchPlatform) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        post.caption.toLowerCase().includes(q) ||
        (post.title || "").toLowerCase().includes(q) ||
        (post.location || "").toLowerCase().includes(q)
      );
    });
  }, [posts, activeTab, query]);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. CABECERA ARCHIVO MULTIMEDIA Y REPRODUCTOR VERTICAL 9:16 INTEGRADO */}
      <section className="py-16 lg:py-24 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionBadge code="[04 / SALA DE PRENSA Y ARCHIVO VIVO]">
                Voces, Territorios y Redes Oficiales
              </SectionBadge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#231012] leading-[1.03]">
                <VariableFontHover
                  className="justify-start text-left text-[#231012]"
                  fromFontVariationSettings="'wght' 300, 'slnt' 0"
                  toFontVariationSettings="'wght' 900, 'slnt' -10"
                  label="Archivo documental de nuestras"
                  staggerDuration={0.015}
                  staggerFrom="first"
                />{" "}
                <span className="font-editorial-italic font-semibold text-[#C81E1E]">
                  asambleas y comunidades.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#231012]/80 leading-relaxed">
                Explora los videos verticales de{" "}
                <strong className="text-[#231012]">@dignidad100</strong> en TikTok, las crónicas fotográficas de{" "}
                <strong className="text-[#231012]">@dignidad.guate</strong> en Instagram y los pronunciamientos de Facebook Oficial.
              </p>

              {/* Botones directos a cuentas oficiales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href="https://www.tiktok.com/@dignidad100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#7F1116] text-[#FAF6F0] text-xs font-mono-code font-bold hover:bg-[#C81E1E] transition"
                >
                  <span>TIKTOK/@DIGNIDAD100</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#F3EDE4]/65 border border-[#181313]/10 text-[#231012] text-xs font-mono-code font-bold hover:border-[#C81E1E] transition"
                >
                  <span>IG/@DIGNIDAD.GUATE</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590226876540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#F3EDE4]/65 border border-[#181313]/10 text-[#231012] text-xs font-mono-code font-bold hover:border-[#C81E1E] transition"
                >
                  <span>FB/DIGNIDAD OFICIAL</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* Selector rápido de discursos en el reproductor integrado */}
              <div className="pt-4">
                <p className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#C81E1E] mb-2.5">
                  Selecciona un video para reproducir:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tiktokPosts.map((vid, idx) => {
                    const active = featuredVerticalVideo.id === vid.id;
                    return (
                      <button
                        key={vid.id}
                        type="button"
                        onClick={() => setFeaturedVerticalVideo(vid)}
                        className={`px-3.5 py-2 rounded-xl font-mono-code text-xs font-bold border transition cursor-pointer ${
                          active
                            ? "bg-[#C81E1E] text-[#FAF6F0] border-[#C81E1E]"
                            : "bg-[#F3EDE4]/65 text-[#231012] border-[#181313]/8 hover:border-[#C81E1E]"
                        }`}
                      >
                        <Play className="w-3 h-3 inline mr-1.5" aria-hidden="true" />
                        Video 0{idx + 1}: {vid.location?.split(",")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reproductor Vertical 9:16 Integrado en Página */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] rounded-3xl bg-[#7F1116] text-[#FAF6F0] p-4 border border-[#7F1116]/25 shadow-2xl">
                <div className="flex items-center justify-between font-mono-code text-[11px] text-[#FFD600] mb-3">
                  <span>TikTok Oficial · @dignidad100</span>
                  <span>{featuredVerticalVideo.date}</span>
                </div>

                <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] relative">
                  {featuredVerticalVideo.localPath ? (
                    <video
                      key={featuredVerticalVideo.localPath}
                      src={featuredVerticalVideo.localPath}
                      poster={featuredVerticalVideo.thumbnail}
                      controls
                      playsInline
                      width={360}
                      height={640}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={featuredVerticalVideo.thumbnail}
                      alt={featuredVerticalVideo.caption}
                      width={360}
                      height={640}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs font-bold text-white">
                    {featuredVerticalVideo.title || featuredVerticalVideo.location}
                  </p>
                  <p className="text-xs text-[#FAF6F0]/75 line-clamp-2">
                    {featuredVerticalVideo.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANNER ROJO DE ESCOGER CATEGORÍA Y CATÁLOGO DOCUMENTAL */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* BANNER ROJO CON COLORES DEL LOGO DE DIGNIDAD */}
          <div className="rounded-3xl bg-[#B81D13] p-6 sm:p-8 text-white shadow-xl mb-12 border border-[#991B1B]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/15 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FFD600] font-bold block mb-1">
                  FILTRAR POR PLATAFORMA OFICIAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                  Escoger Categoría
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-white/80 max-w-md">
                Selecciona la fuente documental o busca crónicas y asambleas por municipio.
              </p>
            </div>

            <search
              aria-label="Filtrar archivo de voces, redes y comunicados TSE"
              className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
            >
              <div
                role="tablist"
                aria-label="Filtros por plataforma"
                className="flex flex-wrap items-center gap-2.5"
              >
                {FILTER_TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                        active
                          ? "bg-white text-[#B81D13] shadow-md scale-105"
                          : "bg-black/25 text-white/95 border border-white/20 hover:bg-white/15"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {activeTab !== "comunicados" && (
                <div className="relative min-w-[280px]">
                  <label htmlFor="archive-search" className="sr-only">
                    Buscar en el archivo
                  </label>
                  <Search
                    className="w-4 h-4 text-white/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="archive-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por municipio o tema..."
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/15 border border-white/25 text-sm text-white placeholder-white/70 focus:outline-none focus:bg-white focus:text-[#181313] transition"
                  />
                </div>
              )}
            </search>
          </div>

          {activeTab === "comunicados" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOCUMENTOS_OFICIALES.map((doc) => (
                <article
                  key={doc.id}
                  className="rounded-2xl bg-white border border-[#181313]/8 p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono-code text-xs mb-3">
                      <span className="font-bold text-[#C81E1E]">
                        [{doc.categoria.toUpperCase()}]
                      </span>
                      <span className="text-[#231012]/70">
                        {doc.fecha} · {doc.paginas}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold font-display text-[#231012] mb-2">
                      {doc.titulo}
                    </h2>
                    <p className="text-sm text-[#231012]/80 leading-relaxed mb-6">
                      {doc.descripcion}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#181313]/8 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono-code text-xs font-bold text-[#231012]">
                      <FileText className="w-4 h-4 text-[#C81E1E]" aria-hidden="true" />
                      {doc.peso}
                    </span>
                    <a
                      href={doc.urlDescarga}
                      download
                      className="inline-flex items-center gap-2 bg-[#7F1116] hover:bg-[#C81E1E] text-[#FAF6F0] font-bold text-xs px-5 py-2.5 rounded-full transition"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Descargar PDF</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <SocialVideoCard
                  key={post.id}
                  post={post}
                  index={idx}
                  onSelect={(p) => setModalPost(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ÁREA DE CONTACTO RÉPLICA EXACTA DE LA PLANTILLA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <GetInTouchContact />
      </section>

      <VideoModal post={modalPost} onClose={() => setModalPost(null)} />
    </div>
  );
}

