const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * script to count num of the students in a CSV file.
 * @param {String} filePath The path to the CSV data file.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const report_parts = [];
        const Lines_of_files = data.toString('utf-8').trim().split('\n');
        const stdgrps = {};
        const field_names = Lines_of_files[0].split(',');
        const std_prop_names = field_names.slice(
          0,
          field_names.length - 1,
        );

        for (const line of Lines_of_files.slice(1)) {
          const stdRcrd = line.split(',');
          const studentPropValues = stdRcrd.slice(
            0,
            stdRcrd.length - 1,
          );
          const field = stdRcrd[stdRcrd.length - 1];
          if (!Object.keys(stdgrps).includes(field)) {
            stdgrps[field] = [];
          }
          const studentEntries = std_prop_names.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          stdgrps[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(stdgrps).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        report_parts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(stdgrps)) {
          report_parts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(report_parts.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
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
