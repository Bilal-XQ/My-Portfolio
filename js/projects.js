console.log('projects.js chargé');
// === projects.js : Gestion des projets du portfolio ===

// Structure de données avec placeholders et catégories distinctes
const projects = [
  // Projets Originaux
  {
    id: 1,
    title: "Portfolio Web Personnel",
    type: "original",
    description: "Mon site portfolio personnel, développé de A à Z pour présenter mon parcours et mes compétences.",
    images: ["placeholder1.png"],
    tags: ["HTML", "CSS", "JavaScript"],
    github: "#",
    live: "#",
    details: "Projet en développement. Bientôt disponible !",
    status: "In Development"
  },
  {
    id: 2,
    title: "Projet Original - Coming Soon",
    type: "original",
    description: "Un nouveau projet original sera bientôt ajouté ici.",
    images: ["placeholder2.png"],
    tags: ["À venir"],
    github: "#",
    live: "#",
    details: "Restez à l'écoute pour plus de projets personnels !",
    status: "Coming Soon"
  },
  // Projets assistés par IA
  {
    id: 3,
    title: "AI Art Generator (Coming Soon)",
    type: "ai",
    description: "Application web utilisant des modèles d'IA pour générer des images artistiques.",
    images: ["placeholder2.png"],
    tags: ["Python", "API", "AI", "Stable Diffusion"],
    github: "#",
    live: "#",
    details: "Projet en cours de développement avec l'aide de modèles d'intelligence artificielle.",
    status: "In Development"
  },
  {
    id: 4,
    title: "Projet IA - Coming Soon",
    type: "ai",
    description: "Un nouveau projet assisté par IA sera bientôt ajouté ici.",
    images: ["placeholder3.png"],
    tags: ["À venir"],
    github: "#",
    live: "#",
    details: "Restez à l'écoute pour plus de projets IA !",
    status: "Coming Soon"
  },
];

// 1. Carrousel d'images pour chaque projet
function initProjectCarousels() {
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    const imgs = carousel.querySelectorAll('img');
    let current = 0;
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    function showImage(idx) {
      imgs.forEach((img, i) => {
        img.style.display = i === idx ? 'block' : 'none';
      });
    }
    showImage(current);
    if (prevBtn) prevBtn.onclick = () => { current = (current - 1 + imgs.length) % imgs.length; showImage(current); };
    if (nextBtn) nextBtn.onclick = () => { current = (current + 1) % imgs.length; showImage(current); };
  });
}

// 2. Zoom sur image au clic
function initImageZoom() {
  document.querySelectorAll('.project-carousel img').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
      modal.innerHTML = `<img src="${img.src}" class="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl animate-fade-in" alt="Zoom projet">`;
      modal.onclick = () => document.body.removeChild(modal);
      document.body.appendChild(modal);
    });
  });
}

// 3. Système de filtres (projets originaux / IA)
function initProjectFilters() {
  const container = document.querySelector('#projects-list');
  if (!container) return;
  let filterBar = document.getElementById('projects-filter-bar');
  if (!filterBar) {
    filterBar = document.createElement('div');
    filterBar.id = 'projects-filter-bar';
    filterBar.className = 'flex justify-center mb-8 gap-4';
    filterBar.innerHTML = `
      <button class="project-filter-btn active px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold transition" data-type="all">Tous</button>
      <button class="project-filter-btn px-4 py-2 rounded-lg bg-gray-800 text-blue-400 font-semibold transition" data-type="original">Projets Originaux</button>
      <button class="project-filter-btn px-4 py-2 rounded-lg bg-gray-800 text-blue-400 font-semibold transition" data-type="ai">Projets IA</button>
    `;
    container.parentNode.insertBefore(filterBar, container);
  }
  filterBar.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.onclick = () => {
      filterBar.querySelectorAll('.project-filter-btn').forEach(b => b.classList.remove('active', 'bg-blue-700', 'text-white'));
      btn.classList.add('active', 'bg-blue-700', 'text-white');
      displayProjects(btn.dataset.type);
    };
  });
}

// 4. Modale de détails projet
function showProjectModal(project) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-gray-900 rounded-2xl p-8 max-w-lg w-full relative animate-fade-in">
      <button class="absolute top-2 right-2 text-blue-400 hover:text-blue-200 text-2xl font-bold close-modal">&times;</button>
      <h3 class="text-2xl font-bold mb-2 text-blue-300">${project.title}</h3>
      <div class="flex gap-2 mb-4 flex-wrap">${project.tags.map(tag => `<span class="skill-badge">${tag}</span>`).join('')}</div>
      <p class="mb-4 text-gray-200">${project.details}</p>
      <div class="flex gap-4">
        <a href="${project.github}" target="_blank" class="btn btn-secondary">GitHub</a>
        <a href="${project.live}" target="_blank" class="btn btn-primary">Site en ligne</a>
      </div>
    </div>
  `;
  modal.querySelector('.close-modal').onclick = () => document.body.removeChild(modal);
  modal.onclick = e => { if (e.target === modal) document.body.removeChild(modal); };
  document.body.appendChild(modal);
}

// 5. Lazy loading pour images projets
function lazyLoadProjectImages() {
  document.querySelectorAll('.project-carousel img[data-src]').forEach(img => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '100px' });
      observer.observe(img);
    } else {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}

// 6. Gestion des liens GitHub et site live (ouvre dans un nouvel onglet)
function initProjectLinks() {
  document.querySelectorAll('.project-card .btn-primary, .project-card .btn-secondary').forEach(btn => {
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}

// 8. Transitions animées entre projets (GSAP)
function animateProjectTransition() {
  if (window.gsap) {
    gsap.from('.project-card', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }
}

// 9. Responsive : ajustements pour cartes projets
function responsiveProjectCards() {
  function adjust() {
    document.querySelectorAll('.project-card').forEach(card => {
      if (window.innerWidth < 700) {
        card.style.minWidth = '100%';
      } else {
        card.style.minWidth = '';
      }
    });
  }
  window.addEventListener('resize', adjust);
  adjust();
}

// 10. Loading state pour images projets
function showProjectImageLoading() {
  document.querySelectorAll('.project-carousel img').forEach(img => {
    img.addEventListener('load', () => {
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    });
    img.classList.add('transition-opacity', 'duration-500', 'opacity-0');
  });
}

// Affichage dynamique des projets selon le filtre
function displayProjects(type = 'all') {
  const container = document.getElementById('projects-list');
  if (!container) return;
  container.innerHTML = '';
  let filtered = projects;
  if (type === 'original') filtered = projects.filter(p => p.type === 'original');
  if (type === 'ai') filtered = projects.filter(p => p.type === 'ai');
  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card card-hover mb-8 bg-gray-900 border border-blue-900 rounded-xl shadow-blue-glow transition duration-300 hover:scale-105';
    card.innerHTML = `
      <div class="project-carousel relative mb-4">
        ${project.images.map((img, i) => `
          <img src="${img}" alt="${project.title} image ${i+1}" style="display:${i === 0 ? 'block' : 'none'};cursor:zoom-in;" loading="lazy">
        `).join('')}
        <button class="carousel-btn prev absolute left-2 top-1/2 -translate-y-1/2 bg-blue-900">&#8592;</button>
        <button class="carousel-btn next absolute right-2 top-1/2 -translate-y-1/2 bg-blue-900">&#8594;</button>
        <span class="absolute top-2 right-2 bg-blue-700 text-white text-xs px-3 py-1 rounded-full shadow">${project.status}</span>
      </div>
      <div class="project-title text-lg font-bold mb-2 text-blue-300 flex items-center gap-2">${project.title}</div>
      <div class="project-desc text-gray-300 mb-2">${project.description}</div>
      <div class="project-tags flex flex-wrap mb-2">${project.tags.map(tag => `<span class="skill-badge">${tag}</span>`).join('')}</div>
      <div class="flex gap-3 mb-2">
        <a href="${project.github}" class="btn btn-secondary">GitHub</a>
        <a href="${project.live}" class="btn btn-primary">Site</a>
        <button class="btn btn-cv ml-auto details-btn">Détails</button>
      </div>
    `;
    card.querySelector('.details-btn').onclick = () => showProjectModal(project);
    container.appendChild(card);
  });
  // Réinitialiser les fonctionnalités après affichage
  initProjectCarousels();
  initImageZoom();
  lazyLoadProjectImages();
  initProjectLinks();
  showProjectImageLoading();
  animateProjectTransition();
  responsiveProjectCards();
}

// Instructions pour ajouter de vrais projets
function showProjectInstructions() {
  const container = document.getElementById('projects-list');
  if (!container) return;
  const instructions = document.createElement('div');
  instructions.className = 'bg-blue-900 bg-opacity-60 text-blue-100 rounded-lg p-6 mb-8 text-sm';
  instructions.innerHTML = `
   
  `;
  container.parentNode.insertBefore(instructions, container);
}

function initProjects() {
  showProjectInstructions();
  displayProjects('all');
  initProjectFilters();
}
window.initProjects = initProjects; 