let fs = require('fs');
const http = require('http');
const port = 8000;


const server = http.createServer( (request, response) => {
    const URL = request.url;
    const method = request.method;
    console.log(URL);
    const splitURLArray = URL.split("/");
    const petNumString = splitURLArray[2];
    const petNum = parseInt(petNumString)

    if (URL == "/pets"){//
        fs.readFile("./pets.json", "utf8", function(err, data){
            if(err){
                response.statusCode = 404;
                response.end("Internal server error");
                return;
            }
            const allPets = JSON.parse(data);
            console.log ("parsedDataArray", allPets);
            response.setHeader ('Content-Type','application/json');
            response.statusCode = 200;
            response.end(JSON.stringify(allPets));
        });

    }else{
        console.log(`Attempting to find pet num ${petNum}`);
        fs.readFile("./pets.json", "utf8", function(err,data){
            if (err){
                response.statusCode = 404;
                response.end("Internal Server Error");
                return;
            }
            
            const allPets = JSON.parse(data);
            const onePet = allPets[petNum];
            
            if(!onePet){
                response.statusCode = 404;
                response.setHeader ('Content-Type','application/json');
                response.end("Doesnt Exist!");

        } else {
            console.log ("one pet: ", onePet);
            response.setHeader ('Content-Type','application/json');
            response.statusCode = 200;
            response.end(JSON.stringify(onePet));
        }
    });
}
});

server.listen(port, ()=>{
    console.log( `Listening on port: ${port}`);
    });