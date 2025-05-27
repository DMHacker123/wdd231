document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('members');
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');

  // Set current year and last modified date
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Toggle menu visibility for hamburger button
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show"); // Updated to match enhanced CSS
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  // Toggle grid/list view classes
  gridBtn?.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listBtn?.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });

  // Load members from JSON and display
  loadMembers();
});

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
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" />
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

  const eligibleMembers = members.filter(m => m.membership === 2 || m.membership === 3);
  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const selected = shuffled.slice(0, count);

  spotlightContainer.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
      <p><strong>Membership:</strong> ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
    `;

    spotlightContainer.appendChild(card);
  });
  
}

