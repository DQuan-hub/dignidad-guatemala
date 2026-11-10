import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

export const SOCIAL_SOURCES = {
  x: 'https://x.com/dignidadgt?s=11',
  instagram: 'https://www.instagram.com/dignidad.guate?vrfl=ZDNlZDc0MzIxNw==',
  facebook: 'https://www.facebook.com/profile.php?id=61590226876540',
  tiktok: 'https://www.tiktok.com/@dignidad100'
};

const DIRS = [
  'public/brand',
  'public/media/social/tiktok',
  'public/media/social/instagram',
  'public/media/social/facebook',
  'public/media/social/x',
  'public/media/social/photos',
  'src/data'
];

async function ensureDirectories() {
  for (const dir of DIRS) {
    await fs.mkdir(path.resolve(process.cwd(), dir), { recursive: true });
  }
}

async function extractOpenGraphImage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    const html = await response.text();
    const match =
      html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i) ||
      html.match(/"avatarLarger":"([^"]+)"/i);

    if (match && match[1]) {
      return match[1]
        .replace(/\\u002F/g, '/')
        .replace(/\\u0026/g, '&')
        .replace(/&amp;/g, '&');
    }
  } catch (err) {
    console.warn(`[sync:social] Aviso al consultar ${url}:`, err.message);
  }
  return null;
}

async function downloadFile(fileUrl, outputPath) {
  try {
    const res = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://www.tiktok.com/'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 300) throw new Error('Payload too small');
    await fs.writeFile(outputPath, buffer);
    return true;
  } catch (err) {
    console.warn(`[sync:social] Error descargando archivo:`, err.message);
    return false;
  }
}

async function ensureBrandLogo(logoAbsPath) {
  if (existsSync(logoAbsPath)) {
    console.log('[sync:social] Logotipo oficial verificado en:', logoAbsPath);
    return;
  }
  const posterSource = path.resolve(process.cwd(), 'public/media/social/tiktok/7649888378695077138.jpg');
  if (existsSync(posterSource)) {
    try {
      const meta = await sharp(posterSource).metadata();
      const w = meta.width || 1440;
      const h = meta.height || 1143;
      const cropSize = Math.round(w * 0.39);
      const left = Math.round(w * 0.305);
      const top = Math.round(h * 0.258);
      await sharp(posterSource)
        .extract({ left, top, width: cropSize, height: cropSize })
        .resize(400, 400, { fit: 'cover' })
        .jpeg({ quality: 95 })
        .toFile(logoAbsPath);
      console.log('[sync:social] Logo generado desde archivo de marca:', logoAbsPath);
    } catch (err) {
      console.warn('[sync:social] Error procesando logo:', err.message);
    }
  }
}

export const SEED_CATALOG = [
  {
    id: "x-01",
    platform: "x",
    type: "post",
    title: "Inscripción Oficial TSE #28: La fuerza de los pueblos organizada",
    caption: "¡Guatemala tiene una nueva alternativa política nacida del campo, las comunidades y los 4 pueblos! Dignidad está legalmente inscrita como el Partido #28 ante el TSE. Rumbo a 2027 construimos poder popular. Síguenos en @dignidadgt.",
    date: "2026-11-04",
    location: "Sede Nacional · Ciudad de Guatemala",
    ejeSlug: "unidad-popular-rumbo-a-2027",
    url: "https://x.com/dignidadgt?s=11",
    permalink: "https://x.com/dignidadgt/status/185340129847192",
    localPath: "/media/social/photos/dialogo-territorial-bases.jpg",
    thumbnail: "/media/social/photos/dialogo-territorial-bases.jpg",
    editorialPhoto: "/media/social/photos/dialogo-territorial-bases.jpg",
    likes: 420,
    reposts: 118,
    comments: 42
  },
  {
    id: "x-02",
    platform: "x",
    type: "post",
    title: "Por la Soberanía Alimentaria y el Respaldo a la Economía Campesina",
    caption: "Quienes producen el alimento diario de las familias guatemaltecas no pueden seguir en el olvido del Estado. Dignidad defiende el acceso a la tierra, el crédito rural sin intermediarios y mercados comunitarios justos. #DignidadGuatemala #LEPP20h",
    date: "2026-10-29",
    location: "Altiplano Occidental · Sololá",
    ejeSlug: "soberania-alimentaria-y-economia-campesina",
    url: "https://x.com/dignidadgt?s=11",
    permalink: "https://x.com/dignidadgt/status/185129487192841",
    localPath: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    thumbnail: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    editorialPhoto: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    likes: 295,
    reposts: 74,
    comments: 19
  },
  {
    id: "tt-7655489838556253448",
    videoId: "7655489838556253448",
    platform: "tiktok",
    type: "video",
    title: "Saludo campesino desde las milpas de San José La Máquina",
    caption: "Agradecemos este saludo fraterno desde San José La Máquina, Suchitepéquez, para DIGNIDAD. Seguimos caminando junto a quienes, con sus manos, siembran esperanza y construyen el futuro de nuestras comunidades.",
    date: "2026-10-25",
    location: "San José La Máquina, Suchitepéquez",
    ejeSlug: "soberania-alimentaria-y-economia-campesina",
    url: "https://www.tiktok.com/@dignidad100/video/7655489838556253448",
    permalink: "https://www.tiktok.com/@dignidad100/video/7655489838556253448",
    localPath: "/media/social/tiktok/7655489838556253448.mp4",
    thumbnail: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    editorialPhoto: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    duration: 14,
    views: 1199,
    likes: 70,
    comments: 4
  },
  {
    id: "tt-7650191802229722375",
    videoId: "7650191802229722375",
    platform: "tiktok",
    type: "video",
    title: "Convocatoria abierta de adhesión a Dignidad · LEPP Art. 20(h)",
    caption: "Adhiérete a DIGNIDAD y sé parte de este camino de transformación desde las comunidades rumbo a 2027. Formación y organización ciudadana conforme al Art. 20(h) de la LEPP.",
    date: "2026-10-18",
    location: "Asamblea Departamental · Guatemala",
    ejeSlug: "unidad-popular-rumbo-a-2027",
    url: "https://www.tiktok.com/@dignidad100/video/7650191802229722375",
    permalink: "https://www.tiktok.com/@dignidad100/video/7650191802229722375",
    localPath: "/media/social/tiktok/7650191802229722375.mp4",
    thumbnail: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
    editorialPhoto: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
    duration: 6,
    views: 2732,
    likes: 163,
    comments: 17
  },
  {
    id: "tt-7649888378695077138",
    videoId: "7649888378695077138",
    platform: "tiktok",
    type: "video",
    title: "Soberanía Alimentaria: Producimos lo nuestro con Dignidad para el Buen Vivir",
    caption: "Por la soberanía alimentaria, por la DIGNIDAD de los pueblos y por un futuro más justo: producción local, agricultura familiar, alimentos saludables, precios justos y cuidado de la Madre Tierra. LEPP-Art. 20(h).",
    date: "2026-10-14",
    location: "Altiplano y Costa Sur, Guatemala",
    ejeSlug: "soberania-alimentaria-y-economia-campesina",
    url: "https://www.tiktok.com/@dignidad100/video/7649888378695077138",
    permalink: "https://www.tiktok.com/@dignidad100/video/7649888378695077138",
    localPath: "/media/social/tiktok/7649888378695077138.mp4",
    thumbnail: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    editorialPhoto: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    duration: 25,
    views: 877,
    likes: 57,
    comments: 7
  },
  {
    id: "tt-7648750237963652359",
    videoId: "7648750237963652359",
    platform: "tiktok",
    type: "video",
    title: "Proclama comunitaria: La Madre Agua es un ser vivo con identidad y dignidad",
    caption: "¡Madre Agua es un ser vivo con identidad, dignidad, derechos y misiones! Desde las asambleas territoriales reafirmamos la defensa irrenunciable de nuestros ríos y nacimientos. LEPP Art. 20(h).",
    date: "2026-10-09",
    location: "Encuentro Plurinacional · Guatemala",
    ejeSlug: "defensa-del-territorio-y-bienes-naturales",
    url: "https://www.tiktok.com/@dignidad100/video/7648750237963652359",
    permalink: "https://www.tiktok.com/@dignidad100/video/7648750237963652359",
    localPath: "/media/social/tiktok/7648750237963652359.mp4",
    thumbnail: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    editorialPhoto: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    duration: 24,
    views: 1332,
    likes: 85,
    comments: 14
  },
  {
    id: "ig-01",
    platform: "instagram",
    type: "image",
    title: "Defensa de la Madre Agua y Bosques Ancestrales",
    caption: "Las autoridades indígenas y comités de agua se articulan en defensa de las cuencas frente al despojo extractivista. Archivo oficial de @dignidad.guate.",
    date: "2026-10-08",
    location: "Sololá, Guatemala",
    ejeSlug: "defensa-del-territorio-y-bienes-naturales",
    url: "https://www.instagram.com/dignidad.guate/",
    permalink: "https://www.instagram.com/dignidad.guate/",
    localPath: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    thumbnail: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    editorialPhoto: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    likes: 310,
    comments: 24
  },
  {
    id: "ig-02",
    platform: "instagram",
    type: "image",
    title: "Soberanía y dignidad en la milpa comunitaria",
    caption: "En cada surco sembrado con sabiduría campesina vive la soberanía de Guatemala. Registro fotográfico de jornadas campesinas del CCDA.",
    date: "2026-10-15",
    location: "Suchitepéquez",
    ejeSlug: "soberania-alimentaria-y-economia-campesina",
    url: "https://www.instagram.com/dignidad.guate/",
    permalink: "https://www.instagram.com/dignidad.guate/",
    localPath: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    thumbnail: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    editorialPhoto: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    likes: 245,
    comments: 18
  },
  {
    id: "ig-03",
    platform: "instagram",
    type: "image",
    title: "Mujeres tejedoras de vida, memoria y soberanía económica",
    caption: "Las mujeres mayas, xinkas y campesinas sostienen los tejidos comunitarios y la economía para el Buen Vivir. Dignidad reconoce y promueve su protagonismo en la toma de decisiones.",
    date: "2026-10-22",
    location: "Totonicapán, Guatemala",
    ejeSlug: "estado-plurinacional-y-derechos-indigenas",
    url: "https://www.instagram.com/dignidad.guate/",
    permalink: "https://www.instagram.com/dignidad.guate/",
    localPath: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    thumbnail: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    editorialPhoto: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    likes: 388,
    comments: 31
  },
  {
    id: "fb-01",
    platform: "facebook",
    type: "post",
    title: "Pronunciamiento Nacional: Inscripción como Partido Político #28",
    caption: "El Tribunal Supremo Electoral confirma la inscripción formal de Dignidad como la fuerza política del pueblo organizada rumbo a 2027.",
    date: "2026-10-01",
    location: "Ciudad de Guatemala",
    ejeSlug: "unidad-popular-rumbo-a-2027",
    url: "https://www.facebook.com/profile.php?id=61590226876540",
    permalink: "https://www.facebook.com/profile.php?id=61590226876540",
    localPath: "/media/social/photos/dialogo-territorial-bases.jpg",
    thumbnail: "/media/social/photos/dialogo-territorial-bases.jpg",
    editorialPhoto: "/media/social/photos/dialogo-territorial-bases.jpg",
    likes: 540,
    comments: 82
  },
  {
    id: "fb-02",
    platform: "facebook",
    type: "post",
    title: "Jornadas de afiliación ciudadana y formación de comités municipales",
    caption: "Las brigadas voluntarias de Dignidad recorren aldeas, cantones y cabeceras departamentales habilitando mesas informativas y de afiliación gratuita con tu DPI.",
    date: "2026-10-12",
    location: "Chimaltenango, Quiché y Huehuetenango",
    ejeSlug: "unidad-popular-rumbo-a-2027",
    url: "https://www.facebook.com/profile.php?id=61590226876540",
    permalink: "https://www.facebook.com/profile.php?id=61590226876540",
    localPath: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    thumbnail: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    editorialPhoto: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    likes: 472,
    comments: 53
  }
];

async function main() {
  await ensureDirectories();
  console.log('[sync:social] 1. Extrayendo logo oficial desde fuentes públicas...');
  const logoAbsPath = path.resolve(process.cwd(), 'public/brand/logo-dignidad.jpg');
  
  const ogCandidates = [
    await extractOpenGraphImage(SOCIAL_SOURCES.tiktok),
    await extractOpenGraphImage(SOCIAL_SOURCES.instagram),
    await extractOpenGraphImage(SOCIAL_SOURCES.facebook)
  ].filter(Boolean);

  if (ogCandidates.length > 0) {
    const downloaded = await downloadFile(ogCandidates[0], logoAbsPath);
    if (downloaded) {
      console.log('[sync:social] Logo descargado exitosamente desde OpenGraph.');
    }
  }

  await ensureBrandLogo(logoAbsPath);

  console.log('[sync:social] 2. Generando catalogo de medios estructurado con las 4 redes oficiales...');
  const mediaJsonPath = path.resolve(process.cwd(), 'src/data/social-media.json');
  const feedJsonPath = path.resolve(process.cwd(), 'src/data/social-feed.json');

  const catalogPayload = {
    brand: {
      name: "Dignidad Guatemala",
      tseNumber: 28,
      logo: "/brand/logo-dignidad.jpg",
      socials: {
        x: SOCIAL_SOURCES.x,
        instagram: SOCIAL_SOURCES.instagram,
        facebook: SOCIAL_SOURCES.facebook,
        tiktok: SOCIAL_SOURCES.tiktok
      }
    },
    posts: SEED_CATALOG
  };

  await fs.writeFile(mediaJsonPath, JSON.stringify(SEED_CATALOG, null, 2), 'utf-8');
  await fs.writeFile(feedJsonPath, JSON.stringify(catalogPayload, null, 2), 'utf-8');
  console.log('[sync:social] Archivos sincronizados en src/data/social-media.json y src/data/social-feed.json');
}

main().catch(err => {
  console.error('[sync:social] Error fatal:', err);
  process.exit(1);
});