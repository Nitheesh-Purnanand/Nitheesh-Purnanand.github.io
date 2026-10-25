// Small bits of behaviour. Delete anything you don't want.

const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Restore the visitor's last choice
const saved = localStorage.getItem("theme");
if (saved === "dark") {
  root.dataset.theme = "dark";
  toggle.textContent = "☀️";
}

// Flip between light and dark
toggle.addEventListener("click", () => {
  const isDark = root.dataset.theme === "dark";
  if (isDark) {
    delete root.dataset.theme;
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  } else {
    root.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  }
});

// Keep the copyright year current
document.getElementById("year").textContent = new Date().getFullYear();
