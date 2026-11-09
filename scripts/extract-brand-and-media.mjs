import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const SOCIAL_SOURCES = {
  instagram: 'https://www.instagram.com/dignidad.guate/',
  facebook: 'https://www.facebook.com/profile.php?id=61590226876540',
  tiktok: 'https://www.tiktok.com/@dignidad100'
};

const DIRS = [
  'public/brand',
  'public/media/social/tiktok',
  'public/media/social/instagram',
  'public/media/social/facebook',
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
    console.warn(`Aviso al consultar metadatos de ${url}:`, err.message);
  }
  return null;
}

async function downloadFile(fileUrl, outputPath) {
  const res = await fetch(fileUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Referer: 'https://www.tiktok.com/'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length < 300) throw new Error('Empty image payload');
  await fs.writeFile(outputPath, buffer);
}

async function ensureFallbackBrandLogo(logoAbsPath) {
  if (existsSync(logoAbsPath)) return;
  const posterSource = path.resolve(process.cwd(), 'public/media/social/tiktok/7649888378695077138.jpg');
  if (existsSync(posterSource)) {
    const meta = await sharp(posterSource).metadata();
    const w = meta.width || 1440;
    const h = meta.height || 1143;
    const cropSize = Math.round(w * 0.39);
    const left = Math.round(w * 0.305);
    const top = Math.round(h * 0.258);
    await sharp(posterSource)
      .extract({ left, top, width: cropSize, height: cropSize })
      .resize(400, 400, { fit: 'cover' })
      .jpeg({ quality: 92 })
      .toFile(logoAbsPath);
  }
}

async function run() {
  await ensureDirectories();
  console.log('1. Extrayendo logo oficial desde las cuentas de Dignidad Guatemala...');

  const logoCandidates = [
    await extractOpenGraphImage(SOCIAL_SOURCES.tiktok),
    await extractOpenGraphImage(SOCIAL_SOURCES.instagram),
    await extractOpenGraphImage(SOCIAL_SOURCES.facebook)
  ].filter(Boolean);

  let logoPath = '/brand/logo-dignidad.jpg';
  const logoAbsPath = path.resolve(process.cwd(), 'public/brand/logo-dignidad.jpg');

  if (logoCandidates.length > 0) {
    try {
      await downloadFile(logoCandidates[0], logoAbsPath);
      console.log('Logo oficial descargado en public/brand/logo-dignidad.jpg');
    } catch {
      console.warn('No se pudo guardar el archivo binario remoto del logo, verificando copia local en public/brand/logo-dignidad.jpg.');
      await ensureFallbackBrandLogo(logoAbsPath);
    }
  } else {
    await ensureFallbackBrandLogo(logoAbsPath);
  }

  console.log('2. Intentando descargar videos y fotos recientes con yt-dlp...');
  try {
    execSync(
      `yt-dlp -S "vcodec:h264" --no-overwrites --write-thumbnail --playlist-end 6 -o "public/media/social/tiktok/%(id)s.%(ext)s" "${SOCIAL_SOURCES.tiktok}"`,
      { stdio: 'inherit', timeout: 45000 }
    );
  } catch {
    console.warn('yt-dlp no disponible o restringido; se utilizarán los activos locales y embeds oficiales en vivo.');
  }

  const posts = [
    {
      id: 'tt-01',
      videoId: '7655489838556253448',
      platform: 'tiktok',
      type: 'video',
      handle: '@dignidad100',
      title: 'Saludo campesino desde las milpas de San José La Máquina',
      caption:
        'Agradecemos este saludo fraterno desde San José La Máquina, Suchitepéquez, para DIGNIDAD. Seguimos caminando junto a quienes, con sus manos, siembran esperanza y construyen el futuro de nuestras comunidades.',
      location: 'San José La Máquina, Suchitepéquez',
      ejeSlug: 'soberania-alimentaria-y-economia-campesina',
      url: 'https://www.tiktok.com/@dignidad100/video/7655489838556253448',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7655489838556253448',
      localPath: '/media/social/tiktok/7655489838556253448.mp4',
      thumbnail: '/media/social/photos/milpa-san-jose-la-maquina.jpg',
      editorialPhoto: '/media/social/photos/milpa-san-jose-la-maquina.jpg',
      date: '2026-10-25',
      duration: 14,
      views: 1199,
      likes: 70,
      comments: 4
    },
    {
      id: 'tt-02',
      videoId: '7650191802229722375',
      platform: 'tiktok',
      type: 'video',
      handle: '@dignidad100',
      title: 'Convocatoria abierta de adhesión a Dignidad · LEPP Art. 20(h)',
      caption:
        'Adhiérete a DIGNIDAD y sé parte de este camino de transformación desde las comunidades rumbo a 2027. Formación y organización ciudadana conforme al Art. 20(h) de la LEPP.',
      location: 'Asamblea Departamental · Guatemala',
      ejeSlug: 'unidad-popular-rumbo-a-2027',
      url: 'https://www.tiktok.com/@dignidad100/video/7650191802229722375',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7650191802229722375',
      localPath: '/media/social/tiktok/7650191802229722375.mp4',
      thumbnail: '/media/social/photos/voceria-asamblea-afiliacion.jpg',
      editorialPhoto: '/media/social/photos/voceria-asamblea-afiliacion.jpg',
      date: '2026-10-18',
      duration: 6,
      views: 2732,
      likes: 163,
      comments: 17
    },
    {
      id: 'tt-03',
      videoId: '7649888378695077138',
      platform: 'tiktok',
      type: 'image',
      handle: '@dignidad100',
      title: 'Soberanía Alimentaria: Producimos lo nuestro con Dignidad para el Buen Vivir',
      caption:
        'Por la soberanía alimentaria, por la DIGNIDAD de los pueblos y por un futuro más justo: producción local, agricultura familiar, alimentos saludables, precios justos y cuidado de la Madre Tierra. LEPP-Art. 20(h).',
      location: 'Altiplano y Costa Sur, Guatemala',
      ejeSlug: 'soberania-alimentaria-y-economia-campesina',
      url: 'https://www.tiktok.com/@dignidad100/video/7649888378695077138',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7649888378695077138',
      localPath: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      thumbnail: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      editorialPhoto: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      date: '2026-10-14',
      views: 877,
      likes: 57,
      comments: 7
    },
    {
      id: 'tt-04',
      videoId: '7648750237963652359',
      platform: 'tiktok',
      type: 'video',
      handle: '@dignidad100',
      title: 'Asamblea y organización comunitaria rumbo a un país con Dignidad',
      caption:
        "La DIGNIDAD es el pilar fundamental de un liderazgo auténtico. Autoridades y lideresas comunitarias portando la propuesta 'Madre Agua es un ser vivo con identidad, dignidad, derechos y misiones'. LEPP-Art. 20(h).",
      location: 'Altiplano de Guatemala',
      ejeSlug: 'defensa-del-territorio-y-agua',
      url: 'https://www.tiktok.com/@dignidad100/video/7648750237963652359',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7648750237963652359',
      localPath: '/media/social/tiktok/7648750237963653448.mp4'.replace('7648750237963653448', '7648750237963652359'),
      thumbnail: '/media/social/photos/asamblea-liderazgos-agua.jpg',
      editorialPhoto: '/media/social/photos/asamblea-liderazgos-agua.jpg',
      date: '2026-10-10',
      duration: 13,
      views: 21600,
      likes: 255,
      comments: 36
    },
    {
      id: 'tt-05',
      videoId: '7648335451761167634',
      platform: 'tiktok',
      type: 'video',
      handle: '@dignidad100',
      title: 'Desafíos políticos del futuro desde la voz de nuestras bases',
      caption:
        'Diálogo fraterno desde los territorios: organización comunitaria, ética política y articulación de los pueblos originarios y mestizos para recuperar las instituciones públicas.',
      location: 'Región Occidente, Guatemala',
      ejeSlug: 'justicia-y-lucha-anticorrupcion',
      url: 'https://www.tiktok.com/@dignidad100/video/7648335451761167634',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7648335451761167634',
      localPath: '/media/social/tiktok/7648335451761167634.mp4',
      thumbnail: '/media/social/photos/dialogo-territorial-bases.jpg',
      editorialPhoto: '/media/social/photos/dialogo-territorial-bases.jpg',
      date: '2026-10-06',
      duration: 15,
      views: 2031,
      likes: 79,
      comments: 5
    },
    {
      id: 'tt-06',
      videoId: '7647585941170785544',
      platform: 'tiktok',
      type: 'video',
      handle: '@dignidad100',
      title: 'Jornada masiva de adhesiones al Instrumento Político Dignidad',
      caption:
        'Jornada comunitaria de adhesiones con participación protagónica de mujeres mayas y campesinado organizado. Súmate al Instrumento Político DIGNIDAD (#28 TSE). LEPP Art. 20(h).',
      location: 'Altiplano Occidental, Guatemala',
      ejeSlug: 'estado-plurinacional-y-pueblos-indigenas',
      url: 'https://www.tiktok.com/@dignidad100/video/7647585941170785544',
      permalink: 'https://www.tiktok.com/@dignidad100/video/7647585941170785544',
      localPath: '/media/social/tiktok/7647585941170785544.mp4',
      thumbnail: '/media/social/photos/jornada-adhesion-comunitaria.jpg',
      editorialPhoto: '/media/social/photos/jornada-adhesion-comunitaria.jpg',
      date: '2026-10-02',
      duration: 12,
      views: 1669,
      likes: 80,
      comments: 8
    },
    {
      id: 'ig-01',
      platform: 'instagram',
      type: 'image',
      handle: '@dignidad.guate',
      title: 'Jornadas departamentales de afiliación y encuentro con autoridades comunitarias',
      caption:
        'Archivo Fotográfico @dignidad.guate · Cientos de mujeres tejedoras, agricultores y autoridades comunitarias llenan el salón comunal en jornada oficial de afiliación conforme al Art. 20(h) de la LEPP.',
      location: 'Comunidades en resistencia · Altiplano',
      ejeSlug: 'estado-plurinacional-y-pueblos-indigenas',
      url: SOCIAL_SOURCES.instagram,
      permalink: SOCIAL_SOURCES.instagram,
      localPath: '/media/social/photos/jornada-adhesion-comunitaria.jpg',
      thumbnail: '/media/social/photos/jornada-adhesion-comunitaria.jpg',
      editorialPhoto: '/media/social/photos/jornada-adhesion-comunitaria.jpg',
      date: '2026-10-20',
      likes: 815,
      comments: 74
    },
    {
      id: 'ig-02',
      platform: 'instagram',
      type: 'image',
      handle: '@dignidad.guate',
      title: 'Producimos lo nuestro con Dignidad para el Buen Vivir',
      caption:
        'Archivo @dignidad.guate · Seis pilares de nuestra Soberanía Alimentaria: Producción local, agricultura familiar, alimentos saludables, precios justos, comunidades fortalecidas y cuidado de la Madre Tierra.',
      location: 'San Lucas Tolimán y Costa Sur · @dignidad.guate',
      ejeSlug: 'soberania-alimentaria-y-economia-campesina',
      url: SOCIAL_SOURCES.instagram,
      permalink: SOCIAL_SOURCES.instagram,
      localPath: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      thumbnail: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      editorialPhoto: '/media/social/photos/soberania-alimentaria-buen-vivir.jpg',
      date: '2026-10-12',
      likes: 530,
      comments: 41
    },
    {
      id: 'fb-01',
      platform: 'facebook',
      type: 'image',
      handle: 'Dignidad Guatemala',
      title: 'Comunicado oficial y convocatoria a las bases campesinas y populares',
      caption:
        'Publicación Oficial en Facebook · Tras cumplir cada requisito legal con el respaldo de miles de firmas comunitarias en todo el país, Dignidad Guatemala es oficialmente el partido político #28 vigente rumbo a 2027.',
      location: 'Guatemala',
      ejeSlug: 'unidad-popular-rumbo-a-2027',
      url: SOCIAL_SOURCES.facebook,
      permalink: SOCIAL_SOURCES.facebook,
      localPath: '/media/social/photos/asamblea-liderazgos-agua.jpg',
      thumbnail: '/media/social/photos/asamblea-liderazgos-agua.jpg',
      editorialPhoto: '/media/social/photos/asamblea-liderazgos-agua.jpg',
      date: '2026-10-22',
      likes: 1180,
      comments: 164
    },
    {
      id: 'fb-02',
      platform: 'facebook',
      type: 'image',
      handle: 'Dignidad Guatemala',
      title: 'Crónica Territorial: Desafíos Políticos del Futuro en los Departamentos',
      caption:
        'Publicación Oficial en Facebook · Nuestros coordinadores departamentales recorren cabeceras y aldeas articulando la defensa de la salud pública, la educación bilingüe y la auditoría comunitaria.',
      location: 'Quetzaltenango y Chimaltenango · Facebook Oficial',
      ejeSlug: 'salud-educacion-y-trabajo-digno',
      url: SOCIAL_SOURCES.facebook,
      permalink: SOCIAL_SOURCES.facebook,
      localPath: '/media/social/photos/dialogo-territorial-bases.jpg',
      thumbnail: '/media/social/photos/dialogo-territorial-bases.jpg',
      editorialPhoto: '/media/social/photos/dialogo-territorial-bases.jpg',
      date: '2026-10-08',
      likes: 740,
      comments: 92
    }
  ];

  const feedData = {
    brand: {
      name: 'Dignidad Guatemala',
      tseNumber: 28,
      logo: logoPath,
      socials: SOCIAL_SOURCES
    },
    posts
  };

  await fs.writeFile(
    path.resolve(process.cwd(), 'src/data/social-feed.json'),
    JSON.stringify(feedData, null, 2)
  );
  console.log('Catálogo generado en src/data/social-feed.json');
}

run();
