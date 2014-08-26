/* jslint node: true */

/*!
 * Log.js
 * var Log = require('../log')
 , fs = require('fs')
 , stream = fs.createWriteStream(__dirname + '/file.log', { flags: 'a22' }) //记录文件的信息
 , log = new Log('debug', stream);

记录基本从上到下
 log.debug('a debug message');
 log.info('a info message');
 log.notice('a notice message');
 log.warning('a warning message');
 log.error('a error message');
 log.critical('a critical message');
 log.alert('a alert message');
 log.emergency('a emergency message');
 */



var fmt = require('util').format;
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__ and `stream` defaulting to _stdout_.
 *
 * @param {Number} level
 * @param {Object} stream
 * @api public
 */

var Log = exports = module.exports = function Log(level, stream){
  if ('string' == typeof level) level = exports[level.toUpperCase()];
  this.level = level || exports.DEBUG;
  this.stream = stream || process.stdout;
  if (this.stream.readable) this.read();
};

/**
 * System is unusable.
 *
 * @type Number
 */

exports.EMERGENCY = 0;

/**
 * Action must be taken immediately.
 *
 * @type Number
 */

exports.ALERT = 1;

/**
 * Critical condition.
 *
 * @type Number
 */

exports.CRITICAL = 2;

/**
 * Error condition.
 *
 * @type Number
 */

exports.ERROR = 3;

/**
 * Warning condition.
 *
 * @type Number
 */

exports.WARNING = 4;

/**
 * Normal but significant condition.
 *
 * @type Number
 */

exports.NOTICE = 5;

/**
 * Purely informational message.
 *
 * @type Number
 */

exports.INFO = 6;

/**
 * Application debug messages.
 *
 * @type Number
 */

exports.DEBUG = 7;

/**
 * prototype.
 */

Log.prototype = {

  /**
   * Start emitting "line" events.
   *
   * @api public
   */

  read: function(){
    var buf = ''
      , self = this
      , stream = this.stream;

    stream.setEncoding('utf8');
    stream.on('data', function(chunk){
      buf += chunk;
      if ('\n' != buf[buf.length - 1]) return;
      buf.split('\n').map(function(line){
        if (!line.length) return;
        try {
          var captures = line.match(/^\[([^\]]+)\] (\w+) (.*)/);
          var obj = {
           //   date: new Date(captures[1]),
             level: exports[captures[2]],
             levelString: captures[2],
             msg: captures[3]
          };
          self.emit('line', obj);
        } catch (err) {
          // Ignore
        }
      });
      buf = '';
    });

    stream.on('end', function(){
      self.emit('end');
    });
  },

  /**
   * Log output message.
   *
   * @param  {String} levelStr
   * @param  {Array} args
   * @api private
   */

  log: function(levelStr, args) {
    console.log(args);
    if (exports[levelStr] <= this.level) {
      var msg = fmt.apply(null, args);
      this.stream.write(
          levelStr
        + ' ' + msg
        + '\n'
      );
    }
  },

  /**
   * Log emergency `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  emergency: function(msg){
    this.log('EMERGENCY', arguments);
  },

  /**
   * Log alert `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  alert: function(msg){
    this.log('ALERT', arguments);
  },

  /**
   * Log critical `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  critical: function(msg){
    this.log('CRITICAL', arguments);
  },

  /**
   * Log error `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  error: function(msg){
    this.log('ERROR', arguments);
  },

  /**
   * Log warning `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  warning: function(msg){
    this.log('WARNING', arguments);
  },

  /**
   * Log notice `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  notice: function(msg){
    this.log('NOTICE', arguments);
  },

  /**
   * Log info `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  info: function(msg){
    this.log('INFO', arguments);
  },

  /**
   * Log debug `msg`.
   *
   * @param  {String} msg
   * @api public
   */

  debug: function(msg){
    this.log('DEBUG', arguments);
  }
};

/**
 * Inherit from `EventEmitter`.
 */

Log.prototype.__proto__ = EventEmitter.prototype;
exports.setLogConfig = function (opt){
    var logFileName = opt.logFileName;
    var stream = fs.createWriteStream(logFileName, { flags: 'a+' })
        , log = new Log('debug', stream);
    global.log = log;
}

