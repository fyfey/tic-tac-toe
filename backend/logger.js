var colors = require('colors/safe');

function info(...messages) {
  log(messages, 'blue', ' INFO');
}
function error(...message) {
  log(message, 'red', 'ERROR');
}
function log(messages, color, label) {
  console.log(colors[color](` ${label}`), ...messages);
}

module.exports = {
  info,
  error
}
