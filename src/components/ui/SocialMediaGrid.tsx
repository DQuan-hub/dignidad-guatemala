"use client";

import React, { useState, useMemo } from "react";
import { Play, Heart, MessageCircle, ExternalLink, Filter } from "lucide-react";
import type { SocialMediaPost } from "@/lib/utils";

interface SocialMediaGridProps {
  posts: SocialMediaPost[];
  onSelectVideo?: (post: SocialMediaPost) => void;
  initialFilter?: string;
  showFilters?: boolean;
  limit?: number;
}

export function SocialMediaGrid({
  posts,
  onSelectVideo,
  initialFilter = "todos",
  showFilters = true,
  limit
}: SocialMediaGridProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filteredPosts = useMemo(() => {
    let list = posts;
    if (activeFilter !== "todos") {
      list = posts.filter((p) => p.platform === activeFilter);
    }
    return limit ? list.slice(0, limit) : list;
  }, [posts, activeFilter, limit]);

  return (
    <div className="w-full space-y-8">
      {showFilters && (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#141413]/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#57534E]">
              FILTRAR REDES:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "todos", label: "Todas las publicaciones" },
              { id: "tiktok", label: "TikTok (@dignidad100)" },
              { id: "instagram", label: "Instagram (@dignidad.guate)" },
              { id: "facebook", label: "Facebook Oficial" }
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition cursor-pointer ${
                    active
                      ? "bg-[#C83E2B] text-white shadow-xs"
                      : "bg-white text-[#111C16] border border-[#111C16]/10 hover:bg-neutral-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid Bento de Medios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const isVideo = post.type === "video";
          return (
            <article
              key={post.id}
              className="group rounded-3xl bg-white border border-[#111C16]/10 overflow-hidden flex flex-col justify-between hover:border-[#C83E2B]/50 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Media Container */}
              <div
                className="relative aspect-[16/10] bg-[#111C16] overflow-hidden cursor-pointer"
                onClick={() => isVideo && onSelectVideo && onSelectVideo(post)}
              >
                <img
                  src={post.thumbnail || post.editorialPhoto || "/brand/logo-dignidad.jpg"}
                  alt={post.title || post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Badge de Plataforma */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/70 text-white backdrop-blur-xs border border-white/15">
                    {post.platform}
                  </span>
                  {isVideo && (
                    <span className="font-mono text-[10px] font-bold text-[#D9822B] px-2 py-1 rounded-md bg-black/70">
                      9:16 VIDEO
                    </span>
                  )}
                </div>

                {/* Botón Play central si es video */}
                {isVideo && (
                  <button
                    type="button"
                    aria-label="Reproducir video"
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-[#141413] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#C83E2B] group-hover:text-white transition-all duration-300"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                )}

                {/* Ubicación en foto */}
                {post.location && (
                  <span className="absolute bottom-3 left-3 text-white text-xs font-medium font-mono drop-shadow-sm">
                    📍 {post.location}
                  </span>
                )}
              </div>

              {/* Contenido / Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#111C16] leading-snug group-hover:text-[#C83E2B] transition-colors">
                    {post.title || post.location}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#526058] line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                {/* Footer de Tarjeta: Métricas y Enlace */}
                <div className="pt-3 border-t border-[#111C16]/8 flex items-center justify-between text-xs text-[#526058]">
                  <div className="flex items-center gap-3">
                    {post.likes && (
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Heart className="w-3.5 h-3.5 text-[#C83E2B]" />
                        {post.likes}
                      </span>
                    )}
                    {post.comments && (
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <MessageCircle className="w-3.5 h-3.5 text-[#526058]" />
                        {post.comments}
                      </span>
                    )}
                  </div>

                  <a
                    href={post.url || post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#141413] hover:text-[#C83E2B] transition-colors"
                  >
                    <span>Ver en {post.platform}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default SocialMediaGrid;
