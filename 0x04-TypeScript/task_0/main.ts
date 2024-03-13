interface Student{
    firstName: string,
    lastName: string,
    age: number,
    location: string,
}

const std1: Student = {
    firstName: 'John',
    lastName: 'Doe',
    age: 32,
    location: 'USA',
};
const std2: Student = {
    firstName: 'Mary',
    lastName: 'Sue',
    age: 31,
    location:'UK'
}

let stdarr: Array<Student> = [std1, std2]

export function renderStdTable(studentlst: Array<Student>){
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend','<th>firstName</th>');
    tr.insertAdjacentHTML('beforeend','<th>lastName</th>');

    thead.appendChild(tr);
    table.appendChild(thead);

    for (const val of studentlst){
        let btr = document.createElement('tr');
        btr.insertAdjacentHTML('beforeend',`<td> ${val.firstName} </td>`);
        btr.insertAdjacentHTML('beforeend',`<td> ${val.lastName} </td>`);
    }
}
renderStdTable(stdarr);
