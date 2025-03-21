// Datos de ejemplo para los pictogramas
const pictogramas = [
  { id: 1, nombre: 'Feliz', categoria: 'emociones', imagen: 'recursos/feliz.jpg' },
  { id: 2, nombre: 'Triste', categoria: 'emociones', imagen: 'recursos/triste.png' },
  { id: 3, nombre: 'Correr', categoria: 'acciones', imagen: 'recursos/correr.png' },
  { id: 4, nombre: 'Silla', categoria: 'objetos', imagen: 'recursos/silla.png' },
  { id: 5, nombre: 'Silencio', categoria: 'acciones', imagen: 'recursos/silencio.png' }
  // Agrega más pictogramas según necesites
];

const pictogramGrid = document.getElementById('pictogram-grid');
const searchInput = document.getElementById('search-input');
const phraseDisplay = document.getElementById('phrase-display');
const clearPhraseBtn = document.getElementById('clear-phrase');
const themeToggleBtn = document.getElementById('theme-toggle');

function cargarPictogramas() {
  // Limpiar grid
  pictogramGrid.innerHTML = '';

  // Obtener término de búsqueda
  const query = searchInput.value.toLowerCase().trim();
  const pictogramasFiltrados = query === ''
    ? pictogramas
    : pictogramas.filter(p => p.nombre.toLowerCase().includes(query));

  // Generar elementos para cada pictograma con atributo draggable
  pictogramasFiltrados.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('pictogram');

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" draggable="true" data-id="${p.id}">
      <p>${p.nombre}</p>
      <button class="add-button" data-id="${p.id}">Añadir</button>
    `;
    // Configurar eventos de drag para la imagen
    const img = div.querySelector('img');
    img.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', p.id);
    });
    // También soportar touch (mínimo para disparar el drag)
    img.addEventListener('touchstart', (e) => {
      // Puedes implementar lógica personalizada para touch si se desea
      e.preventDefault();
    });
    pictogramGrid.appendChild(div);
  });
}

// Permitir que el área de frase actúe como drop target
phraseDisplay.addEventListener('dragover', (e) => {
  e.preventDefault();
  phraseDisplay.classList.add('dragover');
});
phraseDisplay.addEventListener('dragleave', () => {
  phraseDisplay.classList.remove('dragover');
});
phraseDisplay.addEventListener('drop', (e) => {
  e.preventDefault();
  phraseDisplay.classList.remove('dragover');
  const id = parseInt(e.dataTransfer.getData('text/plain'));
  agregarAPhrase(id);
});

// Función para agregar pictograma a la frase (si no está ya, o siempre se añade)
function agregarAPhrase(id) {
  const pictograma = pictogramas.find(p => p.id === id);
  if (pictograma) {
    const img = document.createElement('img');
    img.src = pictograma.imagen;
    img.alt = pictograma.nombre;
    // Permitir eliminar el pictograma al hacer clic
    img.addEventListener('click', () => {
      phraseDisplay.removeChild(img);
    });
    phraseDisplay.appendChild(img);
    // Quitar placeholder si existe
    const placeholder = phraseDisplay.querySelector('.placeholder');
    if (placeholder) placeholder.remove();
  }
}

// Delegar evento de "Añadir" en el grid
pictogramGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-button')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    agregarAPhrase(id);
  }
});

// Evento para filtrar pictogramas al escribir
searchInput.addEventListener('input', () => {
  cargarPictogramas();
});

// Botón para borrar la frase
clearPhraseBtn.addEventListener('click', () => {
  phraseDisplay.innerHTML = '<p class="placeholder">Arrastra los pictogramas aquí o pulsa "Añadir"</p>';
});

// Botón para cambiar de tema
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Cargar pictogramas al inicio
cargarPictogramas();
