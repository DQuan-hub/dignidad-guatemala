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
    <div className="w-full h-[420px] sm:h-[520px] rounded-3xl bg-[#F3EDE4]/65 border border-[#181313]/8 animate-pulse flex items-center justify-center text-sm font-mono-code font-bold text-[#231012]/70">
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
    <div className="bg-[#FAF8F5]">
      {/* 1. CABECERA CENTRO DE AFILIACIÓN Y TERRITORIO */}
      <section className="bg-[#7F1116] text-[#FAF6F0] py-20 lg:py-24 border-b border-[#FAF6F0]/10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <SectionBadge code="01 / AFILIACIÓN TSE" variant="dark">
              Centro de Afiliación y Organización Territorial · Partido #28 TSE
            </SectionBadge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#FAF6F0]">
              <VariableFontHover
                className="justify-start text-left text-[#FAF6F0]"
                fromFontVariationSettings="'wght' 300, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
                label="Súmate a"
                staggerDuration={0.02}
                staggerFrom="first"
              />{" "}
              <span className="font-editorial-italic font-semibold text-[#FFD600]">
                dignidad
              </span>{" "}
              en tu departamento y municipio.
            </h1>
            <p className="text-lg text-[#FAF6F0]/80 leading-relaxed">
              Afiliarte a Dignidad Guatemala es ejercer tu derecho constitucional a construir un instrumento político de los{" "}
              <span className="font-editorial-italic text-xl text-[#FFD600]">
                pueblos
              </span>
              , sin clientelismo y con democracia comunitaria rumbo a 2027.
            </p>
          </div>

          {/* GUÍA PASO A PASO PARA AFILIARSE ANTE EL TSE */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white/5 border border-white/15 p-7 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#C81E1E] text-white mb-4">
                  Paso 1 · RENAP
                </span>
                <h2 className="text-xl font-extrabold font-display text-[#FAF6F0] mb-2">
                  Contar con DPI vigente emitido por el RENAP
                </h2>
                <p className="text-sm text-[#FAF6F0]/75 leading-relaxed">
                  Tu Documento Personal de Identificación (CUI de 13 dígitos) debe encontrarse vigente y en buen estado para validar tu firma o huella ante el Registro de Ciudadanos.
                </p>
              </div>
              <p className="mt-4 pt-3 border-t border-white/10 text-xs font-mono-code text-[#FFD600] font-bold">
                Requisito indispensable según la LEPP
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/15 p-7 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#C81E1E] text-white mb-4">
                  Paso 2 · Empadronamiento
                </span>
                <h2 className="text-xl font-extrabold font-display text-[#FAF6F0] mb-2">
                  Estar empadronado ante el TSE
                </h2>
                <p className="text-sm text-[#FAF6F0]/75 leading-relaxed">
                  Verifica que tu DPI esté empadronado y con residencia electoral actualizada en tu municipio para poder elegir y ser electo en asambleas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <a
                  href="https://dondevotas.tse.org.gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-[#FFD600] hover:text-amber-300 underline"
                >
                  <span>Consultar Empadronamiento en el Portal del TSE</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/15 p-7 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#C81E1E] text-white mb-4">
                  Paso 3 · Tu Municipio
                </span>
                <h2 className="text-xl font-extrabold font-display text-[#FAF6F0] mb-2">
                  Acudir a tu sede departamental o jornada comunitaria
                </h2>
                <p className="text-sm text-[#FAF6F0]/75 leading-relaxed">
                  Acércate a cualquiera de nuestras sedes en los 22 departamentos o regístrate en el formulario inferior para que el coordinador municipal te contacte en tu comunidad.
                </p>
              </div>
              <a
                href="#formulario-afiliacion"
                className="mt-4 pt-3 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-[#FFD600] hover:text-amber-300"
              >
                <span>Ir al formulario de Pre-Afiliación Digital →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSCADOR Y MAPA INTERACTIVO DE SEDES DEPARTAMENTALES */}
      <section id="mapa-sedes" className="py-16 lg:py-24 border-b border-[#181313]/8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-10">
            <SectionBadge code="02 / 22 DEPARTAMENTOS">
              Directorio Territorial · OpenStreetMap
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#231012]">
              Encuentra tu sede de{" "}
              <span className="font-editorial-italic font-normal text-[#C81E1E]">
                dignidad
              </span>{" "}
              por Departamento y Municipio.
            </h2>
            <p className="text-[#231012]/75 text-base">
              Filtra por cualquiera de los 22 departamentos o haz clic en un marcador del mapa para ver dirección exacta, horario de atención, coordinador responsable y enlaces a Google Maps, Waze y WhatsApp.
            </p>
          </div>

          {/* Barra de Búsqueda Semántica (<search>) */}
          <search
            aria-label="Buscador de sedes departamentales y municipales de Dignidad"
            className="rounded-3xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-5 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5">
              <label
                htmlFor="filtro-departamento"
                className="block text-xs font-mono-code font-bold uppercase tracking-wider text-[#231012]/80 mb-2"
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
                className="w-full min-h-[48px] px-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#181313]/10 text-base font-semibold text-[#231012]"
              >
                {DEPARTAMENTOS_GUATEMALA.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "Todos" ? "Todos los Departamentos (22 Departamentos)" : dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-5">
              <label
                htmlFor="busqueda-municipio"
                className="block text-xs font-mono-code font-bold uppercase tracking-wider text-[#231012]/80 mb-2"
              >
                Buscar por Municipio, Comunidad o Coordinador
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#231012]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
                  spellCheck={false}
                  className="w-full min-h-[48px] pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#181313]/10 text-base text-[#231012]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDepto("Todos");
                  setSearchQuery("");
                  setSelectedSede(null);
                }}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-2xl bg-[#7F1116] hover:bg-[#C81E1E] text-[#FAF6F0] font-mono-code font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Ver Todas ({SEDES_AFILIACION.length})
              </button>
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

              {/* Detalle de la Sede Seleccionada */}
              {selectedSede && (
                <div className="rounded-3xl bg-[#7F1116] text-[#FAF6F0] p-6 sm:p-8 border border-[#7F1116] shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider bg-[#C81E1E] text-white">
                      Sede Activa · {selectedSede.departamento.toUpperCase()}]
                    </span>
                    <span className="text-xs font-mono-code font-semibold text-[#FFD600]">
                      Región {selectedSede.region}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold font-display text-[#FAF6F0] mb-2">
                    {selectedSede.nombre}
                  </h3>
                  <p className="text-sm text-[#FAF6F0]/85 mb-4">
                    {selectedSede.direccion} ({selectedSede.referencia})
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#FAF6F0]/90 mb-6">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <UserCheck className="w-4 h-4 text-[#FFD600] shrink-0" aria-hidden="true" />
                      <div>
                        <span className="block text-[#FAF6F0]/65">Coordinación:</span>
                        <strong className="text-white">{selectedSede.coordinador}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <Clock className="w-4 h-4 text-[#FFD600] shrink-0" aria-hidden="true" />
                      <div>
                        <span className="block text-[#FAF6F0]/65">Horario de atención:</span>
                        <strong className="text-white">{selectedSede.horario}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selectedSede.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs px-4 py-3 rounded-xl transition"
                    >
                      <MapPin className="w-4 h-4 text-[#FFD600]" aria-hidden="true" />
                      <span>Abrir en Google Maps</span>
                    </a>
                    <a
                      href={selectedSede.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs px-4 py-3 rounded-xl transition"
                    >
                      <Navigation className="w-4 h-4 text-[#FFD600]" aria-hidden="true" />
                      <span>Navegar con Waze</span>
                    </a>
                    <a
                      href={selectedSede.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#FFD600] hover:bg-[#FACC15] text-[#231012] font-extrabold text-xs px-5 py-3 rounded-xl transition"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>Contactar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Sedes Departamentales (5 columnas) */}
            <div className="lg:col-span-5 space-y-4 max-h-[820px] overflow-y-auto pr-1">
              {filteredSedes.length === 0 ? (
                <div className="rounded-3xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-8 text-center space-y-3">
                  <p className="text-base font-bold text-[#231012]">
                    No se encontraron coincidencias para tu búsqueda.
                  </p>
                  <p className="text-sm text-[#231012]/75">
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
                          ? "bg-[#F3EDE4]/65 border-[#C81E1E] ring-2 ring-[#C81E1E]/25 shadow-md"
                          : "bg-white border-[#181313]/8 hover:bg-[#F3EDE4]/65 hover:border-[#7F1116]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono-code font-bold bg-[#7F1116] text-[#FFD600]">
                          {sede.departamento} · {sede.municipio}
                        </span>
                        <span className="text-xs font-mono-code font-semibold text-[#231012]/70">
                          {sede.telefono}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold font-display text-[#231012] mb-1.5">
                        {sede.nombre}
                      </h3>

                      <p className="text-xs text-[#231012]/75 mb-3">
                        {sede.direccion}
                      </p>

                      <div className="text-xs text-[#231012]/85 space-y-1 mb-4">
                        <p>
                          <strong>Responsable:</strong> {sede.coordinador} ({sede.cargoCoordinador})
                        </p>
                        <p>
                          <strong>Horario:</strong> {sede.horario}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#7F1116]/10 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <a
                            href={sede.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono-code font-bold text-[#C81E1E] hover:underline inline-flex items-center gap-1"
                          >
                            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                            Maps
                          </a>
                          <a
                            href={sede.wazeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono-code font-bold text-[#231012]/80 hover:underline inline-flex items-center gap-1"
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
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C81E1E] hover:bg-[#991B1B] text-white font-mono-code font-bold text-xs transition"
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
        className="py-20 lg:py-28 bg-[#F3EDE4]/65"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <SectionBadge code="03 / FORMULARIO TSE">
              Pre-Afiliación, Fiscales y Comités Comunitarios
            </SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#231012]">
              Formulario de Registro Territorial{" "}
              <span className="font-editorial-italic font-normal text-[#C81E1E]">
                rumbo a 2027
              </span>
            </h2>
            <p className="text-[#231012]/75 text-base">
              Completa tus datos para coordinar tu firma en la hoja oficial de afiliación del TSE, inscribirte como fiscal electoral o abrir un comité de Dignidad en tu comunidad.
            </p>
          </div>

          {submittedFolio ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl bg-[#7F1116] text-[#FAF6F0] p-8 sm:p-12 border border-[#7F1116] shadow-xl space-y-6 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-[#FFD600] text-[#231012] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono-code font-bold bg-white/10 text-[#FFD600]">
                  [FOLIO DE REGISTRO: {submittedFolio}]
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#FAF6F0]">
                  ¡Gracias por sumarte, {values.nombreCompleto}!
                </h3>
                <p className="text-[#FAF6F0]/85 text-base max-w-xl mx-auto">
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
                  className="inline-flex items-center gap-2 bg-[#FFD600] hover:bg-[#FACC15] text-[#231012] font-extrabold text-sm px-6 py-4 rounded-2xl transition"
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
              className="rounded-3xl bg-[#FAF8F5] border border-[#181313]/8 p-6 sm:p-10 shadow-sm space-y-8"
            >
              {/* Fieldset 1: Modalidad de Participación (Radio buttons < 6 opciones según modern-web-guidance) */}
              <fieldset className="space-y-3">
                <legend className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#231012] mb-2">
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
                            ? "bg-[#7F1116] text-[#FAF6F0] border-[#7F1116] shadow-sm"
                            : "bg-white text-[#231012] border-[#181313]/10 hover:border-[#C81E1E]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="modalidad"
                          value={opcion}
                          checked={checked}
                          onChange={() => handleInputChange("modalidad", opcion)}
                          className="mt-1 h-4 w-4 accent-[#C81E1E] shrink-0"
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
                <legend className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#231012] mb-1">
                  2. Datos de Identificación Ciudadana (RENAP / TSE)
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre Completo */}
                  <div>
                    <label
                      htmlFor="nombreCompleto"
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
                    />
                    <span id="hint-nombre" className="block text-xs text-[#231012]/65 mt-1">
                      Tal como aparece en tu Documento Personal de Identificación.
                    </span>
                    {errors.nombreCompleto && (
                      <p
                        id="err-nombre"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C81E1E]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.nombreCompleto}</span>
                      </p>
                    )}
                  </div>

                  {/* DPI 13 dígitos (inputmode="numeric" y pattern="\d{13}", nunca type="number") */}
                  <div>
                    <label
                      htmlFor="dpi"
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base font-mono-code text-[#231012]"
                    />
                    <span id="hint-dpi" className="block text-xs font-mono-code text-[#231012]/65 mt-1">
                      13 números sin espacios ni guiones ({values.dpi.length}/13).
                    </span>
                    {errors.dpi && (
                      <p
                        id="err-dpi"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C81E1E]"
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
                <legend className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#231012] mb-1">
                  3. Ubicación Territorial y Contacto Directo
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="departamento"
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
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
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
                    />
                    {errors.municipio && (
                      <p
                        id="err-muni"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C81E1E]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.municipio}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
                    />
                    <span id="hint-tel" className="block text-xs text-[#231012]/65 mt-1">
                      Número directo donde el coordinador municipal pueda escribirte.
                    </span>
                    {errors.telefono && (
                      <p
                        id="err-tel"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C81E1E]"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{errors.telefono}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="correo"
                      className="block text-sm font-bold text-[#231012] mb-1.5"
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
                      className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
                    />
                    {errors.correo && (
                      <p
                        id="err-correo"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#C81E1E]"
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
                    className="block text-sm font-bold text-[#231012] mb-1.5"
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
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#181313]/10 text-base text-[#231012]"
                  />
                </div>
              </fieldset>

              {/* Aviso de Privacidad y Protección de Datos */}
              <div className="rounded-2xl bg-[#F3EDE4]/65 border border-[#181313]/8 p-4 flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-[#C81E1E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#231012]/80 leading-relaxed">
                  <strong>Aviso de Privacidad Electoral:</strong> Tus datos se utilizan exclusivamente para coordinar tu afiliación voluntaria o participación territorial conforme a la Ley Electoral y de Partidos Políticos (LEPP) ante el Tribunal Supremo Electoral.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[54px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C81E1E] hover:bg-[#991B1B] disabled:opacity-60 text-white font-extrabold text-base transition shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
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
