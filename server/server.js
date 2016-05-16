var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var flash = require('connect-flash');
var session = require('express-session'); // session tracking module
var initializeDB = require('./db/connection').initializeDB;
var connectionString = require('./db/connection').connectionString;
var pgSession = require('connect-pg-simple')(session);
var dotenv = require('dotenv').config();


/// OAuth ///
var passport = require('passport');
var localStrategy = require('passport-local').Strategy; // username and password module
var encryptLib = require('../modules/encryption');


var app = express();
var port = process.env.PORT || 3000;

////////////import routes//////////
var index = require('./routes/index');
var main = require('./routes/main');
var register = require('./routes/register');
var success = require('./routes/success');
var fail = require('./routes/fail');
var auth = require('./routes/auth');
var message = require('./routes/message');
var mac = require('./routes/mac');
var chores = require('./routes/chores');
var grocery = require('./routes/grocery');

//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(flash());
initializeDB();


app.use(session({
  // store: new pgSession({
  //   // pg: pg,
  //   conString: connectionString,
  // }),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000, secure: false}
}));

app.use(passport.initialize()); // start passport
app.use(passport.session()); // start passport session listener

///////////routes/////////////
app.use('/', index);
app.use('/main', main);
app.use('/register', register);
app.use('/success', success);
app.use('/fail', fail);
app.use('/auth', auth);
app.use('/message', message);
app.use('/mac', mac);
app.use('/chore', chores);
app.use('/grocery', grocery);


app.get('/*', function(req, res){
    if(req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/views/main.html');
  } else {
    res.sendFile(__dirname + '/public/views/index.html');
  }
});



///////// OAUTH session starts ///////
passport.use('local', new localStrategy({passReqToCallback: true, usernameField: 'username'},
  function(req, username, password, done) {
      console.log('called local');
        pg.connect(connectionString, function(err, client) {
          console.log('called local - pg');

          var user = {};

            var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

            query.on('row', function(row) {
              user = row;

            });

            // close connection after data get
            query.on('end', function() {
              if(!user.username) {
                done(null, false, {message: req.flash('Incorrect username')});

              } else if(encryptLib.comparePassword(password, user.password)) {
                done(null, user);
              } else {
                done(null, false, {message: req.flash('Incorrect username and password.')});
              }
              client.end();

            });
            //error handling
            if(err){console.log(err);}
        });



  })); // end strategy def

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializing');
    pg.connect(connectionString, function (err, client) {

      var user = {};
      console.log('deserializing - pg');
       var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

       query.on('row', function(row) {
         user = row;
         done(null, user);
       });

       // closes connection after all data got
       query.on('end', function() {
         client.end();
       });

       // error handling
       if(err) {console.log(err);}
    });
  });







/////////////  listen  ////////////
app.listen(port, function() {
  console.log('listening on port', port);
});
