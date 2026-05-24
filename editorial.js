// Mignon Minds — Editorial interactions

document.addEventListener("DOMContentLoaded", () => {

  /* --------- Year --------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* --------- Mobile menu --------- */
  const menuToggle = document.getElementById("menu-toggle");
  const topnav = document.getElementById("topnav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = topnav?.classList.toggle("open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  topnav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      topnav.classList.remove("open");
      menuToggle?.classList.remove("is-open");
    });
  });

  /* --------- Reveal on scroll --------- */
  const reveals = document.querySelectorAll(".reveal");
  const revObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-shown");
          revObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  reveals.forEach((el) => revObs.observe(el));

  /* --------- Hero crossfade --------- */
  const heroSlides = document.querySelectorAll(".hero-visual img");
  let heroIdx = 0;
  if (heroSlides.length > 1) {
    setInterval(() => {
      heroSlides[heroIdx].classList.remove("is-active");
      heroIdx = (heroIdx + 1) % heroSlides.length;
      heroSlides[heroIdx].classList.add("is-active");
    }, 5400);
  }

  /* --------- Method (stepper) --------- */
  const movements = document.querySelectorAll(".movement");
  const stageImg = document.getElementById("method-stage-img");
  const stageTag = document.getElementById("method-stage-tag");
  const setMovement = (btn) => {
    movements.forEach((m) => m.classList.remove("is-active"));
    btn.classList.add("is-active");
    if (stageImg) {
      stageImg.style.opacity = "0";
      setTimeout(() => {
        stageImg.src = btn.dataset.img || stageImg.src;
        stageImg.alt = btn.querySelector(".movement-title")?.firstChild?.textContent?.trim() || "Method";
        stageImg.style.opacity = "1";
      }, 280);
    }
    if (stageTag) {
      stageTag.textContent = btn.dataset.tag || stageTag.textContent;
    }
  };
  movements.forEach((m) => m.addEventListener("click", () => setMovement(m)));
  if (movements[0]) setMovement(movements[0]);

  /* --------- Voices carousel --------- */
  const voices = document.querySelectorAll(".voice");
  const voiceDots = document.querySelectorAll(".voice-dot");
  let voiceIdx = 0;
  const showVoice = (i) => {
    voiceIdx = i;
    voices.forEach((v, k) => v.classList.toggle("is-active", k === i));
    voiceDots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  };
  voiceDots.forEach((d, i) => d.addEventListener("click", () => showVoice(i)));
  if (voices.length > 1) {
    setInterval(() => showVoice((voiceIdx + 1) % voices.length), 6000);
  }

  /* --------- FAQ accordion --------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("is-open");
    });
  });

  /* --------- Before/after compare --------- */
  document.querySelectorAll(".compare-range").forEach((range) => {
    const frame = range.closest(".compare-frame");
    const after = frame?.querySelector(".compare-after-wrap");
    const update = () => { if (after) after.style.width = `${range.value}%`; };
    range.addEventListener("input", update);
    update();
  });

  /* --------- Lightbox --------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  document.querySelectorAll("[data-lightbox] img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("is-open");
    });
  });
  lightboxClose?.addEventListener("click", () => lightbox.classList.remove("is-open"));
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("is-open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightbox?.classList.remove("is-open");
  });

  /* --------- Stat counters --------- */
  const counters = document.querySelectorAll("[data-count]");
  const cObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    },
    { threshold: 0.55 }
  );
  counters.forEach((el) => cObs.observe(el));

  /* --------- Contact form --------- */
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (feedback) {
        feedback.textContent = "Please complete the highlighted fields.";
        feedback.style.color = "#d2856a";
      }
      return;
    }
    const fd = new FormData(form);
    const name = fd.get("name");
    const phone = fd.get("phone");
    const service = fd.get("service");
    const location = fd.get("location") || "";
    const message = fd.get("message") || "";
    if (feedback) {
      feedback.textContent = `Thank you, ${name}. Opening your email client…`;
      feedback.style.color = "#c9a96e";
    }
    const subject = encodeURIComponent(`Project Inquiry — ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nService: ${service}\nLocation: ${location}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:care@mignonminds.com?subject=${subject}&body=${body}`;
    setTimeout(() => form.reset(), 1800);
  });

  /* --------- Cursor dot --------- */
  const dot = document.querySelector(".cursor-dot");
  if (dot) {
    let mx = 0, my = 0, dx = 0, dy = 0;
    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    const lerp = () => {
      dx += (mx - dx) * 0.18;
      dy += (my - dy) * 0.18;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      requestAnimationFrame(lerp);
    };
    lerp();
    document.querySelectorAll("a, button, .work, .discipline, .movement, .faq-item").forEach((el) => {
      el.addEventListener("mouseenter", () => dot.style.transform += " scale(2.6)");
      el.addEventListener("mouseleave", () => { /* re-set on next lerp */ });
    });
  }
});
