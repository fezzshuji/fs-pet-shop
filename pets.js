const fs = require('fs'); // add this to the top of your js file



const command = process.argv[2];
const choice = process.argv[2]; // comes in as a string


if(command == "read"){
fs.readFile("./pets.json","utf8", function(err, data){ //reads the file specified
    if (err){
        console.error(err);
    }else{
        console.log("readFile data", data);
        console.log("typeof data:", typeof data);
        const parsedDataArray = JSON.parse(data);

        choiceInt = parseInt(choice);
        if(choiceInt >=2){

            process.exit(1);
        }
        console.log(parsedDataArray[choiceInt]);

    }
});
}
