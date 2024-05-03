document.addEventListener("DOMContentLoaded", function() {
  const containers = document.querySelectorAll('.carousel-container');

  containers.forEach(container => {
    const carousel = new bootstrap.Carousel(container.querySelector('.carousel')); // Inicializar el carrusel con las funciones de Bootstrap
  });
});