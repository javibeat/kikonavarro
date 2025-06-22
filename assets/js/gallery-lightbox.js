// Variables globales para el estado del lightbox
let lightboxImages = [];
let currentImageIndex = 0;
const lightboxOverlay = document.getElementById('lightbox-overlay') || document.getElementById('lightbox'); // Compatibilidad con ambos IDs

function setupLightbox(imageElements) {
  lightboxImages = imageElements;

  if (lightboxImages.length === 0) {
    if (lightboxOverlay) lightboxOverlay.style.display = 'none';
    return;
  }

  lightboxImages.forEach((img, index) => {
    // Limpiar listeners antiguos para evitar duplicados
    const newImg = img.cloneNode(true);
    img.parentNode.replaceChild(newImg, img);
    
    newImg.addEventListener('click', () => {
      currentImageIndex = index;
      showLightbox(newImg.src);
    });
  });
}

function showLightbox(src) {
  if (!lightboxOverlay) return;
  const lightboxImg = lightboxOverlay.querySelector('.lightbox-content') || lightboxOverlay.querySelector('.lightbox-img') || document.getElementById('lightbox-img');
  
  lightboxImg.src = src;
  lightboxOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideLightbox() {
  if (!lightboxOverlay) return;
  lightboxOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
  showLightbox(lightboxImages[currentImageIndex].src);
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
  showLightbox(lightboxImages[currentImageIndex].src);
}

// Lógica de inicialización y eventos
document.addEventListener('DOMContentLoaded', () => {
  if (!lightboxOverlay) return;
  
  const closeBtn = lightboxOverlay.querySelector('.lightbox-close') || lightboxOverlay.querySelector('.close');
  const nextBtns = lightboxOverlay.querySelectorAll('.lightbox-next') || lightboxOverlay.querySelectorAll('.next');
  const prevBtns = lightboxOverlay.querySelectorAll('.lightbox-prev') || lightboxOverlay.querySelectorAll('.prev');

  if (closeBtn) closeBtn.addEventListener('click', hideLightbox);
  nextBtns.forEach(btn => btn.addEventListener('click', showNextImage));
  prevBtns.forEach(btn => btn.addEventListener('click', showPrevImage));
  
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      hideLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay.style.display !== 'flex') return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });
});

// Exponer la función de setup para que tabs.js pueda llamarla
window.setupLightbox = setupLightbox;