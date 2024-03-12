export default function getListStudentIds(data){
    let idarr=[];
    if (!Array.isArray)
    {
        return []
    }
    else if(typeof(data) == 'string')
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
