const Todo = require('../db/model/todo');

getNewTodo = (todo) => {
    return new Todo(todo);
};

var insertTodo = (todo) => {
    var newTodo = getNewTodo(todo);
    return new Promise((resolve, reject) => {
        newTodo.save().then(docs => {
            resolve(docs);
        }, (err) => {
            reject(err);
        });
    });
};

module.exports = {
    insertTodo
}



