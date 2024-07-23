const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} Path_arg The path argument to the CSV file
 * @author Chiendu Anulugwo <chineduanulugwo@gmail.com>
 */
const countStudents = (Path_arg) => {
  if (!fs.existsSync(Path_arg)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(Path_arg).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(Path_arg, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const std_grps = {};
  const DB_fields = fileLines[0].split(',');
  const std_Prop_names = DB_fields.slice(0, DB_fields.length - 1);

  for (const line of fileLines.slice(1)) {
    const std_records = line.split(',');
    const std_prop_vals = std_records.slice(0, std_records.length - 1);
    const field = std_records[std_records.length - 1];
    if (!Object.keys(std_grps).includes(field)) {
      std_grps[field] = [];
    }
    const studentEntries = std_Prop_names
      .map((propName, idx) => [propName, std_prop_vals[idx]]);
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
