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

class ProjectCarousel {
  constructor() {
    this.carousel = document.getElementById('logo-carousel');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.modal = document.getElementById('project-modal');
    this.modalClose = document.querySelector('.modal-close-btn');

    this.projects = [
      {
        id: 'vantara',
        name: 'Vantara Niwas - MACHAAN',
        type: 'Luxury Hospitality',
        image: 'images/project-images/vantaralogo.jpg',
        description: 'Orchestrated multi-day culinary experiences for high-profile celebrations at Anant Ambani\'s seven-star hotel, featuring modern Indian canapés with truffle and caviar.'
      },
      {
        id: 'littlefood',
        name: 'Little Food Co.',
        type: 'Culinary Consultancy',
        image: 'images/project-images/littlefoodlogo.PNG',
        description: 'Elevated existing dishes, implemented data tracking systems, and optimized kitchen workflows for premium catering and delivery service.'
      },
      {
        id: 'meta',
        name: 'META - WhatsApp Ad Film',
        type: 'Food Styling',
        image: 'images/project-images/whatsapplogo.png',
        description: 'Comprehensive food styling and kitchen design consultation for production, ensuring authentic culinary scene portrayal.'
      },
      {
        id: 'moonshine',
        name: 'Moonshine',
        type: 'Brand Positioning',
        image: 'images/project-images/moonshine.png',
        description: 'Developed brand identity, messaging, and sustainability-focused social media strategy for unique mead brand.'
      },
      {
        id: 'basque',
        name: 'Basque by Breve',
        type: 'Concept Development',
        image: 'images/project-images/basque.png',
        description: 'Developed concept café inspired by Basque cheesecake with unique menu design and gourmet sandwich shop integration.'
      },
      {
        id: 'doppler',
        name: 'Doppler, Jaipur',
        type: 'Heritage Café',
        image: 'images/project-images/doppler.png',
        description: 'Conceptualized café in historic haveli with experience-forward menu and distinct local narrative.'
      },
      {
        id: 'sarabi',
        name: 'Sarabi',
        type: 'Modern Indian',
        image: 'images/project-images/saarbai.png',
        description: 'Contemporary progressive Indian menu development for premium 12,000 sqft dining destination.'
      },
      {
        id: 'sunny',
        name: 'Sunny Da Dhaba',
        type: 'Brand Evolution',
        image: 'images/project-images/sunnyy.png',
        description: 'Evolved 30+ year legacy brand into multi-experience destination with Mediterranean café and modern-Indian restaurant.'
      }
    ];

    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.carousel.innerHTML = this.projects
      .map(
        (project, idx) => `
      <div class="logo-card" data-index="${idx}">
        <img src="${project.image}" alt="${project.name}" class="logo-card-image"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 80%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%2280%22/%3E%3C/svg%3E'" />
        <h3 class="logo-card-name">${project.name}</h3>
        ${project.type ? `<p class="logo-card-type">${project.type}</p>` : ''}
      </div>
    `
      )
      .join('');

    this.attachCardListeners();
  }

  attachCardListeners() {
    const cards = document.querySelectorAll('.logo-card');
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => this.openModal(idx));
    });
  }

  openModal(index) {
    const project = this.projects[index];
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-subtitle').textContent = project.type || 'Project';
    document.getElementById('modal-desc').textContent = project.description;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.scroll('prev'));
    this.nextBtn.addEventListener('click', () => this.scroll('next'));
    this.modalClose.addEventListener('click', () => this.closeModal());

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  scroll(direction) {
    const carousel = this.carousel;
    const scrollAmount = 340; // card width + gap
    const targetScroll =
      direction === 'next'
        ? carousel.scrollLeft + scrollAmount
        : carousel.scrollLeft - scrollAmount;

    carousel.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
  const projectCarousel = new ProjectCarousel();
});

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
