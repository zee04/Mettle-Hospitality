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

/* PROJECTS PAGE - CAROUSEL + MODAL */
const projectData = {
  vantara: {
    title: "Vantara Niwas, Jamnagar",
    desc: "Visiting Chefs Series",
    details: "Orchestrated multi-day culinary experiences for high-profile events featuring modern Indian canapés with fresh truffle and caviar."
  },
  basque: {
    title: "Basque by Breve, Mumbai",
    desc: "Concept Cafe Development",
    details: "Developed a concept cafe in Bandra inspired by St. Sebastian Cheesecake. Created a unique dessert-forward menu."
  },
  littlefood: {
    title: "Little Food Co, Mumbai",
    desc: "Kitchen Optimization",
    details: "Elevated existing dishes, developed data tracking systems, implemented refined cooking techniques, optimized kitchen flow."
  },
  sarabi: {
    title: "Sarabi, Goa",
    desc: "Modern Indian Fine Dining",
    details: "Developed recipes blending contemporary Indian cuisine. Located in the holiday capital, creating a destination dining vibe."
  },
  doppler: {
    title: "Doppler, Jaipur",
    desc: "Heritage Cafe Concept",
    details: "Upcoming cafe within a historic haveli. Menu celebrates cafe classics with a distinct Jaipur twist."
  },
  meta: {
    title: "WhatsApp Ad Film",
    desc: "Food Styling & Kitchen Design",
    details: "Comprehensive food consultancy, styling, and kitchen design for META privacy Ad film production."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('logo-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -280, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => carousel.scrollBy({ left: 280, behavior: 'smooth' }));
  }

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('close-modal');
  const logoCards = document.querySelectorAll('.logo-card');

  if (modal && logoCards.length > 0) {
    logoCards.forEach(card => {
      card.addEventListener('click', () => {
        const pid = card.getAttribute('data-project');
        const data = projectData[pid];
        if (data) {
          modalContent.innerHTML = `<h3>${data.title}</h3><h4>${data.desc}</h4><p>${data.details}</p>`;
          modal.classList.add('active');
        }
      });
    });

    const hideModal = () => modal.classList.remove('active');
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => { if(e.target === modal) hideModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') hideModal(); });
  }
});
