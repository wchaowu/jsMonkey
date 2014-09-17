'use strict';

var crypto = require('crypto');
var fs = require('fs');
var dateUtils = require("../utils/dateUtils");
module.exports = function (src) {
     var path = require("path");
    if(!fs.existsSync(src)){
        return null;
    }
    var data;
    if (Buffer.isBuffer(src)) {
        data = src.toString('utf8');
    } else {
        data = fs.readFileSync(String(src), 'utf8');
    }
    return crypto.createHash('sha1').update(data).digest('hex');
};
