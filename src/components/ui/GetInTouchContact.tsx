"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Navigation,
  MessageSquare,
  Send,
  Clock,
  UserCheck,
} from "lucide-react";

interface GetInTouchContactProps {
  className?: string;
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function GetInTouchContact({
  className = "",
  title = "Get in touch",
  subtitle = "Si tienes consultas sobre nuestras propuestas, afiliaciones en tu departamento o deseas coordinar con nuestro equipo, completa el formulario. Respondemos en menos de 24 horas.",
  email = "contacto@dignidadguatemala.org",
  phone = "+502 5528 2027",
  address = "8a Avenida 14-32, Zona 1, Centro Histórico, Ciudad de Guatemala (A tres cuadras del Parque Centenario y a 5 minutos del TSE)",
}: GetInTouchContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className={`relative w-full max-w-[1100px] mx-auto ${className}`}>
      {/* Contenedor idéntico al diseño de la tarjeta de Sede Activa: bg-[#111C16], borde sutil, rounded-3xl */}
      <div className="relative rounded-3xl bg-[#111C16] text-white p-7 sm:p-10 lg:p-12 border border-white/10 shadow-2xl overflow-hidden space-y-8">
        {/* Esquinas cruzadas (+) sutiles de precisión */}
        <span className="absolute top-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute top-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>

        {/* Encabezado Superior con Píldora Roja e Indicador Naranja idéntico a la imagen 1 */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C83E2B] text-white shadow-xs">
            SEDE CENTRAL · GUATEMALA
          </span>
          <span className="text-xs font-mono font-semibold text-[#D9822B] tracking-wide">
            Región Metropolitana · Atención Nacional
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Información de Sede y Canales Directos */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                {title === "Get in touch"
                  ? "Sede Nacional de Articulación Política — Dignidad #28"
                  : title}
              </h2>
              <p className="text-sm text-white/75 leading-relaxed font-sans">
                {address}
              </p>
            </div>

            {/* Fichas Informativas idénticas a la imagen 1 (Coordinación y Horario de Atención) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <UserCheck className="w-5 h-5 text-[#D9822B] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-[11px]">Coordinación:</span>
                  <strong className="text-white text-xs sm:text-sm font-semibold truncate block">
                    Gabriel Romero Pérez
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-[#D9822B] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-[11px]">Horario de atención:</span>
                  <strong className="text-white text-xs sm:text-sm font-semibold block">
                    Lunes a Sábado · 08:00 a 17:30 hrs
                  </strong>
                </div>
              </div>
            </div>

            {/* Fichas de Contacto Rápido (Email y Teléfono) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D9822B]/50 transition group"
              >
                <Mail className="w-4 h-4 text-[#D9822B] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-[11px]">Correo Institucional:</span>
                  <span className="text-xs text-white font-medium truncate block group-hover:text-[#D9822B] transition">
                    {email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D9822B]/50 transition group"
              >
                <Phone className="w-4 h-4 text-[#D9822B] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-[11px]">Línea de Enlace:</span>
                  <span className="text-xs text-white font-medium block group-hover:text-[#D9822B] transition">
                    {phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Botones de Acción idénticos a la imagen 1 */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href="https://maps.google.com/?q=8a+Avenida+14-32+Zona+1+Guatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
              >
                <MapPin className="w-4 h-4 text-[#D9822B]" />
                <span>ABRIR EN GOOGLE MAPS</span>
              </a>

              <a
                href="https://waze.com/ul?q=8a+Avenida+14-32+Zona+1+Guatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
              >
                <Navigation className="w-4 h-4 text-[#D9822B]" />
                <span>NAVEGAR CON WAZE</span>
              </a>

              <a
                href="https://wa.me/50255282027?text=Hola%20Dignidad%20Guatemala,%20deseo%20comunicarme%20con%20la%20coordinación%20central."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#D9822B]" />
                <span>WHATSAPP COORDINADOR</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario con Estilo de la Imagen 1 */}
          <div className="lg:col-span-6 w-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-7">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#C83E2B]/20 text-[#C83E2B] flex items-center justify-center mx-auto border border-[#C83E2B]/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">¡Mensaje Recibido!</h3>
                <p className="text-white/70 text-xs sm:text-sm max-w-sm mx-auto">
                  Tu consulta ha sido enviada a la coordinación del movimiento. Te responderemos en menos de 24 horas hábiles.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="mt-3 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-xl transition border border-white/15 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="border-b border-white/10 pb-3 mb-2">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9822B]">
                    Envía tu Mensaje Directo
                  </p>
                  <p className="text-xs text-white/60 font-sans mt-0.5">
                    {subtitle}
                  </p>
                </div>

                {/* Campo Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/85">
                    Nombre Completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ej. Juan Carlos Morales"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/85">
                    Correo Electrónico *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ejemplo@correo.gt"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/85">
                    Teléfono Celular / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Ej. +502 5528 2027"
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/85">
                    Mensaje o Consulta Territorial
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Escribe tu consulta sobre afiliaciones, fiscalía o articulación municipal..."
                    className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition resize-none font-sans"
                  />
                </div>

                {/* Botón Submit estilizado como el botón rojo de la imagen 1 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider py-3.5 px-6 shadow-md transition disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D9822B]" />
                    <span>{submitting ? "ENVIANDO..." : "ENVIAR MENSAJE DIRECTO"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInTouchContact;
