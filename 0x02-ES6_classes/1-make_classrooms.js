import ClassRoom from './0-classroom'
export default function initializeRooms(){
    let valueArr = [19, 20, 34];
    let objArr = []
    for (let value of valueArr){
        objArr.push(new ClassRoom(value))
    }
    return objArr;
}
