const {MongoClient, ObjectID} = require('mongodb');

//get a mongoClient
var getMongoClient = (url, options, callback) => {
    return callback(new MongoClient(url, options));
};

//get a db Object
var getDBObject = (client, dbName, callback) => {
    return callback(client.db(dbName));
};

//Creating an ObjectId instance by passing id value.
var getObjectId = (id) => {
    return new ObjectID(id);
};

var closeClient = (client, callback) => {
    if(client.close()){
        return callback('Client closed successfully');
    }
    return callback('Something went wrong to close the client.'); 
};

module.exports = {
    getMongoClient,
    getDBObject,
    getObjectId,
    closeClient
}