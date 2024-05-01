document.addEventListener("DOMContentLoaded", function() {
  const containers = document.querySelectorAll('.carousel-container');

  containers.forEach(container => {
    const slides = container.querySelectorAll('.tarjeta-carrusel');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const prevBtn = container.querySelector('.prevBtn');
    const nextBtn = container.querySelector('.nextBtn');

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      console.log('Holas')
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    function updateCarousel() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
    }
  });
});
