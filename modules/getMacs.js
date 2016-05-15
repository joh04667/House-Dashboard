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

connection.connect(params);


connection.once('ready', function(prompt) {
  connection.exec('arp show', function(err, response) {
    connection.end().then(function() {
    var result = response.match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/gi);
    console.log('mac adds are:', result);
    callback(result);
   });
  });
 });
};

module.exports = getMacs;
