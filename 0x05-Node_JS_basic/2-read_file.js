const fs = require('fs');

/**
 * script to count the students from a CSV file.
 * @param {String} path_to_data The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (path_to_data) => {
  if (!fs.existsSync(path_to_data)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(path_to_data).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(path_to_data, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const std_grps = {};
  const field_names_db = fileLines[0].split(',');
  const studentPropNames = field_names_db.slice(0, field_names_db.length - 1);

  for (const line of fileLines.slice(1)) {
    const studentRecord = line.split(',');
    const std_prp_vals = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!Object.keys(std_grps).includes(field)) {
      std_grps[field] = [];
    }
    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, std_prp_vals[idx]]);
    std_grps[field].push(Object.fromEntries(studentEntries));
  }

  const total_stds = Object
    .values(std_grps)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${total_stds}`);
  for (const [field, group] of Object.entries(std_grps)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
