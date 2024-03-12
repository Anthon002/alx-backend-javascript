export default function getStudentsByLocation(data, location){
    let objarr = []
    for (let i of data){
        if (i.location == location){
            objarr.push(i);
        }
    }
    return objarr    
    
}
