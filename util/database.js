const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://ashawale3194:zdTJzQw3JYYy0mkt@cluster0.axnhhnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(Client=>{
        console.log('...')
        console.log("Database Connected..")
        _db = Client.db();
        callback();
    })
    .catch(err=>{
        console.log(err);
        throw(err);
    })
}

const getDb = ()=>{
    if(_db){
        return _db;
    }

    return "No database found !!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;