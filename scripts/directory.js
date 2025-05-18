// Display current year
document.getElementById("year").textContent = new Date().getFullYear();

// Display last modified date
document.getElementById("lastModified").textContent = document.lastModified;

// View toggle buttons
document.getElementById('gridView').addEventListener('click', () => {
  const container = document.getElementById('members');
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

document.getElementById('listView').addEventListener('click', () => {
  const container = document.getElementById('members');
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

// Load member data from JSON
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading member data:', error);
  }
}

// Display members in the directory
function displayMembers(members) {
  const container = document.getElementById('members');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-logo">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${['Member', 'Silver', 'Gold'][member.membership - 1]}</p>
    `;

    container.appendChild(card);
  });
}

// Initialize
loadMembers();
