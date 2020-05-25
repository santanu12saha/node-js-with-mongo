const {ObjectID} = require('mongodb'); 
const Todo = require('../server/db/model/todo');
const User = require('../server/db/model/user');


const id = '5ecbe3468173aa2e5197be39';
const userId = '5eca957af8bc275c5df405fc';

if(!ObjectID.isValid(id)) {
    console.log('Id not valid');
    return;
}

//Return array of object 
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
}, (err) => {
    console.log(error);
});

//Return object
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
}, (err) => {
    console.log(err);
});

//find document by Id
Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((err) => {
    console.log(err);
});

//find user by Id
User.findById(userId).then((user) => {
    if(!user){
        return console.log('User Id not found');
    }
    console.log('User ', user);
}).catch((err) => {
    console.log(err);
});