/* =========================
   NIVVI.IN - Main Script
   ========================= */

// =========================
// PRODUCT DATA
// =========================
const PRODUCTS = [
  {
    id: "midnight-racer-tee",
    name: "Midnight Racer Tee",
    price: 1199,
    image: "midnight racer.jpg",
    description: "A sharp, minimal embroidered tee crafted for everyday streetwear comfort."
  },
  {
    id: "shinobi-mark-tee",
    name: "Shinobi Mark Tee",
    price: 1099,
    image: "shinobi mark.jpg",
    description: "Inspired by underground culture, this tee balances detail and simplicity."
  },
  {
    id: "akira-thread-tee",
    name: "Akira Thread Tee",
    price: 1299,
    image: "akira thread.jpg",
    description: "Premium threadwork with clean finishing for a refined urban silhouette."
  },
  {
    id: "apex-line-shirt",
    name: "Apex Line Shirt",
    price: 1399,
    image: "apex line.jpg",
    description: "Structured fit and elevated style designed to stand out effortlessly."
  },
  {
    id: "couch-club-shirt",
    name: "Couch Club Shirt",
    price: 1299,
    image: "couch club.jpg",
    description: "Relaxed street fit with detailed embroidery made for all-day wear."
  },
  {
    id: "90s-mood-tee",
    name: "90s Mood Tee",
    price: 999,
    image: "90s mood.jpg",
    description: "Vintage-inspired mood with modern comfort and signature NIVVI identity."
  }
];

const WHATSAPP_NUMBER = "917016248695";
const SIZES = ["S", "M", "L", "XL"];

// =========================
// UTILITIES
// =========================
function formatPrice(price) {
  return `₹${price}`;
}

function buildWhatsAppURL(productName, size) {
  const text = `Hi, I want to order the ${productName} in size ${size}. Please share details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function sizeOptionsMarkup() {
  return SIZES.map((size) => `<option value="${size}">${size}</option>`).join("");
}

// =========================
// PRODUCT CARD
// =========================
function createProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      </div>

      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>

        <div class="select-row">
          <select class="size-select" data-size-for="${product.id}">
            ${sizeOptionsMarkup()}
          </select>
        </div>

        <div class="card-actions">
          <a href="product.html?id=${product.id}" class="btn-outline">
            View
          </a>
          <button class="btn-whatsapp" data-order-btn data-product-id="${product.id}">
            Order on WhatsApp
          </button>
        </div>
      </div>
    </article>
  `;
}

// =========================
// RENDER GRID
// =========================
function renderProductGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PRODUCTS.map(createProductCard).join("");
}

// =========================
// WHATSAPP BUTTON LOGIC
// =========================
function bindWhatsAppButtons() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-order-btn]");
    if (!btn) return;

    const productId = btn.getAttribute("data-product-id");
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const sizeSelect = document.querySelector(`[data-size-for="${productId}"]`);
    const selectedSize = sizeSelect ? sizeSelect.value : "M";

    const waURL = buildWhatsAppURL(product.name, selectedSize);
    window.open(waURL, "_blank");
  });
}

// =========================
// PRODUCT PAGE
// =========================
function renderProductDetailPage() {
  const detailRoot = document.getElementById("product-detail");
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  detailRoot.innerHTML = `
    <div class="product-detail-image-wrap">
      <img src="${product.image}" alt="${product.name}" class="product-detail-image" />
    </div>

    <div>
      <h1>${product.name}</h1>
      <p class="product-detail-price">${formatPrice(product.price)}</p>
      <p>${product.description}</p>

      <div class="select-row">
        <select class="size-select" data-size-for="${product.id}">
          ${sizeOptionsMarkup()}
        </select>
      </div>

      <button class="btn-whatsapp" data-order-btn data-product-id="${product.id}">
        Order on WhatsApp
      </button>
    </div>
  `;
}

// =========================
// HERO SLIDER (NEW)
// =========================
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (!slides.length) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}

// =========================
// MOBILE NAV
// =========================
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// =========================
// FOOTER YEAR
// =========================
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setYear();

  const page = document.body.dataset.page;

  if (page === "home") {
    renderProductGrid("product-grid-home");
  } else if (page === "collection") {
    renderProductGrid("product-grid-collection");
  } else if (page === "product") {
    renderProductDetailPage();
  }

  bindWhatsAppButtons();

  // INIT SLIDER
  initHeroSlider();
});
