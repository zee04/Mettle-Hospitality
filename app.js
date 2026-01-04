// ===============================================================
// COMPLETE CLEANED-UP JS FILE - ALL CONFLICTS FIXED
// ===============================================================



// === 2. SMOOTH SLIDESHOW (UNCHANGED - WORKS PERFECT) ===
class SmoothSlideshow {
    constructor(selector, options = {}) {
        this.slides = document.querySelectorAll(selector);
        if (this.slides.length === 0) return;

        this.options = {
            interval: 5000,
            fadeDuration: 1500,
            ...options
        };
        this.currentIndex = 0;
        this.lastTimestamp = 0;
        this.rafId = null;
        this.isRunning = false;
    }

    init() {
        this.slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            
            if (index === 0) {
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
                slide.style.pointerEvents = 'auto';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                slide.style.pointerEvents = 'none';
            }
            
            slide.style.transition = `opacity ${this.options.fadeDuration}ms ease-in-out`;
        });
        
        this.start();
        this.bindEvents();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.animate.bind(this));
    }

    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        cancelAnimationFrame(this.rafId);
    }

    animate(now) {
        if (!this.lastTimestamp) this.lastTimestamp = now;
        const elapsed = now - this.lastTimestamp;
        if (elapsed > this.options.interval) {
            this.lastTimestamp = now;
            this.next();
        }
        if (this.isRunning) {
            this.rafId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    showSlide(index) {
        if (index === this.currentIndex) return;

        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        currentSlide.style.opacity = '0';
        currentSlide.style.zIndex = '0';
        currentSlide.style.pointerEvents = 'none';

        nextSlide.style.zIndex = '1';
        nextSlide.style.opacity = '1';
        nextSlide.style.pointerEvents = 'auto';

        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    bindEvents() {
        const prevButton = document.querySelector('.slideshow-arrow.prev');
        const nextButton = document.querySelector('.slideshow-arrow.next');

        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.stop();
                this.prev();
                this.start();
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.stop();
                this.next();
                this.start();
            });
        }
    }
}

// === 3. FLIPPING COVERFLOW CAROUSEL (UNCHANGED - WORKS PERFECT) ===
class FlippingCoverFlow {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.carousel = this.container.querySelector('.logo-carousel');
        this.prevButton = this.container.querySelector('.carousel-arrow.prev');
        this.nextButton = this.container.querySelector('.carousel-arrow.next');
        this.flipContainer = document.querySelector('.project-flip-container');
        this.flipContent = this.flipContainer?.querySelector('.flip-back');

        this.projects = [
            { title: 'VANTARA NIWAS - MACHAAN Launch', type: '', description: "Visiting chefs for exclusive luxury estate celebrations in Jamnagar. Orchestrated multi-day culinary experiences for high-profile events featuring progressive Indian canapés, truffle-infused pasta service, and refined Indian and European cuisine for Ambani family and other Bollywood A listers", logo: 'images/project-images/vantaralogo.webp' },
            { title: 'Little Food Co.', type: 'Culinary Consultancy', description: "Menu elevation and consultancy for premier Mumbai catering brand. Elevated existing dishes, developed data tracking systems, implemented refined cooking techniques, optimized kitchen workflow.", logo: 'images/project-images/littlefoodlogo.webp' },
            { title: 'META - WhatsApp Privacy Ad Film', type: '', description: 'Provided comprehensive food styling and kitchen design consultation for the ad film, ensuring authentic culinary scene portrayal.', logo: 'images/project-images/whatsapplogo.webp' },
            { title: 'Moonshine', type: 'Brand Positioning & Strategy', description: "Developed the brand identity and 'Be Better' tagline, creating a social media strategy focused on sustainability for this unique mead brand.", logo: 'images/project-images/moonshine.webp' },
            { title: 'VIRAASAT - Aaverina Hospitality', type: 'Contemporary Indian Restaurant', description: 'Collaborated on a 300-seat restaurant in Mysore focusing on Northern Frontier Cuisine, blending traditional flavors with modern techniques.', logo: 'images/project-images/virasatlogo.webp' },
            { title: 'Basque by Breve', type: 'Concept Development', description: 'Developed a concept café in Bandra inspired by St. Sebastian cheesecake, featuring unique varieties and a gourmet sandwich shop.', logo: 'images/project-images/basque.webp' },
            { title: 'Phat Fillings', type: 'Premium Pie Delivery', description: 'Led the creation of a premium delivery brand for pies with Indian and Australian flavors, featured in Vogue and Upper Crust.', logo: 'images/project-images/phat logo.webp' },
            { title: 'ZEKI', type: 'Upscale Casual Bistro', description: 'Developed an upscale bistro in Andheri West focused on global cuisine, designing the kitchen, curating crockery, and crafting an international menu.', logo: 'images/project-images/zekilogo.webp' },
            { title: 'Doppler', type: '', description: "Conceptualized a café for Boomerang Hospitality in a historic Jaipur haveli, redefining the experience as the city's premier slow bar destination.", logo: 'images/project-images/doppler.webp' },
            { title: 'Sarabi', type: 'Modern Indian Restaurant', description: "An upscale 12,000 sqft space offering contemporary progressive Indian food, designed for a discerning clientele.", logo: 'images/project-images/saarbai.webp' },
            { title: 'Mirari', type: '', description: 'Evolved a 30+ year legacy brand into a dual-floor destination with a Mediterranean café and a modern-Indian restaurant with playful tapas.', logo: 'images/project-images/sunnyy.webp' },
            { title: 'Indulge', type: '', description: 'Developed a comprehensive breakfast and gourment sandwich menu whilst introducing seasonal sundae programs that honors this PAN-Indian icecream brand  ', logo: 'images/project-images/indulgelogo.webp' },
        ];

        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.populateCarousel();
        this.cards = this.carousel.querySelectorAll('.logo-card');
        this.updateCarouselPositions(true);
        this.bindEvents();
    }

    populateCarousel() {
        this.carousel.innerHTML = this.projects.map((project, index) => `
            <div class="logo-card" data-index="${index}">
                <img src="${project.logo}" alt="${project.title}" loading="lazy">
            </div>
        `).join('');
    }

    updateCarouselPositions(isInitial = false) {
        const total = this.projects.length;
        this.cards = this.carousel.querySelectorAll('.logo-card'); // Refresh cards

        for (let i = 0; i < total; i++) {
            const card = this.cards[i];
            const offset = i - this.currentIndex;
            const circularOffset = (offset + total) % total;
            const rightOffset = (this.currentIndex - i + total) % total;
            const distance = Math.min(circularOffset, rightOffset);
            
            let transform, zIndex, filter, opacity;

            if (distance === 0) {
                transform = 'translateX(0) scale(1)';
                zIndex = 10;
                filter = 'none';
                opacity = 1;
            } else if (distance === 1) {
                transform = circularOffset === 1 ? 'translateX(150px) scale(0.7)' : 'translateX(-150px) scale(0.7)';
                zIndex = 5;
                filter = 'blur(2px)';
                opacity = 0.5;
            } else {
                transform = `translateX(${offset * 75}px) scale(0.5)`;
                opacity = 0;
                zIndex = 1;
            }

            card.style.transition = isInitial ? 'none' : 'transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease';
            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.filter = filter;
            card.style.opacity = opacity;
        }
    }

    showFlipModal(index) {
        if (!this.flipContent || !this.flipContainer) return;
        
        const project = this.projects[index];
        this.flipContent.innerHTML = `
            <button class="modal-close-btn" style="color: #FFFFFF !important;">&times;</button>
            <h3 style="color: #FFFFFF !important; margin-bottom: 15px;">${project.title}</h3>
            ${project.type ? `<p class="project-type" style="color: #CCCCCC !important; font-style: italic; margin-bottom: 15px;">${project.type}</p>` : ''}
            <p style="color: #FFFFFF !important; line-height: 1.6;">${project.description}</p>
            <a href="contact.html" class="rectangle-btn" style="margin-top:24px;display:inline-block;">Start your own project</a>
        `;
        
        this.flipContent.style.backgroundColor = '#1f2121';
        this.flipContent.style.color = '#FFFFFF';
        this.flipContainer.classList.add('active');
        
        const closeBtn = this.flipContent.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => this.hideFlipModal();
        }
    }

    hideFlipModal() {
        if (this.flipContainer) {
            this.flipContainer.classList.remove('active');
        }
    }

    bindEvents() {
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.projects.length;
                this.updateCarouselPositions();
            });
        }

        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
                this.updateCarouselPositions();
            });
        }

        // Touch + Click handling
        let touchStartTime = 0;
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        });

        this.carousel.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 200) {
                const card = e.target.closest('.logo-card');
                if (card && parseInt(card.dataset.index) === this.currentIndex) {
                    e.preventDefault();
                    this.showFlipModal(this.currentIndex);
                }
            }
        });

        this.carousel.addEventListener('click', (e) => {
            if ('ontouchstart' in window) return;
            const card = e.target.closest('.logo-card');
            if (card && parseInt(card.dataset.index) === this.currentIndex) {
                this.showFlipModal(this.currentIndex);
            }
        });

        if (this.flipContainer) {
            this.flipContainer.addEventListener('click', (e) => {
                if (e.target === this.flipContainer) {
                    this.hideFlipModal();
                }
            });
        }
    }
}

// === FIXED NAVIGATION CLASS - MOBILE LINKS WORK ===
class Navigation {
    constructor() {
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.navbar = document.getElementById('navbar');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 1. MOBILE MENU TOGGLE (works perfectly)
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // 2. FIXED DROPDOWNS - Only arrow toggles on mobile
        this.dropdowns.forEach(dropdown => {
            const toggleLink = dropdown.querySelector('.dropdown-toggle, a');
            const arrow = dropdown.querySelector('.dropdown-arrow');
            
            // Create arrow if it doesn't exist
            if (toggleLink && !arrow) {
                const newArrow = document.createElement('span');
                newArrow.className = 'dropdown-arrow';
                newArrow.innerHTML = '▾';
                toggleLink.appendChild(newArrow);
            }

            // ARROW CLICK ONLY toggles dropdown on mobile
            const dropdownArrow = dropdown.querySelector('.dropdown-arrow');
            if (dropdownArrow) {
                dropdownArrow.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                });
            }

            // LINK CLICK - Navigate normally (FIXED)
            const dropdownLinks = dropdown.querySelectorAll('a');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Only preventDefault for dropdown toggle links on mobile
                    if (window.innerWidth <= 768 && link.classList.contains('dropdown-toggle')) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        return;
                    }
                    // All other links navigate normally
                    this.closeMobileMenu();
                });
            });
        });

        // 3. ALL NAV LINKS - Smooth scroll + close menu
        document.querySelectorAll('#nav-menu a[href^="#"], nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    this.closeMobileMenu(); // Close menu after click
                } else {
                    // External links - close menu only
                    this.closeMobileMenu();
                }
            });
        });

        // 4. Navbar scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // 5. Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isOpen = !this.isOpen;
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isOpen = false;
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (this.navbar) {
            this.navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isOpen) {
            this.closeMobileMenu();
        }
    }
}

// === 5. FORM HANDLER ===
class FormHandler {
    constructor() {
        this.form = document.querySelector('form[action*="formspree"]');
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.showMessage('Thank you! We\'ll get back to you soon.', 'success');
                this.form.reset();
            } else {
                this.showMessage('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            this.showMessage('Connection error. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }

    showMessage(text, type) {
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const message = document.createElement('div');
        message.className = `form-message form-message--${type}`;
        message.textContent = text;
        this.form.parentNode.insertBefore(message, this.form.nextSibling);

        setTimeout(() => message.remove(), 5000);
    }
}

// === 6. ANIMATION OBSERVER ===
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
        document.querySelectorAll('.glass-card, .service-card, .project-card, .hero-content')
            .forEach(el => {
                el.classList.add('loading');
                this.observer.observe(el);
            });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                entry.target.classList.remove('loading');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// === 7. CARD HOVER EFFECTS ===
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.glass-card, .service-card, .project-card');
        if (this.cards.length === 0) return;
        this.bindEvents();
    }

    bindEvents() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        });
    }

    handleMouseEnter(e) {
        if (window.innerWidth <= 768) return;
        e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    handleMouseLeave(e) {
        e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    handleMouseMove(e) {
        if (window.innerWidth <= 768) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotationDivisor = card.classList.contains('large-card') ? 20 : 10;

        const rotateX = (y - centerY) / rotationDivisor;
        const rotateY = (centerX - x) / rotationDivisor;

        card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// === 8. SINGLE INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Core components
    const heroSlideshow = new SmoothSlideshow('.slide');
    if (heroSlideshow.slides?.length > 0) heroSlideshow.init();
    
    new FlippingCoverFlow('.logo-carousel-container');
    new Navigation();
    new FormHandler();
    new AnimationObserver();
    new CardEffects();

    // Stagger animations
    document.querySelectorAll('.service-card, .project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Loading screen
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// === 9. CSS-IN-JS FOR FORM MESSAGES ===
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .form-message {
        padding: var(--space-16);
        margin-top: var(--space-16);
        border-radius: var(--radius-base);
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    }
    .form-message--success { background: rgba(33, 128, 141, 0.15); color: var(--color-success); border: 1px solid rgba(33, 128, 141, 0.25); }
    .form-message--error { background: rgba(192, 21, 47, 0.15); color: var(--color-error); border: 1px solid rgba(192, 21, 47, 0.25); }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .btn.loading { position: relative; color: transparent; }
    .btn.loading::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; border: 2px solid currentColor; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
`;
document.head.appendChild(messageStyles);
