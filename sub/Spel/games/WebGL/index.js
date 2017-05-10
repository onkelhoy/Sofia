(function(){
  "use strict";

  // constant variables
  const express = require('express'),
        path    = require('path'),
        subapp  = express();

  subapp.use(express.static(path.join(__dirname, 'public')));

  subapp.get('/', function(req, res){
    res.status(200).sendFile(path.join(__dirname, 'public/game.html'));
  }).get('*', function(req, res){
    res.redirect(__dirname);
  });


  module.exports = subapp;
}());
