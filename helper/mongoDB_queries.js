const mongoDB = require("./mongoDB");

let insertData = function(collection,data){
    return new Promise ((resolve,reject)=>{
        mongoDB.collection(collection).insertOne(data,(err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                let stmt = 'Document Inserted Successfull In'+collection;
                return resolve(stmt);
            }
        })
    })
}

let allDocsinCollection = function(){
    return new Promise((resolve,reject)=>{
        mongoConn.collection('Messages').find({}).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

let chatDocs = function(collection,name){
    return new Promise((resolve,reject)=>{
        mongoConn.collection(collection).find({ username : name }).toArray((err,data)=>{
            if(err){
                return reject(err);
            }
            else{
                return resolve(data);
            }
        })
    })
}

module.exports = {
    insertData : insertData,
    allDocsinCollection : allDocsinCollection,
    chatDocs : chatDocs
}