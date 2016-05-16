var telnet = require('telnet-client');
var connection = new telnet();
var child_process = require('child_process');




var getMacs = function(cb) {
var isConnected;

var check = child_process.spawnSync('telnet', [process.env.HOST_URL], {timeout: 1500});


if(check.stdout.toString().match(/Connected to/gi)) {
  console.log(typeof(process.env.R_PASSWORD), process.env.R_USERNAME, process.env.HOST_URL);
  console.log('woo');
  isConnected = true;
  checkMacs(function(res) {
    cb(res);
  });
} else {
console.log('boo?', check.error);
    cb('err');
 }
};





function checkMacs(callback) {
var params = {
  host: process.env.HOST_URL,
  port: 23,
  shellPrompt: '>',
  timeout: 12500,
  loginPrompt: 'Login:',
  passwordPrompt: 'Password:',
  username: process.env.R_USERNAME,
  password: process.env.R_PASSWORD,
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
