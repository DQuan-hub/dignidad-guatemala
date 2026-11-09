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
  sedeTitle?: string;
  sedeAddress?: string;
  sedeDepartment?: string;
  sedeRegion?: string;
  sedeCoordinator?: string;
  sedeSchedule?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  whatsappUrl?: string;
  showSedeCard?: boolean;
}

export function GetInTouchContact({
  className = "",
  sedeTitle = "Sede Nacional de Articulación Política — Dignidad #28",
  sedeAddress = "8a Avenida 14–32, Zona 1, Centro Histórico, Ciudad de Guatemala (A tres cuadras del Parque Centenario y a 5 minutos del TSE)",
  sedeDepartment = "GUATEMALA",
  sedeRegion = "Metropolitana",
  sedeCoordinator = "Gabriel Romero Pérez",
  sedeSchedule = "Lunes a Sábado · 08:00 a 17:30 hrs",
  googleMapsUrl = "https://maps.google.com/?q=8a+Avenida+14-32+Zona+1+Guatemala",
  wazeUrl = "https://waze.com/ul?q=8a+Avenida+14-32+Zona+1+Guatemala",
  whatsappUrl = "https://wa.me/50255282027?text=Hola%20Dignidad%20Guatemala,%20deseo%20comunicarme%20con%20la%20coordinación%20central.",
  showSedeCard = true,
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
    }, 550);
  };

  return (
    <div className={`relative w-full max-w-[1140px] mx-auto space-y-8 ${className}`}>
      {/* ===================================================================
          1. CARD DE SEDE ACTIVA (IDÉNTICO A LA IMAGEN 1)
         =================================================================== */}
      {showSedeCard && (
        <article className="relative rounded-3xl bg-[#0E1612] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl overflow-hidden space-y-6">
          {/* Esquinas decorativas de precisión (+) */}
          <span className="absolute top-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
          <span className="absolute top-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
          <span className="absolute bottom-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
          <span className="absolute bottom-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>

          {/* Encabezado: Píldora Roja + Región Naranja */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C83E2B] text-white shadow-xs">
              SEDE ACTIVA · {sedeDepartment.toUpperCase()}
            </span>
            <span className="text-xs sm:text-sm font-mono font-semibold text-[#D9822B] tracking-wide">
              Región {sedeRegion}
            </span>
          </div>

          {/* Título de la Sede y Dirección */}
          <div className="space-y-2.5 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-display text-white tracking-tight leading-snug">
              {sedeTitle}
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-sans">
              {sedeAddress}
            </p>
          </div>

          {/* Fichas Informativas en 2 columnas: Coordinación y Horario de Atención */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-white">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <UserCheck className="w-5 h-5 text-[#D9822B] shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-white/65 font-mono text-[11px] uppercase tracking-wider">
                  Coordinación:
                </span>
                <strong className="text-white text-xs sm:text-sm font-bold truncate block mt-0.5">
                  {sedeCoordinator}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <Clock className="w-5 h-5 text-[#D9822B] shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-white/65 font-mono text-[11px] uppercase tracking-wider">
                  Horario de atención:
                </span>
                <strong className="text-white text-xs sm:text-sm font-bold block mt-0.5">
                  {sedeSchedule}
                </strong>
              </div>
            </div>
          </div>

          {/* Botones de Acción: Abrir en Google Maps, Navegar con Waze, WhatsApp Coordinador */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.07] hover:bg-white/15 text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3 rounded-xl transition w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4 text-[#D9822B] shrink-0" />
              <span>ABRIR EN GOOGLE MAPS</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.07] hover:bg-white/15 text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3 rounded-xl transition w-full sm:w-auto"
            >
              <Navigation className="w-4 h-4 text-[#D9822B] shrink-0" />
              <span>NAVEGAR CON WAZE</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition shadow-md w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-[#D9822B] shrink-0" />
              <span>WHATSAPP COORDINADOR</span>
            </a>
          </div>
        </article>
      )}

      {/* ===================================================================
          2. BLOQUE GET IN TOUCH (IDÉNTICO A LA IMAGEN 2)
         =================================================================== */}
      <section className="relative rounded-3xl bg-[#0E1612] text-white p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl overflow-hidden">
        {/* Esquinas decorativas de precisión (+) */}
        <span className="absolute top-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute top-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-3 left-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-3 right-3 font-mono text-white/20 text-xs select-none pointer-events-none">+</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Columna Izquierda: Get in Touch y Tarjetas de Contacto Directo */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-none">
                Get in touch
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-sans max-w-lg">
                Si tienes consultas sobre nuestras propuestas, afiliaciones en tu departamento o deseas coordinar con nuestro equipo, completa el formulario. Respondemos en menos de 24 horas.
              </p>
            </div>

            {/* Las 3 Tarjetas de Contacto: Email, Phone, Address */}
            <div className="space-y-3">
              {/* Tarjeta Email */}
              <a
                href="mailto:contacto@dignidadguatemala.org"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#D9822B]/50 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/80 group-hover:text-[#D9822B] transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-sans text-xs">Email</span>
                  <span className="text-xs sm:text-sm text-white font-bold truncate block group-hover:text-[#D9822B] transition">
                    contacto@dignidadguatemala.org
                  </span>
                </div>
              </a>

              {/* Tarjeta Phone */}
              <a
                href="tel:+50255282027"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#D9822B]/50 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/80 group-hover:text-[#D9822B] transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-sans text-xs">Phone</span>
                  <span className="text-xs sm:text-sm text-white font-bold block group-hover:text-[#D9822B] transition">
                    +502 5528 2027
                  </span>
                </div>
              </a>

              {/* Tarjeta Address con pin amarillo */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FFD600]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-sans text-xs">Address</span>
                  <span className="text-xs sm:text-sm text-white font-bold block">
                    Ciudad de Guatemala, Guatemala
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario con Estilo de la Imagen 2 */}
          <div className="lg:col-span-6 w-full">
            {submitted ? (
              <div className="p-8 text-center space-y-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-14 h-14 rounded-full bg-[#C83E2B]/20 text-[#C83E2B] flex items-center justify-center mx-auto border border-[#C83E2B]/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-white/75 text-xs sm:text-sm max-w-sm mx-auto">
                  Hemos recibido tu comunicación. El equipo de coordinación nacional o departamental se pondrá en contacto contigo a la brevedad.
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
                {/* Campo Name */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-name" className="block text-xs font-semibold text-white/90">
                    Name
                  </label>
                  <input
                    id="touch-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ej. Juan Carlos Morales"
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Email */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-email" className="block text-xs font-semibold text-white/90">
                    Email
                  </label>
                  <input
                    id="touch-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ejemplo@correo.gt"
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-phone" className="block text-xs font-semibold text-white/90">
                    Phone
                  </label>
                  <input
                    id="touch-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+502 5528 2027"
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition font-sans"
                  />
                </div>

                {/* Campo Message */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-message" className="block text-xs font-semibold text-white/90">
                    Message
                  </label>
                  <textarea
                    id="touch-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Escribe tu mensaje o consulta..."
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#C83E2B] focus:ring-1 focus:ring-[#C83E2B] transition resize-none font-sans"
                  />
                </div>

                {/* Botón Submit idéntico a la Imagen 2 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#FFD600] text-[#111C16] font-display font-extrabold text-sm uppercase tracking-wider py-3.5 px-6 shadow-md transition disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                  >
                    <span>{submitting ? "Sending..." : "Submit"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetInTouchContact;