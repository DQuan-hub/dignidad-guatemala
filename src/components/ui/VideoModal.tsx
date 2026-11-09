"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
  MapPin,
  Calendar,
  Share2,
  Play,
} from "lucide-react";
import type { SocialMediaPost } from "@/lib/utils";

interface VideoModalProps {
  post: SocialMediaPost | null;
  onClose: () => void;
}

export function VideoModal({ post, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [useEmbed, setUseEmbed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (post) {
      setUseEmbed(false);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [post]);

  // Modern Web Guidance: Fallback for <dialog closedby="any"> on browsers without native closedBy support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    let cleanupFallback = () => {};
    if (typeof HTMLDialogElement !== "undefined" && !("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent, el: HTMLDialogElement) => {
        const r = el.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e, dialog);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupFallback = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupFallback();
    };
  }, [onClose]);

  const platformBadge =
    post?.platform === "tiktok"
      ? "TikTok Oficial · @dignidad100"
      : post?.platform === "instagram"
      ? "Instagram · @dignidad.guate"
      : "Facebook Oficial · Dignidad Guatemala";

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      aria-labelledby="video-modal-title"
      className="m-auto w-[94vw] max-w-4xl rounded-3xl bg-[#7F1116] text-[#FAF6F0] border border-[#FAF6F0]/15 p-0 shadow-2xl overflow-hidden"
    >
      {post && (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px] max-h-[90vh]">
          {/* Columna 9:16 Reproductor Multimedia */}
          <div className="md:col-span-6 bg-black relative flex items-center justify-center min-h-[380px] md:min-h-[560px]">
            {post.type === "video" ? (
              post.localPath && !useEmbed ? (
                <video
                  key={post.localPath}
                  src={post.localPath}
                  poster={post.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  width={540}
                  height={960}
                  className="w-full h-full max-h-[82vh] object-contain aspect-[9/16]"
                >
                  Tu navegador no soporta reproducción de video HTML5.
                </video>
              ) : post.videoId ? (
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${post.videoId}`}
                  title={post.caption}
                  className="w-full h-[540px] border-0"
                  allow="encrypted-media;"
                />
              ) : (
                <img
                  src={post.thumbnail}
                  alt={post.caption}
                  width={540}
                  height={960}
                  className="w-full h-full object-contain"
                />
              )
            ) : (
              <img
                src={post.localPath || post.thumbnail}
                alt={post.caption}
                width={800}
                height={800}
                className="w-full h-full max-h-[80vh] object-contain p-4"
              />
            )}
          </div>

          {/* Columna de Contexto y Metadatos */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider bg-[#C81E1E] text-white">
                  <Play className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
                  {platformBadge}
                </span>

                <form method="dialog">
                  <button
                    type="submit"
                    autoFocus
                    aria-label="Cerrar ventana multimedia"
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </form>
              </div>

              <h2
                id="video-modal-title"
                className="text-xl sm:text-2xl font-extrabold font-display text-[#FAF6F0] mb-4 leading-snug"
              >
                Dignidad Guatemala · Archivo Documental
              </h2>

              <p className="text-[#FAF6F0]/90 text-base leading-relaxed mb-6">
                {post.caption}
              </p>

              <div className="flex flex-wrap gap-3 text-xs font-mono-code text-[#FAF6F0]/80 mb-6">
                {post.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#FFD600]" aria-hidden="true" />
                    {post.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-[#FFD600]" aria-hidden="true" />
                  {post.date}
                </span>
              </div>

              {/* Estadísticas de alcance */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                {post.views !== undefined && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[#FFD600] text-xs font-mono-code font-semibold mb-0.5">
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      Vistas
                    </div>
                    <p className="text-lg font-extrabold font-display text-white">
                      {post.views.toLocaleString("es-GT")}
                    </p>
                  </div>
                )}
                {post.likes !== undefined && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[#FFD600] text-xs font-mono-code font-semibold mb-0.5">
                      <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                      Apoyos
                    </div>
                    <p className="text-lg font-extrabold font-display text-white">
                      {post.likes.toLocaleString("es-GT")}
                    </p>
                  </div>
                )}
                {post.comments !== undefined && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[#FFD600] text-xs font-mono-code font-semibold mb-0.5">
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      Comentarios
                    </div>
                    <p className="text-lg font-extrabold font-display text-white">
                      {post.comments.toLocaleString("es-GT")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              {post.type === "video" && post.videoId && post.localPath && (
                <button
                  type="button"
                  onClick={() => setUseEmbed((v) => !v)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-code font-bold text-[#FFD600] transition cursor-pointer"
                >
                  {useEmbed
                    ? "Usar Reproductor Nativo Rápido (MP4 Local)"
                    : "Cambiar a Reproductor Embed Oficial de TikTok"}
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFD600] hover:bg-[#FACC15] text-[#231012] font-extrabold text-sm transition"
                >
                  Abrir publicación original
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/afiliate"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#C81E1E] hover:bg-[#991B1B] text-white font-bold text-sm transition"
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  Afíliate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
