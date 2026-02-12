(() => {
  // Enable JS-enhanced styles (e.g., reveal animations).
  document.documentElement.classList.add("js");

  // Footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Active nav highlighting
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop()?.toLowerCase();
    const isActive = href === current || (current === "" && href === "index.html");
    if (isActive) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });

  // Prevent placeholder links that are explicitly disabled
  document.querySelectorAll('a[aria-disabled="true"]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
    a.setAttribute("tabindex", "-1");
  });

  // Subtle reveal-on-scroll
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

