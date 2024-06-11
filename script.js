document.getElementById('addCourses').addEventListener('click', function() {
  const numCourses = prompt('Enter the total number of courses you are currently studying:');
  if (numCourses && !isNaN(numCourses)) {
      const coursesContainer = document.getElementById('coursesContainer');
      coursesContainer.innerHTML = '';
      for (let i = 0; i < numCourses; i++) {
          const courseDiv = document.createElement('div');
          courseDiv.classList.add('course-input');
          courseDiv.innerHTML = `
              <h3>Enter Course</h3> 
              <input type='Course Name' placeholder="Course Name" required>
              <input type="number" placeholder="Credit Hours" class="courseCredit" min="0" required>
              <input type="text" placeholder="Grade" class="courseGrade" required>
          `;
          coursesContainer.appendChild(courseDiv);
      }
  } else {
      alert('Please Try to Fill with Valid Values');
  }
});

document.getElementById('calculateGPA').addEventListener('click', function() {
  const totalCredits = parseFloat(document.getElementById('totalCredits').value);
  const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);
  if (isNaN(totalCredits) || isNaN(currentCGPA) || currentCGPA < 0 || currentCGPA > 4) {
      alert('Please enter valid total credits and current CGPA.');
      return;
  }

  const courseCredits = document.querySelectorAll('.courseCredit');
  const courseGrades = document.querySelectorAll('.courseGrade');
  if (courseCredits.length === 0 || courseGrades.length === 0) {
      alert('Please add and fill in the courses.');
      return;
  }

  const gradePoints = {
      'A+': 4.00, 'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00, 'B-': 2.67,
      'C+': 2.33, 'C': 2.00, 'C-': 1.67, 'D+': 1.33, 'D': 1.00, 'F': 0.00
  };

  let totalCurrentCredits = totalCredits;
  let totalCurrentPoints = totalCredits * currentCGPA;
  let semesterCredits = 0;
  let semesterPoints = 0;

  for (let i = 0; i < courseCredits.length; i++) {
      const credit = parseFloat(courseCredits[i].value);
      const grade = courseGrades[i].value.toUpperCase();
      if (isNaN(credit) || !gradePoints.hasOwnProperty(grade)) {
          alert('Please enter valid credit hours and grades.');
          return;
      }
      semesterCredits += credit;
      semesterPoints += credit * gradePoints[grade];
  }

  const semesterGPA = semesterPoints / semesterCredits;
  totalCurrentCredits += semesterCredits;
  totalCurrentPoints += semesterPoints;
  const calculatedCGPA = totalCurrentPoints / totalCurrentCredits;

  document.getElementById('semesterGPA').value = semesterGPA.toFixed(2);
  document.getElementById('calculatedCGPA').value = calculatedCGPA.toFixed(2);
});

document.getElementById('reset').addEventListener('click', function() {
  document.getElementById('totalCredits').value = '';
  document.getElementById('currentCGPA').value = '';
  document.getElementById('coursesContainer').innerHTML = '';
  document.getElementById('calculatedCGPA').value = '';
  document.getElementById('semesterGPA').value = '';
});
