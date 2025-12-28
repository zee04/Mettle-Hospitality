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

class FlippingCoverFlow {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.carousel = document.getElementById("logo-carousel");
    this.prevBtn = document.getElementById("carousel-prev");
    this.nextBtn = document.getElementById("carousel-next");
    this.modal = document.getElementById("project-modal");
    this.modalClose = document.querySelector(".modal-close-btn");

    this.projects = [
      {
        title: "VANTARA NIWAS - MACHAAN",
        type: "Luxury Hospitality",
        description:
          "Launched the MACHAAN restaurant inside Vantara Niwas, a seven-star hotel owned by Anant Ambani, hosting an exclusive dinner for Mr. Ambani and other special guests.",
        logo: "images/project-images/vantaralogo.jpg",
      },
      {
        title: "Little Food Co.",
        type: "Culinary Consultancy",
        description:
          "Enhanced catering and delivery for this premier Mumbai brand, servicing clients like Spotify and Nykaa by elevating dishes, optimizing workflows, and implementing data tracking.",
        logo: "images/project-images/littlefoodlogo.PNG",
      },
      {
        title: "META - WhatsApp Ad Film",
        type: "Food Styling",
        description:
          "Provided comprehensive food styling and kitchen design consultation for the ad film, ensuring authentic culinary scene portrayal.",
        logo: "images/project-images/whatsapplogo.png",
      },
      {
        title: "Moonshine",
        type: "Brand Positioning",
        description:
          "Developed the brand identity and 'Be Better' tagline, creating a social media strategy focused on sustainability for this unique mead brand.",
        logo: "images/project-images/moonshine.png",
      },
      {
        title: "VIRAASAT",
        type: "Contemporary Indian Restaurant",
        description:
          "Collaborated on a 300-seat restaurant in Mysore focusing on Northern Frontier Cuisine, blending traditional flavors with modern techniques.",
        logo: "images/project-images/virasatlogo.png",
      },
      {
        title: "Basque by Breve",
        type: "Concept Development",
        description:
          "Developed a concept café in Bandra inspired by St. Sebastian cheesecake, featuring unique varieties and a gourmet sandwich shop.",
        logo: "images/project-images/basque.png",
      },
      {
        title: "Phat Fillings",
        type: "Premium Pie Delivery",
        description:
          "Led the creation of a premium delivery brand for pies with Indian and Australian flavors, featured in Vogue and Upper Crust.",
        logo: "images/project-images/phat logo.png",
      },
      {
        title: "ZEKI",
        type: "Upscale Casual Bistro",
        description:
          "Developed an upscale bistro in Andheri West focused on global cuisine, designing the kitchen, curating crockery, and crafting an international menu.",
        logo: "images/project-images/zekilogo.PNG",
      },
      {
        title: "Doppler",
        type: "Heritage Café",
        description:
          "Conceptualized a café in a historic Jaipur haveli, redefining the experience as the city's premier slow bar destination.",
        logo: "images/project-images/doppler.png",
      },
      {
        title: "Sarabi",
        type: "Modern Indian Restaurant",
        description:
          "An upscale 12,000 sqft space offering contemporary progressive Indian food, designed for a discerning clientele.",
        logo: "images/project-images/saarbai.png",
      },
      {
        title: "Sunny Da Dhaba",
        type: "Brand Evolution",
        description:
          "Evolved a 30+ year legacy brand into a dual-floor destination with a Mediterranean café and a modern-Indian restaurant with playful tapas.",
        logo: "images/project-images/sunnyy.png",
      },
    ];

    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.populateCarousel();
    this.bindEvents();
  }

  populateCarousel() {
    this.carousel.innerHTML = this.projects
      .map(
        (project, idx) => `
      <div class="logo-card" data-index="${idx}">
        <img src="${project.logo}" alt="${project.title}" class="logo-card-image">
        <h3 class="logo-card-name">${project.title}</h3>
        ${
          project.type
            ? `<p class="logo-card-type">${project.type}</p>`
            : ""
        }
      </div>
    `
      )
      .join("");

    this.attachCardListeners();
  }

  attachCardListeners() {
    const cards = this.carousel.querySelectorAll(".logo-card");
    cards.forEach((card, idx) => {
      card.addEventListener("click", () => this.openModal(idx));
    });
  }

  openModal(index) {
    const project = this.projects[index];
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-subtitle").textContent =
      project.type || "Project";
    document.getElementById("modal-desc").textContent = project.description;
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.scroll("prev"));
    this.nextBtn.addEventListener("click", () => this.scroll("next"));
    this.modalClose.addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });
  }

  scroll(direction) {
    const scrollAmount = 320;
    const targetScroll =
      direction === "next"
        ? this.carousel.scrollLeft + scrollAmount
        : this.carousel.scrollLeft - scrollAmount;

    this.carousel.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // existing slideshow + nav init...

  new FlippingCoverFlow(".logo-carousel-container");
});

