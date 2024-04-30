const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * module to count the students in a CSV 
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const rptPrts = [];
        const linesFile = data.toString('utf-8').trim().split('\n');
        const academicClubs = {};
        const databaseFldNms = linesFile[0].split(',');
        const studentPropNames = databaseFldNms.slice(
          0,
          databaseFldNms.length - 1,
        );

        for (const line of linesFile.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(academicClubs).includes(field)) {
            academicClubs[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          academicClubs[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(academicClubs).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        rptPrts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(academicClubs)) {
          rptPrts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(rptPrts.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const repnTxt = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', repnTxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(repnTxt));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const repnTxt = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', repnTxt.length);
          res.statusCode = 200;
          res.write(Buffer.from(repnTxt));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const repnTxt = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', repnTxt.length);
          res.statusCode = 200;
          res.write(Buffer.from(repnTxt));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
