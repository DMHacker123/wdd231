document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Points of Interest
  fetch("data/points-of-interest.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      const container = document.querySelector(".poi-grid");

      data.points.forEach((point, index) => {
        const card = document.createElement("div");
        card.classList.add("poi-card");

        const title = document.createElement("h2");
        title.textContent = point.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = point.image;
        img.alt = point.name;
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = point.address;

        const description = document.createElement("p");
        description.textContent = point.description;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.classList.add("learn-more-btn");
        button.dataset.index = index;

        card.append(title, figure, address, description, button);
        container.appendChild(card);

        button.addEventListener("click", () => {
          const modal = document.getElementById("modal");
          const modalTitle = document.getElementById("modal-title");
          const modalContent = document.getElementById("modal-content");

          modalTitle.textContent = point.name;
          modalContent.innerHTML = `
            <img src="${point.image}" alt="${point.name}" width="300" height="200" />
            <p><strong>Address:</strong> ${point.address}</p>
            <p>${point.description}</p>
          `;
          modal.classList.add("show");
          modalTitle.focus();
        });
      });
    })
    .catch((error) => console.error("Error loading points of interest:", error));

  // 2. Visit Message
  const messageContainer = document.createElement("div");
  messageContainer.id = "visit-message";
  messageContainer.style.padding = "1rem";
  messageContainer.style.margin = "1rem";
  messageContainer.style.backgroundColor = "#f0f8ff";
  messageContainer.style.border = "1px solid #ccc";
  messageContainer.style.borderRadius = "8px";
  messageContainer.style.textAlign = "center";
  messageContainer.style.fontWeight = "bold";

  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDifference = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    message = daysDifference < 1
      ? "Back so soon! Awesome!"
      : `You last visited ${daysDifference} day${daysDifference === 1 ? "" : "s"} ago.`;
  }

  messageContainer.textContent = message;
  document.body.insertBefore(messageContainer, document.body.firstChild);
  localStorage.setItem("lastVisit", now.toString());

  // 3. Hamburger Menu 1
  const toggleButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (toggleButton && nav) {
    toggleButton.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // 4. Hamburger Menu 2 (ARIA)
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("show");
    });
  }
});

// 5. Close Modal on Click Outside
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // safe alternative to cleanup
  }

  img.onload = () => {
  const ratio = img.naturalWidth / img.naturalHeight;
  img.style.width = '300px';
  img.style.height = `${300 / ratio}px`;
};

});


