const express = require('express');
const fileSystem = require('fs');

const app = express();
const SERVER_PORT = 1245;
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * script to count the students in a CSV file.
 * @param {String} filePath The path to the CSV file.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fileSystem.readFile(filePath, (error, content) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (content) {
        const reportSections = [];
        const lines = content.toString('utf-8').trim().split('\n');
        const studentCategories = {};
        const headerFields = lines[0].split(',');
        const studentFields = headerFields.slice(0, headerFields.length - 1);

        for (const row of lines.slice(1)) {
          const studentData = row.split(',');
          const studentValues = studentData.slice(0, studentData.length - 1);
          const category = studentData[studentData.length - 1];
          if (!Object.keys(studentCategories).includes(category)) {
            studentCategories[category] = [];
          }
          const studentInfo = studentFields.map((fieldName, index) => [
            fieldName,
            studentValues[index],
          ]);
          studentCategories[category].push(Object.fromEntries(studentInfo));
        }

        const totalStudentCount = Object.values(studentCategories).reduce(
          (prev, curr) => (prev || []).length + curr.length,
        );
        reportSections.push(`Number of students: ${totalStudentCount}`);
        for (const [category, students] of Object.entries(studentCategories)) {
          reportSections.push([
            `Number of students in ${category}: ${students.length}.`,
            'List:',
            students.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportSections.join('\n'));
      }
    });
  }
});

app.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (_, response) => {
  const responseSections = ['This is the list of our students'];

  countStudents(DATABASE_FILE)
    .then((report) => {
      responseSections.push(report);
      const responseMessage = responseSections.join('\n');
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', responseMessage.length);
      response.statusCode = 200;
      response.write(Buffer.from(responseMessage));
    })
    .catch((err) => {
      responseSections.push(err instanceof Error ? err.message : err.toString());
      const responseMessage = responseSections.join('\n');
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', responseMessage.length);
      response.statusCode = 200;
      response.write(Buffer.from(responseMessage));
    });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on PORT ${SERVER_PORT}`);
});

module.exports = app;
