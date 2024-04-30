const fs = require('fs');

/**
 * module to count the students into a CSV file
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const lines_file = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const academicClubs = {};
  const databaseFieldNames = lines_file[0].split(',');
  const studentPropNames = databaseFieldNames.slice(0, databaseFieldNames.length - 1);

  for (const line of lines_file.slice(1)) {
    const stdRec = line.split(',');
    const propVal_std = stdRec.slice(0, stdRec.length - 1);
    const field = stdRec[stdRec.length - 1];
    if (!Object.keys(academicClubs).includes(field)) {
      academicClubs[field] = [];
    }
    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, propVal_std[idx]]);
    academicClubs[field].push(Object.fromEntries(studentEntries));
  }

  const totalStudents = Object
    .values(academicClubs)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(academicClubs)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
