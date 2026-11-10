"use client";

import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { GetInTouchContact } from "@/components/ui/GetInTouchContact";
import {
  LIDERAZGOS_DIGNIDAD,
  LINEA_TIEMPO_DIGNIDAD,
  PRINCIPIOS_IDEOLOGICOS,
  DOCUMENTOS_OFICIALES,
} from "@/data/liderazgos-historia";

export default function NosotrosPage() {
  return (
    <div>
      {/* ====================================================================
          1. OPENING STATEMENT (Tallyhouse .op-second Dark Block)
         ==================================================================== */}
      <section id="opening" className="opening">
        <div className="op-second" style={{ minHeight: "auto", paddingTop: "104px" }}>
          <div className="grid-column: 1 / -1" style={{ gridColumn: "1 / -1" }}>
            <p className="m-text-5 text-[#F5B800] mb-4">
              01 · Raíces, Historia y Conducción Política · Partido #28 TSE
            </p>
            <h1 className="m-text-2 op-statement">
              Una fuerza política nacida del{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                caminar campesino
              </mark>{" "}
              y de la resistencia de los{" "}
              <mark
                className="m-mark"
                style={{ "--mark-color": "var(--color-4)" } as React.CSSProperties}
              >
                cuatro pueblos
              </mark>{" "}
              de Guatemala.
            </h1>
          </div>

          <ul className="op-ledger">
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Registro Oficial #28 TSE</span>
              <p className="m-text">
                Inscripción legal definitiva ante el Tribunal Supremo Electoral tras cumplir y superar las asambleas y firmas en el territorio nacional.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Raíces en el CCDA</span>
              <p className="m-text">
                Articulación histórica con el Comité Campesino del Altiplano (CCDA), autoridades indígenas ancestrales, mujeres tejedoras y juventudes.
              </p>
            </li>
            <li>
              <span className="m-rule" aria-hidden="true" />
              <span className="m-text-5">Cero Caciques</span>
              <p className="m-text">
                Sin financistas de corrupción ni dueño corporativo. Nuestras decisiones emanan del mandato colectivo de las asambleas departamentales.
              </p>
            </li>
          </ul>

          <div className="op-more flex flex-wrap gap-6 items-center">
            <a className="m-btn-2" href="#liderazgos">
              <span className="m-btn-2__label">Conocer Dirigencia Nacional</span>
              <span className="m-btn-2__icon" aria-hidden="true">
                +
              </span>
            </a>
            <a className="m-link-2" href="#documentos">
              Descargar Estatutos Oficiales TSE
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SWITCHING STYLE: Línea de Tiempo Histórica con Fotografía Tinted
         ==================================================================== */}
      <section id="switch" className="switch">
        <div className="sw wrap grid-12">
          <figure className="sw-photo m-photo">
            <img
              className="m-photo__img"
              src="/media/social/photos/asamblea-liderazgos-agua.jpg"
              alt="Asamblea plurinacional de Dignidad Guatemala"
            />
          </figure>

          <div className="sw-copy">
            <span className="m-rule" aria-hidden="true" />
            <h2 className="m-text-3">
              El camino histórico hacia el{" "}
              <mark
                className="m-mark is-red"
                style={{ "--mark-color": "var(--color-3)" } as React.CSSProperties}
              >
                Partido #28.
              </mark>
            </h2>
            <p className="m-text">
              Durante décadas, los partidos tradicionales vendieron casillas al mejor postor. Dignidad Guatemala nació desde abajo para devolver el poder a quienes trabajan la tierra.
            </p>

            <ol className="sw-steps">
              {LINEA_TIEMPO_DIGNIDAD.map((hito, idx) => (
                <li key={hito.codigo || hito.anio}>
                  <span className="m-rule" aria-hidden="true" />
                  <span className="sw-num">{idx + 1}</span>
                  <div>
                    <p className="m-text-5 text-[#C83226] mb-1">
                      {hito.anio} · {hito.categoria}
                    </p>
                    <h3 className="m-text-4">{hito.titulo}</h3>
                    <p className="m-text">{hito.descripcion}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link className="m-link" href="/afiliate">
              Súmate a la historia: afíliate en tu departamento →
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. CLIENT-STORIES STYLE: Liderazgos y Vocería Política (#cases)
         ==================================================================== */}
      <section id="liderazgos" className="cases" data-8b-section="client-stories" style={{ paddingTop: "32px" }}>
        <div className="cs-head wrap">
          <span className="m-rule" aria-hidden="true" />
          <p className="m-text-5 text-[#C83226]">
            03 · Liderazgos Visibles y Conducción Colectiva
          </p>
          <h2 className="m-text-3">
            Vocerías con mandato de las asambleas territoriales.
          </h2>
        </div>

        <div className="cs-list">
          {LIDERAZGOS_DIGNIDAD.map((lider, idx) => {
            const caseStyles = [
              {
                caseColor: "var(--color-5)",
                photoTint: "var(--color-3)",
                textColor: "var(--color-2)",
              },
              {
                caseColor: "var(--color-3)",
                photoTint: "var(--color-4)",
                textColor: "var(--color-1)",
              },
              {
                caseColor: "var(--color-4)",
                photoTint: "var(--color-5)",
                textColor: "var(--color-2)",
              },
            ];
            const st = caseStyles[idx % caseStyles.length];

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
                    style={{ "--photo-tint": st.photoTint } as React.CSSProperties}
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
                    <div className="flex flex-wrap gap-2 pt-2">
                      {lider.etiquetas.map((tag) => (
                        <span key={tag} className="m-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          4. MONTH STYLE: Principios Ideológicos y Documentos Oficiales TSE
         ==================================================================== */}
      <section id="documentos" className="month" style={{ marginTop: "0" }}>
        <div className="mo-grid wrap grid-12">
          <div className="mo-intro">
            <span className="m-rule" aria-hidden="true" />
            <p className="m-text-5 text-[#C83226]">
              04 · Principios y Transparencia Legal
            </p>
            <h2 className="m-text-3">
              Nuestros principios y estatutos, abiertos a todo el pueblo.
            </h2>
            <p className="m-text mo-lead">
              Cada estatuto, declaración ideológica y plan programático presentado ante el Registro de Ciudadanos del TSE es de acceso público.
            </p>
          </div>

          <ol className="mo-notes">
            {PRINCIPIOS_IDEOLOGICOS.map((principio, idx) => (
              <li key={principio.numero} className="mo-note" style={{ minHeight: "auto", paddingBottom: "24px" }}>
                <span className="mo-key is-on" aria-hidden="true">
                  {idx + 1}
                </span>
                <h3 className="m-text-4">{principio.titulo}</h3>
                <p className="m-text">{principio.descripcion}</p>
              </li>
            ))}
          </ol>

          <article className="mo-sheet" aria-label="Documentos Oficiales TSE #28">
            <header className="mo-sheet__head">
              <p className="m-text-5 text-[#C83226]">
                Archivo Legal · Registro de Ciudadanos TSE
              </p>
              <p className="mo-client">
                Documentos Oficiales de Dignidad Guatemala (#28)
              </p>
              <p className="m-text-6">
                Descarga directa en formato PDF verificado
              </p>
            </header>

            {DOCUMENTOS_OFICIALES.map((doc, idx) => (
              <div key={doc.id} className="mo-part">
                <h3 className="m-text-5">
                  {idx + 1} · {doc.categoria} ({doc.fecha})
                </h3>
                <p className="m-text-4">{doc.titulo}</p>
                <p className="m-text-6">{doc.descripcion}</p>
                <dl className="mo-rows">
                  <div>
                    <dt>Extensión</dt>
                    <dd>{doc.paginas}</dd>
                  </div>
                  <div className="is-total">
                    <dt>Tamaño de archivo</dt>
                    <dd>{doc.peso}</dd>
                  </div>
                </dl>
                <a
                  href={doc.urlDescarga}
                  download
                  className="m-btn mt-2"
                >
                  <span className="m-btn__label">
                    Descargar {doc.titulo} (PDF)
                  </span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* ====================================================================
          5. CONTACT: Tarjeta Sede Activa GetInTouchContact
         ==================================================================== */}
      <section id="contact" className="contact wrap">
        <GetInTouchContact />
      </section>
    </div>
  );
}
