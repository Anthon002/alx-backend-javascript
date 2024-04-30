const fs = require('fs');

/**
 * module to count the students into CSV
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const academicClubs = {};
      const databaseFieldName = fileLines[0].split(',');
      const stdPropnms = databaseFieldName
        .slice(0, databaseFieldName.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord
          .slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(academicClubs).includes(field)) {
          academicClubs[field] = [];
        }
        const studentEntries = stdPropnms
          .map((propName, idx) => [propName, studentPropValues[idx]]);
        academicClubs[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object
        .values(academicClubs)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(academicClubs)) {
        const stdNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${stdNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
