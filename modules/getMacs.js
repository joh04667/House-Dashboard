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

// try {
//   child_process.execSync('telnet ' + params.host);
// } catch(e) {
//   var err = e;
//   err.error = true;
//   callback('err');
// } finally {
//   if(!err.error) {
//   console.log('dildo', err.error);


connection.connect(params), function(error) {
  console.log('error', error);
  callback(err);
};


connection.once('ready', function(prompt) {
  connection.exec('arp show', function(err, response) {
    if(err) {console.log('erronio', err); callback(err)} else {
    connection.end().then(function() {
    var result = response.match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/gi);
    console.log('mac adds are:', result);
    callback(result);
   });
   }
  });
 });
// };

}}



module.exports = getMacs;
