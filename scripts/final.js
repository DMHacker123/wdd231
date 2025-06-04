document.getElementById('menu-toggle').addEventListener('click', function () {
  document.getElementById('navbar').classList.toggle('show');
});

// Update footer year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight current page link
const navLinks = document.querySelectorAll('.nav-list a');
const currentPath = window.location.pathname;

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath || currentPath.endsWith(link.getAttribute('href'))) {
    link.classList.add('active');
  }
  });