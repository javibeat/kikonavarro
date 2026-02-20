// Función para manejar el menú hamburguesa
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevenir scroll del body cuando el menú está abierto
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
    // Resetear todos los dropdowns cuando se cierra el menú
    closeAllDropdowns();
  }
}

// Función para cerrar todos los dropdowns
function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('active');
  });
}

// Función para manejar el dropdown
function handleDropdownClick(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const dropdown = event.target.closest('.dropdown');
  if (dropdown) {
    const isActive = dropdown.classList.contains('active');
    // Cerrar todos los dropdowns primero
    closeAllDropdowns();
    // Si no estaba activo, abrirlo
    if (!isActive) {
      dropdown.classList.add('active');
    }
  }
}

// Función para inicializar los event listeners del menú
function initMenuListeners() {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.removeEventListener('click', toggleMenu);
    hamburger.addEventListener('click', toggleMenu);
  }

  // Añadir event listener a todos los dropdown-toggle
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.removeEventListener('click', handleDropdownClick);
    toggle.removeEventListener('touchstart', handleDropdownClick);
    toggle.addEventListener('click', handleDropdownClick);
    toggle.addEventListener('touchstart', handleDropdownClick);
  });

  // Cerrar menú al hacer click en enlaces principales (no del dropdown)
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('dropdown-link')) {
        return;
      }
      
      e.preventDefault(); // Prevenir navegación inmediata
      
      const targetUrl = link.href; // Guardar la URL de destino
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      closeAllDropdowns();
      
      // Navegar después de que termine la transición
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        window.location.href = targetUrl; // Navegar a la página
      }, 300);
    });
  });

  // Cerrar menú al hacer click en enlaces del dropdown
  const dropdownLinks = document.querySelectorAll('.dropdown-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir navegación inmediata
      
      const targetUrl = link.href; // Guardar la URL de destino
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        closeAllDropdowns();
        
        // Navegar después de que termine la transición
        setTimeout(() => {
          document.body.style.overflow = 'auto';
          window.location.href = targetUrl; // Navegar a la página
        }, 300);
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      closeAllDropdowns();
    }
  });

  // Cerrar menú al hacer scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger.classList.contains('active')) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        closeAllDropdowns();
      }, 100);
    }
  });

  // Cerrar menú al hacer resize
  window.addEventListener('resize', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
      closeAllDropdowns();
    }
  });
}

// Si el menú está en el DOM al cargar, inicializar listeners
if (document.getElementById('hamburger')) {
  initMenuListeners();
}

// Exportar la función para poder llamarla tras cargar el menú dinámicamente
window.initMenuListeners = initMenuListeners;

// Función para cerrar el menú (puede ser llamada desde otros lugares)
function closeMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
  closeAllDropdowns();
}