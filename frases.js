// Datos de ejemplo para los pictogramas
const pictogramas = [
  { id: 1, nombre: 'Feliz', categoria: 'emociones', imagen: 'recursos/feliz.jpg' },
  { id: 2, nombre: 'Triste', categoria: 'emociones', imagen: 'recursos/triste.png' },
  { id: 3, nombre: 'Correr', categoria: 'acciones', imagen: 'recursos/correr.png' },
  { id: 4, nombre: 'Silla', categoria: 'objetos', imagen: 'recursos/silla.png' },
  { id: 5, nombre: 'Silencio', categoria: 'acciones', imagen: 'recursos/silencio.png' },
  { id: 7, nombre: 'Rojo', categoria: 'objetos', imagen: 'recursos/rojo.png' },
  { id: 8, nombre: 'Azul', categoria: 'colores', imagen: 'recursos/azul.png' }
  // Agrega más pictogramas según necesites
];

const pictogramGrid = document.getElementById('pictogram-grid');
const searchInput = document.getElementById('search-input');
const phraseDisplay = document.getElementById('phrase-display');
const clearPhraseBtn = document.getElementById('clear-phrase');
const themeToggleBtn = document.getElementById('theme-toggle');
const readPhraseBtn = document.getElementById('read-phrase');

function cargarPictogramas() {
  pictogramGrid.innerHTML = '';
  const query = searchInput.value.toLowerCase().trim();
  const pictogramasFiltrados = query === ''
    ? pictogramas
    : pictogramas.filter(p => p.nombre.toLowerCase().includes(query));
    
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
    img.addEventListener('touchstart', (e) => {
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

// Función para agregar pictograma a la frase con animación bounce
function agregarAPhrase(id) {
  const pictograma = pictogramas.find(p => p.id === id);
  if (pictograma) {
    const img = document.createElement('img');
    img.src = pictograma.imagen;
    img.alt = pictograma.nombre;
    img.classList.add('added-bounce'); // Añade la animación
    // Permitir eliminar el pictograma al hacer clic
    img.addEventListener('click', () => {
      phraseDisplay.removeChild(img);
    });
    phraseDisplay.appendChild(img);
    const placeholder = phraseDisplay.querySelector('.placeholder');
    if (placeholder) placeholder.remove();
    // Quitar la clase de animación tras 500ms
    setTimeout(() => {
      img.classList.remove('added-bounce');
    }, 500);
    // Opcional: vibrar el dispositivo (si es compatible)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }
}

// Delegar evento para botón "Añadir" en el grid
pictogramGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-button')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    agregarAPhrase(id);
  }
});

searchInput.addEventListener('input', () => {
  cargarPictogramas();
});

clearPhraseBtn.addEventListener('click', () => {
  phraseDisplay.innerHTML = '<p class="placeholder">Arrastra los pictogramas aquí o pulsa "Añadir"</p>';
});

// Botón para cambiar de tema
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggleBtn.textContent = "🌙";
  } else {
    themeToggleBtn.textContent = "☀️";
  }
});

// Funcionalidad para leer la frase con síntesis de voz
readPhraseBtn.addEventListener('click', () => {
  const images = phraseDisplay.querySelectorAll('img');
  if (images.length > 0) {
    let phraseText = '';
    images.forEach(img => {
      phraseText += img.alt + ' ';
    });
    const utterance = new SpeechSynthesisUtterance(phraseText);
    window.speechSynthesis.speak(utterance);
  }
});

// Cargar pictogramas al inicio
cargarPictogramas();
