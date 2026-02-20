document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-tab');

      galleryItems.forEach(item => {
        // Check both data-year and data-category attributes
        const itemYear = item.getAttribute('data-year');
        const itemCategory = item.getAttribute('data-category');

        const matchesYear = itemYear === filterValue;
        const matchesCategory = itemCategory === filterValue;
        const isAll = filterValue === 'all';

        if (isAll || matchesYear || matchesCategory) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transition = 'opacity 0.5s ease';
          }, 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});