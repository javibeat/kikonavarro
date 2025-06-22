document.addEventListener('DOMContentLoaded', function () {
    const controls = document.querySelector('.tab-carousel-controls');
    if (!controls) return; // Si no hay carrusel, no hacemos nada.

    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
        tabContent.classList.add('active');
    }

    const isMobile = () => window.innerWidth <= 768;
    const prevBtn = controls.querySelector('.tab-arrow.prev');
    const nextBtn = controls.querySelector('.tab-arrow.next');
    const tabButtons = Array.from(controls.querySelectorAll('.tab-btn'));
    let currentIndex = tabButtons.findIndex(tab => tab.classList.contains('active'));

    const updateCarouselView = () => {
        if (!isMobile()) return;
        tabButtons.forEach((tab, index) => {
            tab.classList.toggle('active-tab', index === currentIndex);
        });
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === tabButtons.length - 1;
    };

    const filterItems = (category) => {
        const items = document.querySelectorAll('.gallery-item');
        let visibleImages = [];
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-year');
            const shouldBeVisible = category === 'all' || category === itemCategory;
            item.classList.toggle('hidden', !shouldBeVisible);
            if (shouldBeVisible) visibleImages.push(item.querySelector('img'));
        });
        if (window.setupLightbox) window.setupLightbox(visibleImages);
    };

    tabButtons.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            tabButtons.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateCarouselView();
            filterItems(tab.getAttribute('data-tab'));
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) tabButtons[currentIndex - 1].click();
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < tabButtons.length - 1) tabButtons[currentIndex + 1].click();
    });

    // Estado inicial
    updateCarouselView();
    window.addEventListener('resize', updateCarouselView);
    if (tabButtons.length > 0) {
        if (currentIndex === -1) currentIndex = 0;
        tabButtons[currentIndex].click();
    }
}); 