/**
 * MIG Technology – GSAP Animations
 * Raycast-inspired smooth animations & interactions
 * ================================================
 * Dependencies: GSAP 3.12+, ScrollTrigger
 */

// ===== Register Plugin =====
gsap.registerPlugin(ScrollTrigger);

// ===== Configuration =====
const CONFIG = {
    duration: {
        fast: 0.4,
        normal: 0.8,
        slow: 1.2,
    },
    ease: {
        smooth: 'cubic-bezier(0.22, 0.9, 0.35, 1)',
        bounce: 'back.out(1.4)',
        power: 'power3.out',
    },
    stagger: 0.1,
};

// ===== Utility: Counter Animation =====
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    const obj = { val: 0 };
    gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
        },
        onUpdate() {
            el.textContent = Math.round(obj.val) + '+';
        },
    });
}

// ===== 1. HERO ANIMATIONS =====
function initHeroAnimations() {
    const tl = gsap.timeline({
        defaults: { ease: CONFIG.ease.power, duration: CONFIG.duration.normal },
    });

    // Badge
    tl.fromTo('#hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
    );

    // Title
    tl.fromTo('#hero-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.4'
    );

    // Subtitle
    tl.fromTo('#hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.5'
    );

    // CTA
    tl.fromTo('#hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.4'
    );

    // Trust metrics
    tl.fromTo('#hero-trust',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
    );

    // Stat counters
    document.querySelectorAll('.stat-number[data-count]').forEach(animateCounter);

    // Mesh gradient blobs - subtle floating
    gsap.utils.toArray('.mesh-blob').forEach((blob, i) => {
        gsap.to(blob, {
            x: `random(-30, 30)`,
            y: `random(-30, 30)`,
            duration: `random(5, 8)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
        });
    });
}

// ===== 2. SCROLL REVEAL =====
function initScrollReveal() {
    // Exclude hero elements: they are handled by initHeroAnimations() timeline.
    // Without this exclusion, initScrollReveal() would reset hero nodes to
    // opacity:0 / y:30 AFTER the hero timeline has already animated them in,
    // making the hero section nearly invisible (Critical Bug #1).
    const heroExcludeIds = ['#hero-badge', '#hero-title', '#hero-subtitle', '#hero-cta', '#hero-trust'];
    const revealElements = gsap.utils.toArray(
        heroExcludeIds.map(id => `.reveal:not(${id})`).join(', ')
    );

    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: CONFIG.duration.normal,
                ease: CONFIG.ease.power,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                },
            }
        );
    });
}

// ===== 3. SERVICE CARDS – Stagger on scroll =====
function initServiceCards() {
    const cards = gsap.utils.toArray('#service-grid .product-card');
    if (!cards.length) return;

    gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: CONFIG.duration.normal,
            stagger: CONFIG.stagger,
            ease: CONFIG.ease.power,
            scrollTrigger: {
                trigger: '#service-grid',
                start: 'top 80%',
                once: true,
            },
        }
    );

    // Card hover scale (GSAP for fine control)
    cards.forEach((card) => {
        const icon = card.querySelector('.w-14');

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.35,
                ease: CONFIG.ease.smooth,
            });
            if (icon) {
                gsap.to(icon, {
                    scale: 1.12,
                    rotation: 3,
                    duration: 0.35,
                    ease: CONFIG.ease.bounce,
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.35,
                ease: CONFIG.ease.smooth,
            });
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.35,
                    ease: CONFIG.ease.power,
                });
            }
        });
    });
}

// ===== 4. BENTO GRID STAGGER =====
function initBentoGrid() {
    const items = gsap.utils.toArray('#bento-grid .product-card');
    if (!items.length) return;

    gsap.fromTo(items,
        { y: 40, opacity: 0, scale: 0.98 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: CONFIG.duration.normal,
            stagger: 0.12,
            ease: CONFIG.ease.power,
            scrollTrigger: {
                trigger: '#bento-grid',
                start: 'top 80%',
                once: true,
            },
        }
    );
}

// ===== 5. PROJECT IMAGES – Parallax subtle =====
function initProjectParallax() {
    const wrappers = gsap.utils.toArray('.project-img-wrapper');

    wrappers.forEach((wrapper) => {
        const img = wrapper.querySelector('img');
        if (!img) return;

        gsap.fromTo(img,
            { scale: 1.08 },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            }
        );
    });
}

// ===== 6. CTA CARD =====
function initCTAAnimation() {
    const cta = document.querySelector('#cta-card');
    if (!cta) return;

    gsap.fromTo(cta,
        { y: 40, opacity: 0, scale: 0.97 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: CONFIG.duration.slow,
            ease: CONFIG.ease.power,
            scrollTrigger: {
                trigger: cta,
                start: 'top 80%',
                once: true,
            },
        }
    );
}

// ===== 7. NAVBAR SCROLL BEHAVIOR =====
function initNavbarBehavior() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = 0;

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate(self) {
            const scrollY = self.scroll();
            const direction = scrollY > lastScrollY ? 'down' : 'up';

            if (direction === 'down' && scrollY > 200) {
                gsap.to(navbar, {
                    y: -72,
                    duration: 0.3,
                    ease: 'power2.inOut',
                });
            } else {
                gsap.to(navbar, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                });
            }

            // Add shadow on scroll
            if (scrollY > 20) {
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.06)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScrollY = scrollY;
        },
    });
}

// ===== 8. MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (!toggle || !menu) return;

    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        menu.classList.toggle('open', isOpen);

        if (iconOpen && iconClose) {
            iconOpen.classList.toggle('hidden', isOpen);
            iconClose.classList.toggle('hidden', !isOpen);
        }

        // Prevent body scroll when menu open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Mobile service accordion
    const serviceToggle = document.getElementById('mobile-service-toggle');
    const serviceSubmenu = document.getElementById('mobile-service-submenu');
    const serviceChevron = document.getElementById('mobile-service-chevron');

    if (serviceToggle && serviceSubmenu) {
        serviceToggle.addEventListener('click', () => {
            const isVisible = !serviceSubmenu.classList.contains('hidden');
            serviceSubmenu.classList.toggle('hidden', isVisible);
            if (serviceChevron) {
                serviceChevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }
}

// ===== 9. FLOATING STATS CARD ANIMATION =====
function initFloatingCard() {
    const card = document.getElementById('floating-stats-card');
    if (!card) return;

    gsap.fromTo(card,
        { y: 30, opacity: 0, scale: 0.9 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: CONFIG.duration.slow,
            ease: CONFIG.ease.bounce,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true,
            },
        }
    );
}

// ===== 10. GRADIENT TEXT SHIMMER (Optional) =====
function initGradientShimmer() {
    const texts = gsap.utils.toArray('.gradient-text');
    texts.forEach((text) => {
        gsap.fromTo(text,
            { backgroundPosition: '0% 50%' },
            {
                backgroundPosition: '200% 50%',
                duration: 4,
                repeat: -1,
                ease: 'none',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 90%',
                    once: false,
                    toggleActions: 'play pause resume reset',
                },
            }
        );
    });
}

// ===== INIT ALL =====
function initAll() {
    // Wait for fonts to load for accurate measurements
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeroAnimations();
            initScrollReveal();
            initServiceCards();
            initBentoGrid();
            initProjectParallax();
            initCTAAnimation();
            initNavbarBehavior();
            initMobileMenu();
            initFloatingCard();
            // initGradientShimmer(); // Optional: uncomment if desired
        });
    } else {
        // Fallback for older browsers
        initHeroAnimations();
        initScrollReveal();
        initServiceCards();
        initBentoGrid();
        initProjectParallax();
        initCTAAnimation();
        initNavbarBehavior();
        initMobileMenu();
        initFloatingCard();
    }
}

// Start when components are loaded
document.addEventListener('componentsLoaded', initAll);

// Fallback just in case no components were loaded but we still want to run
// The component loader will dispatch componentsLoaded even if there are 0 components.

