const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

//this is for reading the json file
app.get('/pets', function(request, response, next){
    fs.readFile("./pets.json", function(error, data){
        if (error){
            next(error);
        }
        const allpets = JSON.parse(data);
        response.send(allpets);
    })
});

//this is a function to deal with the pet
app.get('/pets/:petid', function(request, response, next){
    const id = Number.parseInt(request.params.petid);
    console.log("id petnum: ", id)
    fs.readFile("./pets.json", function(error,data){ //for files . is required
        const everyPets = JSON.parse(data);

        if (id > everyPets.length-1 || id < 0){
            next({});
        } else {
            response.send(everyPets[id]);
        }
    })
})

//this is a middleware where NEXT will access
app.use((error, request , response, next) => {
console.log("app.use triggered");
console.error(error.stack);
response.status(404).send("DOES NOT EXIST!")
})

//this is the place to make write function
app.get('/pets', function(request, response,){
    fs.readFile("./pets.json", function(error, data){

        //code for reading

    })
    fs.writeFile("./pets.json", function(error, data){

        //code for writing

    })
})

//this enables the listening function
app.listen(port, ()=> {
    console.log(`Listening using port${port}`);
})

