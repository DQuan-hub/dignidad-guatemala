import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import socialFeedData from "@/data/social-feed.json";

export function Footer() {
  const logoSrc =
    (socialFeedData as { brand?: { logo?: string } })?.brand?.logo ||
    "/brand/logo-dignidad.jpg";

  return (
    <footer className="w-full bg-[#111C16] text-[#F5F2EB] pt-16 pb-12 mt-20 border-t border-[#141413]/20">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-8">
        
        {/* Fila Superior: Manifiesto Kelvora masivo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#D9822B]">
              <span className="w-2 h-2 rounded-full bg-[#C83E2B]" />
              PARTIDO POLÍTICO #28 · TSE GUATEMALA
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              El futuro de Guatemala se construye con{" "}
              <span className="font-serif italic font-normal text-[#C83E2B]">
                dignidad
              </span>{" "}
              desde nuestros pueblos.
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              Fuerza política popular, comunitaria y plurinacional. Nacida de la articulación del movimiento campesino (CCDA), autoridades indígenas ancestrales, mujeres, juventudes y trabajadores del campo y la ciudad rumbo a las elecciones generales de 2027.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9822B]">
                CANAL DE AFILIACIÓN
              </span>
              <p className="text-sm text-white/80 leading-relaxed">
                ¿Quieres participar en tu municipio o recibir una brigada comunitaria? Escríbenos directamente:
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/afiliate"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C83E2B] hover:bg-[#A93322] text-white text-xs sm:text-sm font-bold shadow-md transition"
              >
                <span>Buscar sede en mi departamento</span>
                <ArrowUpRight className="w-4 h-4 text-[#D9822B]" />
              </Link>
              <a
                href="https://wa.me/50255282027"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/15 transition"
              >
                <MessageCircle className="w-4 h-4 text-[#D9822B]" />
                <span>WhatsApp Nacional</span>
              </a>
            </div>
          </div>
        </div>

        {/* Fila Media: Enlaces Rápidos y Redes Oficiales */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10 text-xs sm:text-sm">
          {/* Col 1 */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              Navegación
            </p>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition">Nuestra Historia y Dirigencia</Link></li>
              <li><Link href="/ejes" className="hover:text-white transition">Los 6 Ejes Programáticos</Link></li>
              <li><Link href="/multimedia" className="hover:text-white transition">Archivo Multimedia y Prensa</Link></li>
              <li><Link href="/afiliate" className="hover:text-white transition">Centro de Afiliación TSE</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              Ejes Clave 2027
            </p>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/ejes/defensa-del-territorio-y-bienes-naturales" className="hover:text-white transition">01. Territorio y Madre Agua</Link></li>
              <li><Link href="/ejes/soberania-alimentaria-y-economia-campesina" className="hover:text-white transition">02. Soberanía Alimentaria</Link></li>
              <li><Link href="/ejes/estado-plurinacional-y-derechos-indigenas" className="hover:text-white transition">03. Estado Plurinacional</Link></li>
              <li><Link href="/ejes/salud-educacion-y-trabajo-digno" className="hover:text-white transition">04. Derechos Sociales</Link></li>
              <li><Link href="/ejes/justicia-transparencia-y-fin-de-la-cooptacion" className="hover:text-white transition">05. Cero Corrupción</Link></li>
              <li><Link href="/ejes/unidad-popular-rumbo-a-2027" className="hover:text-white transition">06. Unidad Popular</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              Redes Oficiales
            </p>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="https://www.tiktok.com/@dignidad100" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center justify-between">
                  <span>TikTok @dignidad100</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center justify-between">
                  <span>Instagram @dignidad.guate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61590226876540" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center justify-between">
                  <span>Facebook Oficial</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              Documentos Oficiales
            </p>
            <ul className="space-y-2 text-white/80">
              <li><a href="/docs/estatutos-dignidad-guatemala-tse28.pdf" download className="hover:text-white transition">Estatutos Oficiales TSE</a></li>
              <li><a href="/docs/plan-gobierno-dignidad-2027.pdf" download className="hover:text-white transition">Plan Programático 2027</a></li>
              <li><a href="/docs/declaracion-principios-plurinacionales.pdf" download className="hover:text-white transition">Declaración de Principios</a></li>
            </ul>
          </div>
        </div>

        {/* Fila Inferior: Créditos, Copyright y Ley LEPP */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Logo Dignidad"
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
            <span>
              © {new Date().getFullYear()} Partido Político Dignidad Guatemala · Registro Oficial #28 ante el Tribunal Supremo Electoral
            </span>
          </div>

          <p className="text-center md:text-right font-mono text-[11px] text-white/40">
            Formación y organización comunitaria conforme al Art. 20(h) de la LEPP
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
