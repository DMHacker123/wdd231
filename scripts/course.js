const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("coursesContainer");
  const filterButtons = document.querySelectorAll(".certificate-buttons button");
  const totalCreditsEl = document.getElementById("totalCredits");

  function displayCourses(filteredCourses) {
    coursesContainer.innerHTML = "";

    filteredCourses.forEach(course => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.setAttribute("data-credits", course.credits);
      courseDiv.innerHTML = `
        <h3>${course.subject} ${course.number} - ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p><strong>Status:</strong> ${course.completed ? '✅ Completed' : '❌ In Progress'}</p>
      `;
      coursesContainer.appendChild(courseDiv);
    });

    updateTotalCredits();
  }

  function updateTotalCredits() {
    const courseElements = Array.from(document.querySelectorAll("#coursesContainer .course"));
    const totalCredits = courseElements.reduce((sum, course) => {
      return sum + parseInt(course.getAttribute("data-credits") || 0);
    }, 0);
    totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
  }

  // Initial display
  displayCourses(courses);

  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.textContent;
      if (filter === "All") {
        displayCourses(courses);
      } else {
        const filtered = courses.filter(c => c.subject === filter);
        displayCourses(filtered);
      }
    });
  });
});


