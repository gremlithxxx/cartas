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
//  DATOS
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
  A:   'INICIO Y POTENCIAL PURO. NUEVOS COMIENZOS Y OPORTUNIDADES UNICAS.',
  '2': 'DUALIDAD Y EQUILIBRIO. ASOCIACIONES Y DECISIONES IMPORTANTES.',
  '3': 'CREACION Y CRECIMIENTO. EXPANSION Y AYUDA DE TERCEROS.',
  '4': 'ESTABILIDAD Y ESTRUCTURA. PAUSA, CONSOLIDACION O RIGIDEZ.',
  '5': 'CONFLICTO Y CAMBIO. DESAFIOS QUE INVITAN A LA TRANSFORMACION.',
  '6': 'ARMONIA Y COMUNICACION. RECONCILIACION Y BUENAS NOTICIAS.',
  '7': 'INTROSPECCION Y MISTERIO. REFLEXION Y ANALISIS INTERIOR.',
  '8': 'PODER Y LOGROS. ACCION, ORGANIZACION Y EXITO MATERIAL.',
  '9': 'PLENITUD Y SABIDURIA. REALIZACION Y FIN DE CICLO.',
  '10': 'FIN DE CICLO Y RENACIMIENTO. CULMINACION Y NUEVOS INICIOS.',
  J:   'JUVENTUD Y MENSAJES. CURIOSIDAD Y NUEVOS APRENDIZAJES.',
  Q:   'INTUICION Y CUIDADO. SABIDURIA EMOCIONAL Y LIDERAZGO.',
  K:   'AUTORIDAD Y MADUREZ. CONTROL, RESPONSABILIDAD Y LIDERAZGO.'
};

const significadosPalos = {
  corazones: 'AGUA: AMOR Y EMOCIONES.',
  diamantes: 'TIERRA: DINERO Y TRABAJO.',
  treboles:  'FUEGO: ENERGIA Y ACCION.',
  picas:     'AIRE: MENTE Y VERDAD.'
};


// ================================================================
//  REFERENCIAS DOM
// ================================================================
const grid        = document.getElementById('cardsGrid');
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
        <div class="card-inner">

          <!-- CARA FRONTAL -->
          <div class="card-face card-front">
            <div class="corner top">
              <span class="rank ${suit.color}">${rank.key}</span>
              <span class="suit ${suit.color}">${suit.symbol}</span>
            </div>
            <div class="center-suit ${suit.color}">${suit.symbol}</div>
            <div class="corner bottom">
              <span class="rank ${suit.color}">${rank.key}</span>
              <span class="suit ${suit.color}">${suit.symbol}</span>
            </div>
          </div>

          <!-- CARA TRASERA: dorso Bicycle + significado -->
          <div class="card-face card-back">
            <div class="back-content">
              <div class="back-suit ${suit.color}">${suit.symbol}</div>
              <h3>${rank.nombre.toUpperCase()} DE ${suit.nombre.toUpperCase()}</h3>
              <p>${significados[rank.key]}</p>
              <p>${significadosPalos[suit.key]}</p>
            </div>
          </div>

        </div>
      `;

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
      });

      grid.appendChild(card);
    });
  });
}


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