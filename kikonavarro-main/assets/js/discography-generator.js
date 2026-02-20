class DiscographyGenerator {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      const response = await fetch('assets/data/discography.json');
      this.data = await response.json();
      this.generateAllSections();
    } catch (error) {
      console.error('Error loading discography data:', error);
      // Fallback al contenido existente si falla la carga
    }
  }

  generateAllSections() {
    if (!this.data) return;
    
    this.generateSection('albums', this.data.albums);
    this.generateSection('singles', this.data.singles);
    this.generateSection('remixes', this.data.remixes);
    this.generateSection('compilations', this.data.compilations);
  }

  generateSection(sectionId, items) {
    const container = document.getElementById(sectionId);
    if (!container || !items) return;

    const grid = container.querySelector('.disco-grid');
    if (!grid) return;

    // Limpiar contenido existente
    grid.innerHTML = '';

    // Generar nuevos elementos
    items.forEach(item => {
      const itemElement = this.createDiscoItem(item);
      grid.appendChild(itemElement);
    });
  }

  createDiscoItem(item) {
    const div = document.createElement('div');
    div.className = 'disco-item';
    
    div.innerHTML = `
      <img src="${item.image}" 
           alt="${item.title}" 
           loading="lazy" 
           srcset="${item.image} 1x, ${item.image} 2x" 
           sizes="(max-width: 600px) 100vw, 33vw" />
      <div class="disco-info">
        <h5>${item.title}</h5>
        <p>${item.year}</p>
        <div class="album-links">
          ${this.generatePlatformLinks(item.platforms)}
        </div>
      </div>
    `;
    
    return div;
  }

  generatePlatformLinks(platforms) {
    if (!platforms) return '';
    
    return Object.entries(platforms)
      .map(([platform, url]) => `
        <a href="${url}" 
           target="_blank" 
           class="platform-btn ${platform}" 
           title="${this.getPlatformName(platform)}">
          <img src="assets/icons/${platform}.svg" 
               alt="${this.getPlatformName(platform)}" 
               loading="lazy" 
               srcset="assets/icons/${platform}.svg 1x, assets/icons/${platform}.svg 2x" 
               sizes="24px"/>
        </a>
      `).join('');
  }

  getPlatformName(platform) {
    const names = {
      'spotify': 'Spotify',
      'apple': 'Apple Music',
      'bandcamp': 'Bandcamp',
      'beatport': 'Beatport',
      'traxsource': 'Traxsource',
      'soundcloud': 'SoundCloud'
    };
    return names[platform] || platform;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.disco-grid')) {
    new DiscographyGenerator();
  }
});