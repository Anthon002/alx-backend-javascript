export default function getStudentsByLocation(data, location){
    let objarr = []
	if (Array.isArray(data)){
    for (let i of data){
        if (i.location == location){
            objarr.push(i);
        }
    }
	}
    return objarr    
    
}
