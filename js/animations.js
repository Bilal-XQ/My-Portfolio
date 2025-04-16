console.log('animations.js chargé');
// === animations.js : Animations GSAP & AOS pour le portfolio ===

// Initialisation AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: 'ease-in-out-cubic',
    });
}

// 1. Hero Section Entrance Animations (GSAP)
function initAnimations() {
    // Vérification de la disponibilité de GSAP
    if (typeof gsap === 'undefined') {
        console.error('GSAP n\'est pas chargé');
        return;
    }

    // Hero : fade-in + slide
    if (document.querySelector('#home')) {
        try {
            gsap.from('#home .typewriter', {
                opacity: 0,
                y: 40,
                duration: 1.2,
                delay: 0.2,
                ease: 'power3.out',
            });
            gsap.from('#home p', {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.5,
                stagger: 0.15,
                ease: 'power2.out',
            });
            gsap.from('#home .btn-cv, #home .bg-blue-600', {
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                delay: 0.9,
                stagger: 0.2,
                ease: 'back.out(1.7)',
            });
            gsap.from('#home .profile-img, #home img', {
                opacity: 0,
                scale: 0.7,
                duration: 1.1,
                delay: 0.7,
                ease: 'power2.out',
            });
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des animations:', error);
        }
    }

    // 2. Scroll-triggered Animations for Sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power2.out',
            });
        }
    });

    // 3. Hover Animations for Projects & Interactive Elements
    document.querySelectorAll('.project-card, .interactive').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.04, boxShadow: '0 0 24px #2563eb55', duration: 0.25, ease: 'power1.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, boxShadow: '0 4px 24px 0 rgba(30,64,175,0.15)', duration: 0.25, ease: 'power1.in' });
        });
    });

    // 4. Animated Transitions Between Sections
    // (Utilise fade-out/fade-in lors de la navigation)
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            if (targetId.length > 1 && document.querySelector(targetId)) {
                gsap.to(window, { scrollTo: targetId, duration: 0.8, ease: 'power2.inOut' });
                e.preventDefault();
            }
        });
    });

    // 5. Subtle Background Animations (noir & bleu)
    if (document.getElementById('particles-container')) {
        // Animation de points lumineux en fond (canvas ou divs)
        const container = document.getElementById('particles-container');
        for (let i = 0; i < 24; i++) {
            const dot = document.createElement('div');
            dot.className = 'bg-blue-900 opacity-30 rounded-full absolute';
            dot.style.width = dot.style.height = `${Math.random() * 18 + 8}px`;
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            dot.style.filter = 'blur(1.5px)';
            container.appendChild(dot);
            gsap.to(dot, {
                y: `+=${Math.random() * 40 - 20}`,
                x: `+=${Math.random() * 40 - 20}`,
                repeat: -1,
                yoyo: true,
                duration: Math.random() * 4 + 3,
                ease: 'sine.inOut',
                delay: Math.random() * 2,
            });
        }
    }

    // 6. Loading Animations
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            gsap.to(loader, { opacity: 0, duration: 0.7, onComplete: () => loader.remove() });
        }
    });

    // 7. Text Reveal Effects
    document.querySelectorAll('.reveal-text').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
        });
    });

    // 8. Skills Progress Visualization Animations
    document.querySelectorAll('.skill-bar-progress').forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        gsap.fromTo(bar, {
            width: '0%',
        }, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            width: percentage + '%',
            duration: 1.2,
            ease: 'power2.out',
        });
    });

    // 9. Interactive Cursor Effects (optionnel)
    // Curseur personnalisé bleu (optionnel, désactivable)
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.border = '2px solid #2563eb';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'background 0.2s, border 0.2s, transform 0.1s';
    cursor.style.background = 'rgba(30,64,175,0.08)';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .interactive, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.4)';
            cursor.style.background = 'rgba(14,165,233,0.18)';
            cursor.style.borderColor = '#0ea5e9';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(30,64,175,0.08)';
            cursor.style.borderColor = '#2563eb';
        });
    });

    // 10. Animation Sequence Management & Performance
    gsap.defaults({ ease: 'power2.out', duration: 1 });
    gsap.ticker.lagSmoothing(100, 16);
    // Désactivez les animations sur les petits écrans si besoin
    if (window.innerWidth < 480) {
        gsap.globalTimeline.timeScale(0.7);
    }
}

// Modification de l'export de la fonction
if (typeof window !== 'undefined') {
    window.initAnimations = initAnimations;
} 