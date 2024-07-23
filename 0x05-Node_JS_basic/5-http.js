const httpServer = require('http');
const fileSystem = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const serverApp = httpServer.createServer();
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * script to count the students in a CSV file.
 * @param {String} filePath path of the file.
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

const SERVER_ROUTES = [
  {
    path: '/',
    handler(_, response) {
      const message = 'Hello Holberton School!';

      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', message.length);
      response.statusCode = 200;
      response.write(Buffer.from(message));
    },
  },
  {
    path: '/students',
    handler(_, response) {
      const responseSections = ['This is the list of our students'];

      countStudentsInCSV(DATABASE_FILE)
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
    },
  },
];

serverApp.on('request', (request, response) => {
  for (const routeHandler of SERVER_ROUTES) {
    if (routeHandler.path === request.url) {
      routeHandler.handler(request, response);
      break;
    }
  }
});

serverApp.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = serverApp;
