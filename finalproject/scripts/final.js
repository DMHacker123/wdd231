document.addEventListener("DOMContentLoaded", () => {
  loadServices();
});

const LOCAL_STORAGE_KEY = "servicesData";
const CACHE_EXPIRATION_MS = 1000 * 60 * 60 * 24; // 24 hours
let lastFocusedElement = null;

async function loadServices() {
  try {
    let services = getCachedServices();

    if (!services) {
      services = await getServicesData();
      cacheServices(services);
    }

    renderServices(services);
  } catch (error) {
    console.error("Error loading services:", error);
    const container = document.getElementById("services-list");
    if (container) {
      container.innerHTML = `<p style="color:red;">Sorry, we couldn't load the services right now. Please try again later.</p>`;
    }
  }
}

function getCachedServices() {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_EXPIRATION_MS) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return null;
    }
    return parsed.data;
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return null;
  }
}

function cacheServices(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
}

async function getServicesData() {
  const response = await fetch('data/services.json');
  if (!response.ok) {
    throw new Error(`Network response was not ok (status: ${response.status})`);
  }
  return await response.json();
}

function renderServices(services) {
  const container = document.getElementById("services-list");
  if (!container) throw new Error("The container with ID 'services-list' was not found.");

  container.innerHTML = "";

  services.forEach((service, index) => {
    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <h3>${service.icon} ${service.title}</h3>
      <p>${service.description}</p>
      <ul>
        <li><strong>Price:</strong> ${service.price}</li>
        <li><strong>Duration:</strong> ${service.duration}</li>
      </ul>
      <button class="cta-button" data-index="${index}">Learn More</button>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('.cta-button[data-index]').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      openModal(services[index]);
    });
  });
}

function openModal(service) {
  lastFocusedElement = document.activeElement;

  document.getElementById('modal-title').textContent = service.title;
  document.getElementById('modal-description').textContent = service.description;
  document.getElementById('modal-price').textContent = service.price;
  document.getElementById('modal-duration').textContent = service.duration;

  const modal = document.getElementById('service-modal');
  modal.classList.remove('hidden');

  const content = modal.querySelector('.modal-content');
  content.setAttribute('tabindex', '-1');
  content.focus();

  document.addEventListener('keydown', trapTabKey);
  document.addEventListener('keydown', handleEscKey);
}

function closeModal() {
  const modal = document.getElementById('service-modal');
  modal.classList.add('hidden');

  if (lastFocusedElement) lastFocusedElement.focus();

  document.removeEventListener('keydown', trapTabKey);
  document.removeEventListener('keydown', handleEscKey);
}

function trapTabKey(e) {
  if (e.key !== 'Tab') return;

  const modal = document.getElementById('service-modal');
  const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

function handleEscKey(e) {
  if (e.key === 'Escape') closeModal();
}

// One-time modal setup
document.querySelector('.close-button').addEventListener('click', closeModal);
document.getElementById('service-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
