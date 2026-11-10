"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, MapPin, ArrowUpRight } from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import { EditorialSocialStrip } from "@/components/ui/EditorialSocialStrip";
import { EJES_PROGRAMATICOS } from "@/data/ejes-programaticos";
import { LIDERAZGOS_DIGNIDAD } from "@/data/liderazgos-historia";
import { SEDES_AFILIACION, DEPARTAMENTOS_GUATEMALA } from "@/data/sedes-afiliacion";
import socialFeedData from "@/data/social-feed.json";
import { getSocialFeedPosts, type SocialMediaPost } from "@/lib/utils";

const OPENING_TILES = [
  {
    src: "/media/social/fb-marcha-revolucion-plurinacional.jpg",
    alt: "Marcha Plurinacional y Popular con pancartas de Dignidad",
    badge: "Plurinacional",
  },
  {
    src: "/media/social/fb-tse-discurso-porton.jpg",
    alt: "Dirigencia popular y autoridades comunitarias ante el TSE",
    badge: "Autoridades",
  },
  {
    src: "/media/social/ig-juventudes-merecen-dignidad.jpg",
    alt: "Juventudes de los pueblos organizadas por la Dignidad",
    badge: "Juventudes",
  },
  {
    src: "/media/social/fb-multitud-banderas-dignidad.jpg",
    alt: "Multitud de militantes con banderas oficiales de Dignidad #28",
    badge: "Pueblos",
  },
  {
    src: "/media/social/ig-orador-asamblea.jpg",
    alt: "Intervención de la dirigencia con rosas rojas por los mártires",
    badge: "Dirigencia",
  },
  {
    src: "/media/social/x-banner-organizados-buen-vivir.jpg",
    alt: "Campesino sembrando la tierra para el Buen Vivir",
    badge: "Buen Vivir",
  },
];

const MONTHLY_BARS = [
  { label: "O", value: 6, text: "Octubre: 6 departamentos" },
  { label: "N", value: 8, text: "Noviembre: 8 departamentos" },
  { label: "D", value: 10, text: "Diciembre: 10 departamentos" },
  { label: "E", value: 12, text: "Enero: 12 departamentos" },
  { label: "F", value: 13, text: "Febrero: 13 departamentos" },
  { label: "M", value: 15, text: "Marzo: 15 departamentos" },
  { label: "A", value: 16, text: "Abril: 16 departamentos" },
  { label: "M", value: 18, text: "Mayo: 18 departamentos" },
  { label: "J", value: 19, text: "Junio: 19 departamentos" },
  { label: "J", value: 20, text: "Julio: 20 departamentos" },
  { label: "A", value: 21, text: "Agosto: 21 departamentos" },
  { label: "S", value: 22, text: "Septiembre: 22 departamentos activos" },
];

interface CalendarChip {
  date: string;
  what: string;
  color: string;
  isRed?: boolean;
}

interface CalendarMonth {
  month: string;
  year: string;
  isCurrentMonth?: boolean;
  chips: CalendarChip[];
}

const ELECTORAL_CALENDAR: CalendarMonth[] = [
  {
    month: "Abril",
    year: "2026",
    chips: [
      {
        date: "12 Abril",
        what: "Apertura de sedes departamentales en Altiplano y Verapaces",
        color: "var(--color-5)",
      },
      {
        date: "26 Abril",
        what: "Encuentro Nacional Campesino CCDA por la Soberanía Alimentaria",
        color: "var(--color-4)",
      },
    ],
  },
  {
    month: "Mayo",
    year: "2026",
    chips: [
      {
        date: "1 Mayo",
        what: "Movilización plurinacional de trabajadores del campo y la ciudad",
        color: "var(--color-3)",
        isRed: true,
      },
      {
        date: "20 Mayo",
        what: "Escuelas de formación política Art. 20(h) LEPP en 14 departamentos",
        color: "var(--color-4)",
      },
    ],
  },
  {
    month: "Junio",
    year: "2026",
    chips: [
      {
        date: "8 Junio",
        what: "Cumbre Comunitaria en defensa de Madre Agua en Sololá",
        color: "var(--color-5)",
      },
      {
        date: "28 Junio",
        what: "Verificación de libros y hojas de adhesión ante el TSE",
        color: "var(--color-3)",
        isRed: true,
      },
    ],
  },
  {
    month: "Julio",
    year: "2026",
    chips: [
      {
        date: "14 Julio",
        what: "Brigadas móviles de empadronamiento juvenil en Costa Sur",
        color: "var(--color-5)",
      },
      {
        date: "29 Julio",
        what: "Foro de Mujeres Tejedoras y Economía Cooperativa en Totonicapán",
        color: "var(--color-4)",
      },
    ],
  },
  {
    month: "Agosto",
    year: "2026",
    chips: [
      {
        date: "9 Agosto",
        what: "Día Internacional de los Pueblos Indígenas: Declaración Plurinacional",
        color: "var(--color-3)",
        isRed: true,
      },
      {
        date: "24 Agosto",
        what: "Instalación de comités municipales en Petén, Izabal y Oriente",
        color: "var(--color-5)",
      },
    ],
  },
  {
    month: "Septiembre",
    year: "2026",
    chips: [
      {
        date: "15 Septiembre",
        what: "Asamblea de los Cuatro Pueblos por una independencia con dignidad",
        color: "var(--color-4)",
      },
      {
        date: "30 Septiembre",
        what: "Consolidación de las 22 coordinaciones departamentales TSE #28",
        color: "var(--color-3)",
        isRed: true,
      },
    ],
  },
  {
    month: "Octubre",
    year: "2026",
    chips: [
      {
        date: "12 Octubre",
        what: "Jornada Nacional de Resistencia Indígena, Negra y Popular",
        color: "var(--color-4)",
      },
      {
        date: "20 Octubre",
        what: "Conmemoración de la Revolución de 1944 y presentación de ejes",
        color: "var(--color-3)",
        isRed: true,
      },
    ],
  },
  {
    month: "Noviembre",
    year: "2026",
    isCurrentMonth: true,
    chips: [
      {
        date: "8 Noviembre",
        what: "Mesas técnicas de presupuesto participativo y salud rural",
        color: "var(--color-5)",
      },
      {
        date: "25 Noviembre",
        what: "Pacto Nacional por la Vida y Derechos de las Mujeres",
        color: "var(--color-4)",
      },
    ],
  },
  {
    month: "Diciembre",
    year: "2026",
    chips: [
      {
        date: "10 Diciembre",
        what: "Informe anual de transparencia financiera ante las bases",
        color: "var(--color-3)",
        isRed: true,
      },
      {
        date: "21 Diciembre",
        what: "Cierre de primera fase de formación de fiscales electorales",
        color: "var(--color-5)",
      },
    ],
  },
  {
    month: "Enero",
    year: "2027",
    chips: [
      {
        date: "15 Enero",
        what: "Convocatoria oficial TSE a Elecciones Generales 2027",
        color: "var(--color-3)",
        isRed: true,
      },
      {
        date: "28 Enero",
        what: "Inicio de asambleas municipales para elección de candidaturas",
        color: "var(--color-5)",
      },
    ],
  },
  {
    month: "Febrero",
    year: "2027",
    chips: [
      {
        date: "14 Febrero",
        what: "Asambleas Departamentales de delegados en los 22 departamentos",
        color: "var(--color-4)",
      },
      {
        date: "27 Febrero",
        what: "Gran Asamblea Nacional de proclamación programática Dignidad #28",
        color: "var(--color-3)",
        isRed: true,
      },
    ],
  },
  {
    month: "Marzo",
    year: "2027",
    chips: [
      {
        date: "15 Marzo",
        what: "Inscripción de candidaturas nacidas de los pueblos ante el TSE",
        color: "var(--color-3)",
        isRed: true,
      },
      {
        date: "30 Marzo",
        what: "Despliegue nacional de defensa del voto en los 340 municipios",
        color: "var(--color-5)",
      },
    ],
  },
];

export default function HomePage() {
  const posts = getSocialFeedPosts(socialFeedData as never);
  const featuredVideo =
    posts.find((p) => p.videoId === "7648750237963652359") || posts[0];

  const [activeModalPost, setActiveModalPost] = useState<SocialMediaPost | null>(
    null
  );
  const [activeMonthNote, setActiveMonthNote] = useState<number>(0);
  const [selectedQuickDepto, setSelectedQuickDepto] = useState<string>("Sololá");
  const currentMonthRef = useRef<HTMLLIElement | null>(null);
  const yearViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Auto-scroll tax-year timeline to current month (Noviembre 2026)
    if (currentMonthRef.current && yearViewRef.current) {
      const el = currentMonthRef.current;
      const container = yearViewRef.current;
      const offset = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    }
  }, []);

  const quickSede =
    SEDES_AFILIACION.find((s) => s.departamento === selectedQuickDepto) ||
    SEDES_AFILIACION[0];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
      typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline: view()")
    ) {
      document.documentElement.setAttribute("data-8b-live", "");
    }

    const motionNodes = document.querySelectorAll("[data-8b-motion]");
    motionNodes.forEach((node) => node.classList.add("is-in"));
  }, []);

  return (
    <div>
      {/* ====================================================================
          1. OPENING: Collage of 8 Tinted Community Photos + Black Cover Box
         ==================================================================== */}
      <section id="opening" className="opening" data-8b-section="opening">
        <div className="op-stage">
          <div className="op-tiles" data-8b-items=":scope > .op-tile">
            {OPENING_TILES.map((tile, idx) => (
              <figure
                key={tile.badge}
                className="op-tile"
                style={{ "--i": idx } as React.CSSProperties}
              >
                <div className="op-tile__frame m-photo">
                  <img
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    className="m-photo__img"
                    src={tile.src}
                    alt={tile.alt}
                  />
                </div>
                <figcaption className="m-badge">{tile.badge}</figcaption>
              </figure>
            ))}
          </div>

          <div className="op-ground" aria-hidden="true" />

          <div className="op-cover">
            <div className="op-head">
              <p className="m-text-5 text-[#F5B800] mb-2">
                Partido Político #28 · TSE Guatemala
              </p>
              <h1 className="m-text-2 op-title">Dignidad, desde los pueblos.</h1>
              <p className="m-text-4 op-lead">
                Fuerza política campesina, indígena y popular en los 22 departamentos. Un solo proyecto plurinacional rumbo a las elecciones generales de 2027.
              </p>
            </div>

            <div className="op-actions">
              <Link className="m-btn-2" href="/afiliate">
                <span className="m-btn-2__label">Afíliate al Partido</span>
                <span className="m-btn-2__icon" aria-hidden="true">
                  +
                </span>
              </Link>
              <a className="m-link-2" href="#services">
                Ver los 6 ejes
              </a>
              <button
                type="button"
                onClick={() => setActiveModalPost(featuredVideo)}
                className="m-link-2 cursor-pointer"
              >
                ▶ Video manifiesto
              </button>
            </div>

            <p className="op-year">
              <span className="sr-only">Ciclo Electoral </span>#28
            </p>
          </div>
        </div>

        <div className="op-second">
          <p className="m-text-2 op-statement">
            Durante décadas pactaron el presupuesto a medianoche. En 2027 recuperamos el Estado desde los territorios, ya sea que{" "}
            <mark
              className="m-mark is-red"
              style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
            >
              siembres la milpa
            </mark>
            ,{" "}
            <mark
              className="m-mark"
              style={{ "--mark-color": "var(--color-4)" } as React.CSSProperties}
            >
              defiendas el agua
            </mark>{" "}
            o{" "}
            <mark
              className="m-mark"
              style={{ "--mark-color": "var(--color-5)" } as React.CSSProperties}
            >
              enseñes en el aula
            </mark>
            .
          </p>

          <ul className="op-ledger">
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Registro Oficial #28 TSE</span>
              <p className="m-text">
                Partido político legalmente inscrito ante el Tribunal Supremo Electoral por la fuerza de miles de firmas comunitarias.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">22 Departamentos</span>
              <p className="m-text">
                Sedes activas y articulación territorial permanente junto al Comité Campesino del Altiplano (CCDA) y autoridades ancestrales.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">4 Pueblos en Unidad</span>
              <p className="m-text">
                Convergencia histórica de los pueblos Maya, Xinka, Garífuna y Mestizo por un Estado plurinacional y transparente.
              </p>
            </li>
          </ul>

          <a className="m-link-2 op-more" href="#month">
            Ver la radiografía nacional en una sola hoja
          </a>
        </div>
      </section>

      {/* Tira Oficial de Redes Sociales: X, Instagram, TikTok, Facebook */}
      <EditorialSocialStrip className="border-t border-b border-[#141413]" />

      {/* ====================================================================
          2. MONTHLY-REPORT: Radiografía Nacional en Una Hoja (Maize Gold)
         ==================================================================== */}
      <section id="month" className="month" data-8b-section="monthly-report">
        <div className="mo-grid wrap grid-12">
          <div className="mo-intro">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">El país que proponemos, en una sola hoja.</h2>
            <p className="m-text mo-lead">
              Sin tecnicismos para ocultar el saqueo ni promesas vacías: cuánto produce Guatemala, cómo invertiremos en los municipios, cómo blindaremos el presupuesto y cuál es el calendario hacia 2027.
            </p>
          </div>

          <ol className="mo-notes">
            {[
              {
                num: "1",
                title: "Inversión directa en los pueblos, no en corrupción",
                desc: "Redirección del presupuesto nacional hacia soberanía alimentaria, salud comunitaria, educación bilingüe e infraestructura rural.",
              },
              {
                num: "2",
                title: "Presencia viva en los 22 departamentos",
                desc: "Doce meses de despliegue territorial ininterrumpido sumando comités municipales y brigadas de afiliación.",
              },
              {
                num: "3",
                title: "Blindaje anticorrupción y rescate público",
                desc: "Auditoría social vinculante desde los COCODE, fin de los fideicomisos opacos y extinción de dominio a fortunas ilícitas.",
              },
              {
                num: "4",
                title: "Qué sigue rumbo a las elecciones de 2027",
                desc: "Asambleas municipales, formación de fiscales electorales y presentación del Plan de Gobierno Plurinacional.",
              },
            ].map((note, idx) => (
              <li
                key={note.num}
                className="mo-note cursor-pointer"
                onMouseEnter={() => setActiveMonthNote(idx)}
                onClick={() => setActiveMonthNote(idx)}
              >
                <span
                  className={`mo-key ${activeMonthNote === idx ? "is-on" : ""}`}
                  aria-hidden="true"
                >
                  {note.num}
                </span>
                <h3 className="m-text-4">{note.title}</h3>
                <p className="m-text">{note.desc}</p>
              </li>
            ))}
          </ol>

          <article
            className="mo-sheet"
            aria-label="Radiografía Programática Dignidad #28"
            data-cash="true"
          >
            <header className="mo-sheet__head">
              <p className="m-text-5 text-[#C83226]">
                Radiografía Nacional · Horizonte 2026/2027
              </p>
              <p className="mo-client">
                Partido Político Dignidad Guatemala (#28 TSE)
              </p>
              <p className="m-text-6">
                Elaborado por Secretaría de Planificación Territorial y CCDA
              </p>
            </header>

            <div
              className={`mo-part p-2 transition-colors ${
                activeMonthNote === 0 ? "bg-[#EFECE6]" : ""
              }`}
              role="group"
              aria-label="1. Prioridades de Inversión"
            >
              <h3 className="m-text-5">1 · Destino del Presupuesto Digno</h3>
              <dl className="mo-rows">
                <div>
                  <dt>Salud Comunitaria y Educación Bilingüe</dt>
                  <dd>40.0%</dd>
                </div>
                <div>
                  <dt>Soberanía Alimentaria y Crédito Campesino</dt>
                  <dd>35.0%</dd>
                </div>
                <div>
                  <dt>Caminos Rurales, Agua Potable y Riego</dt>
                  <dd>25.0%</dd>
                </div>
                <div className="is-total">
                  <dt>Inversión Territorial Auditada</dt>
                  <dd>100% Pública</dd>
                </div>
              </dl>
              <p className="m-text-6">
                Eliminación de plazas fantasma y sobreprecios en obra pública departamental.
              </p>
            </div>

            <div
              className={`mo-part p-2 transition-colors ${
                activeMonthNote === 1 ? "bg-[#EFECE6]" : ""
              }`}
              role="group"
              aria-label="2. Despliegue Departamental"
            >
              <h3 className="m-text-5">2 · Departamentos con Sedes Activas</h3>
              <div className="mo-cash">
                <p className="mo-big">22 Deptos</p>
                <ol className="mo-bars">
                  {MONTHLY_BARS.map((bar, index) => (
                    <li
                      key={`${bar.label}-${index}`}
                      className="mo-bar"
                      style={
                        {
                          "--v": (bar.value / 22).toFixed(3),
                          "--i": index,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        className="mo-bar__fill"
                        style={{ scale: "1 1" }}
                        aria-hidden="true"
                      />
                      <data className="sr-only" value={bar.value}>
                        {bar.text}
                      </data>
                      <span className="mo-bar__label" aria-hidden="true">
                        {bar.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div
              className={`mo-part p-2 transition-colors ${
                activeMonthNote === 2 ? "bg-[#EFECE6]" : ""
              }`}
              role="group"
              aria-label="3. Blindaje Anticorrupción"
            >
              <h3 className="m-text-5">3 · Blindaje Anticorrupción</h3>
              <dl className="mo-rows">
                <div>
                  <dt>Auditoría social vinculante en COCODE y CODEDE</dt>
                  <dd>340 Municipios</dd>
                </div>
                <div>
                  <dt>Ley de Madre Agua y defensa de cuencas</dt>
                  <dd>Iniciativa #01</dd>
                </div>
              </dl>
              <p className="mo-pot text-[#C83226]">
                Cero pactos de impunidad en la elección de Cortes y Contraloría.
              </p>
            </div>

            <div
              className={`mo-part p-2 transition-colors ${
                activeMonthNote === 3 ? "bg-[#EFECE6]" : ""
              }`}
              role="group"
              aria-label="4. Próximos Hitos"
            >
              <h3 className="m-text-5">4 · Próximos Hitos</h3>
              <dl className="mo-rows">
                <div>
                  <dt>Jornadas de afiliación con DPI</dt>
                  <dd>Lunes a Sábado</dd>
                </div>
                <div>
                  <dt>Escuelas de Formación Política LEPP</dt>
                  <dd>22 Sedes</dd>
                </div>
                <div>
                  <dt>Asamblea Nacional Plurinacional</dt>
                  <dd>Rumbo a 2027</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </section>

      {/* ====================================================================
          3. SERVICES: 6 Full-Width Color-Blocked Slabs for Ejes Programáticos
         ==================================================================== */}
      <section id="services" className="services" data-8b-section="services">
        <div className="sv-head wrap grid-12">
          <span className="m-rule" aria-hidden="true" />
          <h2 className="m-text-3">
            Seis ejes programáticos, construidos con los pueblos en cada territorio.
          </h2>
          <p className="m-text">
            Cada eje responde a las demandas históricas de nuestras comunidades campesinas, indígenas y urbanas rumbo al periodo 2027–2031.
          </p>
        </div>

        <div className="sv-slabs">
          {EJES_PROGRAMATICOS.map((eje, idx) => {
            const slabConfigs = [
              {
                slabColor: "var(--color-3)",
                photoTint: "var(--color-4)",
                textClass: "is-light-text",
              },
              {
                slabColor: "var(--color-5)",
                photoTint: "var(--color-3)",
                textClass: "is-dark-text",
              },
              {
                slabColor: "var(--color-4)",
                photoTint: "var(--color-5)",
                textClass: "is-dark-text",
              },
            ];
            const cfg = slabConfigs[idx % slabConfigs.length];

            return (
              <article
                key={eje.slug}
                className={`sv-slab ${cfg.textClass}`}
                style={
                  {
                    "--slab-color": cfg.slabColor,
                    "--photo-tint": cfg.photoTint,
                  } as React.CSSProperties
                }
              >
                <div className="sv-slab__in wrap grid-12">
                  <span className="m-rule" aria-hidden="true" />
                  <h3 className="m-text-2 sv-name">
                    {eje.numero} · {eje.palabraClaveCursiva}
                  </h3>

                  <div className="sv-copy">
                    <p className="m-text-4">{eje.titulo}</p>
                    <p className="m-text">{eje.resumenCorto}</p>
                  </div>

                  <div className="sv-photo m-photo">
                    <img
                      className="m-photo__img"
                      src={eje.imagenHero}
                      alt={eje.pieFotoHero}
                      loading="lazy"
                    />
                    <span className="sv-dots" aria-hidden="true" />
                  </div>

                  <div className="sv-list">
                    <p className="m-text-5">
                      Iniciativas y Compromisos del Eje {eje.numero}
                    </p>
                    <ul className="m-text">
                      {eje.propuestasLegislativas.map((prop) => (
                        <li key={prop.codigo}>
                          <strong>{prop.titulo}:</strong> {prop.descripcion}
                        </li>
                      ))}
                      {eje.impactoComunitario[0] && (
                        <li>
                          <strong>Indicador Meta 2027:</strong>{" "}
                          {eje.impactoComunitario[0].metrica} —{" "}
                          {eje.impactoComunitario[0].etiqueta}
                        </li>
                      )}
                    </ul>
                    <Link className="m-btn" href={`/ejes/${eje.slug}`}>
                      <span className="m-btn__label">
                        Leer diagnóstico completo del Eje {eje.numero}
                      </span>
                      <span className="m-btn__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          4. SWITCHING: Cómo Afiliarse a Dignidad #28 en 3 Pasos + Buscador
         ==================================================================== */}
      <section id="switch" className="switch" data-8b-section="switching">
        <div className="sw wrap grid-12">
          <figure className="sw-photo m-photo">
            <img
              className="m-photo__img"
              src="/media/social/photos/jornada-adhesion-comunitaria.jpg"
              alt="Ciudadanía firmando hojas de afiliación a Dignidad Guatemala"
              loading="lazy"
            />
          </figure>

          <div className="sw-copy">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              Afiliarse toma{" "}
              <mark
                className="m-mark is-red"
                style={
                  { "--mark-color": "var(--color-3)" } as React.CSSProperties
                }
              >
                tres pasos simples.
              </mark>
            </h2>
            <p className="m-text">
              El trámite ante el Tribunal Supremo Electoral es personal, libre y gratuito. Nuestras sedes departamentales y brigadas comunitarias te acompañan en todo el proceso.
            </p>

            <ol className="sw-steps">
              <li>
                <span className="m-rule" aria-hidden="true" />
                <span className="sw-num">1</span>
                <div>
                  <h3 className="m-text-4">Presenta tu DPI vigente</h3>
                  <p className="m-text">
                    Ser ciudadano guatemalteco mayor de 18 años con Documento Personal de Identificación emitido por el RENAP.
                  </p>
                </div>
              </li>
              <li>
                <span className="m-rule" aria-hidden="true" />
                <span className="sw-num">2</span>
                <div>
                  <h3 className="m-text-4">Verifica tu empadronamiento TSE</h3>
                  <p className="m-text">
                    Si aún no estás empadronado o cambiaste de residencia, nuestros voluntarios te orientan al instante sin costo.
                  </p>
                </div>
              </li>
              <li>
                <span className="m-rule" aria-hidden="true" />
                <span className="sw-num">3</span>
                <div>
                  <h3 className="m-text-4">Firma en tu sede departamental</h3>
                  <p className="m-text">
                    Registra tu firma o huella en la hoja oficial del TSE #28 e intégrate a las asambleas de tu municipio.
                  </p>
                </div>
              </li>
            </ol>

            {/* Selector rápido de sede departamental */}
            <div className="p-5 border border-[#141413] bg-[#EFECE6] space-y-3">
              <label
                htmlFor="switch-depto-select"
                className="m-text-5 block text-[#141413]"
              >
                Consulta rápida de sede en tu departamento:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  id="switch-depto-select"
                  value={selectedQuickDepto}
                  onChange={(e) => setSelectedQuickDepto(e.target.value)}
                  className="flex-1 min-h-[48px] px-3 bg-white border border-[#141413] font-semibold text-sm text-[#141413]"
                >
                  {DEPARTAMENTOS_GUATEMALA.filter((d) => d !== "Todos").map(
                    (dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    )
                  )}
                </select>
                <Link
                  href="/afiliate#mapa-sedes"
                  className="m-btn-2 shrink-0 justify-center"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Abrir Mapa TSE</span>
                </Link>
              </div>
              <div className="text-xs text-[#141413] space-y-0.5 pt-1">
                <p className="font-bold">
                  {quickSede.nombre} — {quickSede.municipio},{" "}
                  {quickSede.departamento}
                </p>
                <p>{quickSede.direccion}</p>
                <p className="font-semibold text-[#C83226]">
                  Coordinación: {quickSede.coordinador} · {quickSede.telefono}
                </p>
              </div>
            </div>

            <Link className="m-link" href="/afiliate">
              Ir al directorio completo de las 22 sedes departamentales
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. TAX-YEAR: Calendario Electoral y Ruta Territorial 2026–2027
         ==================================================================== */}
      <section id="year" className="year" data-8b-section="tax-year">
        <div className="yr-pin">
          <div className="yr-head wrap grid-12">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              El calendario territorial 26/27, organizado mes a mes.
            </h2>
            <p className="m-text yr-intro">
              De abril de 2026 a marzo de 2027: cada asamblea departamental, escuela de formación política y jornada de afiliación rumbo a las elecciones generales.
            </p>
            <ul className="yr-key" aria-label="Tipos de actividad territorial">
              <li>
                <span
                  className="yr-swatch"
                  style={{ "--chip": "var(--color-3)" } as React.CSSProperties}
                  aria-hidden="true"
                />
                Hitos TSE y Asambleas Nacionales
              </li>
              <li>
                <span
                  className="yr-swatch"
                  style={{ "--chip": "var(--color-4)" } as React.CSSProperties}
                  aria-hidden="true"
                />
                Formación Política y Pueblos
              </li>
              <li>
                <span
                  className="yr-swatch"
                  style={{ "--chip": "var(--color-5)" } as React.CSSProperties}
                  aria-hidden="true"
                />
                Brigadas de Afiliación y Fiscalización
              </li>
            </ul>
          </div>

          <div ref={yearViewRef} className="yr-view">
            <ol className="yr-track">
              {ELECTORAL_CALENDAR.map((item) => (
                <li
                  key={`${item.month}-${item.year}`}
                  ref={item.isCurrentMonth ? currentMonthRef : null}
                  className={`yr-month relative ${item.isCurrentMonth ? "is-current-month border-t-2 border-t-[#C83226]" : ""}`}
                >
                  {item.isCurrentMonth && (
                    <div
                      className="absolute -top-6 bottom-0 -left-[1px] w-[3px] bg-[#C83226] z-30 pointer-events-none shadow-[0_0_12px_rgba(200,50,38,0.9)]"
                      aria-label="Línea temporal actual: Noviembre 2026"
                    >
                      <div className="absolute -top-6 left-0 -translate-x-2 bg-[#C83226] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-none whitespace-nowrap shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>FECHA ACTUAL · NOVIEMBRE 2026</span>
                      </div>
                    </div>
                  )}
                  <h3 className="yr-name">
                    {item.month}
                    <span>{item.year}</span>
                  </h3>
                  <ul className="yr-chips">
                    {item.chips.map((chip) => (
                      <li
                        key={chip.date}
                        className={`yr-chip ${chip.isRed ? "is-red-chip" : ""}`}
                        style={{ "--chip": chip.color } as React.CSSProperties}
                      >
                        <span className="yr-chip__fill" aria-hidden="true" />
                        <span className="yr-date">{chip.date}</span>
                        <span className="yr-what">{chip.what}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CLIENT-STORIES: Tres Voces y Crónicas desde el Territorio
         ==================================================================== */}
      <section id="cases" className="cases" data-8b-section="client-stories">
        <div className="cs-head wrap">
          <span className="m-rule" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="m-text-3">Tres voces desde nuestros territorios.</h2>
            <Link href="/multimedia" className="m-link self-start sm:self-auto">
              Abrir archivo multimedia completo (@dignidad100) →
            </Link>
          </div>
        </div>

        <div className="cs-list">
          {LIDERAZGOS_DIGNIDAD.map((lider, idx) => {
            const caseStyles = [
              {
                caseColor: "var(--color-5)",
                photoTint: "var(--color-3)",
                markColor: "var(--color-4)",
                textColor: "var(--color-2)",
              },
              {
                caseColor: "var(--color-3)",
                photoTint: "var(--color-4)",
                markColor: "var(--color-1)",
                textColor: "var(--color-1)",
              },
              {
                caseColor: "var(--color-4)",
                photoTint: "var(--color-5)",
                markColor: "var(--color-1)",
                textColor: "var(--color-2)",
              },
            ];
            const st = caseStyles[idx % caseStyles.length];
            const videoPost = posts[idx % posts.length] || featuredVideo;

            return (
              <article
                key={lider.id}
                className="cs-case"
                style={
                  {
                    "--case-color": st.caseColor,
                    "--case-text": st.textColor,
                  } as React.CSSProperties
                }
              >
                <div className="cs-portrait">
                  <span className="cs-glyph" aria-hidden="true">
                    “
                  </span>
                  <figure
                    className="cs-photo m-photo"
                    style={
                      { "--photo-tint": st.photoTint } as React.CSSProperties
                    }
                  >
                    <img
                      className="m-photo__img"
                      src={lider.fotografia}
                      alt={lider.nombre}
                      loading="lazy"
                    />
                  </figure>
                  <p className="cs-who">
                    <strong>{lider.nombre}</strong>
                    <span className="m-text-6">
                      {lider.cargo} · {lider.origen}
                    </span>
                  </p>
                </div>

                <div className="cs-quote">
                  <blockquote className="cs-text m-text-4">
                    <p>“{lider.cita}”</p>
                  </blockquote>

                  <div className="cs-fact m-text-6">
                    <span className="m-rule" aria-hidden="true" />
                    <p>{lider.trayectoria}</p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalPost(videoPost)}
                        className="m-btn cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span className="m-btn__label">
                          Reproducir crónica en video
                        </span>
                      </button>
                      <Link
                        href="/nosotros"
                        className={
                          idx === 1 ? "m-link-2 self-center" : "m-link self-center"
                        }
                      >
                        Ver trayectoria completa
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          7. ACCOUNTANTS / PEOPLE: Dirigencia Nacional y Articulación
         ==================================================================== */}
      <section id="people" className="people" data-8b-section="accountants">
        <div className="wrap">
          <div className="pp-head grid-12">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              Liderazgos nacidos de las asambleas. Conocerás a tu coordinador en cada sede.
            </h2>
            <p className="m-text">
              Cada departamento cuenta con una coordinación electa por las bases campesinas, indígenas, juveniles y de mujeres. Sin caciques ni candidatos impuestos.
            </p>
          </div>

          <ul className="pp-grid">
            <li className="pp-person">
              <figure className="pp-photo m-photo">
                <img
                  className="m-photo__img"
                  src="/media/social/photos/voceria-asamblea-afiliacion.jpg"
                  alt="Gabriel Romero Pérez"
                  loading="lazy"
                />
              </figure>
              <h3 className="m-text-4">Gabriel Romero Pérez</h3>
              <p className="m-text-6 pp-role">
                Secretario General Provisional. Articulación política nacional y registro TSE #28.
              </p>
            </li>

            <li className="pp-person">
              <figure className="pp-photo m-photo">
                <img
                  className="m-photo__img"
                  src="/media/social/photos/soberania-alimentaria-buen-vivir.jpg"
                  alt="Neydi Juracán"
                  loading="lazy"
                />
              </figure>
              <h3 className="m-text-4">Neydi Juracán</h3>
              <p className="m-text-6 pp-role">
                Coordinadora CCDA y Vocera Campesina. Soberanía alimentaria, crédito rural y cooperativismo.
              </p>
            </li>

            <li className="pp-person">
              <figure className="pp-photo m-photo">
                <img
                  className="m-photo__img"
                  src="/media/social/photos/asamblea-liderazgos-agua.jpg"
                  alt="Sandra Xinico"
                  loading="lazy"
                />
              </figure>
              <h3 className="m-text-4">Sandra Xinico</h3>
              <p className="m-text-6 pp-role">
                Dirigente Departamental y Articuladora de Bases. Defensa de Madre Agua y derechos indígenas.
              </p>
            </li>

            <li className="pp-person">
              <figure className="pp-photo m-photo">
                <img
                  className="m-photo__img"
                  src="/media/social/photos/dialogo-territorial-bases.jpg"
                  alt="Juventud y Fiscalización Electoral"
                  loading="lazy"
                />
              </figure>
              <h3 className="m-text-4">Red de Fiscales y Juventud</h3>
              <p className="m-text-6 pp-role">
                Formación política Art. 20(h) LEPP y defensa ciudadana del voto en los 340 municipios.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ====================================================================
          8. FEES / PARTICIPATION: Tres Modalidades de Participación
         ==================================================================== */}
      <section id="fees" className="fees" data-8b-section="fees">
        <div className="wrap">
          <div className="fe-head grid-12">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              Tres formas de construir Dignidad #28. El trámite es 100% gratuito.
            </h2>
            <p className="m-text">
              No pedimos cuotas corporativas ni financistas de corrupción. Nuestra fuerza proviene de la organización voluntaria en cada comunidad.
            </p>
          </div>

          <div className="fe-plans">
            <article
              className="fe-plan"
              style={
                {
                  "--plan-color": "var(--color-5)",
                  "--h": "0.45",
                  "--i": 0,
                } as React.CSSProperties
              }
            >
              <div className="fe-stage">
                <span className="fe-fill" aria-hidden="true" />
                <div className="fe-top">
                  <h3 className="m-text-4">Simpatizante Activo</h3>
                  <p className="fe-price">
                    <data value="1">Paso 1</data>
                    <small>en tu barrio</small>
                  </p>
                </div>
              </div>
              <ul className="fe-list m-text">
                <li>Recibe los boletines y crónicas de @dignidad100</li>
                <li>Participa en los círculos de lectura de los 6 ejes</li>
                <li>Comparte las propuestas en tu comunidad o centro de estudio</li>
                <li>Asiste a los foros abiertos sobre Madre Agua y Buen Vivir</li>
              </ul>
              <Link className="m-btn" href="/multimedia">
                <span className="m-btn__label">Explorar crónicas y videos</span>
                <span className="m-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>

            <article
              className="fe-plan"
              style={
                {
                  "--plan-color": "var(--color-4)",
                  "--h": "0.72",
                  "--i": 1,
                } as React.CSSProperties
              }
            >
              <div className="fe-stage">
                <span className="fe-fill" aria-hidden="true" />
                <div className="fe-top">
                  <h3 className="m-text-4">Afiliado Oficial TSE</h3>
                  <p className="fe-price">
                    <data value="28">#28</data>
                    <small>con tu DPI</small>
                  </p>
                </div>
              </div>
              <ul className="fe-list m-text">
                <li>Voz y voto directo en las asambleas municipales</li>
                <li>Elige democráticamente a las candidaturas locales 2027</li>
                <li>Acceso a las Escuelas de Formación Política Art. 20(h) LEPP</li>
                <li>Acompañamiento de la coordinación de tu departamento</li>
                <li>Trámite personal, libre y sin costo ante el TSE</li>
              </ul>
              <Link className="m-btn" href="/afiliate">
                <span className="m-btn__label">Afiliarme en mi departamento</span>
                <span className="m-btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>

            <article
              className="fe-plan"
              style={
                {
                  "--plan-color": "var(--color-3)",
                  "--h": "0.96",
                  "--i": 2,
                } as React.CSSProperties
              }
            >
              <div className="fe-stage">
                <span className="fe-fill" aria-hidden="true" />
                <div className="fe-top">
                  <h3 className="m-text-4">Comité y Fiscal 2027</h3>
                  <p className="fe-price">
                    <data value="22">22</data>
                    <small>departamentos</small>
                  </p>
                </div>
              </div>
              <ul className="fe-list m-text">
                <li>Todo lo incluido como afiliado oficial del partido</li>
                <li>Organiza una brigada móvil de afiliación en tu aldea o zona</li>
                <li>Acredítate como Fiscal Electoral para defender el voto en 2027</li>
                <li>Integra las mesas técnicas del Plan de Gobierno Plurinacional</li>
                <li>Enlace directo con la Secretaría General Nacional</li>
              </ul>
              <a className="m-btn" href="#contact">
                <span className="m-btn__label">Coordinar brigada o comité</span>
                <span className="m-btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. QUESTIONS / FAQ: Preguntas Frecuentes en Fondo Sage (--color-5)
         ==================================================================== */}
      <section id="faq" className="faq" data-8b-section="questions">
        <div className="fq wrap grid-12">
          <div className="fq-head">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              Preguntas frecuentes antes de afiliarte.
            </h2>
            <p className="m-text">
              Si tienes cualquier otra duda sobre el registro TSE #28 o cómo organizar tu comunidad, escríbenos en la sección de contacto.
            </p>
          </div>

          <div className="fq-list">
            <details className="fq-item">
              <summary>
                <span className="m-text-4">
                  ¿Qué requisitos necesito para afiliarme a Dignidad Guatemala?
                </span>
                <span className="fq-icon m-icon" aria-hidden="true">
                  <span>+</span>
                </span>
              </summary>
              <p className="m-text fq-a">
                Únicamente ser ciudadano guatemalteco mayor de 18 años, contar con tu Documento Personal de Identificación (DPI) vigente emitido por el RENAP, estar empadronado ante el TSE y no pertenecer actualmente a otro partido político.
              </p>
            </details>

            <details className="fq-item">
              <summary>
                <span className="m-text-4">
                  ¿Tiene algún costo económico el trámite de afiliación?
                </span>
                <span className="fq-icon m-icon" aria-hidden="true">
                  <span>+</span>
                </span>
              </summary>
              <p className="m-text fq-a">
                Ninguno. La afiliación a Dignidad Guatemala (#28 TSE) es un derecho ciudadano 100% gratuito, voluntario y personal. Nadie puede condicionarte ni cobrarte por firmar la hoja oficial de adhesión.
              </p>
            </details>

            <details className="fq-item">
              <summary>
                <span className="m-text-4">
                  ¿Cómo verifico si ya estoy empadronado o si aparezco en otro partido?
                </span>
                <span className="fq-icon m-icon" aria-hidden="true">
                  <span>+</span>
                </span>
              </summary>
              <p className="m-text fq-a">
                En cualquiera de nuestras 22 sedes departamentales nuestros voluntarios te ayudan a consultar tu estado de empadronamiento en el portal del TSE con tu número de CUI. Si fuiste inscrito sin tu consentimiento en otra agrupación, te asesoramos para presentar tu renuncia inmediata ante el Registro de Ciudadanos.
              </p>
            </details>

            <details className="fq-item">
              <summary>
                <span className="m-text-4">
                  ¿De dónde provienen los recursos de Dignidad Guatemala?
                </span>
                <span className="fq-icon m-icon" aria-hidden="true">
                  <span>+</span>
                </span>
              </summary>
              <p className="m-text fq-a">
                Rechazamos el financiamiento de contratistas del Estado, monopolios extractivistas y estructuras ilícitas. Nos sostenemos con el trabajo comunitario autogestionado, aportes transparentes de nuestras bases y el financiamiento público auditado conforme a la Ley Electoral y de Partidos Políticos (LEPP).
              </p>
            </details>

            <details className="fq-item">
              <summary>
                <span className="m-text-4">
                  ¿Cómo podemos solicitar una brigada móvil en nuestra comunidad?
                </span>
                <span className="fq-icon m-icon" aria-hidden="true">
                  <span>+</span>
                </span>
              </summary>
              <p className="m-text fq-a">
                Puedes comunicarte por WhatsApp con el coordinador de tu departamento en nuestro Centro de Afiliación o llenar el formulario de contacto abajo indicando tu municipio y aldea. Programamos jornadas cada fin de semana.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. CONTACT: Tarjeta Sede Activa GetInTouchContact
         ==================================================================== */}
      <section id="contact" className="contact wrap" data-8b-section="contact">
        <GetInTouchContact />
      </section>

      {/* Modal de Video Vertical */}
      <VideoModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />
    </div>
  );
}
