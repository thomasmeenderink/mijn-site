// Scroll-reveal: elementen met .reveal faden in zodra ze in beeld komen
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Header krijgt een rand zodra je scrolt
const header = document.querySelector(".site-header");
const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Achtergrondgloed volgt de muis
window.addEventListener(
  "pointermove",
  (e) => {
    document.body.style.setProperty("--mx", `${e.clientX}px`);
    document.body.style.setProperty("--my", `${e.clientY}px`);
  },
  { passive: true }
);

// Spotlight op kaarten
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--cx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--cy", `${e.clientY - rect.top}px`);
  });
});

// Magnetische knoppen: bewegen licht mee met de muis
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

// Jaartal in de footer
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
