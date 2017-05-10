"use strict";

// modules
const exp   = require('express'),
      app   = exp(),
      fs    = require('fs'),
      path  = require('path');

// application settings
app.set('port', process.env.PORT || 80);
app.set('view engine', 'ejs');

app.use(exp.static(path.join(__dirname, 'semantic')));
app.use(exp.static(path.join(__dirname, 'public')));

// the different paths
app.use('/Work_hours', require('./sub/Work_Hours/index'));
app.use('/Recept', require('./sub/Recept/index'));
app.use('/Heminredning', require('./sub/Heminredning/index'));
app.use('/Spel', require('./sub/Spel/index'));

// main path
app.get('/', function(req, res){
  res.status(200).render('index', {
    dictionaries: fs.readdirSync(__dirname+'/sub').filter(file => fs.statSync(path.join(__dirname+'/sub', file)).isDirectory()),
    root: '/'
  });
}).get('*', function(req, res){ // any other paths
  res.status(404).send('Kan inte hitta sidan Sofia..');
});

app.listen(app.get('port'), function(){
  console.log('app is running on port:' + app.get('port'));
});
