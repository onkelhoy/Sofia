(function(){
  "use strict";

  // constant variables
  const express = require('express'),
        path    = require('path'),
        fs    = require('fs'),
        subapp  = express();

  // application set
  subapp.set('views', path.join(__dirname, '../../views'));
  subapp.set('view engine', 'ejs');

  // the different paths
  subapp.use('/WebGl', require('./sub/WebGl/index'));


  // main path
  subapp.get('/', function(req, res){
    res.status(200).render('index', {
      dictionaries: fs.readdirSync(__dirname+'/sub').filter(file => fs.statSync(path.join(__dirname+'/sub', file)).isDirectory()),
      root: '/Spel/'
    });
  }).get('*', function(req, res){ // any other paths
    res.status(404).send('Kan inte hitta sidan Sofia..');
  });


  module.exports = subapp;
}());
