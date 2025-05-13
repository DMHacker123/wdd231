  // Last modified date functionality
  const updateParagraph = document.querySelector(".update");
  if (updateParagraph) {
      const lastModified = new Date(document.lastModified);
      updateParagraph.textContent = `Last Update: ${lastModified.toLocaleString()}`;
  }
