var winston = require('winston');

winston.setLevels({ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 });

winston.addColors({
  silly: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  info: 'green',
  warn: 'yellow',
  error: 'red'
});

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: 'silly',
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: true
});

module.exports.info = function(message, arg){
    winston.log('info',message, arg);
};

module.exports.error = function(message, arg){
    winston.log('error', message, arg);
};

module.exports.warn = function(message, arg){
    winston.log('warn', message, arg);
};

module.exports.debug = function(message, arg){
    winston.log('debug', message, arg);
};

module.exports.winston = winston;