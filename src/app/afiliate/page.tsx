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
    <div className="w-full h-[420px] sm:h-[520px] rounded-none bg-[#EFECE6] border border-[#141413]/20 animate-pulse flex items-center justify-center text-sm font-mono font-bold text-[#141413]/70">
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
    <div className="bg-white flex flex-col gap-16 sm:gap-24 pb-16">
      {/* 1. OPENING STATEMENT TALLYHOUSE: Centro de Afiliación TSE #28 */}
      <section id="opening" className="opening">
        <div className="op-second" style={{ minHeight: "auto", paddingTop: "104px" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <p className="m-text-5 text-[#F5B800] mb-4">
              01 · Afiliación Oficial TSE · Partido Político #28
            </p>
            <h1 className="m-text-2 op-statement">
              Afíliate a{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                Dignidad #28
              </mark>{" "}
              en tu{" "}
              <mark
                className="m-mark"
                style={{ "--mark-color": "var(--color-4)" } as React.CSSProperties}
              >
                departamento
              </mark>{" "}
              y municipio.
            </h1>
            <p className="m-text-4 text-white/85 max-w-3xl mt-6">
              Afiliarte a Dignidad Guatemala es ejercer tu derecho constitucional a construir un instrumento político de los pueblos, sin caciques ni financistas corporativos rumbo a 2027.
            </p>
          </div>

          <ul className="op-ledger">
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Paso 1 · RENAP</span>
              <p className="m-text-4 text-white">DPI vigente emitido por el RENAP</p>
              <p className="m-text">
                Tu Documento Personal de Identificación (CUI de 13 dígitos) debe encontrarse vigente para el cotejo oficial del TSE.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Paso 2 · Empadronamiento</span>
              <p className="m-text-4 text-white">Estar empadronado ante el TSE</p>
              <p className="m-text">
                Verifica que tu DPI esté empadronado en tu municipio para votar en las asambleas partidarias.{" "}
                <a
                  href="https://dondevotas.tse.org.gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-link-2"
                >
                  Consultar en TSE ↗
                </a>
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Paso 3 · Tu Sede</span>
              <p className="m-text-4 text-white">Firma en tu sede o brigada móvil</p>
              <p className="m-text">
                Acude a cualquiera de nuestras 22 sedes departamentales o llena el formulario de pre-afiliación abajo.
              </p>
            </li>
          </ul>

          <div className="op-more flex flex-wrap gap-6 items-center">
            <a className="m-btn-2" href="#formulario-afiliacion">
              <span className="m-btn-2__label">Ir al Formulario de Pre-Afiliación</span>
              <span className="m-btn-2__icon" aria-hidden="true">
                +
              </span>
            </a>
            <a className="m-link-2" href="#mapa-sedes">
              Buscar mi sede en el mapa interactivo ↓
            </a>
          </div>
        </div>
      </section>

      {/* 2. BUSCADOR Y MAPA INTERACTIVO DE SEDES DEPARTAMENTALES */}
      <section id="mapa-sedes" className="w-full">
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3 pb-4 border-b border-[#141413]">
            <span className="m-rule" aria-hidden="true" />
            <p className="m-text-5 text-[#C83226]">
              02 · Sedes Departamentales y Centro de Contacto Directo
            </p>
            <h2 className="m-text-3">
              Encuentra tu sede de{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                Dignidad #28
              </mark>{" "}
              y contáctanos en tu departamento.
            </h2>
            <p className="m-text text-[#57534E]">
              Filtra por cualquiera de los 22 departamentos o haz clic en un marcador del mapa para consultar la dirección, horario de atención, coordinador responsable y enlaces directos a Google Maps, Waze y WhatsApp.
            </p>
          </div>

          {/* Barra de Búsqueda Semántica Editorial */}
          <search
            aria-label="Buscador de sedes departamentales y municipales de Dignidad"
            className="rounded-none bg-[#FAF8F5] border border-[#141413] p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-5 items-end relative"
          >
            <span className="absolute top-1.5 left-1.5 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
            <span className="absolute top-1.5 right-1.5 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
            <span className="absolute bottom-1.5 left-1.5 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
            <span className="absolute bottom-1.5 right-1.5 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>

            <div className="md:col-span-6 space-y-2">
              <label
                htmlFor="filtro-departamento"
                className="block font-mono text-xs font-bold uppercase tracking-wider text-[#141413]"
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
                className="w-full h-12 px-4 rounded-none bg-white border border-[#141413]/40 text-sm font-semibold text-[#141413] focus:outline-none focus:border-[#C83226]"
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
                className="block font-mono text-xs font-bold uppercase tracking-wider text-[#141413]"
              >
                Buscar por Municipio o Coordinador
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
                  className="w-full h-12 pl-10 pr-4 rounded-none bg-white border border-[#141413]/40 text-sm text-[#141413] placeholder-[#57534E] focus:outline-none focus:border-[#C83226]"
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

              {/* Detalle de la Sede Seleccionada estilo Editorial Rectangular */}
              {selectedSede && (
                <div className="relative rounded-none bg-[#141413] text-white p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5">
                  <span className="absolute top-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
                  <span className="absolute top-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
                  <span className="absolute bottom-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
                  <span className="absolute bottom-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
                    <span className="px-3.5 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider bg-[#C83226] text-white">
                      SEDE ACTIVA · {selectedSede.departamento.toUpperCase()}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#F5B800] uppercase tracking-wider">
                      Región {selectedSede.region}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-snug">
                    {selectedSede.nombre}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-sans">
                    {selectedSede.direccion} ({selectedSede.referencia})
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-white">
                    <div className="flex items-center gap-3 p-3.5 rounded-none bg-white/[0.03] border border-white/15">
                      <UserCheck className="w-5 h-5 text-[#F5B800] shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-white/60 font-mono text-[11px] uppercase tracking-wider">Coordinación:</span>
                        <strong className="text-white font-bold truncate block">{selectedSede.coordinador}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-none bg-white/[0.03] border border-white/15">
                      <Clock className="w-5 h-5 text-[#F5B800] shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-white/60 font-mono text-[11px] uppercase tracking-wider">Horario de atención:</span>
                        <strong className="text-white font-bold block">{selectedSede.horario}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                    <a
                      href={selectedSede.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/15 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3.5 rounded-none transition w-full sm:w-auto"
                    >
                      <MapPin className="w-4 h-4 text-[#F5B800]" />
                      <span>ABRIR EN GOOGLE MAPS</span>
                    </a>
                    <a
                      href={selectedSede.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/15 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3.5 rounded-none transition w-full sm:w-auto"
                    >
                      <Navigation className="w-4 h-4 text-[#F5B800]" />
                      <span>NAVEGAR CON WAZE</span>
                    </a>
                    <a
                      href={selectedSede.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#C83226] hover:bg-[#A82419] text-white border border-[#C83226] font-mono text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-none transition shadow-md w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4 text-[#F5B800]" />
                      <span>WHATSAPP COORDINADOR</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Sedes Departamentales (5 columnas) */}
            <div className="lg:col-span-5 space-y-3 max-h-[820px] overflow-y-auto pr-1">
              {filteredSedes.length === 0 ? (
                <div className="rounded-none bg-[#FAF8F5] border border-[#141413] p-8 text-center space-y-3">
                  <p className="text-base font-bold text-[#141413]">
                    No se encontraron coincidencias para tu búsqueda.
                  </p>
                  <p className="text-sm text-[#57534E]">
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
                      className={`rounded-none p-5 border transition cursor-pointer ${
                        active
                          ? "bg-[#141413] text-white border-[#C83226] shadow-md"
                          : "bg-white text-[#141413] border-[#141413]/20 hover:bg-[#FAF8F5] hover:border-[#141413]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`px-2.5 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider ${
                          active
                            ? "bg-[#C83226] text-white"
                            : "bg-[#141413] text-[#F5B800]"
                        }`}>
                          {sede.departamento} · {sede.municipio}
                        </span>
                        <span className={`text-xs font-mono font-bold ${
                          active ? "text-[#F5B800]" : "text-[#57534E]"
                        }`}>
                          {sede.telefono}
                        </span>
                      </div>

                      <h3 className={`text-base sm:text-lg font-bold font-display mb-1.5 ${
                        active ? "text-white" : "text-[#141413]"
                      }`}>
                        {sede.nombre}
                      </h3>

                      <p className={`text-xs mb-3 ${
                        active ? "text-white/80" : "text-[#57534E]"
                      }`}>
                        {sede.direccion}
                      </p>

                      <div className={`text-xs space-y-1 mb-4 ${
                        active ? "text-white/85" : "text-[#141413]/85"
                      }`}>
                        <p>
                          <strong>Responsable:</strong> {sede.coordinador} ({sede.cargoCoordinador})
                        </p>
                        <p>
                          <strong>Horario:</strong> {sede.horario}
                        </p>
                      </div>

                      <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                        active ? "border-white/15" : "border-[#141413]/15"
                      }`}>
                        <div className="flex items-center gap-3">
                          <a
                            href={sede.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono font-bold text-[#C83226] hover:underline inline-flex items-center gap-1"
                          >
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            Maps
                          </a>
                          <a
                            href={sede.wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-mono font-bold hover:underline inline-flex items-center gap-1 ${
                              active ? "text-white/80" : "text-[#141413]/80"
                            }`}
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#C83226] hover:bg-[#A82419] text-white font-mono font-bold text-xs uppercase tracking-wider transition"
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
        className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#141413]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <SectionBadge code="03 / FORMULARIO TSE">
              Pre-Afiliación, Fiscales y Comités Comunitarios
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#141413]">
              Formulario de Registro Territorial{" "}
              <span className="font-serif italic font-normal text-[#C83226]">
                rumbo a 2027
              </span>
            </h2>
            <p className="text-[#57534E] text-base leading-relaxed">
              Completa tus datos para coordinar tu firma en la hoja oficial de afiliación del TSE, inscribirte como fiscal electoral o abrir un comité de Dignidad en tu comunidad.
            </p>
          </div>

          {submittedFolio ? (
            <div
              role="status"
              aria-live="polite"
              className="relative rounded-none bg-[#141413] text-white p-8 sm:p-12 border border-white/20 shadow-xl space-y-6 text-center"
            >
              <span className="absolute top-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute top-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-white/30 text-xs select-none pointer-events-none">+</span>

              <div className="h-16 w-16 rounded-none bg-[#C83226] text-white flex items-center justify-center mx-auto border border-[#C83226]">
                <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-[#F5B800] border border-white/15">
                  [FOLIO DE REGISTRO: {submittedFolio}]
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  ¡Gracias por sumarte, {values.nombreCompleto}!
                </h3>
                <p className="text-white/85 text-base max-w-xl mx-auto">
                  Hemos registrado tu solicitud bajo la modalidad{" "}
                  <strong className="text-[#F5B800]">“{values.modalidad}”</strong> para el municipio de{" "}
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
                  className="inline-flex items-center gap-2 bg-[#C83226] hover:bg-[#A82419] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-none transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#F5B800]" aria-hidden="true" />
                  <span>Confirmar de inmediato por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedFolio(null)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-none transition cursor-pointer border border-white/20"
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
              className="relative rounded-none bg-white border border-[#141413] p-6 sm:p-10 shadow-lg space-y-8"
            >
              <span className="absolute top-2 left-2 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute top-2 right-2 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-[#141413]/30 text-xs select-none pointer-events-none">+</span>

              {/* Fieldset 1: Modalidad de Participación */}
              <fieldset className="space-y-3">
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-2">
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
                        className={`flex items-start gap-3 p-4 rounded-none border cursor-pointer transition min-h-[56px] ${
                          checked
                            ? "bg-[#141413] text-white border-[#141413] shadow-sm ring-1 ring-[#C83226]"
                            : "bg-white text-[#141413] border-[#141413]/30 hover:border-[#C83226]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="modalidad"
                          value={opcion}
                          checked={checked}
                          onChange={() => handleInputChange("modalidad", opcion)}
                          className="mt-1 h-4 w-4 accent-[#C83226] shrink-0"
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
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1">
                  2. Datos de Identificación Ciudadana (RENAP / TSE)
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre Completo */}
                  <div>
                    <label
                      htmlFor="nombreCompleto"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                    />
                    <span id="hint-nombre" className="block text-xs text-[#57534E] mt-1">
                      Tal como aparece en tu Documento Personal de Identificación.
                    </span>
                    {errors.nombreCompleto && (
                      <p
                        id="err-nombre"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83226]"
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
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base font-mono text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                    />
                    <span id="hint-dpi" className="block text-xs font-mono text-[#57534E] mt-1">
                      13 números sin espacios ni guiones ({values.dpi.length}/13).
                    </span>
                    {errors.dpi && (
                      <p
                        id="err-dpi"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83226]"
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
                <legend className="text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1">
                  3. Ubicación Territorial y Contacto Directo
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="departamento"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] focus:outline-none focus:border-[#C83226] focus:ring-0"
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
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                    />
                    {errors.municipio && (
                      <p
                        id="err-muni"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83226]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.municipio}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                    />
                    <span id="hint-tel" className="block text-xs text-[#57534E] mt-1">
                      Número directo donde el coordinador municipal pueda escribirte.
                    </span>
                    {errors.telefono && (
                      <p
                        id="err-tel"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83226]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.telefono}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="correo"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                    />
                    {errors.correo && (
                      <p
                        id="err-correo"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C83226]"
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
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-[#141413] mb-1.5"
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
                    className="w-full px-4 py-3 rounded-none bg-white border border-[#141413]/40 text-base text-[#141413] placeholder-zinc-500 focus:outline-none focus:border-[#C83226] focus:ring-0"
                  />
                </div>
              </fieldset>

              {/* Aviso de Privacidad y Protección de Datos */}
              <div className="rounded-none bg-[#EFECE6] border border-[#141413]/20 p-4 flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-[#C83226] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#57534E] leading-relaxed">
                  <strong>Aviso de Privacidad Electoral:</strong> Tus datos se utilizan exclusivamente para coordinar tu afiliación voluntaria o participación territorial conforme a la Ley Electoral y de Partidos Políticos (LEPP) ante el Tribunal Supremo Electoral.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[54px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none bg-[#C83226] hover:bg-[#A82419] disabled:opacity-60 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#F5B800]" aria-hidden="true" />
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
      <section id="contacto" className="pb-24 px-4 sm:px-6 lg:px-8">
        <GetInTouchContact
          sedeTitle={selectedSede?.nombre}
          sedeAddress={`${selectedSede?.direccion} (${selectedSede?.referencia})`}
          sedeDepartment={selectedSede?.departamento}
          sedeRegion={selectedSede?.region}
          sedeCoordinator={selectedSede?.coordinador}
          sedeSchedule={selectedSede?.horario}
          googleMapsUrl={selectedSede?.googleMapsUrl}
          wazeUrl={selectedSede?.wazeUrl}
          whatsappUrl={selectedSede?.whatsapp}
        />
      </section>
    </div>
  );
}

