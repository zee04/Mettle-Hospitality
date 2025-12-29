/* ============================================================
   METAL HOSPITALITY — Unified app.js
   Covers: Navigation, Hero Slideshow, Work Carousel, Timeline,
   Service Loop Rotation
   ============================================================ */

/* ---------- NAVIGATION (hamburger → X, right drawer) ---------- */
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
}

/* ---------- INDEX PAGE — HERO SLIDESHOW ---------- */
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
  });
}

function nextSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, 5000); // every 5 seconds
}

/* ---------- WORK PAGE — CAROUSEL + FLIP LOGIC ---------- */
const carousel = document.getElementById("logo-carousel");

if (carousel) {
  const projects = [
    { title: "VANTARA NIWAS - MACHAAN Launch", logo: "images/project-images/vantaralogo.jpg", desc: "Launched the MACHAAN restaurant inside Vantara Niwas, a seven-star hotel owned by Anant Ambani, hosting an exclusive dinner for Mr. Ambani and other special guests." },
    { title: "Little Food Co.", logo: "images/project-images/littlefoodlogo.PNG", desc: "Enhanced catering and delivery for this premier Mumbai brand, servicing clients like Spotify and Nykaa by elevating dishes, optimizing workflows, and implementing data tracking." },
    { title: "META - WhatsApp Privacy Ad Film", logo: "images/project-images/whatsapplogo.png", desc: "Provided comprehensive food styling and kitchen design consultation for the ad film, ensuring authentic culinary scene portrayal." },
    { title: "Moonshine", logo: "images/project-images/moonshine.png", desc: "Developed the brand identity and 'Be Better' tagline, creating a social media strategy focused on sustainability for this unique mead brand." },
    { title: "VIRAASAT - Aaverina Hospitality", logo: "images/project-images/virasatlogo.png", desc: "Collaborated on a 300-seat restaurant in Mysore focusing on Northern Frontier Cuisine, blending traditional flavors with modern techniques." },
    { title: "Basque by Breve", logo: "images/project-images/basque.png", desc: "Developed a concept café in Bandra inspired by St. Sebastian cheesecake, featuring unique varieties and a gourmet sandwich shop." },
    { title: "Phat Fillings", logo: "images/project-images/phat logo.png", desc: "Led the creation of a premium delivery brand for pies with Indian and Australian flavors, featured in Vogue and Upper Crust." },
    { title: "ZEKI", logo: "images/project-images/zekilogo.PNG", desc: "Developed an upscale bistro in Andheri West focused on global cuisine, designing the kitchen, curating crockery, and crafting an international menu." },
    { title: "Doppler", logo: "images/project-images/doppler.png", desc: "Conceptualized a café for Boomerang Hospitality in a historic Jaipur haveli, redefining the experience as the city's premier slow bar destination." },
    { title: "Sarabi", logo: "images/project-images/saarbai.png", desc: "An upscale 12,000 sqft space offering contemporary progressive Indian food, designed for a discerning clientele." },
    { title: "Sunny Da Dhaba", logo: "images/project-images/sunnyy.png", desc: "Evolved a 30+ year legacy brand into a dual-floor destination with a Mediterranean café and a modern-Indian restaurant with playful tapas." }
  ];

  // Build cards dynamically
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "logo-card";
    card.innerHTML = `
      <div class="logo-card-inner">
        <div class="logo-card-front">
          <img src="${p.logo}" alt="${p.title}">
        </div>
        <div class="logo-card-back" style="
            background-image:url(${p.logo});
            background-size:60%;
            background-position:center;
            background-repeat:no-repeat;
            background-blend-mode:overlay;">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>
      </div>`;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    carousel.appendChild(card);
  });

  // Carousel scroll arrows
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const scrollAmount = 300;

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
}

/* ---------- TIMELINE — Fade-in on scroll ---------- */
const timeline = document.querySelector(".timeline-container");
if (timeline) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(timeline);
}

/* ---------- SERVICES PAGE — Rotating Loop Diagram ---------- */
const loopRing = document.querySelector(".loop-ring");
if (loopRing) {
  // CSS handles rotation; JS fallback for browsers that block CSS animations
  let angle = 0;
  setInterval(() => {
    angle = (angle + 0.2) % 360;
    loopRing.style.transform = `rotate(${angle}deg)`;
  }, 50);
}
