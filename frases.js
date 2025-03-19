// Datos de ejemplo para los pictogramas (puedes cargar estos datos desde un JSON o API)
const pictogramas = [
    { id: 1, nombre: 'Feliz', categoria: 'emociones', imagen: 'recursos/feliz.jpg' },
    { id: 2, nombre: 'Triste', categoria: 'emociones', imagen: 'recursos/triste.png' },
    { id: 3, nombre: 'Correr', categoria: 'acciones', imagen: 'img/correr.png' },
    { id: 4, nombre: 'Silla', categoria: 'objetos', imagen: 'img/silla.png' }
    // Agrega más pictogramas según necesites
  ];
  
  const pictogramGrid = document.getElementById('pictogram-grid');
  const searchInput = document.getElementById('search-input');
  const phraseDisplay = document.getElementById('phrase-display');
  const clearPhraseBtn = document.getElementById('clear-phrase');
  
  function cargarPictogramas() {
    // Limpiar grid
    pictogramGrid.innerHTML = '';
    
    // Obtener el término de búsqueda
    const query = searchInput.value.toLowerCase().trim();
    
    // Filtrar pictogramas según el término de búsqueda (si se ingresa alguno)
    const pictogramasFiltrados = query === ''
      ? pictogramas
      : pictogramas.filter(p => p.nombre.toLowerCase().includes(query));
      
    // Generar elementos para cada pictograma
    pictogramasFiltrados.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('pictogram');
      
      // Se muestra la imagen y el nombre
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <p>${p.nombre}</p>
        <button class="add-button" data-id="${p.id}">Añadir</button>
      `;
      
      // Agregar el pictograma al grid
      pictogramGrid.appendChild(div);
    });
  }
  
  // Función para manejar la acción de "añadir" un pictograma a la frase
  function agregarAPhrase(id) {
    const pictograma = pictogramas.find(p => p.id === id);
    if (pictograma) {
      // Crear un elemento de imagen para agregar a la frase
      const img = document.createElement('img');
      img.src = pictograma.imagen;
      img.alt = pictograma.nombre;
      phraseDisplay.appendChild(img);
    }
  }
  
  // Evento para el botón "Añadir" de cada pictograma (delegación de eventos)
  pictogramGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-button')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      agregarAPhrase(id);
    }
  });
  
  // Evento para filtrar pictogramas al escribir en el buscador
  searchInput.addEventListener('input', () => {
    cargarPictogramas();
  });
  
  // Evento para borrar la frase actual
  clearPhraseBtn.addEventListener('click', () => {
    phraseDisplay.innerHTML = '';
  });
  
  // Cargar pictogramas al inicio
  cargarPictogramas();
  