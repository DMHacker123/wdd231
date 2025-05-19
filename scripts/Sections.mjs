// Sections.mjs
export function populateSections(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    sectionSelect.innerHTML = "";
  
    const defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "--";
    sectionSelect.appendChild(defaultOption);
  
    sections.forEach((section) => {
      const option = document.createElement("option");
      option.value = section.sectionNumber;
      option.textContent = `${section.sectionNumber}`;
      sectionSelect.appendChild(option);
    });
  }
  