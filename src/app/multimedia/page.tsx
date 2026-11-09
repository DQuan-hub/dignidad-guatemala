"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Download,
  FileText,
  Play,
  Heart,
  MessageCircle,
  Video,
  Camera,
  Layers
} from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import socialFeedData from "@/data/social-feed.json";
import { DOCUMENTOS_OFICIALES } from "@/data/liderazgos-historia";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

type MediaFilter =
  | "todos"
  | "tiktok"
  | "instagram"
  | "facebook"
  | "documentos";

const FILTER_TABS: { id: MediaFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "todos", label: "Todo el Archivo", icon: Layers },
  { id: "tiktok", label: "TikTok Videos (@dignidad100)", icon: Video },
  { id: "instagram", label: "Instagram Fotos & Reels", icon: Camera },
  { id: "facebook", label: "Comunicados Facebook", icon: MessageCircle },
  { id: "documentos", label: "Documentos PDF TSE", icon: FileText },
];

export default function MultimediaPage() {
  const posts = getSocialFeedPosts(socialFeedData as never);
  const tiktokPosts = posts.filter(
    (p) => p.platform === "tiktok" && p.type === "video"
  );

  const [activeTab, setActiveTab] = useState<MediaFilter>("todos");
  const [query, setQuery] = useState("");
  const [featuredVideo, setFeaturedVideo] = useState<SocialMediaPost>(
    tiktokPosts[0] || posts[0]
  );
  const [modalPost, setModalPost] = useState<SocialMediaPost | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchPlatform =
        activeTab === "todos" ||
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
    <div className="flex flex-col gap-16 sm:gap-24 pb-16 pt-8 sm:pt-14">
      
      {/* 1. CABECERA MULTIMEDIA Y REPRODUCTOR VERTICAL 9:16 KELVORA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
                <span>[SALA DE PRENSA & ARCHIVO VIVO]</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#111C16] leading-[1.04]">
                Archivo documental de nuestras{" "}
                <span className="font-serif italic font-normal text-[#C83E2B]">
                  asambleas y redes.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#526058] leading-relaxed">
                Explora las crónicas visuales de los 22 departamentos: videos de TikTok en formato vertical, galerías de Instagram y pronunciamientos de Facebook Oficial.
              </p>

              {/* Botones directos a canales oficiales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href="https://www.tiktok.com/@dignidad100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#111C16] text-white font-mono text-xs font-bold uppercase hover:bg-[#C83E2B] transition"
                >
                  <span>TikTok Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D9822B]" />
                </a>

                <a
                  href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-[#111C16]/10 text-[#111C16] font-mono text-xs font-bold uppercase hover:border-[#C83E2B] transition shadow-2xs"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C83E2B]" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61590226876540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-[#111C16]/10 text-[#111C16] font-mono text-xs font-bold uppercase hover:border-[#C83E2B] transition shadow-2xs"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C83E2B]" />
                </a>
              </div>

              {/* Selector Rápido de Video en el reproductor */}
              <div className="pt-4 space-y-2.5">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#526058]">
                  Selecciona un video para reproducir:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tiktokPosts.map((vid, idx) => {
                    const active = featuredVideo.id === vid.id;
                    return (
                      <button
                        key={vid.id}
                        type="button"
                        onClick={() => setFeaturedVideo(vid)}
                        className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold border transition cursor-pointer ${
                          active
                            ? "bg-[#C83E2B] text-white border-[#C83E2B] shadow-xs"
                            : "bg-white text-[#111C16] border-[#111C16]/10 hover:border-[#C83E2B]"
                        }`}
                      >
                        <Play className="w-3 h-3 inline mr-1.5" />
                        Video 0{idx + 1}: {vid.location?.split(",")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reproductor Vertical 9:16 Integrado en Página */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] rounded-3xl bg-[#111C16] text-white p-4 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#D9822B] mb-3">
                  <span>TikTok Oficial · @dignidad100</span>
                  <span>{featuredVideo.date}</span>
                </div>

                <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] relative">
                  {featuredVideo.localPath ? (
                    <video
                      key={featuredVideo.localPath}
                      src={featuredVideo.localPath}
                      poster={featuredVideo.thumbnail}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.caption}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <p className="font-display text-xs font-bold text-white">
                    {featuredVideo.title || featuredVideo.location}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-2">
                    {featuredVideo.caption}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS EN PÍLDORAS KELVORA Y BÚSQUEDA */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          
          <div className="rounded-3xl border border-[#111C16]/10 bg-[#F3F6F4] p-5 sm:p-7 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xs">
            
            {/* Píldoras de Filtro */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => {
                const active = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs font-bold transition cursor-pointer ${
                      active
                        ? "bg-[#C83E2B] text-white shadow-xs"
                        : "bg-white text-[#111C16] hover:bg-neutral-100 border border-[#111C16]/10"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Búsqueda */}
            {activeTab !== "documentos" && (
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-[#526058] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por municipio o tema..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#111C16]/15 text-sm text-[#111C16] placeholder-[#526058] focus:outline-none focus:border-[#C83E2B]"
                />
              </div>
            )}
          </div>

          {/* Contenido Filtrado */}
          {activeTab === "documentos" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DOCUMENTOS_OFICIALES.map((doc) => (
                <article
                  key={doc.titulo}
                  className="rounded-3xl border border-[#111C16]/10 bg-white p-7 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-[#C83E2B]">
                      {doc.categoria} · {doc.fecha}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#111C16]">
                      {doc.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526058]">
                      {doc.descripcion}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#111C16]/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#526058]">
                      {doc.peso}
                    </span>
                    <a
                      href={doc.urlDescarga}
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111C16] hover:bg-[#C83E2B] text-white font-mono text-xs font-bold uppercase transition shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D9822B]" />
                      <span>Descargar PDF</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl border border-[#111C16]/10 bg-white overflow-hidden flex flex-col justify-between group hover:border-[#C83E2B]/50 transition-all duration-300 shadow-xs"
                >
                  <div
                    className="relative aspect-[16/10] bg-[#111C16] overflow-hidden cursor-pointer"
                    onClick={() => post.type === "video" && setModalPost(post)}
                  >
                    <img
                      src={post.thumbnail || post.editorialPhoto || "/brand/logo-dignidad.jpg"}
                      alt={post.title || post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/75 text-white">
                        {post.platform}
                      </span>
                      {post.type === "video" && (
                        <span className="font-mono text-[10px] font-bold text-[#D9822B] px-2 py-1 rounded bg-black/75">
                          9:16 VIDEO
                        </span>
                      )}
                    </div>

                    {post.type === "video" && (
                      <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-[#111C16] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C83E2B] group-hover:text-white transition">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg text-[#111C16]">
                        {post.title || post.location}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#526058] line-clamp-3 leading-relaxed">
                        {post.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#111C16]/10 flex items-center justify-between text-xs text-[#526058]">
                      <div className="flex items-center gap-3">
                        {post.likes && (
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Heart className="w-3.5 h-3.5 text-[#C83E2B]" />
                            {post.likes}
                          </span>
                        )}
                        {post.comments && (
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {post.comments}
                          </span>
                        )}
                      </div>

                      <a
                        href={post.url || post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#111C16] hover:text-[#C83E2B] transition"
                      >
                        <span>Ver en {post.platform}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 3. CONTACTO DIRECTO */}
      <section className="w-full">
        <GetInTouchContact />
      </section>

      <VideoModal post={modalPost} onClose={() => setModalPost(null)} />
    </div>
  );
}
