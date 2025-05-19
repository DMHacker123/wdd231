import { renderSections } from "./Output.mjs";

const byuiCourse = {
    code: "WDD231",
    name: "Web Frontend Development I",
    sections: [
      {
        sectionNumber: 1,
        enrolled: 88,
        instructor: "Brother Bingham",
      },
      {
        sectionNumber: 2,
        enrolled: 81,
        instructor: "Sister Shultz",
      },
      {
        sectionNumber: 3,
        enrolled: 95,
        instructor: "Sister Smith",
      },
    ],
    changeEnrollment: function (sectionNumber, add = true) {
        const sectionIndex = this.sections.findIndex(
          (section) => section.sectionNumber == sectionNumber
        );
        if (sectionIndex >= 0) {
          if (add) {
            this.sections[sectionIndex].enrolled++;
          } else if (this.sections[sectionIndex].enrolled > 0) {
            this.sections[sectionIndex].enrolled--;
          }
          renderSections(this.sections); // 👈 Add this line to update the output
        }
      },
      
  };
  
  export default byuiCourse;
  