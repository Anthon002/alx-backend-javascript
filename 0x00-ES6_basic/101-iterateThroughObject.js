export default function iterateThroughObject(reportWithIterator) {
  const emps = [];

  for (const employee of reportWithIterator) {
    emps.push(employee);
  }

  return emps.join(' | ');
}
