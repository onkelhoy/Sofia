"use strict";

var app = require('express')();
var port = 80 || process.env.PORT;

// the different paths
app.use('/Work hours', require('./Work hours/index'));

// main path
app.get('/', function(req, res){
  
});

// any other paths
app.get('*', function(req, res){
  res.status(404).send('Kan inte hitta sidan Sofia..');
});

app.listen(port, function(){
  console.log('app is running on port:' + port);
});
