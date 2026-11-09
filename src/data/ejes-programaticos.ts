export interface PropuestaLegislativa {
  codigo: string;
  titulo: string;
  descripcion: string;
  plazo: "Primeros 100 días" | "Primer Año Legislativo" | "Reforma Estructural 2027-2031";
}

export interface IndicadorImpacto {
  metrica: string;
  etiqueta: string;
  detalle: string;
}

export interface FotoDocumental {
  src: string;
  pieDeFoto: string;
  territorio: string;
}

export interface EjeProgramatico {
  numero: string;
  etiquetaSeccion: string;
  slug: string;
  aliases?: string[];
  titulo: string;
  palabraClaveCursiva: string;
  subtitulo: string;
  resumenCorto: string;
  imagenHero: string;
  pieFotoHero: string;
  galeriaDocumental: FotoDocumental[];
  diagnosticoNacional: {
    RealidadActual: string;
    CausasEstructurales: string[];
    DatosCriticos: { cifra: string; contexto: string }[];
  };
  comparativaModelo: {
    tradicional: string;
    dignidad: string;
  }[];
  propuestasLegislativas: PropuestaLegislativa[];
  impactoComunitario: IndicadorImpacto[];
  testimonioComunitario: {
    cita: string;
    autor: string;
    comunidad: string;
  };
}

export const EJES_PROGRAMATICOS: EjeProgramatico[] = [
  {
    numero: "01",
    etiquetaSeccion: "[01 / TERRITORIO Y AGUA]",
    slug: "defensa-del-territorio-y-agua",
    aliases: ["defensa-territorio-bienes-naturales"],
    titulo: "Defensa del Territorio y Bienes Naturales",
    palabraClaveCursiva: "Madre Agua y bosques comunales",
    subtitulo: "Defensa de tierras comunales, bosques y bienes hídricos frente al despojo extractivista.",
    resumenCorto:
      "Ley Plurinacional del Agua con gestión comunitaria, respeto vinculante a las consultas de buena fe (Convenio 169 OIT) y custodia de nacimientos, cuencas y bosques ancestrales.",
    imagenHero: "/media/social/photos/asamblea-liderazgos-agua.jpg",
    pieFotoHero:
      "Delegación de autoridades y mujeres sosteniendo la proclama 'Madre Agua es un ser vivo con identidad, dignidad, derechos y misiones' · Archivo Dignidad",
    galeriaDocumental: [
      {
        src: "/media/social/photos/asamblea-liderazgos-agua.jpg",
        pieDeFoto: "Encuentro plurinacional por la defensa del agua y los bienes naturales.",
        territorio: "Altiplano Central · Archivo @dignidad100",
      },
      {
        src: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
        pieDeFoto: "Custodia de suelos fértiles y cuencas hídricas en parcelas campesinas.",
        territorio: "San José La Máquina, Suchitepéquez",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "Las cuencas hidrográficas de la Costa Sur, el Oriente Xinka y el Norte Q'eqchi' sufren desvío impune de ríos para monocultivos, contaminación agroindustrial e imposición de proyectos extractivos sin consulta comunitaria previa, libre e informada.",
      CausasEstructurales: [
        "Bloqueo histórico en el Congreso a una Ley General de Aguas que priorice el consumo humano y la agricultura familiar campesina.",
        "Criminalización y persecución judicial contra autoridades ancestrales y comités comunitarios defensores del agua y los bosques.",
        "Otorgamiento de licencias extractivas sin respetar las más de 110 Consultas Comunitarias de Buena Fe realizadas en el país.",
      ],
      DatosCriticos: [
        { cifra: "90%", contexto: "De las fuentes superficiales presentan contaminación o desvío agroindustrial sin sanción." },
        { cifra: "+110", contexto: "Consultas comunitarias de buena fe realizadas por los pueblos que exigen carácter vinculante." },
        { cifra: "33%", contexto: "De la cobertura forestal nacional se conserva gracias al cuidado directo de comunidades indígenas y campesinas." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Ríos desviados por grandes agroindustrias mientras las comunidades rurales carecen de agua entubada.",
        dignidad: "Prioridad constitucional del agua para la vida humana, la milpa campesina y el caudal ecológico de las cuencas.",
      },
      {
        tradicional: "Licencias mineras e hidroeléctricas impuestas desde ministerios sin consultar a los territorios.",
        dignidad: "Carácter vinculante de las Consultas Comunitarias de Buena Fe conforme al Convenio 169 de la OIT.",
      },
      {
        tradicional: "Criminalización de guardabosques y alcaldías indígenas.",
        dignidad: "Reconocimiento jurídico y presupuesto directo para Comités Comunitarios de Agua y Bosques Comunales.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-01",
        titulo: "Ley Plurinacional del Agua y Gestión Comunitaria de Cuencas",
        descripcion:
          "Reconoce a la Madre Agua como bien común público y sujeto de derechos. Garantiza la administración comunitaria del agua y penaliza el desvío y acaparamiento de ríos.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-02",
        titulo: "Ley de Moratoria y Auditoría Socioambiental a Industrias Extractivas",
        descripcion:
          "Suspende nuevas concesiones de minería metálica a cielo abierto y establece auditorías ambientales vinculantes con participación de las asambleas municipales.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-03",
        titulo: "Fondo Directo para Bosques Comunales y Concesiones Forestales Campesinas",
        descripcion:
          "Destina los incentivos forestales del Estado directamente a parcialidades, alcaldías indígenas y concesiones comunitarias en el Altiplano, Verapaces y Petén.",
        plazo: "Reforma Estructural 2027-2031",
      },
    ],
    impactoComunitario: [
      { metrica: "340", etiqueta: "Municipios con Comités de Cuenca", detalle: "Protección legal de nacimientos de agua y zonas de recarga hídrica." },
      { metrica: "100%", etiqueta: "Respeto a Consultas Comunitarias", detalle: "Cumplimiento estricto del Convenio 169 de la OIT." },
      { metrica: "250 mil", etiqueta: "Hectáreas de Bosque Comunal", detalle: "Incentivos directos a guardianes comunitarios del territorio." },
    ],
    testimonioComunitario: {
      cita: "Madre Agua es un ser vivo con identidad, dignidad, derechos y misiones. Defender el río y el bosque comunal es garantizar la vida de nuestras futuras generaciones.",
      autor: "Delegación Plurinacional de Autoridades Comunitarias",
      comunidad: "Asamblea Territorial · Dignidad Guatemala (#28)",
    },
  },
  {
    numero: "02",
    etiquetaSeccion: "[02 / SOBERANÍA ALIMENTARIA]",
    slug: "soberania-alimentaria-y-economia-campesina",
    aliases: ["soberania-alimentaria-reforma-rural"],
    titulo: "Soberanía Alimentaria y Economía Campesina",
    palabraClaveCursiva: "tierra, maíz y precios justos",
    subtitulo: "Apoyo al pequeño productor, mercados locales, crédito rural y reforma agraria integral.",
    resumenCorto:
      "Producimos lo nuestro con dignidad para el Buen Vivir: acceso a tierra, riego comunitario, compras estatales directas a cooperativas campesinas y defensa de semillas criollas.",
    imagenHero: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
    pieFotoHero:
      "Campaña oficial de Soberanía Alimentaria: Producción local, agricultura familiar, alimentos saludables y precios justos · Archivo @dignidad100",
    galeriaDocumental: [
      {
        src: "/media/social/photos/milpa-san-jose-la-maquina.jpg",
        pieDeFoto: "Productor campesino en su parcela de maíz en San José La Máquina, Suchitepéquez.",
        territorio: "Costa Sur · Archivo @dignidad100",
      },
      {
        src: "/media/social/photos/soberania-alimentaria-buen-vivir.jpg",
        pieDeFoto: "Seis pilares de la Soberanía Alimentaria para el Buen Vivir de todos y todas.",
        territorio: "Campaña Nacional Dignidad #28",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "Quienes siembran el maíz, el frijol, el café y las hortalizas con sus propias manos enfrentan caminos destruidos, falta de crédito, acaparamiento de tierras y precios injustos impuestos por intermediarios, mientras la niñez rural sufre desnutrición crónica.",
      CausasEstructurales: [
        "Abandono presupuestario de la agricultura familiar campesina y concentración histórica de la tierra fértil.",
        "Falta de centros de acopio, cadenas de frío comunitarias y caminos rurales transitables durante el invierno.",
        "Exclusión de las cooperativas y pequeños productores del crédito productivo y de las compras públicas del Estado.",
      ],
      DatosCriticos: [
        { cifra: "70%", contexto: "De los alimentos frescos que consume Guatemala provienen de la economía familiar campesina." },
        { cifra: "46.5%", contexto: "De desnutrición crónica infantil nacional que solo se erradicará con soberanía alimentaria local." },
        { cifra: "< 2%", contexto: "Del crédito bancario nacional llega hoy a pequeños agricultores y cooperativas rurales." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Bolsas y fertilizantes clientelares entregados a cambio de votos cada cuatro años.",
        dignidad: "Reforma Rural Integral con tierra, sistemas de riego comunitario, crédito cooperativo al 3% anual y asistencia agroecológica.",
      },
      {
        tradicional: "Campesinos obligados a malvender su cosecha por falta de caminos y mercados directos.",
        dignidad: "Red Nacional de Mercados Campesinos y Compras Estatales Directas para el 100% de la Alimentación Escolar.",
      },
      {
        tradicional: "Intento de privatizar y patentar las semillas nativas de maíz y frijol.",
        dignidad: "Ley de Protección de Semillas Criollas y Nativas como patrimonio inalienable de los pueblos.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-04",
        titulo: "Ley de Reforma Rural Integral y Fondo Nacional de Crédito Campesino",
        descripcion:
          "Crea líneas de financiamiento solidario para cooperativas agrícolas, mujeres productoras y juventudes rurales, democratizando el acceso a la tierra y al riego.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-05",
        titulo: "Ley de Compras Públicas Directas a la Agricultura Familiar y Cooperativa",
        descripcion:
          "Establece que las escuelas públicas, hospitales y comedores comunitarios compren directamente a productores locales del mismo municipio a precios justos.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-06",
        titulo: "Plan Nacional de Caminos Rurales y Centros de Acopio Comunitarios",
        descripcion:
          "Pavimentación y mantenimiento permanente de caminos terciarios ejecutados con veeduría de los COCODES y cooperativas locales.",
        plazo: "Primer Año Legislativo",
      },
    ],
    impactoComunitario: [
      { metrica: "500 mil", etiqueta: "Familias Productoras Apoyadas", detalle: "Con crédito blando, riego comunitario y comercialización justa." },
      { metrica: "3,200 km", etiqueta: "Caminos Rurales Dignificados", detalle: "Conectando aldeas productoras sin sobreprecios ni corrupción." },
      { metrica: "100%", etiqueta: "Alimentación Escolar Local", detalle: "Comprada directamente a agricultores y mujeres de cada municipio." },
    ],
    testimonioComunitario: {
      cita: "Seguimos caminando junto a quienes, con sus manos, siembran esperanza en la milpa y construyen la soberanía alimentaria de nuestras comunidades.",
      autor: "Neydi Juracán & Darwin López Morales",
      comunidad: "Coordinación Campesina CCDA y Bases de San José La Máquina",
    },
  },
  {
    numero: "03",
    etiquetaSeccion: "[03 / ESTADO PLURINACIONAL]",
    slug: "estado-plurinacional-y-pueblos-indigenas",
    aliases: ["estado-plurinacional-justicia-social"],
    titulo: "Estado Plurinacional y Pueblos Indígenas",
    palabraClaveCursiva: "cuatro pueblos en igualdad",
    subtitulo: "Reconocimiento de derechos colectivos y fin del racismo estructural contra los pueblos Maya, Xinka y Garífuna.",
    resumenCorto:
      "Transformar el Estado excluyente en un Estado Plurinacional donde los pueblos Maya, Xinka, Garífuna y Mestizo decidan en paridad el presupuesto, la justicia y el futuro del país.",
    imagenHero: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    pieFotoHero:
      "Jornada masiva de adhesión comunitaria con participación de mujeres indígenas y autoridades locales · Archivo @dignidad100",
    galeriaDocumental: [
      {
        src: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
        pieDeFoto: "Asamblea departamental colmada de mujeres y familias en jornada de adhesión.",
        territorio: "Altiplano Occidental · Archivo @dignidad100",
      },
      {
        src: "/media/social/photos/asamblea-liderazgos-agua.jpg",
        pieDeFoto: "Convergencia de liderazgos indígenas y populares rumbo a 2027.",
        territorio: "Guatemala Plurinacional",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "Guatemala ha sido administrada bajo un modelo colonial y centralista que excluye a los pueblos originarios de las decisiones políticas y concentra la inversión pública lejos de los departamentos con mayor población indígena.",
      CausasEstructurales: [
        "Incumplimiento del Acuerdo sobre Identidad y Derechos de los Pueblos Indígenas (AIDPI) firmado en los Acuerdos de Paz.",
        "Racismo institucional en el acceso a la justicia, el presupuesto fiscal y la representación política.",
        "Desconocimiento estatal hacia el pluralismo jurídico y las alcaldías indígenas ancestrales.",
      ],
      DatosCriticos: [
        { cifra: "4", contexto: "Pueblos conforman la nación guatemalteca: Maya (22 comunidades lingüísticas), Xinka, Garífuna y Mestizo." },
        { cifra: "75%", contexto: "De la población en municipios mayoritariamente indígenas sufre exclusión presupuestaria histórica." },
        { cifra: "50 / 50", contexto: "Meta de paridad plurinacional y de género en todos los cargos de elección y dirección pública." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Instrumentalización folclórica de los pueblos indígenas en campaña y exclusión total en el gobierno.",
        dignidad: "Paridad y alternancia plurinacional y de género en listados electorales, ministerios y órganos de Estado.",
      },
      {
        tradicional: "Sistema judicial monolingüe, inaccesible y subordinado a élites económicas.",
        dignidad: "Reconocimiento constitucional del Pluralismo Jurídico y coordinación respetuosa con Autoridades Ancestrales.",
      },
      {
        tradicional: "Presupuesto nacional concentrado en privilegios urbanos.",
        dignidad: "Presupuesto Equitativo Plurinacional que prioriza a los municipios históricamente marginados.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-07",
        titulo: "Ley de Coordinación del Pluralismo Jurídico y Autoridades Ancestrales",
        descripcion:
          "Armoniza la relación entre el sistema de justicia ordinario y las autoridades indígenas ancestrales de los pueblos Maya, Xinka y Garífuna.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-08",
        titulo: "Reforma a la LEPP para la Democracia Paritaria y Plurinacional",
        descripcion:
          "Garantiza paridad de género y alternancia de pueblos originarios en todas las nóminas de diputados y corporaciones municipales.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-09",
        titulo: "Ley de Equidad Presupuestaria Territorial e Idiomas Nacionales",
        descripcion:
          "Reforma la distribución de la inversión pública para cerrar brechas en municipios indígenas y garantiza atención pública en los 25 idiomas nacionales.",
        plazo: "Reforma Estructural 2027-2031",
      },
    ],
    impactoComunitario: [
      { metrica: "25", etiqueta: "Idiomas Nacionales Activos", detalle: "Salud, justicia y educación en el idioma materno de cada comunidad." },
      { metrica: "50 / 50", etiqueta: "Paridad y Alternancia", detalle: "Protagonismo real de mujeres y pueblos originarios." },
      { metrica: "22", etiqueta: "Departamentos Articulados", detalle: "Descentralización efectiva de recursos hacia las comunidades." },
    ],
    testimonioComunitario: {
      cita: "Descolonizar la política en Guatemala significa acabar con los partidos de caciques y devolver el mandato a las asambleas de los cuatro pueblos.",
      autor: "Sandra Xinico",
      comunidad: "Articulación Departamental · Dignidad Guatemala",
    },
  },
  {
    numero: "04",
    etiquetaSeccion: "[04 / DERECHOS SOCIALES]",
    slug: "salud-educacion-y-trabajo-digno",
    aliases: ["salud-educacion-trabajo-digno"],
    titulo: "Salud, Educación y Trabajo Digno",
    palabraClaveCursiva: "servicios públicos y salario justo",
    subtitulo: "Servicios públicos universales, infraestructura escolar rural y salarios justos.",
    resumenCorto:
      "Puestos de salud abastecidos las 24 horas con pertinencia cultural, escuelas rurales dignas con educación bilingüe intercultural y trabajo con seguridad social en el campo y la ciudad.",
    imagenHero: "/media/social/photos/dialogo-territorial-bases.jpg",
    pieFotoHero:
      "Liderazgos comunitarios dialogando sobre los desafíos sociales y económicos de los municipios rurales · Archivo @dignidad100",
    galeriaDocumental: [
      {
        src: "/media/social/photos/dialogo-territorial-bases.jpg",
        pieDeFoto: "Encuentro de articulación territorial sobre salud, educación y empleo digno.",
        territorio: "Occidente · Archivo @dignidad100",
      },
      {
        src: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
        pieDeFoto: "Participación de familias trabajadoras y juventud en asamblea departamental.",
        territorio: "Altiplano · Archivo @dignidad100",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "Las familias trabajadoras enfrentan hospitales sin medicinas, escuelas rurales deterioradas y salarios de miseria sin cobertura del IGSS, empujando a la juventud a la migración forzada.",
      CausasEstructurales: [
        "Desfinanciamiento crónico y corrupción en las compras del Ministerio de Salud y del Ministerio de Educación.",
        "Monopolios farmacéuticos que imponen los precios de medicamentos más caros de la región.",
        "Incumplimiento del salario mínimo en el campo y exclusión de más del 70% de trabajadores de la seguridad social.",
      ],
      DatosCriticos: [
        { cifra: "72%", contexto: "De la fuerza laboral trabaja en la informalidad sin cobertura de seguridad social." },
        { cifra: "-50%", contexto: "Meta de reducción inmediata en el precio de medicamentos eliminando monopolios." },
        { cifra: "+18,000", contexto: "Escuelas públicas requieren agua potable, remozamiento digno, mobiliario y conectividad." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Puestos de salud cerrados y recetas médicas que las familias deben pagar de su bolsillo a precios inflados.",
        dignidad: "Abastecimiento gratuito al 100%, regulación de precios de medicinas y articulación digna con comadronas ancestrales.",
      },
      {
        tradicional: "Escuelas rurales abandonadas y falta de institutos de secundaria en las aldeas.",
        dignidad: "Inversión del 6% del PIB en Educación Pública Bilingüe Intercultural y ampliación de sedes regionales universitarias.",
      },
      {
        tradicional: "Salarios diferenciados precarios y desprotección de trabajadores agrícolas y de maquila.",
        dignidad: "Salario mínimo vital vinculado a la canasta básica e incorporación progresiva del campesinado al IGSS.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-10",
        titulo: "Ley de Medicamentos Accesibles y Red Primaria de Salud Comunitaria 24/7",
        descripcion:
          "Suprime monopolios en la importación de medicinas, habilita compras abiertas vía organismos internacionales y dignifica la labor de las comadronas.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-11",
        titulo: "Ley de Infraestructura Escolar Rural y Educación Bilingüe Intercultural",
        descripcion:
          "Garantiza institutos de educación básica y diversificada en cada micro-región rural, con alimentación escolar nutritiva comprada a productores locales.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-12",
        titulo: "Ley de Trabajo Digno y Régimen Especial de Seguridad Social Campesina",
        descripcion:
          "Fortalece la inspección laboral contra abusos salariales y crea el seguro social subsidiado para familias campesinas y trabajadores por cuenta propia.",
        plazo: "Reforma Estructural 2027-2031",
      },
    ],
    impactoComunitario: [
      { metrica: "1,500", etiqueta: "Puestos de Salud 24/7", detalle: "Con médicos, enfermería bilingüe, medicamentos y ambulancia." },
      { metrica: "-50%", etiqueta: "Costo de Medicinas", detalle: "Fin a los carteles farmacéuticos y sobreprecios." },
      { metrica: "100%", etiqueta: "Dignificación de Comadronas", detalle: "Reconocimiento legal y estipendio permanente del Estado." },
    ],
    testimonioComunitario: {
      cita: "La salud de nuestra gente, la escuela de la niñez y el salario digno del trabajador son derechos humanos irrenunciables, no favores políticos.",
      autor: "Gabriel Romero Pérez",
      comunidad: "Secretario General Provisional · Dignidad Guatemala",
    },
  },
  {
    numero: "05",
    etiquetaSeccion: "[05 / JUSTICIA Y TRANSPARENCIA]",
    slug: "justicia-y-lucha-anticorrupcion",
    aliases: ["lucha-contra-corrupcion-cooptacion"],
    titulo: "Justicia y Lucha Anticorrupción",
    palabraClaveCursiva: "auditoría comunitaria y cero impunidad",
    subtitulo: "Recuperación de las instituciones públicas, auditoría comunitaria y fin de la impunidad.",
    resumenCorto:
      "Muerte civil perpetua para funcionarios y contratistas corruptos, extinción de dominio a fortunas ilícitas y Comisiones Comunitarias de Auditoría Social con poder vinculante.",
    imagenHero: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
    pieFotoHero:
      "Vocería ciudadana y juvenil desde las asambleas por la transparencia y la recuperación institucional · Archivo @dignidad100",
    galeriaDocumental: [
      {
        src: "/media/social/photos/dialogo-territorial-bases.jpg",
        pieDeFoto: "Dirigencia de base exponiendo los Desafíos Políticos del Futuro frente a la cooptación estatal.",
        territorio: "Archivo Oficial @dignidad100",
      },
      {
        src: "/media/social/photos/asamblea-liderazgos-agua.jpg",
        pieDeFoto: "Autoridades comunitarias organizadas para la fiscalización del presupuesto público.",
        territorio: "Guatemala",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "El presupuesto que debería destinarse a caminos rurales, agua potable, hospitales y escuelas es saqueado mediante obras fantasma, contratos amañados y redes de impunidad que han cooptado el sistema de justicia.",
      CausasEstructurales: [
        "Financiamiento electoral ilícito que hipoteca los gobiernos a favor de contratistas corruptos.",
        "Falta de controles comunitarios vinculantes sobre la ejecución de obras municipales y departamentales.",
        "Cooptación de las cortes y persecución contra operadores de justicia, periodistas y defensores comunitarios.",
      ],
      DatosCriticos: [
        { cifra: "Q30,000M+", contexto: "Drenados anualmente por corrupción, sobreprecios, plazas fantasma y evasión fiscal." },
        { cifra: "Perpetua", contexto: "Inhabilitación (Muerte Civil) para todo funcionario o proveedor condenado por saqueo público." },
        { cifra: "100%", contexto: "De las obras públicas sujetas a Auditoría Social Comunitaria antes de autorizar pagos." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Obras departamentales negociadas en secreto a cambio de sobornos entre diputados y constructoras.",
        dignidad: "Tableros públicos en tiempo real y Comisiones Comunitarias de Auditoría Social con facultad de frenar obras con sobreprecio.",
      },
      {
        tradicional: "Políticos corruptos que reciclan sus candidaturas y empresas de cartón cada elección.",
        dignidad: "Ley de Muerte Civil Político-Administrativa e imprescriptibilidad de los delitos contra el patrimonio público.",
      },
      {
        tradicional: "Justicia selectiva que protege a saqueadores y criminaliza a líderes sociales.",
        dignidad: "Independencia judicial real, carrera judicial por méritos transparentes y cese a la criminalización de la protesta social.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-13",
        titulo: "Ley de Muerte Civil e Imprescriptibilidad de los Delitos de Corrupción",
        descripcion:
          "Inhabilita de por vida para ejercer cargos públicos o contratar con el Estado a toda persona individual o jurídica condenada por corrupción o financiamiento electoral ilícito.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-14",
        titulo: "Ley Nacional de Auditoría Social Comunitaria Vinculante",
        descripcion:
          "Reconoce a las asambleas y comisiones comunitarias de auditoría social la facultad legal de supervisar obras estatales y suspender desembolsos ante anomalías.",
        plazo: "Primeros 100 días",
      },
      {
        codigo: "LEY-2027-15",
        titulo: "Reforma Integral a la Ley de Contrataciones y Fin de Fideicomisos Opacos",
        descripcion:
          "Obliga a publicar los beneficiarios finales reales de toda empresa proveedora del Estado y elimina las compras por excepción sin licitación pública.",
        plazo: "Primer Año Legislativo",
      },
    ],
    impactoComunitario: [
      { metrica: "100%", etiqueta: "Presupuesto Auditable", detalle: "Transparencia total en cada quetzal invertido en tu municipio." },
      { metrica: "Muerte Civil", etiqueta: "A Saqueadores del Estado", detalle: "Cero retorno de corruptos a cargos o contratos públicos." },
      { metrica: "Q15,000M", etiqueta: "Recuperados para el Pueblo", detalle: "Reorientados directamente a salud, educación y desarrollo rural." },
    ],
    testimonioComunitario: {
      cita: "La verdadera lucha contra la corrupción nace cuando las comunidades vigilan cada obra, cada contrato y cada quetzal que pertenece al pueblo.",
      autor: "Comisión de Auditoría Social Comunitaria",
      comunidad: "Dignidad Guatemala · Partido #28 TSE",
    },
  },
  {
    numero: "06",
    etiquetaSeccion: "[06 / UNIDAD POPULAR 2027]",
    slug: "unidad-popular-rumbo-a-2027",
    aliases: ["unidad-popular-alianzas-democraticas"],
    titulo: "Unidad Popular Rumbo a 2027",
    palabraClaveCursiva: "alianza del campo y la ciudad",
    subtitulo: "Política de alianzas con movimientos sociales, juventudes, mujeres y trabajadores.",
    resumenCorto:
      "Un instrumento político sin dueños ni caudillos, puesto al servicio de la unidad de los movimientos campesinos, indígenas, sindicales, estudiantiles, de mujeres y migrantes hacia 2027.",
    imagenHero: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
    pieFotoHero:
      "Asamblea abierta de articulación territorial y adhesión ciudadana al Partido Dignidad (#28 TSE) · Archivo @dignidad100",
    galeriaDocumental: [
      {
        src: "/media/social/photos/jornada-adhesion-comunitaria.jpg",
        pieDeFoto: "Participación masiva de bases comunitarias en jornada de adhesión.",
        territorio: "Archivo Oficial @dignidad100",
      },
      {
        src: "/media/social/photos/voceria-asamblea-afiliacion.jpg",
        pieDeFoto: "Convocatoria abierta a juventudes, trabajadores y comunidades.",
        territorio: "Rumbo a 2027",
      },
    ],
    diagnosticoNacional: {
      RealidadActual:
        "Durante décadas, las élites corruptas gobernaron dividiendo al campo de la ciudad y utilizando partidos-empresa como vehículos de negocios privados. Hoy los pueblos cuentan con su propio instrumento legal: Dignidad (#28 TSE).",
      CausasEstructurales: [
        "Mercantilización de la política donde las casillas a diputados y alcaldes se vendían al mejor postor.",
        "Barreras contra la participación directa de liderazgos comunitarios, mujeres, jóvenes y migrantes.",
        "Falta de un frente amplio que articule la fuerza social de los territorios con la disputa institucional.",
      ],
      DatosCriticos: [
        { cifra: "28°", contexto: "Partido político con registro oficial vigente en el TSE al servicio de la convergencia popular." },
        { cifra: "22", contexto: "Departamentos construyendo asambleas municipales y frentes sociales hacia 2027." },
        { cifra: "2027", contexto: "Elecciones generales donde disputaremos Presidencia, Congreso y Alcaldías con candidaturas legítimas." },
      ],
    },
    comparativaModelo: [
      {
        tradicional: "Partidos con dueño empresarial que imponen candidatos a dedo desde la capital.",
        dignidad: "Democracia comunitaria interna: las asambleas municipales y departamentales eligen a sus candidaturas sin compra de casillas.",
      },
      {
        tradicional: "Desconexión entre las luchas sociales en las calles y la acción legislativa.",
        dignidad: "Frente Amplio Popular que une al movimiento campesino, autoridades indígenas, sindicatos, juventud y sectores urbanos.",
      },
      {
        tradicional: "Abandono político de la comunidad migrante guatemalteca.",
        dignidad: "Voto efectivo en el exterior y creación de la Diputación Migrante en el Congreso de la República.",
      },
    ],
    propuestasLegislativas: [
      {
        codigo: "LEY-2027-16",
        titulo: "Ley de Revocatoria de Mandato y Presupuesto Participativo Municipal",
        descripcion:
          "Permite a los ciudadanos revocar mediante consulta popular el mandato de alcaldes y diputados que traicionen al pueblo, y somete el 40% del presupuesto municipal a decisión de las comunidades.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-17",
        titulo: "Ley de Representación Política de la Diáspora y Diputación Migrante",
        descripcion:
          "Garantiza circunscripción legislativa propia para los guatemaltecos en el extranjero y defensa consular digna.",
        plazo: "Primer Año Legislativo",
      },
      {
        codigo: "LEY-2027-18",
        titulo: "Pacto Plurinacional por la Democracia y el Buen Vivir 2027-2031",
        descripcion:
          "Agenda legislativa y de gobierno común suscrita con organizaciones campesinas, indígenas, estudiantiles, sindicales, de mujeres y pequeños productores.",
        plazo: "Primeros 100 días",
      },
    ],
    impactoComunitario: [
      { metrica: "22", etiqueta: "Frentes Departamentales", detalle: "Articulación viva entre movimientos sociales y estructura partidaria." },
      { metrica: "0", etiqueta: "Compra de Casillas", detalle: "Candidaturas electas por su honestidad y servicio a la comunidad." },
      { metrica: "2027", etiqueta: "Horizonte de Victoria", detalle: "El poder vuelve a las comunidades de Guatemala." },
    ],
    testimonioComunitario: {
      cita: "Adhiérete a Dignidad y sé parte de este camino de transformación. No nacimos en oficinas corporativas: nacimos en los caminos, comunidades y asambleas de Guatemala.",
      autor: "Convocatoria Nacional Plurinacional",
      comunidad: "Dignidad Guatemala · Partido #28 TSE",
    },
  },
];

export function findEjeBySlug(slug: string): EjeProgramatico | undefined {
  return EJES_PROGRAMATICOS.find(
    (eje) => eje.slug === slug || (eje.aliases && eje.aliases.includes(slug))
  );
}
