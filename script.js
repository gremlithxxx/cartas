// ===== Datos =====
const suits = [
  { key: 'corazones', symbol: '♥', color: 'suit-red',   nombre: 'Corazones' },
  { key: 'diamantes', symbol: '♦', color: 'suit-red',   nombre: 'Diamantes' },
  { key: 'treboles',  symbol: '♣', color: 'suit-black', nombre: 'Tréboles' },
  { key: 'picas',     symbol: '♠', color: 'suit-black', nombre: 'Picas' }
];

const ranks = [
  { key: 'A',  nombre: 'As',    valor: '1' },
  { key: '2',  nombre: '2',     valor: '2' },
  { key: '3',  nombre: '3',     valor: '3' },
  { key: '4',  nombre: '4',     valor: '4' },
  { key: '5',  nombre: '5',     valor: '5' },
  { key: '6',  nombre: '6',     valor: '6' },
  { key: '7',  nombre: '7',     valor: '7' },
  { key: '8',  nombre: '8',     valor: '8' },
  { key: '9',  nombre: '9',     valor: '9' },
  { key: '10', nombre: '10',    valor: '10' },
  { key: 'J',  nombre: 'Jota',  valor: 'J' },
  { key: 'Q',  nombre: 'Reina', valor: 'Q' },
  { key: 'K',  nombre: 'Rey',   valor: 'K' }
];

const significados = {
  A:   'El As representa el inicio, la chispa divina y el potencial puro. En el tarot anuncia nuevos comienzos y oportunidades únicas.',
  '2': 'El 2 simboliza la dualidad, el equilibrio y las decisiones. Habla de asociaciones, parejas y la necesidad de elegir.',
  '3': 'El 3 es creación, crecimiento y colaboración. Indica expansión, proyectos que florecen y ayuda de terceros.',
  '4': 'El 4 representa estabilidad, estructura y fundamentos. Puede indicar pausa, consolidación o rigidez.',
  '5': 'El 5 habla de conflicto, cambio e inestabilidad. Es una carta de desafíos que invitan a la transformación.',
  '6': 'El 6 simboliza armonía, equilibrio y comunicación. Indica reconciliación, viajes y buenas noticias.',
  '7': 'El 7 es introspección, espiritualidad y misterio. Invita a la reflexión y al análisis interior.',
  '8': 'El 8 representa poder, movimiento y logros. Habla de acción, organización y éxito material.',
  '9': 'El 9 es plenitud, sabiduría y culminación. Indica realización personal y casi el final de un ciclo.',
  '10': 'El 10 simboliza el fin de un ciclo, la totalidad y el renacimiento. Habla de culminación y nuevos inicios.',
  J:   'La Jota (o Paje) representa juventud, mensajes y aprendizaje. Indica curiosidad, noticias y nuevos estudios.',
  Q:   'La Reina simboliza intuición, cuidado y sabiduría emocional. Habla de nutrir, comprender y liderar con el corazón.',
  K:   'El Rey representa autoridad, dominio y madurez. Habla de control, responsabilidad y liderazgo firme.'
};

const significadosPalos = {
  corazones: 'El palo de Corazones se asocia con el elemento Agua: emociones, amor, relaciones y sentimientos.',
  diamantes: 'El palo de Diamantes se asocia con el elemento Tierra: dinero, trabajo, materia y seguridad.',
  treboles:  'El palo de Tréboles se asocia con el elemento Fuego: energía, creatividad, acción y crecimiento.',
  picas:     'El palo de Picas se asocia con el elemento Aire: mente, comunicación, conflictos y verdad.'
};

// ===== Referencias DOM =====
const grid        = document.getElementById('cardsGrid');
const modal       = document.getElementById('modal');
const modalTitle  = document.getElementById('modalTitle');
const modalBody   = document.getElementById('modalBody');
const closeModal  = document.getElementById('closeModal');
const searchInput = document.getElementById('searchInput');

// ===== Renderizado =====
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

// ===== Modal =====
function openCard(rank, suit) {
  modalTitle.textContent = `${rank.nombre} de ${suit.nombre}`;
  modalBody.innerHTML = `
    <p>${significados[rank.key]}</p>
    <p>${significadosPalos[suit.key]}</p>
    <p class="keywords">Palabras clave: ${rank.nombre}, ${suit.nombre}, ${suit.symbol}</p>
  `;
  modal.classList.add('active');
}

closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// ===== Buscador =====
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
});

// ===== Iniciar =====
renderCards();