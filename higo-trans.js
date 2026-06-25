const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".higo-nav a");
const loader = document.querySelector(".page-loader");
const mobileCta = document.querySelector(".mobile-cta");
const calculator = document.querySelector("#transportCalculator");
const quoteForm = document.querySelector("#quoteForm");
const serviceButtons = document.querySelectorAll("[data-service-choice]");
const galleryFilters = document.querySelectorAll("[data-gallery-filter]");
const galleryItems = document.querySelectorAll("[data-gallery-item]");
const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const serviceConfig = {
  palety: {
    label: "Palety",
    fullLabel: "Palety i towary firmowe",
    rate: 4.2,
    minimum: 340,
    weightFactor: 0.035,
    palletFactor: 22,
  },
  budowlane: {
    label: "Budowlane",
    fullLabel: "Materiały budowlane",
    rate: 4.65,
    minimum: 420,
    weightFactor: 0.05,
    palletFactor: 26,
  },
  maszyny: {
    label: "Maszyny",
    fullLabel: "Maszyny i sprzęt",
    rate: 5.35,
    minimum: 520,
    weightFactor: 0.065,
    palletFactor: 28,
  },
  przeprowadzki: {
    label: "Przeprowadzki",
    fullLabel: "Meble i przeprowadzki",
    rate: 4.9,
    minimum: 460,
    weightFactor: 0.04,
    palletFactor: 18,
  },
  express: {
    label: "Pilny",
    fullLabel: "Transport pilny",
    rate: 5.75,
    minimum: 520,
    weightFactor: 0.045,
    palletFactor: 26,
  },
  stale: {
    label: "Stałe trasy",
    fullLabel: "Stałe trasy dla firm",
    rate: 3.9,
    minimum: 320,
    weightFactor: 0.03,
    palletFactor: 18,
  },
};

const cityCoordinates = {
  bialystok: [53.1325, 23.1688],
  bydgoszcz: [53.1235, 18.0084],
  gdansk: [54.352, 18.6466],
  "gdańsk": [54.352, 18.6466],
  goleniow: [53.5639, 14.8288],
  "goleniów": [53.5639, 14.8288],
  gorzow: [52.7368, 15.2288],
  "gorzów": [52.7368, 15.2288],
  katowice: [50.2649, 19.0238],
  kolobrzeg: [54.1757, 15.5834],
  "kołobrzeg": [54.1757, 15.5834],
  koszalin: [54.1944, 16.1722],
  krakow: [50.0647, 19.945],
  "kraków": [50.0647, 19.945],
  lublin: [51.2465, 22.5684],
  lodz: [51.7592, 19.456],
  "łódź": [51.7592, 19.456],
  nowogard: [53.6744, 15.1178],
  olsztyn: [53.7784, 20.4801],
  opole: [50.6751, 17.9213],
  poznan: [52.4064, 16.9252],
  "poznań": [52.4064, 16.9252],
  rzeszow: [50.0413, 21.999],
  "rzeszów": [50.0413, 21.999],
  stargard: [53.3367, 15.0499],
  szczecin: [53.4285, 14.5528],
  swinoujscie: [53.9105, 14.2471],
  "świnoujście": [53.9105, 14.2471],
  torun: [53.0138, 18.5984],
  "toruń": [53.0138, 18.5984],
  warszawa: [52.2297, 21.0122],
  wroclaw: [51.1079, 17.0385],
  "wrocław": [51.1079, 17.0385],
  zielona: [51.9356, 15.5062],
};

let map;
let routeLayer;
let markerLayer;
let mapResizeObserver;
const mapShell = document.querySelector(".map-shell");
let hasBooted = false;
let latestEstimate = {
  distance: 63,
  price: 359,
  service: "palety",
  from: "Nowogard",
  to: "Szczecin",
};

const bootPage = () => {
  if (hasBooted) return;
  hasBooted = true;
  loader?.classList.add("is-hidden");
  initMap();
  calculateAndRender();
};

if (document.readyState === "complete") {
  window.setTimeout(bootPage, 0);
} else {
  window.addEventListener("load", bootPage);
}

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
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
  mobileCta?.classList.toggle("is-visible", window.scrollY > Math.min(520, window.innerHeight * 0.45));
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (window.gsap && window.ScrollTrigger && !hasReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("[data-hero-parallax] img", {
    yPercent: 9,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.82,
      delay: Math.min(index * 0.025, 0.2),
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
    { rootMargin: "-35% 0px -58% 0px", threshold: 0 }
  );

  sections.forEach((section) => activeObserver.observe(section));
}

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.serviceChoice;
    setSelectedService(service);
    calculateAndRender();
    document.querySelector("#wycena")?.scrollIntoView({ behavior: hasReducedMotion ? "auto" : "smooth" });
  });
});

document.querySelectorAll("[data-route], [data-route-card]").forEach((button) => {
  button.addEventListener("click", () => {
    const route = button.dataset.route || button.dataset.routeCard;
    const [from, to] = route.split("|");
    const fromInput = calculator?.elements.from;
    const toInput = calculator?.elements.to;
    const pickupInput = quoteForm?.elements.pickup;
    const deliveryInput = quoteForm?.elements.delivery;

    if (fromInput && toInput) {
      fromInput.value = from;
      toInput.value = to;
    }

    if (pickupInput && deliveryInput) {
      pickupInput.value = from;
      deliveryInput.value = to;
    }

    calculateAndRender();
    document.querySelector("#wycena")?.scrollIntoView({ behavior: hasReducedMotion ? "auto" : "smooth" });
  });
});

calculator?.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateAndRender();
});

calculator?.addEventListener("input", (event) => {
  const target = event.target;

  if (target.name === "service") {
    setSelectedService(target.value, false);
  }

  calculateAndRender();
});

galleryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.galleryFilter;

    galleryFilters.forEach((item) => item.classList.toggle("is-active", item === button));
    galleryItems.forEach((item) => {
      const isVisible = filter === "all" || item.dataset.galleryItem === filter;
      item.classList.toggle("is-hidden", !isVisible);
    });
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".faq-item")?.classList.toggle("is-open");
  });
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(quoteForm);
  const status = quoteForm.querySelector(".form-status");
  const name = data.get("name") || "Klient";
  const phone = data.get("phone") || "";
  const pickup = data.get("pickup") || latestEstimate.from;
  const delivery = data.get("delivery") || latestEstimate.to;
  const cargo = data.get("cargo") || serviceConfig[latestEstimate.service].fullLabel;
  const subject = `Zapytanie transportowe: ${pickup} - ${delivery}`;
  const body = [
    `Dzień dobry,`,
    ``,
    `Proszę o wycenę transportu.`,
    ``,
    `Imię i nazwisko: ${name}`,
    `Telefon: ${phone}`,
    `E-mail: ${data.get("email") || "brak"}`,
    `Firma: ${data.get("company") || "brak"}`,
    ``,
    `Miejsce załadunku: ${pickup}`,
    `Miejsce rozładunku: ${delivery}`,
    `Data transportu: ${data.get("date") || "do ustalenia"}`,
    `Rodzaj ładunku: ${cargo}`,
    `Szacowana waga: ${data.get("cargoWeight") || "do ustalenia"}`,
    `Orientacyjny dystans ze strony: ${latestEstimate.distance} km`,
    `Wstępna wycena ze strony: od ${latestEstimate.price} zł`,
    ``,
    `Opis / uwagi:`,
    `${data.get("message") || "brak"}`,
  ].join("\n");

  const mailto = `mailto:grzegorzolkowski@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  if (status) {
    status.textContent = `${name}, zapytanie zostało przygotowane w programie pocztowym.`;
  }
});

function setSelectedService(service, syncSelect = true) {
  if (!serviceConfig[service]) return;

  serviceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.serviceChoice === service);
  });

  if (syncSelect && calculator?.elements.service) {
    calculator.elements.service.value = service;
  }

  const requestCargo = quoteForm?.elements.cargo;
  if (requestCargo) {
    const label = serviceConfig[service].fullLabel;
    [...requestCargo.options].forEach((option) => {
      option.selected = option.textContent === label || option.textContent.includes(serviceConfig[service].label);
    });
  }
}

function calculateAndRender() {
  if (!calculator) return;

  const from = calculator.elements.from.value.trim() || "Nowogard";
  const to = calculator.elements.to.value.trim() || "Szczecin";
  const service = calculator.elements.service.value || "palety";
  const config = serviceConfig[service] || serviceConfig.palety;
  const weight = Math.max(0, Number(calculator.elements.weight.value || 0));
  const pallets = Math.max(0, Number(calculator.elements.pallets.value || 0));
  const loading = calculator.elements.loading.checked;
  const returnTrip = calculator.elements.returnTrip.checked;
  const fromCoords = getCoordinates(from);
  const toCoords = getCoordinates(to);
  const oneWayDistance = Math.max(8, Math.round(haversine(fromCoords, toCoords) * 1.35));
  const billingDistance = returnTrip ? Math.round(oneWayDistance * 1.18) : oneWayDistance;
  const loadingFee = loading ? 160 : 0;
  const rawPrice =
    billingDistance * config.rate + weight * config.weightFactor + pallets * config.palletFactor + loadingFee + 95;
  const price = Math.max(config.minimum, Math.round(rawPrice / 10) * 10 - 1);

  latestEstimate = {
    distance: oneWayDistance,
    price,
    service,
    from,
    to,
  };

  updateText("[data-estimate-price]", price);
  updateText("[data-estimate-distance]", oneWayDistance);
  updateText("[data-estimate-rate]", config.rate.toFixed(2));
  updateText("[data-estimate-service]", config.label);
  updateText("[data-console-service]", config.fullLabel);
  updateText("[data-console-start]", from);
  updateText("[data-console-end]", to);
  updateText("[data-console-distance]", oneWayDistance);
  updateText("[data-console-price]", price);

  if (quoteForm) {
    quoteForm.elements.pickup.value = from;
    quoteForm.elements.delivery.value = to;
    quoteForm.elements.estimatedDistance.value = oneWayDistance;
    quoteForm.elements.estimatedPrice.value = price;
  }

  updateMap(fromCoords, toCoords, from, to);
}

function getCoordinates(value) {
  const normalized = value.toLowerCase().trim().replace(/\s+/g, " ");
  const firstWord = normalized.split(",")[0];

  if (cityCoordinates[normalized]) return cityCoordinates[normalized];
  if (cityCoordinates[firstWord]) return cityCoordinates[firstWord];

  return cityCoordinates.nowogard;
}

function haversine(start, end) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const latDistance = toRad(end[0] - start[0]);
  const lngDistance = toRad(end[1] - start[1]);
  const startLat = toRad(start[0]);
  const endLat = toRad(end[0]);
  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos(startLat) * Math.cos(endLat) * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

function initMap() {
  if (!window.L) return;

  map = L.map("routeMap", {
    zoomControl: false,
    scrollWheelZoom: false,
  }).setView([52.65, 18.7], 6);

  L.control.zoom({ position: "bottomright" }).addTo(map);
  const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  mapShell?.classList.add("is-map-ready");
  routeLayer = L.layerGroup().addTo(map);
  markerLayer = L.layerGroup().addTo(map);

  scheduleMapRefresh();
  tileLayer.once("load", () => scheduleMapRefresh());

  if (mapShell && "ResizeObserver" in window) {
    mapResizeObserver = new ResizeObserver(() => scheduleMapRefresh());
    mapResizeObserver.observe(mapShell);
  }

  window.addEventListener("resize", () => scheduleMapRefresh(), { passive: true });

  if (mapShell && "IntersectionObserver" in window) {
    const mapVisibilityObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        scheduleMapRefresh();
        observer.disconnect();
      },
      { rootMargin: "160px 0px" }
    );

    mapVisibilityObserver.observe(mapShell);
  }
}

function updateMap(fromCoords, toCoords, fromLabel, toLabel) {
  if (!map || !routeLayer || !markerLayer || !window.L) return;

  routeLayer.clearLayers();
  markerLayer.clearLayers();

  const line = L.polyline([fromCoords, toCoords], {
    color: "#e5362e",
    weight: 5,
    opacity: 0.82,
  }).addTo(routeLayer);

  const startIcon = createRouteIcon("#1fba7a");
  const endIcon = createRouteIcon("#ff7a1a");

  L.marker(fromCoords, { icon: startIcon }).addTo(markerLayer).bindPopup(`Załadunek: ${fromLabel}`);
  L.marker(toCoords, { icon: endIcon }).addTo(markerLayer).bindPopup(`Rozładunek: ${toLabel}`);

  const bounds = line.getBounds().pad(0.32);
  scheduleMapRefresh(() => {
    map.fitBounds(bounds, { animate: !hasReducedMotion, duration: 0.65 });
  });
}

function scheduleMapRefresh(afterRefresh) {
  if (!map) return;

  const refresh = () => map.invalidateSize({ animate: false, pan: false });
  const callback = typeof afterRefresh === "function" ? afterRefresh : null;

  window.requestAnimationFrame(() => {
    refresh();
    callback?.();
    window.setTimeout(refresh, 120);
    window.setTimeout(refresh, 420);
  });
}

function createRouteIcon(color) {
  return L.divIcon({
    className: "route-marker",
    html: `<span style="--marker:${color}"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function updateText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}
