const mongoDB = require('./mongodb');
const dbUtils = require('./db-utils');

const options = {
    useUnifiedTopology: true
};

const deleteTodos = {
    text: 'Take lunch'
};

const deleteTodos1 = {
    completed: true
};

const deleteUsers = {
    name: 'Jack'
};

const id = '5eca06af2cb373560ed71293';

mongoDB.getMongoClient(dbUtils.url, options, (client) => {
    client.connect((err) => {
        if(err){
            return console.log('Unable to Connect to MongoDB Server');
        }
        console.log("Connected successfully to MongoDB server");
        mongoDB.getDBObject(client, dbUtils.dbName, (db) => {
           
            /*deleteManyTodos(db, deleteTodos ,(result) => {
                console.log(result);
            });

            deleteOneTodos(db, deleteTodos, (result) => {
                console.log(result);
            });

            findOneAndDeleteTodos(db, deleteTodos1, (result) => {
                console.log(result);
            });

            deleteManyUsers(db, deleteUsers, (result) => {
                console.log(result);
            });*/

            findOneAndDeleteUsers(db, id, (result) => {
                console.log(result);
                mongoDB.closeClient(client, (msg) => {
                    console.log(msg);
                });
            });

        });
    });
});

deleteManyTodos = (db, deleteTodos, callback) => {
    try{
        db.collection('Todos').deleteMany(deleteTodos).then((result) => {
            callback(result.result.n === 0 ? `No todos found for delete with text: ${deleteTodos.text}` : `${result.result.n} todos delete with text: ${deleteTodos.text}`);
        }, (err) => {
            callback(`Something went wrong unable to delete many todos ${err}`);
        });
    }catch (err) {
        callback(`Something went wrong unable to delete many todos ${err}`);
    }
};

deleteOneTodos = (db, deleteTodos, callback) => {
    try{
        db.collection('Todos').deleteOne(deleteTodos).then((result) => {
            callback(result.result.n === 0 ? `No todos found for delete with text: ${deleteTodos.text}` : `${result.result.n} todos delete with text: ${deleteTodos.text}`);
        },(err) => {
            callback(`Something went wrong unable to delete todo ${err}`);
        });
    }catch (err) {
        callback(`Something went wrong unable to delete todo ${err}`);
    }
};

findOneAndDeleteTodos = (db, deleteTodos1, callback) => {
    try{
        db.collection('Todos').findOneAndDelete(deleteTodos1).then((result) => {
            callback(result.lastErrorObject.n === 0 ? `No todos found for delete with completed: ${deleteTodos1.completed}` : `${result.lastErrorObject.n} todos delete with compleled: ${deleteTodos1.completed}\n${JSON.stringify(result.value, undefined, 2)}`);
        }, (err) => {
            callback(`Something went wrong unable to delete todo ${err}`);
        });
    }catch (err) {
        callback(`Something went wrong unable to delete todo ${err}`);
    }
};

deleteManyUsers = (db, deleteUsers, callback) => {
    try{
        db.collection('Users').deleteMany(deleteUsers).then((result) => {
            callback(result.result.n === 0 ? `No users found for delete with name: ${deleteUsers.name}` : `${result.result.n} users delete with name: ${deleteUsers.name}`);
        }, (err) => {
            callback(`Something went wrong unable to delete many users ${err}`);
        });
    }catch (err) {
        callback(`Something went wrong unable to delete many users ${err}`);
    }
};

findOneAndDeleteUsers = (db, id, callback) => {
    try{
        db.collection('Users').findOneAndDelete({
            _id: mongoDB.getObjectId(id)
        }).then((result) => {
            callback(result.lastErrorObject.n === 0 ? `No users found for delete with id: ${id}` : `${result.lastErrorObject.n} users delete with id: ${id}\n${JSON.stringify(result.value, undefined, 2)}`);
        }, (err) => {
            callback(`Something went wrong unable to delete user ${err}`);
        });
    }catch (err) {
        callback(`Something went wrong unable to delete user ${err}`);
    }
};