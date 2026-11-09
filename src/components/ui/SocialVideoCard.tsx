"use client";

import React from "react";
import { Play, Heart, Eye, MapPin } from "lucide-react";
import type { SocialMediaPost } from "@/lib/utils";

interface SocialVideoCardProps {
  post: SocialMediaPost;
  index?: number;
  onSelect: (post: SocialMediaPost) => void;
}

export function SocialVideoCard({ post, onSelect }: SocialVideoCardProps) {
  const platformName =
    post.platform === "tiktok"
      ? "TikTok · @dignidad100"
      : post.platform === "instagram"
      ? "Instagram · @dignidad.guate"
      : "Facebook · Dignidad Guatemala";

  return (
    <article
      onClick={() => onSelect(post)}
      className="project-card flex cursor-pointer flex-col gap-3.5 rounded-3xl border border-[#181313]/8 bg-white p-3 sm:p-3.5"
    >
      {/* Cabecera estilo rbp-portfolio.vercel.app */}
      <header className="flex items-center justify-between gap-2 px-1 pt-1.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#181313]/10 bg-[#FAF8F5] text-[#B81D13]">
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-[#181313]">
            {platformName}
          </span>
        </div>

        <span className="text-xs text-[#181313]/45">{post.date}</span>
      </header>

      {/* Imagen / Video frame */}
      <div className="project-card__image relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FAF8F5] ring-1 ring-[#181313]/6">
        <div className="project-card__image-inner relative h-full w-full">
          <img
            src={post.editorialPhoto || post.thumbnail}
            alt={post.title || post.caption}
            loading="lazy"
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
          {post.type === "video" && (
            <div className="absolute inset-0 bg-black/15 flex items-center justify-center transition-colors hover:bg-black/25">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#B81D13] shadow-md">
                <Play className="h-5 w-5 fill-current ml-0.5" aria-hidden="true" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cuerpo conversacional y limpio */}
      <div className="flex flex-col gap-2 px-1 pb-1">
        <h3 className="text-[19px] font-medium leading-[1.25] tracking-tight text-[#181313] sm:text-[20px]">
          {post.title || "Encuentro comunitario de Dignidad Guatemala"}
        </h3>
        <p className="text-[14px] leading-relaxed tracking-tight text-[#181313]/65 line-clamp-2">
          {post.caption}
        </p>
      </div>

      {/* Pie discreto */}
      <div className="flex items-center justify-between gap-2 px-1 pb-1.5 text-[12px] tracking-tight text-[#181313]/50">
        <span className="inline-flex items-center gap-1 truncate">
          <MapPin className="h-3.5 w-3.5 text-[#B81D13] shrink-0" aria-hidden="true" />
          <span className="truncate">{post.location || "Guatemala"}</span>
        </span>

        <div className="flex items-center gap-3 shrink-0">
          {post.views !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {post.views.toLocaleString("es-GT")}
            </span>
          )}
          {post.likes !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              {post.likes.toLocaleString("es-GT")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
