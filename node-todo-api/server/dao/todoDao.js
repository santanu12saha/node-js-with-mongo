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

var fetchAllTodos = () => {
    return new Promise((resolve, reject) => {
        Todo.find({}).then((docs) => {
            resolve(docs);
        }, (err) => {
            reject(err);
        });
    });
};

var fetchTodoById = (id) => {
    return new Promise((resolve, reject) => {
        Todo.findById(id).then((todo) => {
            resolve(todo);
        }, (err) => {
            reject(err);
        });
    });
};

var deleteTodoById = (id) => {
    return new Promise((resolve, reject) => {
        Todo.findByIdAndDelete(id).then((todo) => {
            resolve(todo);
        }, (err) => {
            reject(err);
        });
    });
};

var updateTodoById = (id, todo) => {
    return new Promise((resolve, reject) => {
        Todo.findByIdAndUpdate(id, {$set: todo}, {new: true}).then((todo) => {
            resolve(todo);
        },(err) => {
            reject(err);
        });
    });
};

module.exports = {
    insertTodo,
    fetchAllTodos,
    fetchTodoById,
    deleteTodoById,
    updateTodoById
}



