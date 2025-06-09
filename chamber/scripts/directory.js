document.addEventListener("DOMContentLoaded", () => {
  // Footer Dates
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Hamburger Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  menuToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  // Grid/List Toggle
  const container = document.getElementById('members');
  document.getElementById('gridView')?.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });
  document.getElementById('listView')?.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });

  // Load Members
  loadMembers();

  // Form Submission Handling (GET)
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new URLSearchParams(new FormData(form)).toString();
      window.location.href = `thankyou.html?${formData}`;
    });
  }

  // Thank You Page Population
  if (window.location.pathname.includes("thankyou.html")) {
    const data = getQueryParams();
    document.getElementById('firstName').textContent = data.first;
    document.getElementById('lastName').textContent = data.last;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('business').textContent = data.business;
    document.getElementById('date').textContent = data.date;
    document.getElementById('membership').textContent = data.membership;
  }

  // Membership Benefit Description Display
  const membershipSelect = document.getElementById('membership');
  const benefitsBox = document.getElementById('benefits');
  const benefits = {
    1: 'Basic directory listing and newsletter access.',
    2: 'Includes all Member benefits + featured directory listing and monthly event invites.',
    3: 'All Silver benefits + homepage spotlight and premium event sponsorship opportunities.'
  };
  if (membershipSelect && benefitsBox) {
    membershipSelect.addEventListener('change', () => {
      const selected = membershipSelect.value;
      benefitsBox.innerHTML = selected ? `<p><strong>Benefits:</strong> ${benefits[selected]}</p>` : '';
    });
  }

  // Modal Logic
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', e => {
      const modalId = e.currentTarget.getAttribute('data-modal');
      document.getElementById(modalId)?.classList.add('open');
    });
  });
  document.querySelectorAll('[data-close]').forEach(span => {
    span.addEventListener('click', e => {
      const modalId = e.currentTarget.getAttribute('data-close');
      document.getElementById(modalId)?.classList.remove('open');
    });
  });
});

// Load and display members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
    displaySpotlights(members);
  } catch (error) {
    console.error('Error loading member data:', error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('members');
  if (!container) return;
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" width="150" height="150" loading="lazy" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
      <p><strong>Membership:</strong> ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
    `;
    container.appendChild(card);
  });
}

function displaySpotlights(members) {
  const spotlightContainer = document.getElementById('spotlight-container');
  if (!spotlightContainer) return;

  const eligible = members.filter(m => m.membership === 2 || m.membership === 3);
  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);
  spotlightContainer.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="150" height="150" loading="lazy" />
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
    `;
    spotlightContainer.appendChild(card);
  });
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    first: params.get('first') || 'N/A',
    last: params.get('last') || 'N/A',
    email: params.get('email') || 'N/A',
    phone: params.get('phone') || 'N/A',
    business: params.get('business') || 'N/A',
    date: params.get('date') || 'N/A',
    membership: params.get('membership') || 'N/A'
  };
}
