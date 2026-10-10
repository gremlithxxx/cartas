// ================================================================
//  VIDEO PIXELADO (8-BIT) CON CANVAS
// ================================================================
(function setupPixelVideo() {
  const video  = document.getElementById('bgVideo');
  const canvas = document.getElementById('pixelCanvas');
  const ctx    = canvas.getContext('2d');
  const PIXEL_WIDTH = 160;

  function resize() {
    canvas.width  = PIXEL_WIDTH;
    canvas.height = Math.round(PIXEL_WIDTH * (window.innerHeight / window.innerWidth));
  }
  resize();
  window.addEventListener('resize', resize);

  video.addEventListener('loadeddata', () => video.play().catch(() => {}));

  function draw() {
    if (video.readyState >= 2) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
  }
  draw();

  video.addEventListener('error', () => {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
})();


// ================================================================
//  DATOS DE CARTAS
// ================================================================
const suits = [
  { key: 'corazones', symbol: '♥', color: 'suit-red',   nombre: 'Corazones' },
  { key: 'diamantes', symbol: '♦', color: 'suit-red',   nombre: 'Diamantes' },
  { key: 'treboles',  symbol: '♣', color: 'suit-black', nombre: 'Tréboles' },
  { key: 'picas',     symbol: '♠', color: 'suit-black', nombre: 'Picas' }
];

const ranks = [
  { key: '1',  label: '1',  nombre: 'As',    nombreSignificado: 'AS' },
  { key: '2',  label: '2',  nombre: '2',     nombreSignificado: '2' },
  { key: '3',  label: '3',  nombre: '3',     nombreSignificado: '3' },
  { key: '4',  label: '4',  nombre: '4',     nombreSignificado: '4' },
  { key: '5',  label: '5',  nombre: '5',     nombreSignificado: '5' },
  { key: '6',  label: '6',  nombre: '6',     nombreSignificado: '6' },
  { key: '7',  label: '7',  nombre: '7',     nombreSignificado: '7' },
  { key: '8',  label: '8',  nombre: '8',     nombreSignificado: '8' },
  { key: '9',  label: '9',  nombre: '9',     nombreSignificado: '9' },
  { key: '10', label: '10', nombre: '10',    nombreSignificado: '10' },
  { key: 'J',  label: 'J',  nombre: 'Jota',  nombreSignificado: 'JOTA' },
  { key: 'Q',  label: 'Q',  nombre: 'Reina', nombreSignificado: 'REINA' },
  { key: 'R',  label: 'R',  nombre: 'Rey',   nombreSignificado: 'REY' },
  { key: 'A',  label: 'A',  nombre: 'As',    nombreSignificado: 'AS' }
];

const jokers = [
  { key: 'joker-red',   nombre: 'Joker Rojo',  icon: '★' },
  { key: 'joker-black', nombre: 'Joker Negro', icon: '☆' }
];

const significados = {
  '1':  'EL AS REPRESENTA EL INICIO, LA CHISPA DIVINA Y EL POTENCIAL PURO. ANUNCIA NUEVOS COMIENZOS Y OPORTUNIDADES UNICAS.',
  '2':  'EL 2 SIMBOLIZA LA DUALIDAD, EL EQUILIBRIO Y LAS DECISIONES. HABLA DE ASOCIACIONES Y DE ELEGIR.',
  '3':  'EL 3 ES CREACION, CRECIMIENTO Y COLABORACION. INDICA EXPANSION Y AYUDA DE TERCEROS.',
  '4':  'EL 4 REPRESENTA ESTABILIDAD, ESTRUCTURA Y FUNDAMENTOS. PUEDE INDICAR PAUSA O RIGIDEZ.',
  '5':  'EL 5 HABLA DE CONFLICTO, CAMBIO E INESTABILIDAD. DESAFIOS QUE INVITAN A LA TRANSFORMACION.',
  '6':  'EL 6 SIMBOLIZA ARMONIA, EQUILIBRIO Y COMUNICACION. RECONCILIACION Y BUENAS NOTICIAS.',
  '7':  'EL 7 ES INTROSPECCION, ESPIRITUALIDAD Y MISTERIO. INVITA A LA REFLEXION INTERIOR.',
  '8':  'EL 8 REPRESENTA PODER, MOVIMIENTO Y LOGROS. ACCION, ORGANIZACION Y EXITO MATERIAL.',
  '9':  'EL 9 ES PLENITUD, SABIDURIA Y CULMINACION. REALIZACION PERSONAL Y FIN DE CICLO.',
  '10': 'EL 10 SIMBOLIZA EL FIN DE UN CICLO Y EL RENACIMIENTO. CULMINACION Y NUEVOS INICIOS.',
  J:    'LA JOTA (PAJE) REPRESENTA JUVENTUD, MENSAJES Y APRENDIZAJE. CURIOSIDAD Y NUEVOS ESTUDIOS.',
  Q:    'LA REINA SIMBOLIZA INTUICION, CUIDADO Y SABIDURIA EMOCIONAL. LIDERAR CON EL CORAZON.',
  R:    'EL REY REPRESENTA AUTORIDAD, DOMINIO Y MADUREZ. CONTROL, RESPONSABILIDAD Y LIDERAZGO.',
  A:    'EL AS (AL FINAL DEL MAZO) SIMBOLIZA EL CIERRE DEL CICLO Y LA PLENITUD TOTAL. TODO VUELVE A EMPEZAR.',
  'joker-red':   'EL JOKER ROJO REPRESENTA EL CAOS CREATIVO, LA CHISPA IMPREVISTA Y LAS OPORTUNIDADES QUE LLEGAN SIN AVISAR. ES EL COMODIN DEL DESTINO.',
  'joker-black': 'EL JOKER NEGRO REPRESENTA EL MISTERIO, LO OCULTO Y LO INESPERADO. SIMBOLIZA EL LIBRE ALBEDRIO Y LAS CARTAS QUE LA VIDA TE DA SIN PEDIRLAS.'
};

const significadosPalos = {
  corazones: 'PALO DE CORAZONES - AGUA: AMOR Y EMOCIONES.',
  diamantes: 'PALO DE DIAMANTES - TIERRA: DINERO Y TRABAJO.',
  treboles:  'PALO DE TREBOLES - FUEGO: ENERGIA Y ACCION.',
  picas:     'PALO DE PICAS - AIRE: MENTE Y VERDAD.'
};

function getCardByName(fullName) {
  for (const s of suits) {
    for (const r of ranks) {
      if (`${r.nombre} de ${s.nombre}` === fullName) {
        return { type: 'normal', rank: r, suit: s, fullName };
      }
    }
  }
  for (const j of jokers) {
    if (j.nombre === fullName) {
      return { type: 'joker', joker: j, fullName };
    }
  }
  return null;
}


const tiradas = [
  {
    id: 'una-carta',
    nombre: 'TIRADA DE 1 CARTA',
    nivel: 'NIVEL 1 - FACIL',
    como: [
      'SIRVE PARA RESPUESTAS RAPIDAS, CONSEJO DEL DIA O PREGUNTAS DE SI O NO.',
      'BARAJAR BIEN EL MAZO DE POKER Y HAZ UNA PREGUNTA.',
      'EXTRAE UNA SOLA CARTA Y COLOCALA BOCA ARRIBA.',
      'INTERPRETA: ROJO (CORAZONES/DIAMANTES) = SI O ENERGIA POSITIVA. NEGRO (PICAS/TREBOLES) = NO U OBSTACULOS.'
    ],
    posiciones: [
      { num: 1, label: 'RESPUESTA / CONSEJO', significado: 'LA CARTA RESPONDE DIRECTAMENTE TU PREGUNTA O DA EL MENSAJE DEL DIA.' }
    ],
    layout: { cols: 1, rows: 1 }
  },
  {
    id: 'si-no-tres',
    nombre: 'SI / NO (3 CARTAS)',
    nivel: 'NIVEL 1 - FACIL',
    como: [
      'PIENSA EN TU PREGUNTA CERRADA DE SI O NO.',
      'BARAJAR Y SACA TRES CARTAS UNA POR UNA.',
      'COLOCALAS DE IZQUIERDA A DERECHA.',
      'LA PRIMERA ES LA RESPUESTA DIRECTA, LA SEGUNDA MATIZA Y LA TERCERA DA EL CONTEXTO.'
    ],
    posiciones: [
      { num: 1, label: 'RESPUESTA',  significado: 'SI O NO CLARO: ROJO = SI, NEGRO = NO.' },
      { num: 2, label: 'MATIZ',      significado: 'EL "PERO" O CONDICION DE ESA RESPUESTA.' },
      { num: 3, label: 'CONTEXTO',   significado: 'LA ENERGIA QUE RODEA LA SITUACION.' }
    ],
    layout: { cols: 3, rows: 1 }
  },
  {
    id: 'tres-tiempos',
    nombre: 'PASADO, PRESENTE Y FUTURO',
    nivel: 'NIVEL 1 - FACIL',
    como: [
      'PIENSA EN TU SITUACION ACTUAL.',
      'BARAJAR Y SACA TRES CARTAS UNA POR UNA.',
      'COLOCALAS DE IZQUIERDA A DERECHA.',
      'LA PRIMERA HABLA DEL PASADO, LA SEGUNDA DEL PRESENTE Y LA TERCERA DEL FUTURO.'
    ],
    posiciones: [
      { num: 1, label: 'PASADO',   significado: 'LO QUE YA OCURRIO Y TE TRAJO HASTA AQUI.' },
      { num: 2, label: 'PRESENTE', significado: 'LA SITUACION ACTUAL Y TU ENERGIA HOY.' },
      { num: 3, label: 'FUTURO',   significado: 'HACIA DONDE TE DIRIGES SI NO CAMBIAS NADA.' }
    ],
    layout: { cols: 3, rows: 1 }
  },
  {
    id: 'cruz-simple',
    nombre: 'CRUZ SIMPLE',
    nivel: 'NIVEL 2 - INTERMEDIA',
    como: [
      'BARAJAR Y SACA CUATRO CARTAS.',
      'COLOCA LA PRIMERA AL CENTRO (TU ACTITUD).',
      'LA SEGUNDA A LA IZQUIERDA (A FAVOR).',
      'LA TERCERA A LA DERECHA (EN CONTRA).',
      'LA CUARTA ABAJO (CONCLUSION).'
    ],
    posiciones: [
      { num: 1, label: 'ACTITUD',    significado: 'TU POSTURA ANTE EL TEMA.' },
      { num: 2, label: 'A FAVOR',    significado: 'LOS FACTORES QUE TE AYUDAN.' },
      { num: 3, label: 'EN CONTRA',  significado: 'LOS OBSTACULOS O FRENOS.' },
      { num: 4, label: 'CONCLUSION', significado: 'EL RESULTADO PROBABLE.' }
    ],
    layout: { cols: 3, rows: 2, custom: 'cross-simple' }
  },
  {
    id: 'abanico',
    nombre: 'TIRADA DEL ABANICO',
    nivel: 'NIVEL 2 - INTERMEDIA',
    como: [
      'SIRVE PARA ANALIZAR LAS OPCIONES O EL FLUJO DE ENERGIA ALREDEDOR DE UNA DECISION.',
      'SACA CINCO CARTAS Y DISPONLAS EN FORMA DE ABANICO, DE IZQUIERDA A DERECHA.',
      'MUESTRA PASO A PASO COMO EVOLUCIONA UN ASUNTO DE UN EXTREMO A OTRO.',
      'TE PERMITE VER QUE IMPULSA O FRENA EL PROCESO.'
    ],
    posiciones: [
      { num: 1, label: 'INICIO',    significado: 'EL PUNTO DE PARTIDA DEL ASUNTO.' },
      { num: 2, label: 'IMPULSO',   significado: 'LO QUE EMPUJA EL PROCESO HACIA ADELANTE.' },
      { num: 3, label: 'CENTRO',    significado: 'EL NUCLEO DE LA DECISION O EL MOMENTO CLAVE.' },
      { num: 4, label: 'FRENO',     significado: 'LO QUE DETIENE O COMPLICA EL AVANCE.' },
      { num: 5, label: 'RESULTADO', significado: 'EL DESENLACE SI SIGUES ESTE FLUJO.' }
    ],
    layout: { cols: 5, rows: 1, custom: 'abanico' }
  },
  {
    id: 'decisiones',
    nombre: 'TIRADA DE DECISIONES',
    nivel: 'NIVEL 2 - INTERMEDIA',
    como: [
      'PIENSA EN LAS DOS OPCIONES QUE ESTAS CONSIDERANDO.',
      'SACA SEIS CARTAS Y COLOCALAS EN DOS COLUMNAS.',
      'LA COLUMNA IZQUIERDA ES LA OPCION A Y LA DERECHA LA OPCION B.',
      'COMPARA LOS PROS, CONTRAS Y RESULTADOS DE CADA UNA.'
    ],
    posiciones: [
      { num: 1, label: 'OPCION A - PRO',       significado: 'VENTAJA DE LA OPCION A.' },
      { num: 2, label: 'OPCION A - CONTRA',    significado: 'DESVENTAJA DE LA OPCION A.' },
      { num: 3, label: 'OPCION A - RESULTADO', significado: 'DESENLACE SI ELIGES A.' },
      { num: 4, label: 'OPCION B - PRO',       significado: 'VENTAJA DE LA OPCION B.' },
      { num: 5, label: 'OPCION B - CONTRA',    significado: 'DESVENTAJA DE LA OPCION B.' },
      { num: 6, label: 'OPCION B - RESULTADO', significado: 'DESENLACE SI ELIGES B.' }
    ],
    layout: { cols: 2, rows: 3, custom: 'decisiones' }
  },
  {
    id: 'herradura',
    nombre: 'HERRADURA',
    nivel: 'NIVEL 2 - INTERMEDIA',
    como: [
      'SE USA PARA VER UN TEMA EN PROFUNDIDAD.',
      'SACA SIETE CARTAS Y COLOCALAS EN FORMA DE HERRADURA.',
      'DE IZQUIERDA A DERECHA, SIGUIENDO LA CURVA.',
      'CADA POSICION APORTA UNA CAPA DEL ASUNTO.'
    ],
    posiciones: [
      { num: 1, label: 'PASADO',    significado: 'LO QUE QUEDO ATRAS.' },
      { num: 2, label: 'PRESENTE',  significado: 'EL AHORA.' },
      { num: 3, label: 'OCULTO',    significado: 'LO QUE NO VES TODAVIA.' },
      { num: 4, label: 'CONSEJO',   significado: 'LO QUE DEBERIAS HACER.' },
      { num: 5, label: 'ENTORNO',   significado: 'LO QUE TE RODEA.' },
      { num: 6, label: 'DESEO',     significado: 'LO QUE QUIERES EN EL FONDO.' },
      { num: 7, label: 'RESULTADO', significado: 'LO QUE PROBABLEMENTE OCURRA.' }
    ],
    layout: { cols: 7, rows: 1 }
  },
  {
    id: 'cuadrado-9',
    nombre: 'CUADRADO DE 9 CARTAS',
    nivel: 'NIVEL 3 - AVANZADA',
    como: [
      'SIRVE PARA EXPLORAR UN TEMA COMPLEJO CON MAYOR PROFUNDIDAD (TRABAJO, AMOR O DESARROLLO PERSONAL).',
      'SACA NUEVE CARTAS Y COLOCALAS FORMANDO UNA CUADRICULA DE 3x3.',
      'LA CARTA DEL CENTRO REPRESENTA EL NUCLEO O AL CONSULTANTE.',
      'LAS CARTAS QUE LA RODEAN MUESTRAN LAS INFLUENCIAS EXTERNAS, LOS APOYOS Y LOS BLOQUEOS.'
    ],
    posiciones: [
      { num: 1, label: 'PASADO LEJANO',  significado: 'LO QUE YA QUEDO ATRAS.' },
      { num: 2, label: 'INFLUENCIA',     significado: 'LO QUE INFLUYE DESDE ARRIBA.' },
      { num: 3, label: 'FUTURO CERCANO', significado: 'LO QUE VIENE PRONTO.' },
      { num: 4, label: 'APOYO',          significado: 'LO QUE TE SOSTIENE POR LA IZQUIERDA.' },
      { num: 5, label: 'NUCLEO',         significado: 'EL CENTRO DEL TEMA O EL CONSULTANTE.' },
      { num: 6, label: 'BLOQUEO',        significado: 'LO QUE FRENA POR LA DERECHA.' },
      { num: 7, label: 'RAIZ',           significado: 'LA BASE DEL ASUNTO.' },
      { num: 8, label: 'CONSEJO',        significado: 'LO QUE DEBES HACER.' },
      { num: 9, label: 'RESULTADO',      significado: 'EL DESENLACE FINAL.' }
    ],
    layout: { cols: 3, rows: 3, custom: 'cuadrado-9' }
  },
  {
    id: 'cruz-celta',
    nombre: 'CRUZ CELTA',
    nivel: 'NIVEL 3 - AVANZADA',
    como: [
      'ES LA TIRADA MAS CLASICA DEL TAROT.',
      'SACA DIEZ CARTAS Y COLOCALAS EN FORMA DE CRUZ CON UNA COLUMNA AL LADO.',
      'LAS PRIMERAS SEIS VAN EN CRUZ, LAS ULTIMAS CUATRO EN UNA FILA VERTICAL A LA DERECHA.',
      'CADA POSICION RESPONDE A UNA PREGUNTA ESPECIFICA.'
    ],
    posiciones: [
      { num: 1,  label: 'PRESENTE',   significado: 'EL ASUNTO ACTUAL, EL CORAZON DEL TEMA.' },
      { num: 2,  label: 'OBSTACULO',  significado: 'LO QUE SE CRUZA O AYUDA (DEPENDE DE LA CARTA).' },
      { num: 3,  label: 'BASE',       significado: 'LA RAIZ DEL ASUNTO, LO SUBCONSCIENTE.' },
      { num: 4,  label: 'PASADO',     significado: 'LO RECIENTE QUE INFLUYE.' },
      { num: 5,  label: 'META',       significado: 'LO QUE CORONA, TU OBJETIVO CONSCIENTE.' },
      { num: 6,  label: 'FUTURO',     significado: 'LO QUE VIENE EN EL CORTO PLAZO.' },
      { num: 7,  label: 'YO',         significado: 'TU ACTITUD ANTE EL TEMA.' },
      { num: 8,  label: 'ENTORNO',    significado: 'LAS INFLUENCIAS EXTERNAS.' },
      { num: 9,  label: 'ESPERANZAS', significado: 'TUS MIEDOS Y ESPERANZAS.' },
      { num: 10, label: 'RESULTADO',  significado: 'EL DESENLACE FINAL.' }
    ],
    layout: { cols: 6, rows: 4, custom: 'celta' }
  },
  {
    id: 'arbol-vida',
    nombre: 'ARBOL DE LA VIDA',
    nivel: 'NIVEL 3 - AVANZADA',
    como: [
      'BASADA EN EL ARBOL DE LA VIDA DE LA KABALA.',
      'SACA DIEZ CARTAS Y COLOCALAS EN TRES COLUMNAS.',
      'LA COLUMNA IZQUIERDA ES EL PILAR DE LA SEVERIDAD, LA DERECHA EL DE LA MISERICORDIA Y LA CENTRAL EL DEL EQUILIBRIO.'
    ],
    posiciones: [
      { num: 1,  label: 'KETHER',   significado: 'LA CORONA, TU POTENCIAL MAS ALTO.' },
      { num: 2,  label: 'CHOKMAH',  significado: 'LA SABIDURIA, LA FUERZA CREADORA.' },
      { num: 3,  label: 'BINAH',    significado: 'EL ENTENDIMIENTO, LA ESTRUCTURA.' },
      { num: 4,  label: 'CHESED',   significado: 'LA MISERICORDIA, LA EXPANSION.' },
      { num: 5,  label: 'GEBURAH',  significado: 'LA SEVERIDAD, LA DISCIPLINA.' },
      { num: 6,  label: 'TIPHERET', significado: 'LA BELLEZA, EL CORAZON.' },
      { num: 7,  label: 'NETZACH',  significado: 'LA VICTORIA, LA EMOCION.' },
      { num: 8,  label: 'HOD',      significado: 'LA GLORIA, LA MENTE.' },
      { num: 9,  label: 'YESOD',    significado: 'EL FUNDAMENTO, LO SUBCONSCIENTE.' },
      { num: 10, label: 'MALKUTH',  significado: 'EL REINO, LA MANIFESTACION.' }
    ],
    layout: { cols: 5, rows: 5, custom: 'arbol' }
  },
  {
    id: 'romani',
    nombre: 'TIRADA ROMANI',
    nivel: 'NIVEL 4 - MUY AVANZADA',
    como: [
      'UNA LECTURA AMPLIA Y DETALLADA SOBRE LA VIDA GENERAL DEL CONSULTANTE (AMOR, DINERO, ENTORNO Y DESTINO).',
      'TRADICIONALMENTE SE DISTRIBUYEN VARIAS FILAS DE CARTAS (A MENUDO 7 CARTAS POR FILA HASTA COMPLETAR 21).',
      'SE LEEN HISTORIAS CRUZADAS ENTRE LOS PALOS.',
      'CORAZONES: AMOR, EMOCIONES Y RELACIONES.',
      'DIAMANTES: DINERO, NEGOCIOS Y ASUNTOS MATERIALES.',
      'TREBOLES: TRABAJO, CREATIVIDAD, ENERGIA Y ACCION.',
      'PICAS: DESAFIOS, SALUD, MENTE Y CONFLICTOS.'
    ],
    posiciones: [
      { num: 1,  label: 'AMOR',        significado: 'CORAZONES: AMOR, EMOCIONES Y RELACIONES.' },
      { num: 2,  label: 'DINERO',      significado: 'DIAMANTES: DINERO, NEGOCIOS Y ASUNTOS MATERIALES.' },
      { num: 3,  label: 'TRABAJO',     significado: 'TREBOLES: TRABAJO, CREATIVIDAD, ENERGIA Y ACCION.' },
      { num: 4,  label: 'DESAFIOS',    significado: 'PICAS: DESAFIOS, SALUD, MENTE Y CONFLICTOS.' },
      { num: 5,  label: 'PASADO',      significado: 'LO QUE YA QUEDO ATRAS EN TU VIDA.' },
      { num: 6,  label: 'PRESENTE',    significado: 'EL MOMENTO ACTUAL QUE VIVES.' },
      { num: 7,  label: 'FUTURO',      significado: 'HACIA DONDE SE DIRIGE TU DESTINO.' },
      { num: 8,  label: 'ENTORNO',     significado: 'LAS PERSONAS Y CIRCUNSTANCIAS QUE TE RODEAN.' },
      { num: 9,  label: 'DESTINO',     significado: 'EL PROPOSITO O CAMINO QUE TE ESPERA.' },
      { num: 10, label: 'CORAZON',     significado: 'LO QUE TU CORAZON DESEA EN SILENCIO.' },
      { num: 11, label: 'MENTE',       significado: 'LO QUE TU MENTE RACIONALIZA.' },
      { num: 12, label: 'CUERPO',      significado: 'TU ESTADO FISICO Y VITALIDAD.' },
      { num: 13, label: 'FAMILIA',     significado: 'TUS VINCULOS FAMILIARES.' },
      { num: 14, label: 'AMIGOS',      significado: 'TUS ALIANZAS Y AMISTADES.' },
      { num: 15, label: 'TRABAJO HOY', significado: 'TU SITUACION LABORAL ACTUAL.' },
      { num: 16, label: 'DINERO HOY',  significado: 'TU SITUACION ECONOMICA ACTUAL.' },
      { num: 17, label: 'SALUD',       significado: 'TU BIENESTAR FISICO Y MENTAL.' },
      { num: 18, label: 'ESPIRITU',    significado: 'TU CONEXION ESPIRITUAL.' },
      { num: 19, label: 'LECCION',     significado: 'LA LECCION QUE DEBES APRENDER.' },
      { num: 20, label: 'REGALO',      significado: 'EL DON QUE LA VIDA TE OFRECE.' },
      { num: 21, label: 'SINTESIS',    significado: 'EL MENSAJE FINAL DE TODA LA TIRADA.' }
    ],
    layout: { cols: 7, rows: 3, custom: 'romani' }
  }
];


// ================================================================
//  REFERENCIAS DOM
// ================================================================
const decksContainer   = document.getElementById('decksContainer');
const searchInput      = document.getElementById('searchInput');
const stickyMenu       = document.getElementById('stickyMenu');
const stickySearch     = document.getElementById('stickySearchInput');

const tiradasBtn          = document.getElementById('tiradasBtn');
const tiradasDropdown     = document.getElementById('tiradasDropdown');
const stickyTiradasBtn    = document.getElementById('stickyTiradasBtn');
const stickyTiradasDrop   = document.getElementById('stickyTiradasDropdown');

const overlay          = document.getElementById('cardOverlay');
const overlayBack      = document.getElementById('overlayBackdrop');
const bigCard          = document.getElementById('bigCard');
const bigFront         = document.getElementById('bigFront');
const bigBackFace      = document.getElementById('bigBackFace');
const bigBack          = document.getElementById('bigBack');

const tiradaOverlay    = document.getElementById('tiradaOverlay');
const tiradaBackdrop   = document.getElementById('tiradaBackdrop');
const tiradaPanel      = document.getElementById('tiradaPanel');
const tiradaTitle      = document.getElementById('tiradaTitle');
const tiradaInstructions = document.getElementById('tiradaInstructions');
const tiradaBoard      = document.getElementById('tiradaBoard');
const tiradaSummary    = document.getElementById('tiradaSummary');
const closeTiradaBtn   = document.getElementById('closeTiradaBtn');
const resetTiradaBtn   = document.getElementById('resetTiradaBtn');

const pickerOverlay    = document.getElementById('pickerOverlay');
const pickerBackdrop   = document.getElementById('pickerBackdrop');
const pickerGrid       = document.getElementById('pickerGrid');
const pickerSearch     = document.getElementById('pickerSearch');
const pickerSubtitle   = document.getElementById('pickerSubtitle');
const closePickerBtn   = document.getElementById('closePickerBtn');


// ================================================================
//  RENDERIZADO DE CARTAS
// ================================================================
function renderDecks() {
  decksContainer.innerHTML = '';

  suits.forEach(suit => {
    const deck = document.createElement('section');
    deck.className = 'deck';
    const grid = document.createElement('div');
    grid.className = 'deck-grid';

    ranks.forEach(rank => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.suit = suit.key;
      card.dataset.rank = rank.key;
      card.dataset.name = `${rank.nombre} de ${suit.nombre}`;

      card.innerHTML = `
        <div class="corner top">
          <span class="rank ${suit.color}">${rank.label}</span>
          <span class="suit ${suit.color}">${suit.symbol}</span>
        </div>
        <div class="center-suit ${suit.color}">${suit.symbol}</div>
        <div class="corner bottom">
          <span class="rank ${suit.color}">${rank.label}</span>
          <span class="suit ${suit.color}">${suit.symbol}</span>
        </div>
      `;
      card.addEventListener('click', () => openBigCard(rank, suit));
      grid.appendChild(card);
    });
    deck.appendChild(grid);
    decksContainer.appendChild(deck);
  });

  const jokersCategory = document.createElement('div');
  jokersCategory.className = 'jokers-category';

  const jokersLabel = document.createElement('div');
  jokersLabel.className = 'jokers-label';
  jokersLabel.textContent = '★ JOKERS ★';
  jokersCategory.appendChild(jokersLabel);

  const jokersGrid = document.createElement('div');
  jokersGrid.className = 'jokers-grid';

  jokers.forEach(joker => {
    const card = document.createElement('div');
    card.className = 'card joker';
    card.dataset.rank = joker.key;
    card.dataset.name = joker.nombre;

    card.innerHTML = `
      <div class="joker-corner top">J</div>
      <div class="joker-content">
        <div class="joker-icon">${joker.icon}</div>
        <div class="joker-name">${joker.nombre.toUpperCase()}</div>
      </div>
      <div class="joker-corner bottom">J</div>
    `;
    card.addEventListener('click', () => openJokerCard(joker));
    jokersGrid.appendChild(card);
  });
  jokersCategory.appendChild(jokersGrid);
  decksContainer.appendChild(jokersCategory);
}


// ================================================================
//  ABRIR CARTA GRANDE
// ================================================================
function openBigCard(rank, suit) {
  bigCard.classList.remove('flipped');
  bigFront.classList.remove('joker-front');
  bigBackFace.classList.remove('joker-back');

  bigFront.innerHTML = `
    <div class="corner top">
      <span class="rank ${suit.color}">${rank.label}</span>
      <span class="suit ${suit.color}">${suit.symbol}</span>
    </div>
    <div class="center-suit ${suit.color}">${suit.symbol}</div>
    <div class="corner bottom">
      <span class="rank ${suit.color}">${rank.label}</span>
      <span class="suit ${suit.color}">${suit.symbol}</span>
    </div>
  `;

  bigBack.innerHTML = `
    <div class="back-suit">${suit.symbol}</div>
    <h3>${rank.nombreSignificado} DE ${suit.nombre.toUpperCase()}</h3>
    <p>${significados[rank.key]}</p>
    <p>${significadosPalos[suit.key]}</p>
    <p class="keywords">&gt; ${rank.nombreSignificado} · ${suit.nombre.toUpperCase()}</p>
  `;

  overlay.classList.add('active');
  setTimeout(() => bigCard.classList.add('flipped'), 450);
}

function openJokerCard(joker) {
  bigCard.classList.remove('flipped');
  bigFront.classList.add('joker-front');
  bigBackFace.classList.add('joker-back');

  bigFront.innerHTML = `
    <div class="joker-corner top">J</div>
    <div class="joker-big-icon">${joker.icon}</div>
    <div class="joker-big-name">${joker.nombre.toUpperCase()}</div>
    <div class="joker-corner bottom">J</div>
  `;
  bigBack.innerHTML = `
    <div class="back-suit joker-color">★</div>
    <h3 class="joker-color">${joker.nombre.toUpperCase()}</h3>
    <p>${significados[joker.key]}</p>
    <p class="keywords joker-color">&gt; COMODIN · ${joker.nombre.toUpperCase()}</p>
  `;

  overlay.classList.add('active');
  setTimeout(() => bigCard.classList.add('flipped'), 450);
}

function closeOverlay() {
  bigCard.classList.remove('flipped');
  setTimeout(() => overlay.classList.remove('active'), 350);
}

overlayBack.addEventListener('click', closeOverlay);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (overlay.classList.contains('active')) closeOverlay();
    if (pickerOverlay.classList.contains('active')) closePicker();
  }
});


// ================================================================
//  BUSCADOR DE CARTAS
// ================================================================
function filterCards(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
}

searchInput.addEventListener('input', (e) => {
  filterCards(e.target.value);
  stickySearch.value = e.target.value;
});
stickySearch.addEventListener('input', (e) => {
  filterCards(e.target.value);
  searchInput.value = e.target.value;
});


// ================================================================
//  STICKY MENU
// ================================================================
window.addEventListener('scroll', () => {
  if (window.scrollY > 150) stickyMenu.classList.add('visible');
  else stickyMenu.classList.remove('visible');
});


// ================================================================
//  MENÚ TIRADAS (dropdown)
// ================================================================
function buildTiradasDropdown(container) {
  container.innerHTML = '';
  tiradas.forEach(t => {
    const item = document.createElement('div');
    item.className = 'tiradas-item';
    item.innerHTML = `
      ${t.nombre}
      <span class="tirada-nivel">${t.nivel}</span>
    `;
    item.addEventListener('click', () => {
      container.classList.remove('open');
      openTirada(t);
    });
    container.appendChild(item);
  });
}

buildTiradasDropdown(tiradasDropdown);
buildTiradasDropdown(stickyTiradasDrop);

tiradasBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  tiradasDropdown.classList.toggle('open');
  stickyTiradasDrop.classList.remove('open');
});
stickyTiradasBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  stickyTiradasDrop.classList.toggle('open');
  tiradasDropdown.classList.remove('open');
});
document.addEventListener('click', () => {
  tiradasDropdown.classList.remove('open');
  stickyTiradasDrop.classList.remove('open');
});


// ================================================================
//  LÓGICA DE TIRADA
// ================================================================
let tiradaActual = null;
let cartasElegidas = [];
let slotSeleccionado = null;

function openTirada(t) {
  tiradaActual = t;
  cartasElegidas = new Array(t.posiciones.length).fill(null);
  slotSeleccionado = null;

  tiradaTitle.textContent = `▸ ${t.nombre}`;

  tiradaInstructions.innerHTML = t.como
    .map((paso, i) => `<span class="step"><strong>${i + 1}.</strong> ${paso}</span>`)
    .join('');

  renderBoard(t);
  renderSummary();
  tiradaOverlay.classList.add('active');
}

function renderBoard(t) {
  tiradaBoard.innerHTML = '';
  tiradaBoard.dataset.tirada = t.id;

  if (t.layout.custom === 'cross-simple') {
    tiradaBoard.style.gridTemplateColumns = 'repeat(3, minmax(80px, 120px))';
    tiradaBoard.style.gridTemplateRows = 'auto auto';
    tiradaBoard.style.gridTemplateAreas = `
      ". slot3 ."
      "slot2 slot1 slot4"
    `;
    t.posiciones.forEach((pos, i) => {
      const slot = createSlot(pos, i, t);
      const area = ['slot1', 'slot2', 'slot3', 'slot4'][i];
      slot.style.gridArea = area;
      tiradaBoard.appendChild(slot);
    });
  } else if (t.layout.custom === 'celta') {
    tiradaBoard.style.gridTemplateColumns = 'repeat(6, minmax(70px, 100px))';
    tiradaBoard.style.gridTemplateRows = 'repeat(4, auto)';
    const celtaPositions = {
      0: { col: 2, row: 2 },
      1: { col: 2, row: 1 },
      2: { col: 3, row: 1 },
      3: { col: 2, row: 3 },
      4: { col: 2, row: 1 },
      5: { col: 2, row: 4 },
      6: { col: 5, row: 4 },
      7: { col: 5, row: 3 },
      8: { col: 5, row: 2 },
      9: { col: 5, row: 1 }
    };
    t.posiciones.forEach((pos, i) => {
      const slot = createSlot(pos, i, t);
      const p = celtaPositions[i];
      slot.style.gridColumn = p.col;
      slot.style.gridRow = p.row;
      tiradaBoard.appendChild(slot);
    });
  } else if (t.layout.custom === 'arbol') {
    tiradaBoard.style.gridTemplateColumns = 'repeat(5, minmax(60px, 90px))';
    tiradaBoard.style.gridTemplateRows = 'repeat(5, auto)';
    const ordenArbol = [
      { col: 3, row: 1 },
      { col: 4, row: 2 },
      { col: 2, row: 2 },
      { col: 4, row: 3 },
      { col: 2, row: 3 },
      { col: 3, row: 4 },
      { col: 4, row: 5 },
      { col: 2, row: 5 },
      { col: 3, row: 5 },
      { col: 3, row: 5 }
    ];
    t.posiciones.forEach((pos, i) => {
      const slot = createSlot(pos, i, t);
      const p = ordenArbol[i] || { col: 3, row: 5 };
      slot.style.gridColumn = p.col;
      slot.style.gridRow = p.row;
      tiradaBoard.appendChild(slot);
    });
  } else {
    tiradaBoard.style.gridTemplateColumns = `repeat(${t.layout.cols}, minmax(70px, 110px))`;
    tiradaBoard.style.gridTemplateRows = `repeat(${t.layout.rows}, auto)`;
    t.posiciones.forEach((pos, i) => {
      tiradaBoard.appendChild(createSlot(pos, i, t));
    });
  }
}

function createSlot(pos, index, t) {
  const slot = document.createElement('div');
  slot.className = 'tirada-slot';
  slot.dataset.index = index;

  const elegida = cartasElegidas[index];

  if (elegida) {
    const info = getCardByName(elegida);
    slot.classList.add('filled');

    if (info && info.type === 'normal') {
      slot.innerHTML = `
        <span class="slot-pos-num">#${pos.num}</span>
        <div class="slot-card-info">
          <div class="slot-card-rank ${info.suit.color}">${info.rank.label}</div>
          <div class="slot-card-suit ${info.suit.color}">${info.suit.symbol}</div>
          <div class="slot-card-name">${info.rank.nombre}</div>
        </div>
        <span class="slot-label">${pos.label}</span>
      `;
    } else if (info && info.type === 'joker') {
      slot.innerHTML = `
        <span class="slot-pos-num">#${pos.num}</span>
        <div class="slot-card-info">
          <div class="slot-card-rank" style="color:#ff4ac4;">★</div>
          <div class="slot-card-name">JOKER</div>
        </div>
        <span class="slot-label">${pos.label}</span>
      `;
    }
  } else {
    slot.innerHTML = `
      <span class="slot-pos-num">#${pos.num}</span>
      <span class="slot-label">${pos.label}</span>
    `;
  }

  slot.addEventListener('click', () => openPicker(index));
  return slot;
}

function renderSummary() {
  if (!tiradaActual) return;

  tiradaSummary.innerHTML = '';
  tiradaActual.posiciones.forEach((pos, i) => {
    const item = document.createElement('div');
    item.className = 'summary-item';
    const elegida = cartasElegidas[i];

    if (!elegida) {
      item.classList.add('empty');
      item.innerHTML = `
        <span class="summary-pos">#${pos.num} ${pos.label}</span>
        <em>SIN CARTA SELECCIONADA</em>
      `;
    } else {
      const info = getCardByName(elegida);
      let significado = '';
      let paloInfo = '';

      if (info && info.type === 'normal') {
        significado = significados[info.rank.key];
        paloInfo = significadosPalos[info.suit.key];
      } else if (info && info.type === 'joker') {
        significado = significados[info.joker.key];
        paloInfo = 'COMODIN DEL DESTINO.';
      }

      item.innerHTML = `
        <span class="summary-pos">#${pos.num} ${pos.label}</span>
        <span class="summary-card">&gt; ${elegida}</span>
        <p><strong>SIGNIFICADO EN ESTA POSICION:</strong> ${pos.significado}</p>
        <p><strong>CARTA:</strong> ${significado}</p>
        <p><strong>PALO:</strong> ${paloInfo}</p>
      `;
    }

    tiradaSummary.appendChild(item);
  });
}

closeTiradaBtn.addEventListener('click', () => {
  tiradaOverlay.classList.remove('active');
});
tiradaBackdrop.addEventListener('click', () => {
  tiradaOverlay.classList.remove('active');
});

resetTiradaBtn.addEventListener('click', () => {
  if (!tiradaActual) return;
  cartasElegidas = new Array(tiradaActual.posiciones.length).fill(null);
  renderBoard(tiradaActual);
  renderSummary();
});


// ================================================================
//  PICKER DE CARTAS
// ================================================================
function openPicker(index) {
  slotSeleccionado = index;
  const pos = tiradaActual.posiciones[index];
  pickerSubtitle.textContent = `POSICION #${pos.num} - ${pos.label}`;

  buildPickerGrid();
  pickerSearch.value = '';
  pickerOverlay.classList.add('active');
  setTimeout(() => pickerSearch.focus(), 100);
}

function buildPickerGrid() {
  pickerGrid.innerHTML = '';

  suits.forEach(suit => {
    ranks.forEach(rank => {
      const card = document.createElement('div');
      card.className = 'picker-card';
      card.dataset.name = `${rank.nombre} de ${suit.nombre}`;
      card.innerHTML = `
        <div class="pc-rank ${suit.color}">${rank.label}</div>
        <div class="pc-suit ${suit.color}">${suit.symbol}</div>
        <div class="pc-name">${rank.nombre}</div>
      `;
      card.addEventListener('click', () => selectCard(card.dataset.name));
      pickerGrid.appendChild(card);
    });
  });

  jokers.forEach(j => {
    const card = document.createElement('div');
    card.className = 'picker-card joker';
    card.dataset.name = j.nombre;
    card.innerHTML = `
      <div class="pc-rank">★</div>
      <div class="pc-name">${j.nombre}</div>
    `;
    card.addEventListener('click', () => selectCard(card.dataset.name));
    pickerGrid.appendChild(card);
  });
}

function selectCard(fullName) {
  if (slotSeleccionado === null) return;
  cartasElegidas[slotSeleccionado] = fullName;
  closePicker();
  renderBoard(tiradaActual);
  renderSummary();
}

function closePicker() {
  pickerOverlay.classList.remove('active');
  slotSeleccionado = null;
}

closePickerBtn.addEventListener('click', closePicker);
pickerBackdrop.addEventListener('click', closePicker);

pickerSearch.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.picker-card').forEach(c => {
    const n = c.dataset.name.toLowerCase();
    c.style.display = n.includes(q) ? '' : 'none';
  });
});


// ================================================================
//  INIT
// ================================================================
renderDecks();