export default function getListStudentIds(data){
    let idarr=[];
    if (!Array.isArray(data))
    {
        return []
    }
    else
    {
        for (var i of data)
        {
           idarr.push(i.id) 
        }
        return idarr;
    }
}
