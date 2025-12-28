// MOMENTUM SCROLL - Makes mouse wheel smooth like trackpad
let isScrolling = false;
let scrollVelocity = 0;
let scrollPosition = window.scrollY;
const friction = 0.92; // Lower = more friction, stops faster
const acceleration = 0.1; // How much to accelerate each wheel scroll

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  
  // Add velocity based on wheel delta
  scrollVelocity += e.deltaY * acceleration;
  
}, { passive: false });

function updateScroll() {
  if (Math.abs(scrollVelocity) > 0.5) {
    scrollPosition += scrollVelocity;
    scrollVelocity *= friction; // Gradually slow down
    
    window.scrollTo(0, scrollPosition);
    requestAnimationFrame(updateScroll);
  }
}

// Start the momentum loop
window.addEventListener('wheel', () => {
  requestAnimationFrame(updateScroll);
}, { passive: false });



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
            // FORCE VISIBILITY on init
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            
            // First slide visible immediately
            if (index === 0) {
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
                slide.style.pointerEvents = 'auto'; // Make clickable
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
        this.rafId = requestAnimationFrame(this.animate.bind(this));
    }

    showSlide(index) {
        if (index === this.currentIndex) return;

        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        // Fade out current
        currentSlide.style.opacity = '0';
        currentSlide.style.zIndex = '0';
        currentSlide.style.pointerEvents = 'none';

        // Fade in next
        nextSlide.style.zIndex = '1';
        nextSlide.style.opacity = '1';
        nextSlide.style.pointerEvents = 'auto'; // Make clickable

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

// Simple Nav (toggle dropdowns on click)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Slideshow
    const heroSlideshow = new SmoothSlideshow('.slide');
    if (heroSlideshow.slides && heroSlideshow.slides.length > 0) {
        heroSlideshow.init();
    }

    // 2. Simple Dropdown Logic (Mobile + Desktop)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(d => {
        d.addEventListener('click', function(e) {
            // Toggle active class on click
            this.classList.toggle('active');
        });
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
});

// ===============================================================
// === FINAL CAROUSEL CLASS - WITH LOOPING & ALL FIXES         ===
// ===============================================================
class FlippingCoverFlow {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.carousel = this.container.querySelector('.logo-carousel');
        this.prevButton = this.container.querySelector('.carousel-arrow.prev');
        this.nextButton = this.container.querySelector('.carousel-arrow.next');
        this.flipContainer = document.querySelector('.project-flip-container');
        this.flipContent = this.flipContainer.querySelector('.flip-back');

        this.projects = [
            { title: 'VANTARA NIWAS - MACHAAN Launch', type: '', description: "Launched the MACHAAN restaurant inside Vantara Niwas, a seven-star hotel owned by Anant Ambani, hosting an exclusive dinner for Mr. Ambani and other special guests.", logo: 'images/project-images/vantaralogo.jpg' },
            { title: 'Little Food Co.', type: 'Culinary Consultancy', description: "Enhanced catering and delivery for this premier Mumbai brand, servicing clients like Spotify and Nykaa by elevating dishes, optimizing workflows, and implementing data tracking.", logo: 'images/project-images/littlefoodlogo.PNG' },
            { title: 'META - WhatsApp Privacy Ad Film', type: '', description: 'Provided comprehensive food styling and kitchen design consultation for the ad film, ensuring authentic culinary scene portrayal.', logo: 'images/project-images/whatsapplogo.png' },
            { title: 'Moonshine', type: 'Brand Positioning & Strategy', description: "Developed the brand identity and 'Be Better' tagline, creating a social media strategy focused on sustainability for this unique mead brand.", logo: 'images/project-images/moonshine.png' },
            { title: 'VIRAASAT - Aaverina Hospitality', type: 'Contemporary Indian Restaurant', description: 'Collaborated on a 300-seat restaurant in Mysore focusing on Northern Frontier Cuisine, blending traditional flavors with modern techniques.', logo: 'images/project-images/virasatlogo.png' },
            { title: 'Basque by Breve', type: 'Concept Development', description: 'Developed a concept café in Bandra inspired by St. Sebastian cheesecake, featuring unique varieties and a gourmet sandwich shop.', logo: 'images/project-images/basque.png' },
            { title: 'Phat Fillings', type: 'Premium Pie Delivery', description: 'Led the creation of a premium delivery brand for pies with Indian and Australian flavors, featured in Vogue and Upper Crust.', logo: 'images/project-images/phat logo.png' },
            { title: 'ZEKI', type: 'Upscale Casual Bistro', description: 'Developed an upscale bistro in Andheri West focused on global cuisine, designing the kitchen, curating crockery, and crafting an international menu.', logo: 'images/project-images/zekilogo.PNG' },
            { title: 'Doppler', type: '', description: "Conceptualized a café for Boomerang Hospitality in a historic Jaipur haveli, redefining the experience as the city's premier slow bar destination.", logo: 'images/project-images/doppler.png' },
            { title: 'Sarabi', type: 'Modern Indian Restaurant', description: "An upscale 12,000 sqft space offering contemporary progressive Indian food, designed for a discerning clientele.", logo: 'images/project-images/saarbai.png' },
            { title: 'Sunny Da Dhaba', type: '', description: 'Evolved a 30+ year legacy brand into a dual-floor destination with a Mediterranean café and a modern-Indian restaurant with playful tapas.', logo: 'images/project-images/sunnyy.png' }
        ];

        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.populateCarousel();
        this.cards = this.carousel.querySelectorAll('.logo-card');
        this.updateCarouselPositions(true); // Initial setup without transition
        this.bindEvents();
    }

    populateCarousel() {
        this.carousel.innerHTML = this.projects.map((project, index) => `
            <div class="logo-card" data-index="${index}">
                <img src="${project.logo}" alt="${project.title}">
            </div>
        `).join('');
    }

    updateCarouselPositions(isInitial = false) {
        const total = this.projects.length;

        // Loop through all cards to set their position
        for (let i = 0; i < total; i++) {
            const card = this.cards[i];
            const offset = i - this.currentIndex;

            let transform, zIndex, filter, opacity;

            // This creates the circular distance for the loop
            const circularOffset = (offset + total) % total;
            const rightOffset = (this.currentIndex - i + total) % total;
            const distance = Math.min(circularOffset, rightOffset);
            
            // Disable transition for the very first load
            if (isInitial) card.style.transition = 'none';
            else card.style.transition = 'transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease';

            if (distance === 0) { // Center card
                transform = 'translateX(0) scale(1)';
                zIndex = 10;
                filter = 'none';
                opacity = 1;
            } else if (distance === 1) { // Adjacent cards
                // Check if it's the left or right card
                if (circularOffset === 1 || circularOffset < total / 2 && circularOffset !== 0) {
                    transform = 'translateX(150px) scale(0.7)'; // Right
                } else {
                    transform = 'translateX(-150px) scale(0.7)'; // Left
                }
                zIndex = 5;
                filter = 'blur(2px)';
                opacity = 0.5;
            } else { // Hidden cards
                transform = `translateX(${offset * 75}px) scale(0.5)`;
                opacity = 0;
                zIndex = 1;
            }

            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.filter = filter;
            card.style.opacity = opacity;
        }
    }
    
   showFlipModal(index) {
    const project = this.projects[index];
    
    // FORCE the content to be visible immediately
    this.flipContent.innerHTML = `
        <button class="modal-close-btn">&times;</button>
        <h3 style="color: #FFFFFF !important; margin-bottom: 15px;">${project.title}</h3>
        ${project.type ? `<p class="project-type" style="color: #CCCCCC !important; font-style: italic; margin-bottom: 15px;">${project.type}</p>` : ''}
        <p style="color: #FFFFFF !important; line-height: 1.6;">${project.description}</p>
        <a href="contact.html" class="enquire-btn" style="margin-top:24px;display:inline-block;">Start your own project</a>
    `;
    
    // FORCE the flip-back to have the right colors
    this.flipContent.style.backgroundColor = '#1f2121';
    this.flipContent.style.color = '#FFFFFF';
    
    this.flipContainer.classList.add('active');
    
    // Add the close event
    const closeBtn = this.flipContainer.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hideFlipModal(), { once: true });
    }
}


    hideFlipModal() {
        this.flipContainer.classList.remove('active');
    }

   bindEvents() {
    this.nextButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateCarouselPositions();
    });

    this.prevButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateCarouselPositions();
    });

    // FIXED: Separate touch and click handling for mobile vs desktop
    let touchStartTime = 0;
    let touchEndTime = 0;

    // Handle touch events for mobile
    this.carousel.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    });

    this.carousel.addEventListener('touchend', (e) => {
        touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Only trigger if it's a quick tap (not a scroll)
        if (touchDuration < 200) {
            const card = e.target.closest('.logo-card');
            if (card && parseInt(card.dataset.index) === this.currentIndex) {
                e.preventDefault();
                e.stopPropagation();
                this.showFlipModal(this.currentIndex);
            }
        }
    });

    // Handle click events for desktop (but not mobile)
    this.carousel.addEventListener('click', (e) => {
        // Skip if this is a mobile touch device
        if ('ontouchstart' in window) return;
        
        const card = e.target.closest('.logo-card');
        if (card && parseInt(card.dataset.index) === this.currentIndex) {
            this.showFlipModal(this.currentIndex);
        }
    });

    // FIXED: Only close modal when clicking the background, not anywhere
    this.flipContainer.addEventListener('click', (e) => {
        if (e.target === this.flipContainer) {
            this.hideFlipModal();
        }
    });
}

}

