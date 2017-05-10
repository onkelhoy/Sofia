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
  var msg2 = require('./games/WebGl/index');
  // subapp.use('/WebGl', require('./games/WebGl/index'));


  // main path
  subapp.get('/', function(req, res){
    res.status(200).render('index', {
      dictionaries: fs.readdirSync(__dirname+'/games').filter(file => fs.statSync(path.join(__dirname+'/games', file)).isDirectory()),
      root: '/Spel/'
    });
  }).get('*', function(req, res){ // any other paths
    res.status(404).send('Kan inte hitta sidan Sofia..');
  });


  module.exports = subapp;
}());
