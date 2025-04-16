// === activities.js : Gestion de la section Activités ===

// Animation à l'apparition des cartes
function initActivityCards() {
  const cards = document.querySelectorAll('.activity-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        entry.target.classList.remove('opacity-0');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    card.classList.add('opacity-0');
    observer.observe(card);
  });
}

// Animation des skills tags
function initSkillTags() {
  const tags = document.querySelectorAll('.skill-tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.classList.add('scale-110');
    });
    tag.addEventListener('mouseleave', () => {
      tag.classList.remove('scale-110');
    });
  });
}

// Expansion des détails
function initActivityDetails() {
  const buttons = document.querySelectorAll('.activity-expand-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const isExpanded = details.classList.contains('max-h-96');
      
      if (isExpanded) {
        details.classList.remove('max-h-96');
        details.classList.add('max-h-0');
        btn.innerHTML = 'Voir plus <i class="fas fa-chevron-down ml-1"></i>';
      } else {
        details.classList.remove('max-h-0');
        details.classList.add('max-h-96');
        btn.innerHTML = 'Voir moins <i class="fas fa-chevron-up ml-1"></i>';
      }
    });
  });
}

// Initialisation
function initActivities() {
  initActivityCards();
  initSkillTags();
  initActivityDetails();
}

window.initActivities = initActivities;

// Gestion des animations au défilement
document.addEventListener('DOMContentLoaded', () => {
    const activityCards = document.querySelectorAll('.activity-card');
    
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer chaque carte d'activité
    activityCards.forEach(card => {
        observer.observe(card);
    });

    // Gestion des boutons "Voir plus"
    const moreButtons = document.querySelectorAll('.btn-more');
    moreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.activity-card');
            const details = card.querySelector('.activity-details');
            const isExpanded = details.classList.contains('expanded');

            if (isExpanded) {
                details.classList.remove('expanded');
                button.textContent = 'Voir plus';
                // Animation de retour en douceur
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                details.classList.add('expanded');
                button.textContent = 'Voir moins';
            }
        });
    });
});

// Fonction pour ajouter dynamiquement une nouvelle activité
function addActivity(title, date, description, details) {
    const activitiesContainer = document.querySelector('#activities .activities-container');
    
    const activityCard = document.createElement('div');
    activityCard.className = 'activity-card';
    
    activityCard.innerHTML = `
        <h3 class="activity-title">${title}</h3>
        <p class="activity-date">${date}</p>
        <p class="activity-description">${description}</p>
        <div class="activity-details">
            ${details}
        </div>
        <button class="btn-more">Voir plus</button>
    `;
    
    activitiesContainer.appendChild(activityCard);
    
    // Réinitialiser les événements pour la nouvelle carte
    const button = activityCard.querySelector('.btn-more');
    button.addEventListener('click', () => {
        const details = activityCard.querySelector('.activity-details');
        const isExpanded = details.classList.contains('expanded');
        
        if (isExpanded) {
            details.classList.remove('expanded');
            button.textContent = 'Voir plus';
        } else {
            details.classList.add('expanded');
            button.textContent = 'Voir moins';
        }
    });
    
    // Ajouter l'animation d'entrée
    requestAnimationFrame(() => {
        activityCard.classList.add('fade-in-up');
    });
} 