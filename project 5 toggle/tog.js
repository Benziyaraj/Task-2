const btn = document.getElementById("toggle-theme");

// Initialize theme
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
    updateButton(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    updateButton(theme);
  }
})();

// Toggle theme
btn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateButton(next);
});

// Update button text/icon
function updateButton(theme) {
  btn.textContent = theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode";
}
