console.log('skills.js chargé');
// === skills.js : Visualisation interactive des compétences ===

// Structure des données adaptée à ton profil
const skillsData = [
  {
    category: "Langages",
    icon: "<i class='fas fa-code'></i>",
    skills: [
      { name: "HTML", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fab fa-html5 text-orange-500'></i>" },
      { name: "CSS", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fab fa-css3-alt text-blue-400'></i>" },
      { name: "JavaScript", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fab fa-js text-yellow-400'></i>" },
      { name: "PHP", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fab fa-php text-indigo-400'></i>" },
      { name: "SQL", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fas fa-database text-blue-300'></i>" },
      { name: "C", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fas fa-c text-blue-500'></i>" },
      { name: "Python", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fab fa-python text-yellow-300'></i>" },
    ]
  },
  {
    category: "Outils de développement",
    icon: "<i class='fas fa-tools'></i>",
    skills: [
      { name: "IntelliJ IDEA Ultimate", level: 40, info: "IDE JetBrains", type: "beginner", icon: "<i class='devicon-intellij-plain colored'></i>" },
      { name: "PyCharm Professional", level: 40, info: "IDE JetBrains", type: "beginner", icon: "<i class='devicon-pycharm-plain colored'></i>" },
      { name: "CLion", level: 40, info: "IDE JetBrains", type: "beginner", icon: "<i class='devicon-clion-plain colored'></i>" },
      { name: "MySQL", level: 30, info: "Débutant", type: "beginner", icon: "<i class='devicon-mysql-plain colored'></i>" },
    ]
  },
  {
    category: "Design",
    icon: "<i class='fas fa-paint-brush'></i>",
    skills: [
      { name: "Design graphique", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fas fa-palette text-pink-400'></i>" },
    ]
  },
  {
    category: "Bases de données",
    icon: "<i class='fas fa-database'></i>",
    skills: [
      { name: "SQL", level: 30, info: "Débutant", type: "beginner", icon: "<i class='fas fa-database text-blue-300'></i>" },
    ]
  },
];

let currentCategory = 'all';

function renderSkillFilters() {
  const filterContainer = document.getElementById('skills-filters');
  if (!filterContainer) return;
  filterContainer.innerHTML = '<button class="skill-filter-btn active" data-cat="all">Toutes</button>' +
    skillsData.map(cat => `<button class="skill-filter-btn" data-cat="${cat.category}">${cat.category}</button>`).join('');
  filterContainer.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.onclick = () => {
      filterContainer.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderSkills();
    };
  });
}

function renderSkills() {
  const container = document.getElementById('skills-list');
  if (!container) return;
  container.innerHTML = '';
  let cats = skillsData;
  if (currentCategory !== 'all') cats = skillsData.filter(c => c.category === currentCategory);
  cats.forEach(cat => {
    const catDiv = document.createElement('div');
    catDiv.className = 'mb-8';
    catDiv.innerHTML = `<h3 class="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">${cat.icon || ''} ${cat.category}</h3>`;
    cat.skills.forEach(skill => {
      let color = 'bg-blue-900';
      // Skill bar
      const skillDiv = document.createElement('div');
      skillDiv.className = 'mb-4 skill-bar-container';
      skillDiv.innerHTML = `
        <div class="flex justify-between items-center mb-1">
          <span class="font-semibold text-gray-200 flex items-center gap-2">${skill.icon || ''} ${skill.name}</span>
          <span class="text-sm text-blue-300">${skill.level}%</span>
        </div>
        <div class="skill-bar bg-gray-800 h-5 relative cursor-pointer">
          <div class="skill-bar-progress ${color}" data-percentage="${skill.level}" style="width:0%"></div>
        </div>
        <div class="skill-info text-xs text-gray-400 mt-1 hidden">${skill.info}</div>
      `;
      skillDiv.querySelector('.skill-bar').addEventListener('mouseenter', () => {
        skillDiv.querySelector('.skill-info').classList.remove('hidden');
      });
      skillDiv.querySelector('.skill-bar').addEventListener('mouseleave', () => {
        skillDiv.querySelector('.skill-info').classList.add('hidden');
      });
      catDiv.appendChild(skillDiv);
    });
    container.appendChild(catDiv);
  });
  animateSkillBars();
}

function animateSkillBars() {
  if (window.gsap) {
    document.querySelectorAll('.skill-bar-progress').forEach(bar => {
      gsap.fromTo(bar, { width: '0%' }, {
        width: bar.getAttribute('data-percentage') + '%',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  } else {
    document.querySelectorAll('.skill-bar-progress').forEach(bar => {
      bar.style.width = bar.getAttribute('data-percentage') + '%';
    });
  }
}

function initSkills() {
  renderSkillFilters();
  renderSkills();
}
window.initSkills = initSkills; 