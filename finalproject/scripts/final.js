// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle mobile nav
document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("hidden");
});

// Contact form fake submit
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-status").classList.remove("hidden");
    form.reset();
  });
}
