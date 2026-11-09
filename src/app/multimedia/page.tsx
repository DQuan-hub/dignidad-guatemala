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
  Layers,
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

const FILTER_TABS: {
  id: MediaFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "todos", label: "Todo el Archivo", icon: Layers },
  { id: "tiktok", label: "TikTok (@dignidad100)", icon: Video },
  { id: "instagram", label: "Instagram (@dignidad.guate)", icon: Camera },
  { id: "facebook", label: "Facebook Oficial", icon: MessageCircle },
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
    <div>
      {/* ====================================================================
          1. OPENING STATEMENT & FEATURED 9:16 TIKTOK PLAYER
         ==================================================================== */}
      <section id="opening" className="opening">
        <div className="op-second" style={{ minHeight: "auto", paddingTop: "104px" }}>
          <div className="lg:col-span-7 space-y-6" style={{ gridColumn: "1 / span 7" }}>
            <p className="m-text-5 text-[#FFD600]">
              Sala de Prensa & Archivo Vivo · @dignidad100
            </p>
            <h1 className="m-text-2">
              Crónicas documentales desde nuestras{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                asambleas
              </mark>{" "}
              y{" "}
              <mark
                className="m-mark"
                style={{ "--mark-color": "var(--color-4)" } as React.CSSProperties}
              >
                territorios
              </mark>
              .
            </h1>
            <p className="m-text-4 text-white/85 max-w-2xl">
              Explora los videos verticales reales de TikTok, galerías fotográficas de Instagram y comunicados oficiales de Facebook en los 22 departamentos.
            </p>

            {/* Enlaces directos a cuentas oficiales */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.tiktok.com/@dignidad100"
                target="_blank"
                rel="noopener noreferrer"
                className="m-btn-2"
              >
                <span className="m-btn-2__label">TikTok @dignidad100</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="m-icon text-white"
              >
                Instagram @dignidad.guate ↗
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590226876540"
                target="_blank"
                rel="noopener noreferrer"
                className="m-icon text-white"
              >
                Facebook Oficial ↗
              </a>
            </div>

            {/* Selector Rápido de Video Vertical */}
            <div className="pt-4 space-y-3">
              <span className="m-rule" aria-hidden="true" />
              <p className="m-text-5 text-[#FFD600]">
                Selecciona un video vertical para reproducir en vivo:
              </p>
              <div className="flex flex-wrap gap-2">
                {tiktokPosts.map((vid, idx) => {
                  const active = featuredVideo.id === vid.id;
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setFeaturedVideo(vid)}
                      className={`px-3.5 py-2 font-semibold text-xs border transition cursor-pointer ${
                        active
                          ? "bg-[#C83E2B] text-white border-[#C83E2B]"
                          : "bg-transparent text-white border-white/30 hover:border-[#FFD600]"
                      }`}
                    >
                      ▶ Video 0{idx + 1}: {vid.location?.split(",")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reproductor Vertical 9:16 Estilo Swiss */}
          <div
            className="flex justify-center lg:justify-end"
            style={{ gridColumn: "8 / span 5" }}
          >
            <div className="w-full max-w-[340px] bg-[#111C16] text-white p-4 border border-white/30">
              <div className="flex items-center justify-between m-text-5 text-[#FFD600] mb-3">
                <span>TikTok · @dignidad100</span>
                <span>{featuredVideo.date}</span>
              </div>

              <div className="overflow-hidden bg-black aspect-[9/16] relative border border-white/20">
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
                <p className="m-text-4 text-base text-white">
                  {featuredVideo.title || featuredVideo.location}
                </p>
                <p className="m-text-6 text-white/75 line-clamp-2">
                  {featuredVideo.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SWISS FILTER BAR & ARCHIVE GRID
         ==================================================================== */}
      <section className="py-20 wrap space-y-12">
        <div className="border-y border-[#111C16] py-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#D1DDD3]/40 px-4">
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.id;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-[#111C16] transition cursor-pointer ${
                    active
                      ? "bg-[#111C16] text-white"
                      : "bg-white text-[#111C16] hover:bg-[#FFD600]"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab !== "documentos" && (
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#111C16] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por municipio o tema..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#111C16] text-sm text-[#111C16] placeholder-[#526058] focus:outline-none focus:border-[#C83E2B]"
              />
            </div>
          )}
        </div>

        {activeTab === "documentos" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENTOS_OFICIALES.map((doc) => (
              <article
                key={doc.titulo}
                className="border border-[#111C16] bg-white p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-2">
                  <span className="m-text-5 text-[#C83E2B]">
                    {doc.categoria} · {doc.fecha}
                  </span>
                  <h3 className="m-text-4">{doc.titulo}</h3>
                  <p className="m-text">{doc.descripcion}</p>
                </div>

                <div className="pt-4 border-t border-[#111C16] flex items-center justify-between">
                  <span className="m-text-5">{doc.peso}</span>
                  <a href={doc.urlDescarga} download className="m-btn-2">
                    <span className="m-btn-2__label">Descargar PDF</span>
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => {
              const tints = [
                "var(--color-3)",
                "var(--color-5)",
                "var(--color-4)",
              ];
              return (
                <article
                  key={post.id}
                  className="border border-[#111C16] bg-white flex flex-col justify-between group"
                >
                  <div
                    className="relative aspect-[16/10] bg-[#111C16] overflow-hidden cursor-pointer border-b border-[#111C16]"
                    onClick={() => post.type === "video" && setModalPost(post)}
                  >
                    <img
                      src={
                        post.thumbnail ||
                        post.editorialPhoto ||
                        "/brand/logo-dignidad.jpg"
                      }
                      alt={post.title || post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="m-badge absolute top-0 left-0"
                      style={
                        {
                          background: tints[idx % tints.length],
                          color:
                            idx % tints.length === 0 ? "#ffffff" : "#111C16",
                        } as React.CSSProperties
                      }
                    >
                      {post.platform} {post.type === "video" ? "· 9:16 Video" : ""}
                    </span>

                    {post.type === "video" && (
                      <div className="absolute inset-0 m-auto w-12 h-12 bg-[#C83E2B] text-white flex items-center justify-center group-hover:bg-[#FFD600] group-hover:text-[#111C16] transition">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="m-text-5 text-[#C83E2B]">{post.date}</p>
                      <h3 className="m-text-4">
                        {post.title || post.location}
                      </h3>
                      <p className="m-text-6 text-[#526058] line-clamp-3">
                        {post.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#111C16] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {post.likes && (
                          <span className="flex items-center gap-1 font-bold">
                            <Heart className="w-3.5 h-3.5 text-[#C83E2B]" />
                            {post.likes}
                          </span>
                        )}
                        {post.comments && (
                          <span className="flex items-center gap-1 font-bold">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {post.comments}
                          </span>
                        )}
                      </div>

                      <a
                        href={post.url || post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-link text-xs"
                      >
                        Abrir en {post.platform} ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ====================================================================
          3. CONTACT: Tarjeta Sede Activa GetInTouchContact
         ==================================================================== */}
      <section id="contact" className="contact wrap">
        <GetInTouchContact />
      </section>

      <VideoModal post={modalPost} onClose={() => setModalPost(null)} />
    </div>
  );
}
