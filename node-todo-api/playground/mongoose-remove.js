const {ObjectID} = require('mongodb'); 
const Todo = require('../server/db/model/todo');
const User = require('../server/db/model/user');

const id = '5edc95c457be4f29124d1d3d';

//findOneAndDelete and findOneAndRemove 
Todo.findOneAndDelete({_id: id}).then((todo) => {
    console.log(todo);
});


//findByIdAndRemove and findByIdAndDelete return null if nothing is found.
/*Todo.findByIdAndDelete(id).then((todo) => {
    console.log(todo);
});*/


/*Todo.deleteMany({}).then((result) => {
    console.log(result);
});*/



