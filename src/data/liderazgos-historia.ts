export interface LiderPolitico {
  id: string;
  nombre: string;
  cargo: string;
  origen: string;
  fotografia: string;
  pieFoto: string;
  trayectoria: string;
  cita: string;
  etiquetas: string[];
  destacado?: boolean;
}

export interface HitoHistorico {
  codigo: string;
  anio: string;
  titulo: string;
  descripcion: string;
  categoria: "Raíces Históricas" | "Articulación Territorial" | "Hito Legal TSE" | "Horizonte 2027";
  fotografia: string;
  pieFoto: string;
}

export interface DocumentoOficial {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: "Estatutos" | "Ideología" | "Plan de Gobierno" | "Comunicado TSE";
  fecha: string;
  paginas: string;
  peso: string;
  urlDescarga: string;
}

export const LIDERAZGOS_DIGNIDAD: LiderPolitico[] = [
  {
    id: "gabriel-romero-perez",
    nombre: "Gabriel Romero Pérez",
    cargo: "Secretario General Provisional",
    origen: "Articulación Nacional · Registro TSE #28",
    fotografia: "/media/social/photos/dirigencia-orador-asamblea.jpg",
    pieFoto: "Intervención ante el Tribunal Supremo Electoral · Archivo Dignidad Oficial",
    trayectoria:
      "Dirigente político y organizador social con amplia trayectoria en la construcción de instrumentos políticos del pueblo, el acompañamiento a comunidades agrarias y la defensa de los derechos democráticos ante el Tribunal Supremo Electoral.",
    cita: "La inscripción de Dignidad como el partido #28 demuestra que cuando los pueblos se organizan con disciplina y ética, ningún muro burocrático puede detener la voluntad comunitaria.",
    etiquetas: ["Secretaría General", "Articulación Nacional", "Representación Legal TSE"],
    destacado: true,
  },
  {
    id: "neydi-juracan",
    nombre: "Neydi Juracán",
    cargo: "Coordinadora Campesina del CCDA y Lideresa Comunitaria",
    origen: "San Lucas Tolimán, Sololá · Pueblo Maya Kaqchikel",
    fotografia: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    pieFoto: "Lideresas y autoridades en defensa de la Madre Agua y la tierra · Archivo Dignidad",
    trayectoria:
      "Coordinadora del Comité Campesino del Altiplano (CCDA), defensora de la tierra, la soberanía alimentaria y los derechos de las mujeres indígenas y campesinas. Impulsora de cooperativas agroecológicas y de la reforma rural integral.",
    cita: "Venimos de las montañas, de las parcelas de maíz y café. No pedimos migajas al Estado: construimos poder popular para garantizar tierra, agua y vida digna para nuestras comunidades.",
    etiquetas: ["Movimiento Campesino (CCDA)", "Soberanía Alimentaria", "Mujeres Indígenas"],
    destacado: true,
  },
  {
    id: "sandra-xinico",
    nombre: "Sandra Xinico",
    cargo: "Articulación Departamental y Organización de Base",
    origen: "Chimaltenango · Pueblo Maya Kaqchikel",
    fotografia: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    pieFoto: "Encuentro de mujeres y articulación departamental · Archivo Dignidad",
    trayectoria:
      "Comunicadora, pensadora anticolonial y organizadora territorial. Responsable de tejer las estructuras departamentales y municipales de Dignidad Guatemala bajo principios de plurinacionalidad, paridad de género y formación política permanente.",
    cita: "Descolonizar la política en Guatemala significa acabar con los partidos de caciques y devolver la palabra y el mandato a las asambleas comunitarias de los cuatro pueblos.",
    etiquetas: ["Organización Territorial", "Estado Plurinacional", "Formación Política"],
    destacado: true,
  },
  {
    id: "darwin-lopez-morales",
    nombre: "Darwin López Morales",
    cargo: "Coordinador Regional de Bases Agrarias — Costa Sur",
    origen: "San José La Máquina, Suchitepéquez",
    fotografia: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    pieFoto: "Saludo desde las parcelas de maíz de San José La Máquina · Archivo @dignidad100",
    trayectoria:
      "Líder comunitario y productor agrícola de la Costa Sur, articulador de los comités campesinos por el rescate de las cuencas hídricas, el crédito agrícola y los caminos rurales en Suchitepéquez, Retalhuleu y Escuintla.",
    cita: "Seguimos caminando junto a quienes, con sus manos, siembran esperanza en la milpa y construyen el futuro de nuestras comunidades.",
    etiquetas: ["Costa Sur", "Defensa del Agua", "Economía Campesina"],
  },
  {
    id: "mateo-caal-choc",
    nombre: "Mateo Caal Choc",
    cargo: "Coordinador Regional Norte y Verapaces",
    origen: "Cobán, Alta Verapaz · Pueblo Maya Q'eqchi'",
    fotografia: "/media/social/photos/dialogo-territorial-bases.jpg",
    pieFoto: "Diálogo político territorial desde las bases · Archivo @dignidad100",
    trayectoria:
      "Promotor jurídico comunitario y defensor de los bienes naturales en las Verapaces, el Valle del Polochic y el sur de Petén. Impulsor de la certeza jurídica de tierras comunales y la educación bilingüe.",
    cita: "El territorio Q'eqchi' y Poqomchi' ha dado su riqueza al país y solo ha recibido olvido. En 2027 las Verapaces caminarán con su propio instrumento político.",
    etiquetas: ["Alta y Baja Verapaz", "Tierra y Territorio", "Pueblo Q'eqchi'"],
  },
  {
    id: "lucia-queme-sacor",
    nombre: "Lucía Quemé Sacor",
    cargo: "Coordinadora Regional de Occidente y Juventudes",
    origen: "Quetzaltenango · Pueblo Maya K'iche'",
    fotografia: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
    pieFoto: "Vocería juvenil en jornada departamental de adhesiones · Archivo @dignidad100",
    trayectoria:
      "Lideresa estudiantil y cooperativa de Occidente, articuladora de comités juveniles, colectivos de mujeres tejedoras y profesionales comprometidos en Quetzaltenango, Totonicapán y San Marcos.",
    cita: "La juventud indígena y trabajadora no es solo el futuro: somos el presente organizado que fiscaliza, propone y defiende la democracia comunitaria.",
    etiquetas: ["Occidente", "Juventud Plurinacional", "Economía Solidaria"],
  },
];

export const LINEA_TIEMPO_DIGNIDAD: HitoHistorico[] = [
  {
    codigo: "[ETAPA 01]",
    anio: "Raíces Históricas",
    titulo: "Luchas del Movimiento Campesino (CCDA) y Autoridades Indígenas",
    descripcion:
      "Décadas de organización del Comité Campesino del Altiplano (CCDA), alcaldías indígenas y movimientos populares en defensa de la tierra, el salario en el campo, los Acuerdos de Paz y la soberanía alimentaria.",
    categoria: "Raíces Históricas",
    fotografia: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
    pieFoto: "Raíces en la producción campesina de maíz y defensa de la tierra · Archivo Dignidad",
  },
  {
    codigo: "[ETAPA 02]",
    anio: "2021 — 2023",
    titulo: "Convergencia Plurinacional en Defensa de la Democracia",
    descripcion:
      "Ante el cierre de espacios democráticos, la criminalización de liderazgos comunitarios y la cooptación institucional, las bases campesinas, indígenas y urbanas acuerdan forjar un instrumento político propio, autónomo y sin dueños empresariales.",
    categoria: "Articulación Territorial",
    fotografia: "/media/social/photos/dialogo-territorial-bases.jpg",
    pieFoto: "Diálogo político entre liderazgos comunitarios sobre los desafíos del futuro · Archivo Dignidad",
  },
  {
    codigo: "[ETAPA 03]",
    anio: "2024 — 2025",
    titulo: "Comité Pro-Formación y Jornadas Masivas de Adhesión",
    descripcion:
      "Recorrido aldea por aldea y municipio por municipio en el Altiplano, las Verapaces, la Costa Sur, Oriente y el área Metropolitana, superando ampliamente el mínimo de afiliados y asambleas exigidas por la LEPP.",
    categoria: "Articulación Territorial",
    fotografia: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    pieFoto: "Jornada de adhesión comunitaria conforme al Art. 20(h) de la LEPP · Archivo Dignidad",
  },
  {
    codigo: "[ETAPA 04]",
    anio: "2026",
    titulo: "Inscripción Oficial como Partido Político #28 ante el TSE",
    descripcion:
      "El Tribunal Supremo Electoral oficializa la inscripción vigente de Dignidad Guatemala como el partido político número 28 del país. Se consolida la Secretaría General Provisional y la red de 22 sedes departamentales.",
    categoria: "Hito Legal TSE",
    fotografia: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    pieFoto: "Delegación nacional y comunitaria de Dignidad Guatemala (#28 TSE) · Archivo Dignidad",
  },
  {
    codigo: "[ETAPA 05]",
    anio: "Horizonte 2027",
    titulo: "Asambleas de Postulación y Frente Amplio Popular hacia 2027",
    descripcion:
      "Construcción programática desde abajo, elección democrática de candidaturas comunitarias a alcaldías, diputaciones y binomio presidencial para disputar el poder y refundar Guatemala en las elecciones generales de 2027.",
    categoria: "Horizonte 2027",
    fotografia: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    pieFoto: "Propuesta programática por el Buen Vivir de todos y todas rumbo a 2027 · Archivo Dignidad",
  },
];

export const PRINCIPIOS_IDEOLOGICOS = [
  {
    numero: "01",
    titulo: "Plurinacionalidad e Interculturalidad Crítica",
    descripcion:
      "Reconocemos que Guatemala está conformada por cuatro pueblos —Maya, Xinka, Garífuna y Mestizo— con iguales derechos políticos, territoriales, lingüísticos y jurídicos. Luchamos contra toda forma de racismo y colonialismo interno.",
  },
  {
    numero: "02",
    titulo: "Democracia Comunitaria y Mandar Obedeciendo",
    descripcion:
      "En Dignidad no mandan los financistas ni los caudillos: manda la Asamblea. Todo cargo partidario y de elección popular está sujeto a rendición de cuentas, auditoría social y revocatoria comunitaria.",
  },
  {
    numero: "03",
    titulo: "Defensa de la Vida y la Madre Tierra (Utz K'aslemal / Buen Vivir)",
    descripcion:
      "Rechazamos el modelo extractivista depredador. El agua, los bosques comunales, las semillas criollas y la biodiversidad son bienes comunes para la vida de las generaciones presentes y futuras.",
  },
  {
    numero: "04",
    titulo: "Justicia Social, Agraria y Soberanía Popular",
    descripcion:
      "Defendemos la autodeterminación de los pueblos, la redistribución justa de la riqueza, la reforma rural integral y los derechos de la clase trabajadora del campo y la ciudad.",
  },
  {
    numero: "05",
    titulo: "Equidad de Género y Protagonismo de las Mujeres",
    descripcion:
      "No hay transformación social sin la emancipación y participación paritaria de las mujeres indígenas, campesinas, mestizas, garífunas y xinkas en todos los espacios de decisión política y económica.",
  },
  {
    numero: "06",
    titulo: "Ética Política y Cero Tolerancia a la Corrupción",
    descripcion:
      "Asumimos la política como servicio colectivo honesto. Combatimos frontalmente el clientelismo, el transfuguismo, la compra de voluntades y el saqueo de los recursos públicos.",
  },
];

export const DOCUMENTOS_OFICIALES: DocumentoOficial[] = [
  {
    id: "doc-estatutos",
    titulo: "Estatutos Oficiales del Partido Político Dignidad (#28 TSE)",
    descripcion:
      "Normativa constitutiva inscrita ante el Registro de Ciudadanos del Tribunal Supremo Electoral: órganos de dirección, democracia interna, paridad plurinacional y régimen disciplinario.",
    categoria: "Estatutos",
    fecha: "Octubre 2026",
    paginas: "42 págs.",
    peso: "PDF Oficial",
    urlDescarga: "/docs/estatutos-dignidad-guatemala-tse28.pdf",
  },
  {
    id: "doc-principios",
    titulo: "Declaración de Principios: Por un Estado Plurinacional y el Buen Vivir",
    descripcion:
      "Manifiesto ideológico e histórico del movimiento campesino, indígena y popular que da vida al instrumento político Dignidad Guatemala.",
    categoria: "Ideología",
    fecha: "Octubre 2026",
    paginas: "24 págs.",
    peso: "PDF Oficial",
    urlDescarga: "/docs/declaracion-principios-plurinacionales.pdf",
  },
  {
    id: "doc-plan-2027",
    titulo: "Plan Programático Nacional Rumbo a 2027 (6 Ejes Estratégicos)",
    descripcion:
      "Propuestas legislativas, económicas, agrarias, ambientales y sociales construidas en asambleas departamentales para el período 2027-2031.",
    categoria: "Plan de Gobierno",
    fecha: "Noviembre 2026",
    paginas: "68 págs.",
    peso: "PDF Oficial",
    urlDescarga: "/docs/plan-gobierno-dignidad-2027.pdf",
  },
  {
    id: "doc-boletin-01",
    titulo: "Comunicado TSE #01 — Inscripción Vigente como Partido Político #28",
    descripcion:
      "Resolución y comunicado oficial a las comunidades, medios de comunicación y ciudadanía sobre la inscripción legal y apertura de jornadas departamentales de afiliación.",
    categoria: "Comunicado TSE",
    fecha: "Octubre 2026",
    paginas: "6 págs.",
    peso: "PDF Oficial",
    urlDescarga: "/docs/boletin-oficial-01-inscripcion-tse.pdf",
  },
];
