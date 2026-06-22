document.addEventListener('DOMContentLoaded', () => {
  // 1. Accordion Toggle Logic
  initAccordions();

  // 2. Search Logic
  initSearch();
});

/**
 * Initializes Accordions with smooth slide animations.
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.module-accordion');
  
  accordions.forEach(accordion => {
    const header = accordion.querySelector('.module-header');
    const content = accordion.querySelector('.module-content');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isActive = accordion.classList.contains('active');
      
      if (isActive) {
        accordion.classList.remove('active');
        content.style.maxHeight = '0px';
      } else {
        accordion.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Handles real-time search across modules and simulation cards.
 */
function initSearch() {
  const searchInput = document.getElementById('subject-search');
  if (!searchInput) return;

  const accordions = document.querySelectorAll('.module-accordion');
  const emptyState = document.getElementById('no-results-state');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let totalVisibleSims = 0;

    accordions.forEach(accordion => {
      const content = accordion.querySelector('.module-content');
      const simCards = accordion.querySelectorAll('.sim-card');
      let visibleSimsInModule = 0;

      simCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const badge = card.querySelector('.sim-badge-mini').textContent.toLowerCase();
        
        if (title.includes(query) || badge.includes(query)) {
          card.style.display = 'flex';
          visibleSimsInModule++;
          totalVisibleSims++;
        } else {
          card.style.display = 'none';
        }
      });

      // If there are visible simulations in this accordion, show and expand it
      if (visibleSimsInModule > 0) {
        accordion.style.display = 'block';
        if (query.length > 0) {
          accordion.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          // Reset default heights on empty query
          accordion.classList.remove('active');
          content.style.maxHeight = '0px';
        }
      } else {
        accordion.style.display = 'none';
        accordion.classList.remove('active');
        content.style.maxHeight = '0px';
      }
    });

    // Handle empty results display
    if (emptyState) {
      if (totalVisibleSims === 0 && query.length > 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    }
  });
}
