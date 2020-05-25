var express = require('express');
var bodyParser = require('body-parser');
var todoService = require('./service/todoService');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    todoService.saveTodo(req).then((todo) => {
        res.send(todo);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
    todoService.getAllTodos().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

module.exports = { app }; 