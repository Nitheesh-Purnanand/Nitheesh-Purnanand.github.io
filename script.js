// ============================================================
// Small interactions. Nothing here is required for the page to work.
// ============================================================

const root = document.documentElement;
const fedoraBtn = document.getElementById("agentPBtn");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Agent P mode (night / secret lair theme) ---------- */
function setAgentMode(on) {
  if (on) {
    root.dataset.theme = "agent";
  } else {
    delete root.dataset.theme;
  }
  fedoraBtn.setAttribute("aria-pressed", String(on));
  fedoraBtn.querySelector(".fedora__label").textContent = on ? "Daylight mode" : "Agent P mode";
  localStorage.setItem("agent-mode", on ? "on" : "off");
}

if (localStorage.getItem("agent-mode") === "on") {
  setAgentMode(true);
}

fedoraBtn.addEventListener("click", () => {
  setAgentMode(root.dataset.theme !== "agent");
});

/* ---------- Cards drift in as you scroll ---------- */
const revealTargets = document.querySelectorAll(
  ".card, .section__head, .section__lede, .gag__bubble, .hero__facts"
);

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-in"));
} else {
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Safety net: never leave content invisible if the observer never fires.
  window.setTimeout(() => {
    revealTargets.forEach((el) => el.classList.add("is-in"));
  }, 2600);
}

/* ---------- The footer Perry button ---------- */
const perryBtn = document.getElementById("perryBtn");

perryBtn.addEventListener("click", () => {
  const original = "Poke Perry";
  const poked = "Dooby dooby doo bah!";

  if (perryBtn.classList.contains("is-poked")) return;

  perryBtn.classList.add("is-poked");
  perryBtn.textContent = poked;

  window.setTimeout(() => {
    perryBtn.classList.remove("is-poked");
    perryBtn.textContent = original;
  }, 2600);
});

/* ---------- Keep the copyright year honest ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
