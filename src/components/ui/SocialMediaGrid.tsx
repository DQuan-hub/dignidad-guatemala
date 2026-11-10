"use client";

import React, { useState, useMemo } from "react";
import { Play, Heart, MessageCircle, ExternalLink, Repeat } from "lucide-react";
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#141413]/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#57534E]">
              FILTRAR REDES:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "todos", label: "Todas las publicaciones" },
              { id: "x", label: "X (@dignidadgt)" },
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
                  className={`px-4 py-2 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer border ${
                    active
                      ? "bg-[#C83226] text-white border-[#C83226]"
                      : "bg-white text-[#141413] border-[#141413]/25 hover:bg-[#EFECE6]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid Editorial de Medios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const isVideo = post.type === "video";
          return (
            <article
              key={post.id}
              className="group rounded-none bg-white border border-[#141413] overflow-hidden flex flex-col justify-between hover:border-[#C83226] transition-all duration-200"
            >
              {/* Media Container */}
              <div
                className="relative aspect-[16/10] bg-[#141413] overflow-hidden cursor-pointer"
                onClick={() => isVideo && onSelectVideo && onSelectVideo(post)}
              >
                <img
                  src={post.thumbnail || post.editorialPhoto || "/brand/logo-dignidad.jpg"}
                  alt={post.title || post.caption}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Badge de Plataforma */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none bg-[#141413] text-white border border-white/20">
                    {post.platform.toUpperCase()}
                  </span>
                  {isVideo && (
                    <span className="font-mono text-[10px] font-bold text-[#F5B800] px-2 py-1 rounded-none bg-black/80">
                      9:16 VIDEO
                    </span>
                  )}
                </div>

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#C83226] text-white flex items-center justify-center rounded-none shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido Editorial */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#57534E]">
                    <span>{post.date}</span>
                    <span>{post.location}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#141413] leading-snug group-hover:text-[#C83226] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                </div>

                {/* Footer del Post */}
                <div className="pt-3 border-t border-[#141413]/15 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#57534E]">
                    {post.likes !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#C83226]" />
                        {post.likes}
                      </span>
                    )}
                    {post.comments !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {post.comments}
                      </span>
                    )}
                  </div>

                  <a
                    href={post.url || post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#141413] hover:text-[#C83226] transition-colors"
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
