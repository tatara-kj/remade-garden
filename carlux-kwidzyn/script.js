const company = {
  phoneDisplay: "669 196 548",
  phoneHref: "+48669196548",
  email: "carluxkwidzyn@gmail.com",
  address: "Obory 10, 82-500 Kwidzyn",
  facebook: "https://www.facebook.com/p/CarLux-Kwidzyn-61550493941139/"
};

const pages = [
  ["index.html", "Strona główna"],
  ["uslugi.html", "Usługi"],
  ["realizacje.html", "Realizacje"],
  ["opinie.html", "Opinie"],
  ["kontakt.html", "Kontakt"]
];

function renderChrome() {
  const current = location.pathname.split("/").pop() || "index.html";
  const nav = pages.map(([href, label]) =>
    `<a href="${href}" class="${current === href ? "active" : ""}">${label}</a>`
  ).join("");

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main-content">Przejdź do treści</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="CarLux Kwidzyn — strona główna">
            <img src="assets/logo-mark.svg" alt="" width="44" height="44">
            <span><strong>CarLux Kwidzyn</strong><small>Auto Detailing</small></span>
          </a>
          <nav class="desktop-nav" aria-label="Główna nawigacja">
            ${nav}
            <a class="btn btn--gold" href="tel:${company.phoneHref}" data-track="phone">Zadzwoń teraz</a>
          </nav>
          <button class="menu-toggle" type="button" aria-label="Otwórz menu" aria-expanded="false" aria-controls="mobile-menu">☰</button>
        </div>
      </header>
      <nav class="mobile-menu" id="mobile-menu" aria-label="Nawigacja mobilna" aria-hidden="true">
        ${nav}
        <a href="tel:${company.phoneHref}">${company.phoneDisplay}</a>
      </nav>`;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <div class="cta-strip" aria-hidden="true">
        <div class="cta-marquee">
          ${["Korekta lakieru","Auto detailing Kwidzyn","Pranie tapicerki","Zabezpieczenie lakieru","Zadzwoń 669 196 548","Korekta lakieru","Auto detailing Kwidzyn","Pranie tapicerki","Zabezpieczenie lakieru","Zadzwoń 669 196 548"].map(x => `<span>${x}</span>`).join("")}
        </div>
      </div>
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html">
                <img src="assets/logo-mark.svg" alt="" width="44" height="44">
                <span><strong>CarLux Kwidzyn</strong><small>Auto Detailing</small></span>
              </a>
              <p style="margin-top:20px;max-width:370px">Detailing, korekta i odnowa lakieru oraz profesjonalna pielęgnacja wnętrza w Kwidzynie.</p>
            </div>
            <div><div class="footer-title">Nawigacja</div><div class="footer-links">${nav}</div></div>
            <div><div class="footer-title">Kontakt</div><div class="footer-links">
              <a href="tel:${company.phoneHref}">${company.phoneDisplay}</a>
              <a href="mailto:${company.email}">${company.email}</a>
              <span>${company.address}</span>
            </div></div>
            <div><div class="footer-title">Social media</div><div class="footer-links">
              <a href="${company.facebook}" target="_blank" rel="noopener">Facebook CarLux ↗</a>
              <span>Godziny: do potwierdzenia</span>
            </div></div>
          </div>
          <div class="footer-bottom"><span>© ${new Date().getFullYear()} CarLux Kwidzyn</span><span>Materiały wizualne w wersji demonstracyjnej należy zastąpić zdjęciami firmy.</span></div>
        </div>
      </footer>
      <a class="floating-facebook" href="${company.facebook}" target="_blank" rel="noopener" aria-label="Facebook CarLux">f</a>
      <div class="mobile-actions">
        <a class="btn btn--gold" href="tel:${company.phoneHref}">☎ Zadzwoń</a>
        <a class="btn btn--line" href="kontakt.html#wycena">Wyceń usługę</a>
      </div>`;
  }
}

renderChrome();

const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("is-scrolled", scrollY > 18);
updateHeader();
addEventListener("scroll", updateHeader, { passive: true });

const toggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const setMenuState = open => {
  mobileMenu?.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  toggle?.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  if (toggle) toggle.textContent = open ? "×" : "☰";
};
toggle?.addEventListener("click", () => setMenuState(!mobileMenu.classList.contains("open")));
mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  setMenuState(false);
}));
addEventListener("keydown", event => {
  if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
    setMenuState(false);
    toggle?.focus();
  }
});

const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 }) : null;
document.querySelectorAll(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("visible"));

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0px";
  });
});

document.querySelectorAll(".before-after").forEach(component => {
  const range = component.querySelector("input");
  const wrap = component.querySelector(".after-wrap");
  const handle = component.querySelector(".ba-handle");
  range?.addEventListener("input", () => {
    wrap.style.width = `${range.value}%`;
    handle.style.left = `${range.value}%`;
  });
});

const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");
filterButtons.forEach(btn => btn.addEventListener("click", () => {
  filterButtons.forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");
  const filter = btn.dataset.filter;
  galleryItems.forEach(item => {
    item.hidden = filter !== "all" && item.dataset.category !== filter;
  });
}));
filterButtons.forEach(btn => btn.setAttribute("aria-pressed", String(btn.classList.contains("active"))));

const estimator = document.querySelector("[data-estimator]");
if (estimator) {
  const updateEstimate = () => {
    const car = estimator.querySelector("[name=estimate-car]").value;
    const service = estimator.querySelector("[name=estimate-service]").value;
    estimator.querySelector("[data-estimate-result]").textContent =
      `${car} • ${service}: orientacyjna wycena wymaga potwierdzenia po obejrzeniu auta lub zdjęć.`;
  };
  estimator.querySelectorAll("select").forEach(el => el.addEventListener("change", updateEstimate));
  updateEstimate();
}

document.querySelectorAll("[data-demo-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    status.classList.add("show");
    status.textContent = "To wersja demonstracyjna — dane nie zostały wysłane. Aby skontaktować się teraz, zadzwoń pod 669 196 548.";
  });
});

document.querySelectorAll(".upload-box input").forEach(input => {
  input.addEventListener("change", () => {
    const label = input.closest(".upload-box").querySelector("[data-upload-label]");
    label.textContent = input.files.length ? `Wybrano plików: ${input.files.length}` : "Kliknij lub przeciągnij zdjęcia auta";
  });
});

document.querySelectorAll(".calendar-grid button:not(.unavailable)").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".calendar-grid").querySelectorAll("button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
  });
});
document.querySelectorAll(".time-slot").forEach(button => button.addEventListener("click", () => {
  button.parentElement.querySelectorAll(".time-slot").forEach(b => b.classList.remove("selected"));
  button.classList.add("selected");
}));

document.querySelectorAll("[data-load-map]").forEach(button => {
  button.addEventListener("click", () => {
    const map = button.closest(".map");
    const src = button.dataset.loadMap;
    if (!map || !src) return;
    map.innerHTML = `<iframe title="Mapa dojazdu do CarLux Kwidzyn" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${src}"></iframe>`;
  }, { once: true });
});
