var telnet = require('telnet-client');
var connection = new telnet();
var child_process = require('child_process');


// var child = child_process.execSync('ssh blondegalow.hopto.org', function (error, stdout) {
//   console.log(stdout);
//   stdout.on('data', func)
// });








var getMacs = function(callback) {
var params = {
  host: 'blondegalow.hopto.org',
  port: 23,
  shellPrompt: '>',
  timeout: 12500,
  loginPrompt: 'Login:',
  passwordPrompt: 'Password:',
  username: 'admin',
  password: 'blondegalow',
  debug: true
  // removeEcho: 4
};
var result = [];
// var errir = {};
// var tuna;
// var obj = {first: 'val'};
//
// try {
//   child_process.execSync('telnet blondegalow.hopto.org');
// } catch(e) {
//   errir.error = true;
//   console.log('typeof', typeof(e));
//   console.log('FUCK YOU', e[Object.keys(e)[2]]);
//   tuna = e;
// } finally {
//   if(errir.error) {
//   console.log('dildo', tuna);
//   callback('err');
//   return 'error';
// } else {

connection.connect(params); /*, function(error) {
  console.log('error', error);
  callback(err);
};*/

connection.once('error', function(error) {
  console.log('you got an error', error);

});

connection.once('ready', function(prompt) {
  connection.exec('arp show', function(error, response) {
    if(error) {console.log('erronio', error);
    callback('err');
   } else {
    connection.end().then(function() {
    var result = response.match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/gi);
    console.log('mac adds are:', result);
    callback(result);
   });
   }
  });
 });
 
};





module.exports = getMacs;
