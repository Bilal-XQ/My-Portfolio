/**
 * @fileoverview Fichier principal de l'application portfolio
 * @author Bilal EL AZZAM
 * @version 1.0.0
 */

console.log('[App] main.js chargé');
// === main.js : Logique principale du portfolio ===

/**
 * Configure le défilement fluide pour la navigation
 * @function smoothScroll
 */
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

/**
 * Gère le menu mobile et sa réactivité
 * @function mobileMenuToggle
 */
const mobileMenuToggle = () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Fermeture automatique après sélection
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
};

/**
 * Gère le basculement entre les modes sombre et clair
 * @function darkModeToggle
 */
const darkModeToggle = () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Détection des préférences système
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
  }
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
    
    // Restauration des préférences utilisateur
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') html.classList.add('dark');
    if (savedTheme === 'light') html.classList.remove('dark');
  }
};

/**
 * Implémente le chargement différé des images
 * @function lazyLoadImages
 */
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    images.forEach(img => observer.observe(img));
  } else {
    // Fallback pour les navigateurs plus anciens
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
};

/**
 * Valide le formulaire de contact
 * @function contactFormValidation
 */
const contactFormValidation = () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const fields = {
      name: form.querySelector('#name'),
      email: form.querySelector('#email'),
      subject: form.querySelector('#subject'),
      message: form.querySelector('#message')
    };

    // Validation des champs
    if (!fields.name.value.trim()) { 
      valid = false; 
      fields.name.classList.add('border-red-500'); 
    } else { 
      fields.name.classList.remove('border-red-500'); 
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email.value)) { 
      valid = false; 
      fields.email.classList.add('border-red-500'); 
    } else { 
      fields.email.classList.remove('border-red-500'); 
    }

    if (!fields.subject.value.trim()) { 
      valid = false; 
      fields.subject.classList.add('border-red-500'); 
    } else { 
      fields.subject.classList.remove('border-red-500'); 
    }

    if (!fields.message.value.trim()) { 
      valid = false; 
      fields.message.classList.add('border-red-500'); 
    } else { 
      fields.message.classList.remove('border-red-500'); 
    }

    if (!valid) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    // TODO: Implémenter l'envoi réel du formulaire
    alert('Merci pour votre message !');
    form.reset();
  });
};

/**
 * Initialise les modules externes
 * @function initModules
 */
const initModules = () => {
  if (window.initAnimations) window.initAnimations();
  if (window.initProjects) window.initProjects();
  if (window.initSkills) window.initSkills();
};

/**
 * Gère le téléchargement du CV
 * @function resumeDownload
 */
const resumeDownload = () => {
  const btns = document.querySelectorAll('.btn-cv, .download-cv');
  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = 'assets/resume/your-resume.pdf';
      link.download = 'CV_VotreNom.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
};

/**
 * Configure les éléments de contact cliquables
 * @function clickableContacts
 */
const clickableContacts = () => {
  // Email
  document.querySelectorAll('.contact-email').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = 'mailto:' + el.textContent.trim();
    });
    el.style.cursor = 'pointer';
  });
  
  // Téléphone
  document.querySelectorAll('.contact-phone').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = 'tel:' + el.textContent.replace(/\s+/g, '');
    });
    el.style.cursor = 'pointer';
  });
};

/**
 * Configure Google Analytics
 * @function setupAnalytics
 */
const setupAnalytics = () => {
  if (!window.gtag) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // TODO: Remplacer par votre ID GA
  }
};

/**
 * Initialisation de l'application
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] Initialisation du portfolio...');
    
    if (!document.body) {
        console.error('[App] Le DOM n\'est pas prêt');
        return;
    }

    try {
        smoothScroll();
        mobileMenuToggle();
        darkModeToggle();
        lazyLoadImages();
        contactFormValidation();
        initModules();
        resumeDownload();
        clickableContacts();
        setupAnalytics();
    } catch (error) {
        console.error('[App] Erreur lors de l\'initialisation:', error);
    }
});

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio chargé');
    
    // Gestion de la navigation mobile
    setupMobileNav();
    
    // Configuration des animations au défilement
    setupScrollAnimations();
    
    // Configuration du formulaire de contact
    setupContactForm();
    
    // Changement actif dans la navigation lors du défilement
    setupScrollSpy();
});

// Gestion de la navigation mobile
function setupMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Configuration des animations au défilement
function setupScrollAnimations() {
    // Détecter les éléments qui doivent être animés
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('animate');
        });
    }
}

// Configuration du formulaire de contact
function setupContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Simulation d'envoi (à remplacer par votre propre logique d'envoi)
            console.log('Formulaire soumis :', { name, email, subject, message });
            
            // Réinitialiser le formulaire après soumission
            contactForm.reset();
            
            // Afficher un message de confirmation
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        });
    }
}

// Changement actif dans la navigation lors du défilement
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            link.classList.add('text-gray-600');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-600');
                link.classList.add('text-blue-600');
            }
        });
    });
}

/**
 * Utilitaire pour détecter les appareils mobiles
 * @returns {boolean} True si l'appareil est mobile
 */
function isMobileDevice() {
    return (typeof window.orientation !== 'undefined') || 
           (navigator.userAgent.indexOf('IEMobile') !== -1);
}

/**
 * Fonction utilitaire pour limiter la fréquence d'exécution (debounce)
 * @param {Function} func - Fonction à exécuter
 * @param {number} wait - Délai d'attente en ms
 * @param {boolean} immediate - Exécution immédiate
 * @returns {Function} Fonction avec debounce
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
} 