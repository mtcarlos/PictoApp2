// Ejemplo de datos para pictogramas (puedes reemplazarlo con una llamada a un JSON o base de datos)
const pictogramas = [
    { id: 1, nombre: 'Feliz', categoria: 'emociones', imagen: 'recursos/feliz.jpg' },
    { id: 2, nombre: 'Triste', categoria: 'emociones', imagen: 'recursos/triste.png' },
    { id: 3, nombre: 'Correr', categoria: 'acciones', imagen: 'img/correr.png' },
    { id: 4, nombre: 'Silla', categoria: 'objetos', imagen: 'img/silla.png' }
    // Agrega más pictogramas según necesites
  ];
  
  const pictogramGrid = document.getElementById('pictogram-grid');
  const categoryButtons = document.querySelectorAll('#category-menu button');
  const modal = document.getElementById('pictogram-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const closeButton = document.querySelector('.close-button');
  const searchBar = document.getElementById('search-bar');
  
  let currentCategory = 'todas';
  
  // Función para cargar pictogramas considerando categoría y búsqueda
  function cargarPictogramas() {
    pictogramGrid.innerHTML = '';
    const searchQuery = searchBar.value.toLowerCase().trim();
  
    let pictogramasFiltrados = pictogramas;
  
    // Filtrar por categoría si no se ha seleccionado "todas"
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
  
  // Cambio de categoría
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar clase activa de todos y asignarla al seleccionado
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      cargarPictogramas();
    });
  });
  
  // Evento de búsqueda: filtrar mientras se escribe
  searchBar.addEventListener('input', () => {
    cargarPictogramas();
  });
  
  // Carga inicial de todos los pictogramas
  cargarPictogramas();

  

