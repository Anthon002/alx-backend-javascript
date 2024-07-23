const fileSystem = require('fs');

/**
 * script to count the students in a CSV file.
 * @param {String} filePath The path to the CSV data file.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fileSystem.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      reject(new Error('Cannot load the database'));
    }
    if (content) {
      const lines = content
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentCategories = {};
      const headerFields = lines[0].split(',');
      const studentFields = headerFields
        .slice(0, headerFields.length - 1);

      for (const row of lines.slice(1)) {
        const studentData = row.split(',');
        const studentValues = studentData
          .slice(0, studentData.length - 1);
        const category = studentData[studentData.length - 1];
        if (!Object.keys(studentCategories).includes(category)) {
          studentCategories[category] = [];
        }
        const studentInfo = studentFields
          .map((fieldName, index) => [fieldName, studentValues[index]]);
        studentCategories[category].push(Object.fromEntries(studentInfo));
      }

      const totalStudentCount = Object
        .values(studentCategories)
        .reduce((prev, curr) => (prev || []).length + curr.length);
      console.log(`Number of students: ${totalStudentCount}`);
      for (const [category, students] of Object.entries(studentCategories)) {
        const studentNamesList = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${category}: ${students.length}. List: ${studentNamesList}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
