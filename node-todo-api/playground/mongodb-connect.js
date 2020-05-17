const MongoClient = require('mongodb').MongoClient;
//const {MongoClient, ObjectID} = require('mongodb');
const dbUtils = require('./db-utils');


//creating ObjectId

/*var obj = new ObjectID();
console.log(obj);*/

//Destructuring
/*var user = {name: 'Tapasmita', age: 28};
var {name} = user;
console.log(name); */


// Create a new MongoClient
const client = new MongoClient(dbUtils.url, {
    useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect((err) => {
    if(err) {
        return console.log('Unable to Connect to MongoDB Server');
    }
    console.log("Connected successfully to MongoDB server");
    
    const db = client.db(dbUtils.dbName);

 /* createTodos(db, (result) => {
        console.log(result);
    });*/

   /* createUsers(db, (result) => {
        console.log(result);
        client.close();
    }); */

    /* fetchUserCreationTimestamp(db, (result) => {
        console.log(result);
        client.close();
    }); */

    client.close();
    
});

createTodos = (db, callback) => {
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            callback(`unable to insert todo ${err}`);
        }else{
            callback(JSON.stringify(result.ops, undefined, 2));
        }
    });
};

createUsers = (db, callback) => {
    db.collection('Users').insertOne({
        name: 'Santanu Saha',
        age: 30,
        location: 'Bengaluru'
    }, (err, result) => {
        if(err){
            callback(`unable to insert user ${err}`);
        }else{
            callback(JSON.stringify(result.ops, undefined, 2));
        }
    });
};

fetchUserCreationTimestamp = (db, callback) => {
    db.collection('Users').insertOne({
        name: 'Tapasmita Saha',
        age: 28,
        location: 'Kolkata'
    }, (err, result) => {
        if(err){
            callback(`unable to insert user ${err}`);
        }else{
            callback(result.ops[0]._id.getTimestamp());
        }
    });
};