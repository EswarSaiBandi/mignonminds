const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");
const reveals = document.querySelectorAll(".reveal");
const steps = document.querySelectorAll(".step");
const stepContent = document.getElementById("step-content");
const chips = document.querySelectorAll(".chip");
const tiles = document.querySelectorAll(".tile");
const stats = document.querySelectorAll("[data-count]");
const quotes = document.querySelectorAll(".quote");
const dots = document.querySelectorAll(".dot");
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const stepImage = document.getElementById("step-image");
const stepIndex = document.getElementById("step-index");
const processProgressBar = document.getElementById("process-progress-bar");
const processShotJumpers = document.querySelectorAll(".jump-step");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger img");
const caseFilters = document.querySelectorAll(".case-filter");
const caseCards = document.querySelectorAll(".case-card");
const heroSlider = document.getElementById("hero-slider");
const heroSlides = document.querySelectorAll(".hero-slider .hero-media");
const heroDots = document.querySelectorAll(".hero-dot");
const baRanges = document.querySelectorAll("[data-ba-range]");

const stepData = {
  1: {
    title: "Discover",
    body: "We listen to your goals, use-case, budget, and timeline to create a direction that fits your context.",
    image: "assets/images/process-1.png"
  },
  2: {
    title: "Define",
    body: "We align scope, milestones, and deliverables with transparency so everyone moves with confidence.",
    image: "assets/images/process-2.png"
  },
  3: {
    title: "Design",
    body: "Our team translates ideas into practical concepts, visual plans, and material-ready decisions.",
    image: "assets/images/process-3.png"
  },
  4: {
    title: "Develop",
    body: "Execution planning starts with procurement, scheduling, coordination, and quality assurance.",
    image: "assets/images/process-4.jpg"
  },
  5: {
    title: "Deliver",
    body: "We execute with precision and keep communication active through each visible milestone.",
    image: "assets/images/process-5.png"
  },
  6: {
    title: "Delight",
    body: "After delivery, we refine, support, and ensure long-term value from your investment.",
    image: "assets/images/process-6.png"
  }
};

function setProcessStep(id) {
  steps.forEach((s) => s.classList.toggle("active", Number(s.dataset.step) === id));
  stepContent.innerHTML = `<h3>${stepData[id].title}</h3><p>${stepData[id].body}</p>`;
  if (stepImage) {
    stepImage.src = stepData[id].image;
    stepImage.alt = `${stepData[id].title} step visual`;
  }
  if (stepIndex) {
    stepIndex.textContent = `Step ${String(id).padStart(2, "0")}`;
  }
  if (processProgressBar) {
    processProgressBar.style.width = `${(id / 6) * 100}%`;
  }
}

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

let activeHeroSlide = 0;
function showHeroSlide(index) {
  if (!heroSlides.length) return;
  activeHeroSlide = index;
  heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  heroDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}
heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showHeroSlide(index));
});
if (heroSlides.length) {
  setInterval(() => {
    showHeroSlide((activeHeroSlide + 1) % heroSlides.length);
  }, 4500);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);
reveals.forEach((el) => revealObserver.observe(el));

steps.forEach((step) => {
  step.addEventListener("click", () => {
    const id = Number(step.dataset.step);
    setProcessStep(id);
  });
});

processShotJumpers.forEach((shot) => {
  shot.addEventListener("click", () => {
    const id = Number(shot.dataset.step);
    if (id) setProcessStep(id);
  });
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const filter = chip.dataset.filter;
    tiles.forEach((tile) => {
      const cat = tile.dataset.cat || "";
      const show = filter === "all" || cat.includes(filter);
      tile.classList.toggle("hidden", !show);
    });
  });
});

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const count = Number(target.dataset.count);
      const duration = 1200;
      const start = performance.now();

      const animate = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.floor(progress * count);
        target.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      statObserver.unobserve(target);
    });
  },
  { threshold: 0.6 }
);
stats.forEach((el) => statObserver.observe(el));

let activeSlide = 0;
function showSlide(index) {
  activeSlide = index;
  quotes.forEach((q, i) => q.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showSlide(index));
});

caseFilters.forEach((button) => {
  button.addEventListener("click", () => {
    caseFilters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const segment = button.dataset.segment;
    caseCards.forEach((card) => {
      const matches = segment === "all" || (card.dataset.segment || "").includes(segment);
      card.classList.toggle("hidden", !matches);
    });
  });
});

baRanges.forEach((range) => {
  const frame = range.closest("[data-ba-frame]");
  const afterWrap = frame?.querySelector("[data-ba-after-wrap]");
  const update = () => {
    if (afterWrap) afterWrap.style.width = `${range.value}%`;
  };
  range.addEventListener("input", update);
  update();
});

setProcessStep(1);

setInterval(() => {
  showSlide((activeSlide + 1) % quotes.length);
}, 4200);

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    feedback.textContent = "⚠ Please complete all required fields correctly.";
    feedback.style.color = "#ed8b4a";
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const service = formData.get("service");
  const location = formData.get("location");
  const message = formData.get("message") || "";

  feedback.textContent = `✓ Thanks, ${name}. Opening your email client...`;
  feedback.style.color = "#7ed4c7";

  const subject = encodeURIComponent(`Service Inquiry - ${service}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nService: ${service}\nLocation: ${location}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:care@mignonminds.com?subject=${subject}&body=${body}`;
  
  setTimeout(() => contactForm.reset(), 2000);
});

document.getElementById("year").textContent = new Date().getFullYear();

// GALLERY FILTERING
const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    
    galleryFilters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");
    
    galleryItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

lightboxTriggers.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "Project image";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
});

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = ((x - cx) / cx) * 6;
    const dy = ((y - cy) / cy) * -6;
    card.style.transform = `rotateX(${dy}deg) rotateY(${dx}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

document.querySelectorAll(".btn").forEach((button) => {
  button.classList.add("magnetic");
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

const parallaxSections = document.querySelectorAll(".hero, .architecture-touch, .wip-showcase, .before-after");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  parallaxSections.forEach((section, index) => {
    const speed = 0.02 + index * 0.004;
    section.style.backgroundPosition = `center ${Math.round(scrollY * speed)}px`;
  });
});
