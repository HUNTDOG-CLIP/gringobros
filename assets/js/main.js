/* =========================================================
   GRINGO BROS · configuración rápida
   ========================================================= */
const CONFIG = {
  whatsapp: "59163625636", // número sin + ni espacios
  mensajeWhatsApp: "Hola Gringo Bros, quiero información sobre las clases de inglés",
  // Precios en USD. Déjalo vacío ("") para mostrar "Consultar precio".
  precios: {
    test: "",     // Test Preparation      ej: "49"
    general: "",  // Inglés General        ej: "120"
    toefl: ""     // TOEFL Preparation     ej: "150"
  }
};

/* ---------- WhatsApp ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  const msg = a.dataset.wa || CONFIG.mensajeWhatsApp;
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Precios ---------- */
document.querySelectorAll("[data-price]").forEach((el) => {
  const v = CONFIG.precios[el.dataset.price];
  el.innerHTML = v ? `$${v} <small>USD</small>` : `Consultar <small>precio</small>`;
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Slideshow / scroll ---------- */
const html = document.documentElement;
const deck = document.getElementById("deck");
const slides = [...deck.querySelectorAll(".slide")];
const total = slides.length;
const pad = (n) => String(n).padStart(2, "0");
const $cur = document.getElementById("cur");
const $label = document.getElementById("slideLabel");
const $bar = document.getElementById("progress");
const $prev = document.getElementById("prev");
const $next = document.getElementById("next");
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const menuLinks = [...menu.querySelectorAll("[data-go]")];
let index = 0;

document.getElementById("tot").textContent = pad(total);

const mq = window.matchMedia("(min-width: 901px) and (min-height: 600px)");
const isSlides = () => html.classList.contains("is-slides");

function updateUI(i) {
  index = i;
  $cur.textContent = pad(i + 1);
  $bar.style.width = `${((i + 1) / total) * 100}%`;
  $label.textContent = slides[i].getAttribute("aria-label");
  $prev.disabled = i === 0;
  $next.disabled = i === total - 1;
  slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
  menuLinks.forEach((a) => a.setAttribute("aria-current", String(+a.dataset.go === i)));
}

function goTo(i, { push = true } = {}) {
  i = Math.max(0, Math.min(total - 1, i));
  if (isSlides()) {
    deck.style.transform = `translateX(${-i * 100}vw)`;
    slides[i].scrollTop = 0;
    updateUI(i);
  } else {
    slides[i].scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (push) history.replaceState(null, "", `#${slides[i].id}`);
}

function applyMode() {
  const want = mq.matches;
  html.classList.toggle("is-slides", want);
  if (want) {
    deck.style.transition = "none";
    deck.style.transform = `translateX(${-index * 100}vw)`;
    requestAnimationFrame(() => (deck.style.transition = ""));
  } else {
    deck.style.transform = "";
  }
  updateUI(index);
}

// Links internos (menú, botones "Ver cursos", logo)
document.querySelectorAll("[data-go]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    goTo(+a.dataset.go);
  })
);

$prev.addEventListener("click", () => goTo(index - 1));
$next.addEventListener("click", () => goTo(index + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") return closeMenu();
  if (!isSlides() || !menu.hidden) return;
  if (["INPUT", "TEXTAREA", "SUMMARY"].includes(document.activeElement?.tagName)) return;
  if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); goTo(index + 1); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goTo(index - 1); }
});

// Swipe horizontal (tablets en modo slides)
let tx = 0, ty = 0;
deck.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
deck.addEventListener("touchend", (e) => {
  if (!isSlides()) return;
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(index + (dx < 0 ? 1 : -1));
}, { passive: true });

// Rueda horizontal del trackpad
let wheelLock = false;
deck.addEventListener("wheel", (e) => {
  if (!isSlides() || wheelLock) return;
  if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    wheelLock = true;
    goTo(index + (e.deltaX > 0 ? 1 : -1));
    setTimeout(() => (wheelLock = false), 900);
  }
}, { passive: true });

// En modo scroll, el contador sigue la sección visible
const io = new IntersectionObserver((entries) => {
  if (isSlides()) return;
  entries.forEach((en) => { if (en.isIntersecting) updateUI(slides.indexOf(en.target)); });
}, { rootMargin: "-45% 0px -50% 0px" });
slides.forEach((s) => io.observe(s));

/* ---------- Menú ---------- */
function openMenu() { menu.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); menu.querySelector("a").focus(); }
function closeMenu() { if (menu.hidden) return; menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
menuBtn.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));

/* ---------- Inicio ---------- */
const fromHash = slides.findIndex((s) => `#${s.id}` === location.hash);
index = fromHash > 0 ? fromHash : 0;
applyMode();
mq.addEventListener("change", applyMode);
window.addEventListener("resize", () => { if (isSlides()) { deck.style.transition = "none"; deck.style.transform = `translateX(${-index * 100}vw)`; requestAnimationFrame(() => (deck.style.transition = "")); } });
if (!isSlides() && fromHash > 0) slides[fromHash].scrollIntoView();
