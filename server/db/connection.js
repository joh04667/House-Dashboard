var pg = require('pg');
var exec = require('child_process');


var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  console.log('environment var');
  connectionString = process.env.DATABASE_URL;
} else {
  console.log('local var');
  connectionString = "postgres://localhost:5432/blondegalow";
}

function initializeDB(){
  pg.connect(connectionString, function(err, client,done){
    console.log('connected to postgspwlslsql');
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {

        var query = client.query(
          'CREATE TABLE IF NOT EXISTS users(' +
          'id SERIAL PRIMARY KEY,' +
          'username varchar(255) NOT NULL,' +
          'password varchar(255) NOT NULL,' +
          'display_name varchar(30) NOT NULL,' +
          'permissions varchar(15) NOT NULL,' +
          'active boolean NOT NULL);'
        );
      query.on('end', function(){
        console.log('users table created');
        done();
      });

      var query = client.query(
        'CREATE TABLE IF NOT EXISTS post(' +
        'id SERIAL PRIMARY KEY,' +
        'title TEXT NOT NULL,' +
        'message TEXT NOT NULL,' +
        'date DATE NOT NULL,' +
        'user_id INT REFERENCES users(id));'
      );
      query.on('end', function(){
        console.log('posts table created');
        done();
    });

    var query = client.query(
      'CREATE TABLE IF NOT EXISTS mac(' +
      'id SERIAL PRIMARY KEY,' +
      'name TEXT NOT NULL,' +
      'mac TEXT NOT NULL);'
    );
    query.on('end', function(){
      console.log('mac table created');
      done();
  });

      var query = client.query(
        'CREATE TABLE IF NOT EXISTS chores(' +
        'id SERIAL PRIMARY KEY,' +
        'task varchar(255) NOT NULL,' +
        'assigned_to varchar(15) NOT NULL,' +
        'completed_by varchar(29),' +
        'date_added DATE NOT NULL,' +
        'date_completed DATE,' +
        'user_id INT REFERENCES users(id));'
      );
      query.on('end', function(){
        console.log('chores table created');
        done();
      });

    }
  });
}
// var installSession = exec.execSync('psql ' + connectionString + ' < node_modules/connect-pg-simple/table.sql');
// create session table


module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
