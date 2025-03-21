// Ejemplo de datos para pictogramas (puedes reemplazarlo con una llamada a un JSON o base de datos)
const pictogramas = [
  { id: 1, nombre: 'Feliz', categoria: 'emociones', imagen: 'recursos/feliz.jpg' },
  { id: 2, nombre: 'Triste', categoria: 'emociones', imagen: 'recursos/triste.png' },
  { id: 3, nombre: 'Correr', categoria: 'acciones', imagen: 'recursos/correr.png' },
  { id: 4, nombre: 'Silla', categoria: 'objetos', imagen: 'recursos/silla.png' },
  { id: 5, nombre: 'Silencio', categoria: 'acciones', imagen: 'recursos/silencio.png' }
  // Agrega más pictogramas según necesites
];

const pictogramGrid = document.getElementById('pictogram-grid');
const modal = document.getElementById('pictogram-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const closeButton = document.querySelector('.close-button');
const searchBar = document.getElementById('search-bar');

// Elementos para el dropdown de categorías
const pictoDisplay = document.getElementById('picto-display');
const categoryOptionsContainer = document.getElementById('category-options');

let currentCategory = 'todas';

// Función para generar dinámicamente las opciones de categoría
function generarOpcionesCategorias() {
  // Obtener categorías únicas de los pictogramas
  const categories = ['todas', ...new Set(pictogramas.map(p => p.categoria))];
  
  // Limpiar el contenedor
  categoryOptionsContainer.innerHTML = '';
  
  // Crear un botón para cada categoría
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.classList.add('category-button');
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.setAttribute('data-category', cat);
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      // Ocultar el dropdown y cargar los pictogramas filtrados
      categoryOptionsContainer.classList.add('hidden');
      cargarPictogramas();
    });
    categoryOptionsContainer.appendChild(btn);
  });
}

// Función para cargar pictogramas considerando categoría y búsqueda
function cargarPictogramas() {
  pictogramGrid.innerHTML = '';
  const searchQuery = searchBar.value.toLowerCase().trim();
  let pictogramasFiltrados = pictogramas;
  
  // Filtrar por categoría si no es "todas"
  if (currentCategory !== 'todas') {
    pictogramasFiltrados = pictogramasFiltrados.filter(p => p.categoria === currentCategory);
  }
  
  // Filtrar por término de búsqueda
  if (searchQuery !== '') {
    pictogramasFiltrados = pictogramasFiltrados.filter(p => p.nombre.toLowerCase().includes(searchQuery));
  }
  
  pictogramasFiltrados.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('pictogram');
    div.innerHTML = `<img src="${p.imagen}" alt="${p.nombre}"><p>${p.nombre}</p>`;
    div.addEventListener('click', () => abrirModal(p));
    pictogramGrid.appendChild(div);
  });
}

// Función para abrir el modal con detalles
function abrirModal(pictograma) {
  modalImg.src = pictograma.imagen;
  modalName.textContent = pictograma.nombre;
  modal.style.display = 'flex';
}

// Cerrar modal
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Evento de búsqueda: filtrar mientras se escribe
searchBar.addEventListener('input', () => {
  cargarPictogramas();
});

// Al hacer clic en "Pictos" se muestra/oculta el dropdown de categorías
pictoDisplay.addEventListener('click', () => {
  categoryOptionsContainer.classList.toggle('hidden');
});

// Generar opciones de categorías y carga inicial de pictogramas
generarOpcionesCategorias();
cargarPictogramas();


// ... Código existente ...

// Agregar funcionalidad de cambio de tema en index.html
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Cambiar el emoji según el tema: sol para claro, luna para oscuro.
    if (document.body.classList.contains('dark')) {
      themeToggleBtn.textContent = "🌙";
    } else {
      themeToggleBtn.textContent = "☀️";
    }
  });
}

// ... Resto del código existente ...
