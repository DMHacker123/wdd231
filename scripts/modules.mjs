import byuiCourse from "./Course.mjs";
import { setTitle, renderSections } from "./Output.mjs";
import { populateSections } from "./Sections.mjs";

window.addEventListener("DOMContentLoaded", () => {
  setTitle(byuiCourse);
  renderSections(byuiCourse.sections);
  populateSections(byuiCourse.sections);

  // Event listeners
  document.querySelector("#enrollStudent").addEventListener("click", () => {
    const sectionNumber = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNumber, true);
  });

  document.querySelector("#dropStudent").addEventListener("click", () => {
    const sectionNumber = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNumber, false);
  });
});
