const mongo = require('mongoose');
const mongoDBURL = "mongodb://localhost:27017/simple_chat_application"

mongo.connect(mongoDBURL,{useNewUrlParser: true, useUnifiedTopology: true},(err,connection)=>{
    if(err){
        //console.log("Error Occurred while connecting to the DataBase");
        //console.log(err);
        
    }
    else{
        
        mongo.connection.createCollection("Messages",(err,data)=>{
            if(err){
                //console.log("Error Occured While creating the Messages Collection");
                //console.log(err);
                
            }
            else{
                console.log("Messages Collection Created Sucessfully");
            }
        })

        mongo.connection.createCollection("Users",(err,data)=>{
            if(err){
                //console.log("Error occured while creating the Users Collection ");
                //console.log(err);
                
            }
            else{
                console.log("Users Collection Created Successfully");
            }
        })
    }
})


const db = mongo.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});

db.once("open", () => {
    console.log("SUCESSFULLY OPENED THE DATABASE");
});

module.exports = mongo.connection;