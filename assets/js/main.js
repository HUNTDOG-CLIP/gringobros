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

/* ---------- Scroll: contador, barra de progreso y menú ---------- */
const slides = [...document.querySelectorAll(".slide")];
const total = slides.length;
const pad = (n) => String(n).padStart(2, "0");
const $cur = document.getElementById("cur");
const $bar = document.getElementById("progress");
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const menuLinks = [...menu.querySelectorAll("[data-go]")];

document.getElementById("tot").textContent = pad(total);

function setActive(i) {
  $cur.textContent = pad(i + 1);
  menuLinks.forEach((a) => a.setAttribute("aria-current", String(+a.dataset.go === i)));
}

// Sección visible → contador
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) setActive(slides.indexOf(en.target)); });
}, { rootMargin: "-45% 0px -50% 0px" });
slides.forEach((s) => io.observe(s));

// Barra de progreso según el scroll
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  $bar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Links internos
document.querySelectorAll("[data-go]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    const target = slides[+a.dataset.go];
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${target.id}`);
  })
);

// Animación de entrada al hacer scroll
const revealEls = document.querySelectorAll(".slide__in > *, .modes li, .plan, .steps li, .quote, .member");
revealEls.forEach((el) => el.classList.add("reveal"));
const ro = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
revealEls.forEach((el) => ro.observe(el));

/* ---------- Menú ---------- */
function openMenu() { menu.hidden = false; menuBtn.setAttribute("aria-expanded", "true"); menu.querySelector("a").focus(); }
function closeMenu() { if (menu.hidden) return; menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
menuBtn.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
