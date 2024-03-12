export default function getStudentsByLocation(data, location){
	if (data instanceof Array) {
	     let objarray = data.filter((student) => student.location === location);
	     return objarray;
	}
  return []; 
}
