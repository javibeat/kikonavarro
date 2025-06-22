document.addEventListener('DOMContentLoaded', function () {
    const tabsContainer = document.querySelector('.tabs-container');
    
    // Si esta página no tiene pestañas, o si es la de la galería de prensa, no hacemos nada.
    if (!tabsContainer || document.querySelector('.gallery-item')) {
        return;
    }

    const isMobile = () => window.innerWidth <= 768;
    const tabButtons = Array.from(tabsContainer.querySelectorAll('.tab-btn'));
    const tabContents = document.querySelectorAll('.tab-content');
    let currentIndex = tabButtons.findIndex(tab => tab.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    // Lógica para mostrar el contenido de la pestaña
    const showTabContent = (targetId) => {
        const targetContent = document.getElementById(targetId);
        tabContents.forEach(content => content.classList.remove('active'));
        if (targetContent) {
            targetContent.classList.add('active');
        }
    };

    // Lógica para actualizar la vista del carrusel en móvil
    const updateCarouselView = () => {
        const controls = tabsContainer.querySelector('.tab-carousel-controls');
        if (!controls || !isMobile()) return;

        tabButtons.forEach((tab, index) => {
            tab.classList.toggle('active-tab', index === currentIndex);
        });

        const prevBtn = controls.querySelector('.tab-arrow.prev');
        const nextBtn = controls.querySelector('.tab-arrow.next');
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === tabButtons.length - 1;
    };

    // Asignar evento de clic a todos los botones
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentIndex = index;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showTabContent(button.dataset.tab);
            updateCarouselView();
        });
    });

    // Lógica de los botones de flecha del carrusel
    const controls = tabsContainer.querySelector('.tab-carousel-controls');
    if (controls) {
        const prevBtn = controls.querySelector('.tab-arrow.prev');
        const nextBtn = controls.querySelector('.tab-arrow.next');

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) tabButtons[currentIndex - 1].click();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < tabButtons.length - 1) tabButtons[currentIndex + 1].click();
        });
    }

    // Estado inicial
    updateCarouselView();
    window.addEventListener('resize', updateCarouselView);
    if(tabButtons[currentIndex]) {
        tabButtons[currentIndex].click();
    }
}); 