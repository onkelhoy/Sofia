(function(){
  "use strict";

  // constant variables
  const express  = require('express'),
        path     = require('path'),
        json     = require('jsonfile'),
        filepath = path.join(__dirname, 'routes/database.json'),
        query    = require('json-query'),
        subapp   = express();

  // application set
  subapp.set('views', path.join(__dirname, 'views'));
  subapp.set('view engine', 'ejs');

  subapp.use('/semantic', express.static('semantic'));
  subapp.use(express.static(path.join(__dirname, 'public')));

  subapp.get('/', function(req, res){
    json.readFile(filepath,
      function(err, db){
       // check if error
       if(err) {
         console.log(err);
         res.status(500).render('index', {
           error: 'Kunde inte ladda in data'
         });
       }
       else {
         subapp.set('database', db);
         res.status(200).render('index', {
           data: db
         });
       }
    });
  }).put('/', function(req, res){
    // modify the database
    var db = req.body;
    if(typeof db == "undefined") res.status(204).send('Recept saknas');
    json.readFile(filepath, function(err, database){
      if(err) res.status(500).send('Kunde inte spara');
      else {
        if(typeof db.id == "undefined") res.status(404).send('Inget valid recept');
        else {
          // only if the database has an id (i.e. valid)
          for(var i = 0; i < database.length; i++){

          }
        }
      }
    });
    json.writeFile(filepath, req.body,
     function(err){
  		if(err) res.status(500).send('Kunde inte spara');
  		else res.status(200).send('Sparat');
  	});
  }).post('/', function(req, res){
    // insert a new one

  }).get('*', function(req, res){
    res.redirect(__dirname);
  });


  module.exports = subapp;
}());
