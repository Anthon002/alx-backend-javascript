export default function getStudentIdsSum(data) {
  if (data instanceof Array) {
    return data.reduce(
      (previous, current) => previous.id || previous + current.id,
      0,
    );
  }
  return 0;
}
