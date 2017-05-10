(function(){
  "use strict";

  // constant variables
  const express = require('express'),
        path    = require('path'),
        subapp  = express();

  // application set
  subapp.set('views', path.join(__dirname, 'views'));
  subapp.set('view engine', 'ejs');

  subapp.use('/semantic', express.static('semantic'));
  subapp.use(express.static(path.join(__dirname, 'public')));

  subapp.get('/', function(req, res){
    res.status(200).render('index');
  }).get('*', function(req, res){
    res.redirect(__dirname);
  });


  module.exports = subapp;
}());
