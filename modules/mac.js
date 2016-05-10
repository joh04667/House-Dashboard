var telnet = require('telnet-client');
var connection = new telnet();
var child_process = require('child_process');

var params = {
  host: '192.168.0.1',
  port: 23,
  timeout: 3000,
  username: 'admin',
  password: 'default',
  // removeEcho: 4
  debug: true
};

// connection.on('ready', function(prompt) {
//   connection.exec('arp show', function(err, response) {
//     console.log(response);
//   });
// });

child_process.execSync("telnet 184.97.185.183 23")
