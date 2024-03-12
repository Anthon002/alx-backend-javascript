export default function getListStudentIds(data){
	if (data instanceof Array) {
    		return (data.map((student) => student.id));
  }
  return [];
}
