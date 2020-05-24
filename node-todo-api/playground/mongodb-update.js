const mongoDB = require('./mongodb');
const dbUtils = require('./db-utils');

const options = {
    useUnifiedTopology: true
};

const todoId = '5ec94bd67bdd5ac51ee09f58';
const userId = '5ec5f0cdda1819c0194fbda8';

mongoDB.getMongoClient(dbUtils.url, options, (client) => {
    client.connect((err) => {
        if(err){
            return console.log('Unable to Connect to MongoDB Server');
        }
        console.log("Connected successfully to MongoDB server");
        mongoDB.getDBObject(client, dbUtils.dbName, (db) => { 
            findOneAndUpdateTodos(db, todoId, (result) => {
                console.log(result);
            });

            findOneAndUpdateUsers(db, userId, (result) => {
                console.log(result);
                mongoDB.closeClient(client, (msg) => {
                    console.log(msg);
                });
            });
        });
    });
});

findOneAndUpdateTodos = (db, id, callback) => {
    try{
        db.collection('Todos').findOneAndUpdate({
            _id: mongoDB.getObjectId(id)
        }, {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            callback(result.lastErrorObject.n === 0 ? `No todos found for update with id: ${id}` : `${result.lastErrorObject.n} todos update for id: ${id}\n${JSON.stringify(result.value, undefined, 2)}`);
        }, (err) => {
            callback(`Something went wrong unable to update users ${err}`);
        });
    }catch(err){
        callback(`Something went wrong unable to update todos ${err}`);
    }
};

findOneAndUpdateUsers = (db, id, callback) => {
    try {
        db.collection('Users').findOneAndUpdate({
            _id: mongoDB.getObjectId(id)
        }, {
            $currentDate: {
                lastModified: true,
            },
            $set: {
                name: 'Santanu Tapasmita'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            callback(result.lastErrorObject.n === 0 ? `No users found for update with id: ${id}` : `${result.lastErrorObject.n} users update for id: ${id}\n${JSON.stringify(result.value, undefined, 2)}`);
        }, (err) => {
            callback(`Something went wrong unable to update users ${err}`);
        });
    } catch (err) {
        callback(`Something went wrong unable to update users ${err}`);
    }
};