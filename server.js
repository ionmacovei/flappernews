const express = require('express');
const app = express();
app.use('/', express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/dist',  express.static(__dirname + '/dist'));
app.listen(8080)
console.log('App is working on http://localhost:8080/');