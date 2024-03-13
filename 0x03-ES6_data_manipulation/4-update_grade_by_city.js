export default function updateStudentGradeByCity(data, location, newGrades) {
  const def_grade = { grade: 'N/A' };
  if (data instanceof Array) {
    return data
      .filter((student) => student.location === location)
      .map((student) => ({
        id: student.id,
        firstName: student.firstName,
        location: student.location,
        grade: (newGrades
          .filter((grade) => grade.studentId === student.id)
          .pop() || def_grade).grade,
      }));
  }
  return [];
}
