const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const preloader = document.querySelector(".preloader");

const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  preloader?.classList.add("is-hidden");
});

if (window.lucide) {
  window.lucide.createIcons();
}

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (window.gsap && window.ScrollTrigger && !hasReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("[data-hero-parallax]", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.4,
    },
  });

  gsap.utils.toArray("[data-parallax-card]").forEach((card) => {
    gsap.to(card.querySelector("img"), {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.45,
      },
    });
  });

  gsap.utils.toArray("[data-float]").forEach((element) => {
    gsap.to(element, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.55,
      },
    });
  });

  gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay: Math.min(index * 0.03, 0.18),
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
      },
    });
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "none";
  });
}

const countElements = document.querySelectorAll("[data-count]");

if (countElements.length) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count || 0);
        const start = performance.now();
        const duration = 1200;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          element.textContent = `${value}+`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            element.textContent = `${target}+`;
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    },
    { threshold: 0.65 }
  );

  countElements.forEach((element) => countObserver.observe(element));
}

const sections = [...document.querySelectorAll("main section[id]")];

if (sections.length && navLinks.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -58% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

document.querySelectorAll("[data-price-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.priceTab;

    document.querySelectorAll("[data-price-tab]").forEach((button) => {
      button.classList.toggle("is-active", button === tab);
    });

    document.querySelectorAll("[data-price-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.pricePanel === target);
    });
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item?.classList.toggle("is-open");
  });
});

document.querySelectorAll("[data-compare]").forEach((comparison) => {
  const input = comparison.querySelector("input");

  const setPosition = (value) => {
    const numeric = Math.max(0, Math.min(100, Number(value)));
    comparison.style.setProperty("--position", `${numeric}%`);
    comparison.style.setProperty("--position-num", String(numeric / 100 || 0.01));
  };

  if (input) {
    setPosition(input.value);
    input.addEventListener("input", (event) => setPosition(event.target.value));
  }
});

if (window.Swiper) {
  new Swiper(".review-slider", {
    loop: true,
    speed: 720,
    spaceBetween: 18,
    slidesPerView: 1,
    autoplay: {
      delay: 4800,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".review-next",
      prevEl: ".review-prev",
    },
    breakpoints: {
      760: {
        slidesPerView: 2,
      },
    },
  });
}

const quoteForm = document.querySelector("#quoteForm");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const status = quoteForm.querySelector(".form-status");
  const formData = new FormData(quoteForm);
  const service = formData.get("service") || "usługa";
  const name = formData.get("name") || "Klient";

  if (status) {
    status.textContent = `Dziękujemy, ${name}. Zapytanie dotyczące usługi "${service}" zostało przygotowane do wysłania.`;
  }
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(`.site-nav a[href="${currentPage}"]`).forEach((link) => {
  link.classList.add("is-active");
});

document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("page-out");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, hasReducedMotion ? 0 : 180);
  });
});
