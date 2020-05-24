const mongoDB = require('./mongodb');
const dbUtils = require('./db-utils');

const options = {
    useUnifiedTopology: true
};

const id = '5ec2a30a3bd8ca57bcbe9310';
const name = 'Tapasmita Saha';

mongoDB.getMongoClient(dbUtils.url, options, (client) => {
    client.connect((err) => {
        if(err){
            return console.log('Unable to Connect to MongoDB Server');
        }
        console.log("Connected successfully to MongoDB server");
        mongoDB.getDBObject(client, dbUtils.dbName, (db) => {
            findAllTodos(db, (result) => {
                console.log(`Getting all todos\n${result}\n`);
            });

            findAllTodosWithCompletedStatus(db, (result) => {
                console.log(`Getting all todos with completed status true\n${result}`);
            });

            findTodosCount(db, (result) => {
                console.log(`Getting todos count\n${result}`);
            });

            findTodosWithId(db, id, (result) => {
                console.log(`Getting todos with id ${id}\n${result}`);
            });

            findUsersWithName(db, name, (result) => {
                console.log(`Getting users with name ${name}\n${result}`);
                mongoDB.closeClient(client, (msg) => {
                    console.log(msg);
                });
            });

        });
    });
});

findAllTodos = (db, callback) => {
    try{
        db.collection('Todos').find().toArray().then((docs) => {
            callback(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            callback('Unable to fetch todos', err);
        });
    }catch (err) {
        callback('Unable to fetch todos', err);
    }
};

findAllTodosWithCompletedStatus = (db, callback) => {
    try{
        db.collection('Todos').find({completed: true}).toArray().then((docs) => {
            callback(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            callback('Unable to fetch todos with true completed status', err);
        });
    }catch (err) {
        callback('Unable to fetch todos with true completed status', err);
    }
};

findTodosWithId = (db, id, callback) => {
    try{
        db.collection('Todos').find({
            _id: mongoDB.getObjectId(id)
        }).toArray().then((docs) => {
            callback(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            callback(`Unable to fetch todos with ${id}`, err);
        });
    }catch (err) {
        callback(`Unable to fetch todos with ${id}`, err);
    }
};

findTodosCount = (db, callback) => {
    try{
        db.collection('Todos').find().count().then((count) => {
            callback(count);
        }, (err) => {
            callback(`Unable to fetch todos count`, err);
        });
    }catch (err) {
        callback(`Unable to fetch todos count`, err);
    }
};

findUsersWithName = (db, name, callback) => {
    try{
        db.collection('Users').find({
            name: name
        }).toArray().then((docs) => {
            callback(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            callback(`Unable to fetch all users with name ${name}`, err);
        });
    }catch (err) {
        callback(`Unable to fetch all users with name ${name}`, err);
    }  
};