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
          1. CARD DE SEDE ACTIVA (ESTILO EDITORIAL RECTANGULAR)
         =================================================================== */}
      {showSedeCard && (
        <article className="relative rounded-none bg-[#141413] text-white p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl space-y-6">
          {/* Esquinas decorativas de precisión (+) */}
          <span className="absolute top-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>

          {/* Encabezado: Etiqueta Rectangular Roja + Región Oro */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
            <span className="px-3.5 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider bg-[#C83226] text-white">
              SEDE ACTIVA · {sedeDepartment.toUpperCase()}
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#F5B800] tracking-wider uppercase">
              Región {sedeRegion}
            </span>
          </div>

          {/* Título de la Sede y Dirección */}
          <div className="space-y-2.5 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-display text-white tracking-tight leading-snug">
              {sedeTitle}
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed font-sans">
              {sedeAddress}
            </p>
          </div>

          {/* Fichas Informativas en 2 celdas con borde recto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-white">
            <div className="flex items-center gap-3.5 p-4 rounded-none bg-white/[0.03] border border-white/15">
              <UserCheck className="w-5 h-5 text-[#F5B800] shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-white/60 font-mono text-[11px] uppercase tracking-wider">
                  Coordinación responsable:
                </span>
                <strong className="text-white text-xs sm:text-sm font-bold truncate block mt-0.5">
                  {sedeCoordinator}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-none bg-white/[0.03] border border-white/15">
              <Clock className="w-5 h-5 text-[#F5B800] shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-white/60 font-mono text-[11px] uppercase tracking-wider">
                  Horario de atención:
                </span>
                <strong className="text-white text-xs sm:text-sm font-bold block mt-0.5">
                  {sedeSchedule}
                </strong>
              </div>
            </div>
          </div>

          {/* Botones de Acción Rectangulares */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/15 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-none transition w-full sm:w-auto"
            >
              <MapPin className="w-4 h-4 text-[#F5B800] shrink-0" />
              <span>ABRIR EN GOOGLE MAPS</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/15 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-none transition w-full sm:w-auto"
            >
              <Navigation className="w-4 h-4 text-[#F5B800] shrink-0" />
              <span>NAVEGAR CON WAZE</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C83226] hover:bg-[#A82419] text-white border border-[#C83226] font-mono text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-none transition shadow-sm w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-[#F5B800] shrink-0" />
              <span>WHATSAPP COORDINADOR</span>
            </a>
          </div>
        </article>
      )}

      {/* ===================================================================
          2. BLOQUE CONTACTO DIRECTO Y ARTICULACIÓN (100% EN ESPAÑOL, ROUNDED-NONE)
         =================================================================== */}
      <section className="relative rounded-none bg-[#141413] text-white p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl">
        {/* Esquinas decorativas de precisión (+) */}
        <span className="absolute top-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
        <span className="absolute top-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
        <span className="absolute bottom-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Columna Izquierda: Contacto Directo y Canales Oficiales */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5B800] font-bold block">
                CANALES OFICIALES DIGNIDAD #28
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-display text-white tracking-tight leading-none">
                Contacto Directo y Articulación
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-lg">
                Si tienes consultas sobre nuestras propuestas, afiliaciones en tu departamento o deseas coordinar con nuestro equipo, completa el formulario. Respondemos en menos de 24 horas.
              </p>
            </div>

            {/* Las 3 Celdas de Contacto Rectangulares */}
            <div className="space-y-3">
              {/* Celda Correo */}
              <a
                href="mailto:contacto@dignidadguatemala.org"
                className="flex items-center gap-4 p-4 rounded-none bg-white/[0.03] border border-white/15 hover:border-[#F5B800]/60 transition group"
              >
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/15 flex items-center justify-center shrink-0 text-white/80 group-hover:text-[#F5B800] transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-xs uppercase tracking-wider">Correo electrónico</span>
                  <span className="text-xs sm:text-sm text-white font-bold truncate block group-hover:text-[#F5B800] transition">
                    contacto@dignidadguatemala.org
                  </span>
                </div>
              </a>

              {/* Celda Teléfono */}
              <a
                href="tel:+50255282027"
                className="flex items-center gap-4 p-4 rounded-none bg-white/[0.03] border border-white/15 hover:border-[#F5B800]/60 transition group"
              >
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/15 flex items-center justify-center shrink-0 text-white/80 group-hover:text-[#F5B800] transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-xs uppercase tracking-wider">Teléfono / WhatsApp</span>
                  <span className="text-xs sm:text-sm text-white font-bold block group-hover:text-[#F5B800] transition">
                    +502 5528 2027
                  </span>
                </div>
              </a>

              {/* Celda Dirección */}
              <div className="flex items-center gap-4 p-4 rounded-none bg-white/[0.03] border border-white/15">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/15 flex items-center justify-center shrink-0 text-[#F5B800]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-white/60 font-mono text-xs uppercase tracking-wider">Sede Central Nacional</span>
                  <span className="text-xs sm:text-sm text-white font-bold block">
                    8a Avenida 14–32, Zona 1, Centro Histórico, Ciudad de Guatemala
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario 100% en Español con Bordes Rectos */}
          <div className="lg:col-span-6 w-full">
            {submitted ? (
              <div className="p-8 text-center space-y-4 rounded-none bg-white/[0.03] border border-white/20">
                <div className="w-14 h-14 rounded-none bg-[#C83226]/20 text-[#C83226] flex items-center justify-center mx-auto border border-[#C83226]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-white/80 text-xs sm:text-sm max-w-sm mx-auto">
                  Hemos recibido tu comunicación. El equipo de coordinación nacional o de tu departamento se pondrá en contacto contigo en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="mt-3 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-none transition border border-white/20 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {/* Campo Nombre completo */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Nombre completo *
                  </label>
                  <input
                    id="touch-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ej. Juan Carlos Morales"
                    className="w-full rounded-none bg-[#18181B] border border-white/20 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0 transition font-sans"
                  />
                </div>

                {/* Campo Correo electrónico */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Correo electrónico *
                  </label>
                  <input
                    id="touch-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ejemplo@correo.gt"
                    className="w-full rounded-none bg-[#18181B] border border-white/20 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0 transition font-sans"
                  />
                </div>

                {/* Campo Teléfono / WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="touch-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+502 5528 2027"
                    className="w-full rounded-none bg-[#18181B] border border-white/20 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0 transition font-sans"
                  />
                </div>

                {/* Campo Mensaje o consulta comunitaria */}
                <div className="space-y-1.5">
                  <label htmlFor="touch-message" className="block text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Mensaje o consulta comunitaria *
                  </label>
                  <textarea
                    id="touch-message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Escribe tu consulta sobre asambleas, fiscalía electoral o afiliación en tu comunidad..."
                    className="w-full rounded-none bg-[#18181B] border border-white/20 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0 transition resize-none font-sans"
                  />
                </div>

                {/* Botón Enviar mensaje directo */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-none bg-[#C83226] hover:bg-[#A82419] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 shadow-md transition disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-[#F5B800]" />
                    <span>{submitting ? "Enviando mensaje..." : "Enviar mensaje directo"}</span>
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
