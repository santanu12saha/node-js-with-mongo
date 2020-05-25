const todoDao = require('../dao/todoDao');

var saveTodo = (todoRequest) => {
    var todo = {
        text: todoRequest.body.text
    };
    return new Promise((resolve, reject) => {
        todoDao.insertTodo(todo).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    });
};

module.exports = {
    saveTodo
}
