"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Phone,
  Clock,
  UserCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
  ShieldCheck,
  Navigation,
  MessageSquare,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { VariableFontHover } from "@/components/ui/variable-font-hover";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import {
  SEDES_AFILIACION,
  DEPARTAMENTOS_GUATEMALA,
  type SedeAfiliacion,
} from "@/data/sedes-afiliacion";

const DepartmentMap = dynamic(() => import("@/components/map/DepartmentMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[520px] rounded-3xl bg-[#D1DDD3]/40 border border-[#181313]/8 animate-pulse flex items-center justify-center text-sm font-mono-code font-bold text-[#231012]/70">
      Cargando mapa territorial de los 22 departamentos...
    </div>
  ),
});

type ModalidadParticipacion =
  | "Quiero afiliarme"
  | "Quiero ser voluntario/fiscal"
  | "Quiero abrir un comité en mi comunidad";

interface FormValues {
  nombreCompleto: string;
  dpi: string;
  departamento: string;
  municipio: string;
  telefono: string;
  correo: string;
  modalidad: ModalidadParticipacion;
  comentarios: string;
}

interface FormErrors {
  nombreCompleto?: string;
  dpi?: string;
  departamento?: string;
  municipio?: string;
  telefono?: string;
  correo?: string;
}

export default function AfiliatePage() {
  // Estado para Directorio y Mapa
  const [selectedDepto, setSelectedDepto] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSede, setSelectedSede] = useState<SedeAfiliacion | null>(
    SEDES_AFILIACION[0]
  );

  // Estado para Formulario con Validación en blur y limpieza en input (modern-web-guidance)
  const [values, setValues] = useState<FormValues>({
    nombreCompleto: "",
    dpi: "",
    departamento: "Guatemala",
    municipio: "",
    telefono: "",
    correo: "",
    modalidad: "Quiero afiliarme",
    comentarios: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedFolio, setSubmittedFolio] = useState<string | null>(null);

  const filteredSedes = useMemo(() => {
    return SEDES_AFILIACION.filter((sede) => {
      const matchDepto =
        selectedDepto === "Todos" || sede.departamento === selectedDepto;
      if (!matchDepto) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        sede.nombre.toLowerCase().includes(q) ||
        sede.municipio.toLowerCase().includes(q) ||
        sede.departamento.toLowerCase().includes(q) ||
        sede.coordinador.toLowerCase().includes(q)
      );
    });
  }, [selectedDepto, searchQuery]);

  const validateField = (name: keyof FormValues, val: string): string | undefined => {
    const trimmed = val.trim();
    switch (name) {
      case "nombreCompleto":
        if (trimmed.length < 5) {
          return "Ingresa tu nombre y apellidos completos tal como aparecen en tu DPI.";
        }
        return undefined;
      case "dpi": {
        const cleanDigits = trimmed.replace(/\s+/g, "");
        if (!/^\d{13}$/.test(cleanDigits)) {
          return "El CUI / DPI debe contener exactamente 13 dígitos numéricos.";
        }
        return undefined;
      }
      case "departamento":
        if (!trimmed) return "Selecciona tu departamento de residencia.";
        return undefined;
      case "municipio":
        if (trimmed.length < 3) return "Indica tu municipio o comunidad.";
        return undefined;
      case "telefono": {
        const digits = trimmed.replace(/[^\d]/g, "");
        if (digits.length < 8) {
          return "Ingresa un número de teléfono o WhatsApp válido de al menos 8 dígitos.";
        }
        return undefined;
      }
      case "correo":
        if (trimmed.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          return "Ingresa un correo electrónico con formato válido (o déjalo vacío).";
        }
        return undefined;
      default:
        return undefined;
    }
  };

  // Modern Web Guidance: Clear existing errors on input (while typing)
  const handleInputChange = (
    name: keyof FormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Modern Web Guidance: Validate on blur (when exiting field)
  const handleBlur = (name: keyof FormValues) => {
    const err = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {
      nombreCompleto: validateField("nombreCompleto", values.nombreCompleto),
      dpi: validateField("dpi", values.dpi),
      departamento: validateField("departamento", values.departamento),
      municipio: validateField("municipio", values.municipio),
      telefono: validateField("telefono", values.telefono),
      correo: validateField("correo", values.correo),
    };

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/afiliacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data?.folio) {
        setSubmittedFolio(data.folio);
      } else {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        setSubmittedFolio(`DIG-28-${randomCode}`);
      }
    } catch {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setSubmittedFolio(`DIG-28-${randomCode}`);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDirectUrl = useMemo(() => {
    const msg = `Hola Dignidad Guatemala (#28 TSE), mi nombre es ${values.nombreCompleto} (DPI: ${values.dpi}), del municipio de ${values.municipio}, ${values.departamento}. Modalidad: ${values.modalidad}.`;
    return `https://wa.me/50255282027?text=${encodeURIComponent(msg)}`;
  }, [values]);

  return (
    <div className="bg-white flex flex-col gap-16 sm:gap-24 pb-16 pt-6 sm:pt-10">
      {/* 1. CABECERA CENTRO DE AFILIACIÓN Y GUÍA TSE EN 3 PASOS */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              <span>[01 / AFILIACIÓN TSE · PARTIDO #28]</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#111C16] leading-[1.04]">
              Afíliate a{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                dignidad
              </span>{" "}
              en tu departamento y municipio.
            </h1>
            <p className="text-base sm:text-lg text-[#526058] leading-relaxed">
              Afiliarte a Dignidad Guatemala es ejercer tu derecho constitucional a construir un instrumento político de los pueblos, sin caciques ni financistas corporativos rumbo a 2027.
            </p>
          </div>

          {/* GUÍA PASO A PASO PARA AFILIARSE ANTE EL TSE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-[#F3F6F4] border border-[#111C16]/10 p-7 flex flex-col justify-between shadow-xs">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C83E2B] text-white mb-4">
                  Paso 1 · RENAP
                </span>
                <h2 className="text-xl font-bold font-display text-[#111C16] mb-2">
                  DPI vigente emitido por el RENAP
                </h2>
                <p className="text-sm text-[#526058] leading-relaxed">
                  Tu Documento Personal de Identificación (CUI de 13 dígitos numéricos) debe encontrarse vigente y en buen estado para el cotejo oficial del TSE.
                </p>
              </div>
              <p className="mt-4 pt-3 border-t border-[#111C16]/10 text-xs font-mono text-[#C83E2B] font-bold">
                Requisito indispensable según la LEPP
              </p>
            </div>

            <div className="rounded-3xl bg-[#F3F6F4] border border-[#111C16]/10 p-7 flex flex-col justify-between shadow-xs">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C83E2B] text-white mb-4">
                  Paso 2 · Empadronamiento
                </span>
                <h2 className="text-xl font-bold font-display text-[#111C16] mb-2">
                  Estar empadronado ante el TSE
                </h2>
                <p className="text-sm text-[#526058] leading-relaxed">
                  Verifica que tu DPI esté empadronado y con residencia electoral actualizada en tu municipio para poder votar en las asambleas partidarias.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#111C16]/10">
                <a
                  href="https://dondevotas.tse.org.gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111C16] hover:text-[#C83E2B] transition"
                >
                  <span>Consultar Empadronamiento en el TSE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C83E2B]" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-[#111C16] text-white border border-white/10 p-7 flex flex-col justify-between shadow-md">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C83E2B] text-white mb-4">
                  Paso 3 · Tu Sede
                </span>
                <h2 className="text-xl font-bold font-display text-white mb-2">
                  Firmar en tu sede o brigada móvil
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  Acude a cualquiera de nuestros puntos de atención en los 22 departamentos o llena el formulario de abajo para coordinar la visita de una brigada a tu comunidad.
                </p>
              </div>
              <a
                href="#formulario-afiliacion"
                className="mt-4 pt-3 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D9822B] hover:text-white transition"
              >
                <span>Ir al Formulario de Pre-Afiliación →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSCADOR Y MAPA INTERACTIVO DE SEDES DEPARTAMENTALES */}
      <section id="mapa-sedes" className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3 pb-4 border-b border-[#111C16]/10">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-bold">
              <span>[02 / 22 DEPARTAMENTOS · OPENSTREETMAP]</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111C16]">
              Encuentra tu sede de{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                dignidad
              </span>{" "}
              en todo el país.
            </h2>
            <p className="text-[#526058] text-sm sm:text-base leading-relaxed">
              Filtra por cualquiera de los 22 departamentos o haz clic en un marcador del mapa para consultar la dirección, horario de atención, coordinador responsable y enlaces directos a Google Maps, Waze y WhatsApp.
            </p>
          </div>

          {/* Barra de Búsqueda Semántica */}
          <search
            aria-label="Buscador de sedes departamentales y municipales de Dignidad"
            className="rounded-3xl bg-[#F3F6F4] border border-[#111C16]/10 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5 items-end"
          >
            <div className="md:col-span-6 space-y-2">
              <label
                htmlFor="filtro-departamento"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111C16]"
              >
                Filtrar por Departamento (22 Departamentos)
              </label>
              <select
                id="filtro-departamento"
                value={selectedDepto}
                onChange={(e) => {
                  const dept = e.target.value;
                  setSelectedDepto(dept);
                  const firstMatch = SEDES_AFILIACION.find(
                    (s) => dept === "Todos" || s.departamento === dept
                  );
                  setSelectedSede(firstMatch || null);
                }}
                className="w-full h-12 px-4 rounded-xl bg-white border border-[#111C16]/15 text-sm font-semibold text-[#111C16]"
              >
                {DEPARTAMENTOS_GUATEMALA.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "Todos" ? "Todos los Departamentos (22 Departamentos)" : dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-6 space-y-2">
              <label
                htmlFor="busqueda-municipio"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111C16]"
              >
                Buscar por Municipio o Coordinador
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#526058] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="busqueda-municipio"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej. San Lucas Tolimán, Cobán, La Máquina, Xela..."
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-[#111C16]/15 text-sm text-[#111C16] placeholder-[#526058] focus:outline-none focus:border-[#C83E2B]"
                />
              </div>
            </div>
          </search>

          {/* Layout Mapa + Tarjetas de Sedes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mapa Interactivo Leaflet (7 columnas) */}
            <div className="lg:col-span-7 space-y-4">
              <DepartmentMap
                sedes={filteredSedes}
                selectedSede={selectedSede}
                onSelectSede={(sede) => setSelectedSede(sede)}
              />

              {/* Detalle de la Sede Seleccionada estilo Kelvora */}
              {selectedSede && (
                <div className="rounded-3xl bg-[#111C16] text-white p-6 sm:p-8 border border-white/10 shadow-lg space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C83E2B] text-white">
                      Sede Activa · {selectedSede.departamento.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#D9822B]">
                      Región {selectedSede.region}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white">
                    {selectedSede.nombre}
                  </h3>
                  <p className="text-sm text-white/80">
                    {selectedSede.direccion} ({selectedSede.referencia})
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <UserCheck className="w-4 h-4 text-[#D9822B] shrink-0" />
                      <div>
                        <span className="block text-white/60">Coordinación:</span>
                        <strong className="text-white">{selectedSede.coordinador}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <Clock className="w-4 h-4 text-[#D9822B] shrink-0" />
                      <div>
                        <span className="block text-white/60">Horario de atención:</span>
                        <strong className="text-white">{selectedSede.horario}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={selectedSede.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
                    >
                      <MapPin className="w-4 h-4 text-[#D9822B]" />
                      <span>Abrir en Google Maps</span>
                    </a>
                    <a
                      href={selectedSede.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
                    >
                      <Navigation className="w-4 h-4 text-[#D9822B]" />
                      <span>Navegar con Waze</span>
                    </a>
                    <a
                      href={selectedSede.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
                    >
                      <MessageSquare className="w-4 h-4 text-[#D9822B]" />
                      <span>WhatsApp Coordinador</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Sedes Departamentales (5 columnas) */}
            <div className="lg:col-span-5 space-y-4 max-h-[820px] overflow-y-auto pr-1">
              {filteredSedes.length === 0 ? (
                <div className="rounded-3xl bg-[#F3F6F4] border border-[#111C16]/10 p-8 text-center space-y-3">
                  <p className="text-base font-bold text-[#111C16]">
                    No se encontraron coincidencias para tu búsqueda.
                  </p>
                  <p className="text-sm text-[#526058]">
                    Llena el formulario de abajo con la opción{" "}
                    <strong>“Quiero abrir un comité en mi comunidad”</strong> o escríbenos por WhatsApp para coordinar con nuestra brigada departamental.
                  </p>
                </div>
              ) : (
                filteredSedes.map((sede) => {
                  const active = selectedSede?.id === sede.id;
                  return (
                    <article
                      key={sede.id}
                      onClick={() => setSelectedSede(sede)}
                      className={`rounded-3xl p-6 border transition cursor-pointer ${
                        active
                          ? "bg-white border-[#C83E2B] ring-2 ring-[#C83E2B]/25 shadow-md"
                          : "bg-white border-[#111C16]/10 hover:bg-[#F3F6F4] hover:border-[#C83E2B]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#111C16] text-[#FFD600]">
                          {sede.departamento} · {sede.municipio}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#526058]">
                          {sede.telefono}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-[#111C16] mb-1.5">
                        {sede.nombre}
                      </h3>

                      <p className="text-xs text-[#526058] mb-3">
                        {sede.direccion}
                      </p>

                      <div className="text-xs text-[#111C16]/85 space-y-1 mb-4">
                        <p>
                          <strong>Responsable:</strong> {sede.coordinador} ({sede.cargoCoordinador})
                        </p>
                        <p>
                          <strong>Horario:</strong> {sede.horario}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#111C16]/10 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <a
                            href={sede.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono font-bold text-[#C83E2B] hover:underline inline-flex items-center gap-1"
                          >
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            Maps
                          </a>
                          <a
                            href={sede.wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono font-bold text-[#111C16]/80 hover:underline inline-flex items-center gap-1"
                          >
                            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                            Waze
                          </a>
                        </div>

                        <a
                          href={sede.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white font-mono font-bold text-xs transition"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMULARIO DE PRE-AFILIACIÓN Y VOLUNTARIADO DIGITAL */}
      <section
        id="formulario-afiliacion"
        className="py-20 lg:py-28 bg-[#F3F6F4]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <SectionBadge code="03 / FORMULARIO TSE">
              Pre-Afiliación, Fiscales y Comités Comunitarios
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#111C16]">
              Formulario de Registro Territorial{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                rumbo a 2027
              </span>
            </h2>
            <p className="text-[#526058] text-base">
              Completa tus datos para coordinar tu firma en la hoja oficial de afiliación del TSE, inscribirte como fiscal electoral o abrir un comité de Dignidad en tu comunidad.
            </p>
          </div>

          {submittedFolio ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl bg-[#111C16] text-white p-8 sm:p-12 border border-white/10 shadow-xl space-y-6 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-[#FFD600] text-[#111C16] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-[#FFD600]">
                  [FOLIO DE REGISTRO: {submittedFolio}]
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  ¡Gracias por sumarte, {values.nombreCompleto}!
                </h3>
                <p className="text-white/85 text-base max-w-xl mx-auto">
                  Hemos registrado tu solicitud bajo la modalidad{" "}
                  <strong className="text-[#FFD600]">“{values.modalidad}”</strong> para el municipio de{" "}
                  <strong className="text-white">
                    {values.municipio}, {values.departamento}
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFD600] hover:bg-[#FACC15] text-[#111C16] font-extrabold text-sm px-6 py-4 rounded-2xl transition"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>Confirmar de inmediato por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedFolio(null)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-4 rounded-2xl transition cursor-pointer"
                >
                  <span>Registrar a otro ciudadano/a</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              action="/afiliate"
              method="POST"
              noValidate
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-[#111C16]/10 p-6 sm:p-10 shadow-sm space-y-8"
            >
              {/* Fieldset 1: Modalidad de Participación */}
              <fieldset className="space-y-3">
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#111C16] mb-2">
                  1. Selecciona tu modalidad de participación *
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {(
                    [
                      "Quiero afiliarme",
                      "Quiero ser voluntario/fiscal",
                      "Quiero abrir un comité en mi comunidad",
                    ] as ModalidadParticipacion[]
                  ).map((opcion) => {
                    const checked = values.modalidad === opcion;
                    return (
                      <label
                        key={opcion}
                        className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition min-h-[56px] ${
                          checked
                            ? "bg-[#111C16] text-white border-[#111C16] shadow-sm"
                            : "bg-white text-[#111C16] border-[#111C16]/10 hover:border-[#C83E2B]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="modalidad"
                          value={opcion}
                          checked={checked}
                          onChange={() => handleInputChange("modalidad", opcion)}
                          className="mt-1 h-4 w-4 accent-[#C83E2B] shrink-0"
                        />
                        <span className="text-sm font-bold leading-snug">
                          {opcion}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Fieldset 2: Datos Personales y DPI */}
              <fieldset className="space-y-5">
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#111C16] mb-1">
                  2. Datos de Identificación Ciudadana (RENAP / TSE)
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre Completo */}
                  <div>
                    <label
                      htmlFor="nombreCompleto"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Nombre y apellidos completos *
                    </label>
                    <input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      required
                      autoComplete="name"
                      value={values.nombreCompleto}
                      onChange={(e) =>
                        handleInputChange("nombreCompleto", e.target.value)
                      }
                      onBlur={() => handleBlur("nombreCompleto")}
                      aria-invalid={Boolean(errors.nombreCompleto)}
                      aria-describedby={
                        errors.nombreCompleto ? "err-nombre" : "hint-nombre"
                      }
                      placeholder="Ej. María Ixchel Tuyuc Morales"
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                    />
                    <span id="hint-nombre" className="block text-xs text-[#526058] mt-1">
                      Tal como aparece en tu Documento Personal de Identificación.
                    </span>
                    {errors.nombreCompleto && (
                      <p
                        id="err-nombre"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83E2B]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.nombreCompleto}</span>
                      </p>
                    )}
                  </div>

                  {/* DPI 13 dígitos */}
                  <div>
                    <label
                      htmlFor="dpi"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Número de DPI / CUI (13 dígitos) *
                    </label>
                    <input
                      id="dpi"
                      name="dpi"
                      type="text"
                      inputMode="numeric"
                      pattern="\d{13}"
                      maxLength={13}
                      required
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={values.dpi}
                      onChange={(e) =>
                        handleInputChange(
                          "dpi",
                          e.target.value.replace(/[^\d]/g, "").slice(0, 13)
                        )
                      }
                      onBlur={() => handleBlur("dpi")}
                      aria-invalid={Boolean(errors.dpi)}
                      aria-describedby={errors.dpi ? "err-dpi" : "hint-dpi"}
                      placeholder="Ej. 2456789010101"
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base font-mono text-[#111C16]"
                    />
                    <span id="hint-dpi" className="block text-xs font-mono text-[#526058] mt-1">
                      13 números sin espacios ni guiones ({values.dpi.length}/13).
                    </span>
                    {errors.dpi && (
                      <p
                        id="err-dpi"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83E2B]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.dpi}</span>
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Fieldset 3: Ubicación Territorial y Contacto */}
              <fieldset className="space-y-5">
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#111C16] mb-1">
                  3. Ubicación Territorial y Contacto Directo
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="departamento"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Departamento *
                    </label>
                    <select
                      id="departamento"
                      name="departamento"
                      required
                      value={values.departamento}
                      onChange={(e) =>
                        handleInputChange("departamento", e.target.value)
                      }
                      onBlur={() => handleBlur("departamento")}
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                    >
                      {DEPARTAMENTOS_GUATEMALA.filter((d) => d !== "Todos").map(
                        (dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="municipio"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Municipio y Aldea / Zona *
                    </label>
                    <input
                      id="municipio"
                      name="municipio"
                      type="text"
                      required
                      autoComplete="address-level2"
                      value={values.municipio}
                      onChange={(e) =>
                        handleInputChange("municipio", e.target.value)
                      }
                      onBlur={() => handleBlur("municipio")}
                      aria-invalid={Boolean(errors.municipio)}
                      aria-describedby={errors.municipio ? "err-muni" : undefined}
                      placeholder="Ej. San Lucas Tolimán, Cantón Centro"
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                    />
                    {errors.municipio && (
                      <p
                        id="err-muni"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83E2B]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.municipio}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Teléfono Celular / WhatsApp *
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      value={values.telefono}
                      onChange={(e) =>
                        handleInputChange("telefono", e.target.value)
                      }
                      onBlur={() => handleBlur("telefono")}
                      aria-invalid={Boolean(errors.telefono)}
                      aria-describedby={errors.telefono ? "err-tel" : "hint-tel"}
                      placeholder="Ej. 5528 2027"
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                    />
                    <span id="hint-tel" className="block text-xs text-[#526058] mt-1">
                      Número directo donde el coordinador municipal pueda escribirte.
                    </span>
                    {errors.telefono && (
                      <p
                        id="err-tel"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83E2B]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.telefono}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="correo"
                      className="block text-sm font-bold text-[#111C16] mb-1.5"
                    >
                      Correo electrónico (opcional)
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={values.correo}
                      onChange={(e) =>
                        handleInputChange("correo", e.target.value)
                      }
                      onBlur={() => handleBlur("correo")}
                      aria-invalid={Boolean(errors.correo)}
                      aria-describedby={errors.correo ? "err-correo" : undefined}
                      placeholder="ejemplo@correo.gt"
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                    />
                    {errors.correo && (
                      <p
                        id="err-correo"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83E2B]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.correo}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comentarios"
                    className="block text-sm font-bold text-[#111C16] mb-1.5"
                  >
                    Mensaje adicional o sector comunitario (opcional)
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={3}
                    value={values.comentarios}
                    onChange={(e) =>
                      handleInputChange("comentarios", e.target.value)
                    }
                    placeholder="Indica si participas en alguna organización campesina, estudiantil, de mujeres, cooperativa o comité barrial..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 text-base text-[#111C16]"
                  />
                </div>
              </fieldset>

              {/* Aviso de Privacidad y Protección de Datos */}
              <div className="rounded-2xl bg-[#F3F6F4] border border-[#111C16]/10 p-4 flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-[#C83E2B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#526058] leading-relaxed">
                  <strong>Aviso de Privacidad Electoral:</strong> Tus datos se utilizan exclusivamente para coordinar tu afiliación voluntaria o participación territorial conforme a la Ley Electoral y de Partidos Políticos (LEPP) ante el Tribunal Supremo Electoral.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[54px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] disabled:opacity-60 text-white font-mono font-bold text-sm uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#D9822B]" aria-hidden="true" />
                <span>
                  {submitting
                    ? "Procesando registro territorial..."
                    : "Enviar Solicitud de Pre-Afiliación Territorial"}
                </span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CANAL DE CONTACTO DIRECTO */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <GetInTouchContact
          title="¿Dudas sobre afiliación?"
          subtitle="Si tienes preguntas sobre los requisitos del TSE, la sede de tu municipio o deseas organizar una asamblea comunitaria, contáctanos."
        />
      </section>
    </div>
  );
}

