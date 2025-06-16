// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Toggle mobile nav menu
document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("open"); // Use .open to match CSS
});

// Handle fake contact form submit
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-status").classList.remove("hidden");
    form.reset();
  });
}

// Highlight the active nav link based on current URL
const currentPath = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("#nav-links a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});
