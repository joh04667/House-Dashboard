var telnet = require('telnet-client');
var connection = new telnet();
var child_process = require('child_process');
var StringDecoder = require('string_decoder');

// var child = child_process.execSync('ssh blondegalow.hopto.org', function (error, stdout) {
//   console.log(stdout);
//   stdout.on('data', func)
// });


var getMacs = function(cb) {
var isConnected;

var check = child_process.spawnSync('telnet', ['blondegalow.hopto.org'], {timeout: 1500});


if(check.stdout.toString().match(/Connected to/gi)) {
  console.log('woo')
  isConnected = true;
  checkMacs(function(res) {
    cb(res);
    check.SIG
  });
} else {
console.log('boo?', check.error);
    cb('err');
 }
}





function checkMacs(callback) {
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
