// ================================================================
//  VIDEO PIXELADO (8-BIT) CON CANVAS
// ================================================================
(function setupPixelVideo() {
  const video  = document.getElementById('bgVideo');
  const canvas = document.getElementById('pixelCanvas');
  const ctx    = canvas.getContext('2d');

  // Resolución "pixelada": mientras más bajo, más 8-bit se ve
  const PIXEL_WIDTH = 160;

  function resize() {
    canvas.width  = PIXEL_WIDTH;
    canvas.height = Math.round(PIXEL_WIDTH * (window.innerHeight / window.innerWidth));
  }
  resize();
  window.addEventListener('resize', resize);

  video.addEventListener('loadeddata', () => {
    video.play().catch(() => {});
  });

  function draw() {
    if (video.readyState >= 2) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Fallback si el video no carga
  video.addEventListener('error', () => {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
})();


// ================================================================
//  DATOS DE LAS CARTAS
// ================================================================
const suits = [
  { key: 'corazones', symbol: '♥', color: 'suit-red',   nombre: 'Corazones' },
  { key: 'diamantes', symbol: '♦', color: 'suit-red',   nombre: 'Diamantes' },
  { key: 'treboles',  symbol: '♣', color: 'suit-black', nombre: 'Tréboles' },
  { key: 'picas',     symbol: '♠', color: 'suit-black', nombre: 'Picas' }
];

const ranks = [
  { key: 'A',  nombre: 'As' },
  { key: '2',  nombre: '2' },
  { key: '3',  nombre: '3' },
  { key: '4',  nombre: '4' },
  { key: '5',  nombre: '5' },
  { key: '6',  nombre: '6' },
  { key: '7',  nombre: '7' },
  { key: '8',  nombre: '8' },
  { key: '9',  nombre: '9' },
  { key: '10', nombre: '10' },
  { key: 'J',  nombre: 'Jota' },
  { key: 'Q',  nombre: 'Reina' },
  { key: 'K',  nombre: 'Rey' }
];

const significados = {
  A:   'EL AS REPRESENTA EL INICIO, LA CHISPA DIVINA Y EL POTENCIAL PURO. ANUNCIA NUEVOS COMIENZOS Y OPORTUNIDADES UNICAS.',
  '2': 'EL 2 SIMBOLIZA LA DUALIDAD, EL EQUILIBRIO Y LAS DECISIONES. HABLA DE ASOCIACIONES Y DE ELEGIR.',
  '3': 'EL 3 ES CREACION, CRECIMIENTO Y COLABORACION. INDICA EXPANSION Y AYUDA DE TERCEROS.',
  '4': 'EL 4 REPRESENTA ESTABILIDAD, ESTRUCTURA Y FUNDAMENTOS. PUEDE INDICAR PAUSA O RIGIDEZ.',
  '5': 'EL 5 HABLA DE CONFLICTO, CAMBIO E INESTABILIDAD. DESAFIOS QUE INVITAN A LA TRANSFORMACION.',
  '6': 'EL 6 SIMBOLIZA ARMONIA, EQUILIBRIO Y COMUNICACION. RECONCILIACION Y BUENAS NOTICIAS.',
  '7': 'EL 7 ES INTROSPECCION, ESPIRITUALIDAD Y MISTERIO. INVITA A LA REFLEXION INTERIOR.',
  '8': 'EL 8 REPRESENTA PODER, MOVIMIENTO Y LOGROS. ACCION, ORGANIZACION Y EXITO MATERIAL.',
  '9': 'EL 9 ES PLENITUD, SABIDURIA Y CULMINACION. REALIZACION PERSONAL Y FIN DE CICLO.',
  '10': 'EL 10 SIMBOLIZA EL FIN DE UN CICLO Y EL RENACIMIENTO. CULMINACION Y NUEVOS INICIOS.',
  J:   'LA JOTA (PAJE) REPRESENTA JUVENTUD, MENSAJES Y APRENDIZAJE. CURIOSIDAD Y NUEVOS ESTUDIOS.',
  Q:   'LA REINA SIMBOLIZA INTUICION, CUIDADO Y SABIDURIA EMOCIONAL. LIDERAR CON EL CORAZON.',
  K:   'EL REY REPRESENTA AUTORIDAD, DOMINIO Y MADUREZ. CONTROL, RESPONSABILIDAD Y LIDERAZGO.'
};

const significadosPalos = {
  corazones: 'PALO DE CORAZONES - ELEMENTO AGUA: EMOCIONES, AMOR Y RELACIONES.',
  diamantes: 'PALO DE DIAMANTES - ELEMENTO TIERRA: DINERO, TRABAJO Y SEGURIDAD.',
  treboles:  'PALO DE TREBOLES - ELEMENTO FUEGO: ENERGIA, CREATIVIDAD Y ACCION.',
  picas:     'PALO DE PICAS - ELEMENTO AIRE: MENTE, COMUNICACION Y VERDAD.'
};


// ================================================================
//  REFERENCIAS DOM
// ================================================================
const grid        = document.getElementById('cardsGrid');
const modal       = document.getElementById('modal');
const modalTitle  = document.getElementById('modalTitle');
const modalBody   = document.getElementById('modalBody');
const closeModal  = document.getElementById('closeModal');
const searchInput = document.getElementById('searchInput');


// ================================================================
//  RENDERIZADO DE CARTAS
// ================================================================
function renderCards() {
  grid.innerHTML = '';
  suits.forEach(suit => {
    ranks.forEach(rank => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.suit = suit.key;
      card.dataset.rank = rank.key;
      card.dataset.name = `${rank.nombre} de ${suit.nombre}`;

      card.innerHTML = `
        <div class="corner top">
          <span class="rank ${suit.color}">${rank.key}</span>
          <span class="suit ${suit.color}">${suit.symbol}</span>
        </div>
        <div class="center-suit ${suit.color}">${suit.symbol}</div>
        <div class="corner bottom">
          <span class="rank ${suit.color}">${rank.key}</span>
          <span class="suit ${suit.color}">${suit.symbol}</span>
        </div>
      `;

      card.addEventListener('click', () => openCard(rank, suit));
      grid.appendChild(card);
    });
  });
}


// ================================================================
//  MODAL
// ================================================================
function openCard(rank, suit) {
  modalTitle.textContent = `${rank.nombre.toUpperCase()} DE ${suit.nombre.toUpperCase()}`;
  modalBody.innerHTML = `
    <p>${significados[rank.key]}</p>
    <p>${significadosPalos[suit.key]}</p>
    <p class="keywords">&gt; PALABRAS CLAVE: ${rank.nombre.toUpperCase()}, ${suit.nombre.toUpperCase()}</p>
  `;
  modal.classList.add('active');
}

closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('active');
});


// ================================================================
//  BUSCADOR
// ================================================================
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
});


// ================================================================
//  INIT
// ================================================================
renderCards();