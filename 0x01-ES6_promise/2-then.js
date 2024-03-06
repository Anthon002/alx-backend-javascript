export default function handleResponseFromAPI(promise){
    return new Promise((resolve, reject)=> {
        if (promise){
            resolve({
                status: 200,
                body: "success",
            })
        }else{
            new Error();
        }
    })
    .then(console.log("Got a response from the API"))
}
