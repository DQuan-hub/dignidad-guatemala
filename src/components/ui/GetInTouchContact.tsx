"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

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
  address = "Ciudad de Guatemala, Guatemala"
}: GetInTouchContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
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
      {/* Marco contenedor oscuro con esquinas tipo "+" idéntico a la imagen de referencia */}
      <div className="relative rounded-2xl bg-[#0F0F11] border border-neutral-800/80 p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
        
        {/* Esquinas cruzadas (+) como en el diseño de referencia */}
        <span className="absolute top-2.5 left-2.5 font-mono text-neutral-500 text-sm select-none pointer-events-none">+</span>
        <span className="absolute top-2.5 right-2.5 font-mono text-neutral-500 text-sm select-none pointer-events-none">+</span>
        <span className="absolute bottom-2.5 left-2.5 font-mono text-neutral-500 text-sm select-none pointer-events-none">+</span>
        <span className="absolute bottom-2.5 right-2.5 font-mono text-neutral-500 text-sm select-none pointer-events-none">+</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
                {title}
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-[42ch]">
                {subtitle}
              </p>
            </div>

            {/* Fichas de Contacto */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Email card */}
                <a
                  href={`mailto:${email}`}
                  className="flex-1 flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center shrink-0 text-neutral-300 group-hover:text-white group-hover:bg-[#B81D13] transition">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white">Email</p>
                    <p className="text-xs text-neutral-400 truncate">{email}</p>
                  </div>
                </a>

                {/* Phone card */}
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex-1 flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center shrink-0 text-neutral-300 group-hover:text-white group-hover:bg-[#B81D13] transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white">Phone</p>
                    <p className="text-xs text-neutral-400 truncate">{phone}</p>
                  </div>
                </a>
              </div>

              {/* Address card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 max-w-sm">
                <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center shrink-0 text-neutral-300">
                  <MapPin className="w-4 h-4 text-[#FFD600]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Address</p>
                  <p className="text-xs text-neutral-400">{address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Replicado Idéntico */}
          <div className="lg:col-span-6 w-full">
            {submitted ? (
              <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#B81D13]/20 text-[#B81D13] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Gracias por escribirnos. La coordinación territorial de Dignidad se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="mt-3 px-4 py-2 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {/* Campo Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-300">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder=""
                    className="w-full rounded-lg bg-neutral-900/90 border border-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                  />
                </div>

                {/* Campo Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-300">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder=""
                    className="w-full rounded-lg bg-neutral-900/90 border border-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                  />
                </div>

                {/* Campo Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-neutral-300">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder=""
                    className="w-full rounded-lg bg-neutral-900/90 border border-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                  />
                </div>

                {/* Campo Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-300">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder=""
                    className="w-full rounded-lg bg-neutral-900/90 border border-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition resize-none"
                  />
                </div>

                {/* Botón Submit Idéntico a la imagen */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-sm py-3 px-4 shadow-sm transition disabled:opacity-50 cursor-pointer text-center"
                  >
                    {submitting ? "Sending..." : "Submit"}
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

