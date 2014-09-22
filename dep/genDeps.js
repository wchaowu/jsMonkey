'use strict';

/**
 * Expose factory function.
 * @api public
 * @param {String|Array|Object} src
 * @param {Object} opts
 * @return {GenDeps}
 */
module.exports = function (src, opts) {
        return new GenDeps(src, opts);
};

/**
 * Class constructor.
 * @constructor
 * @api public
 * @param {String|Array|Object} src
 * @param {Object} opts
 */
function GenDeps(src, opts) {
        this.opts = opts || {};
        this.opts.format = String(this.opts.format || 'amd').toLowerCase();

        if (typeof(src) === 'object' && !Array.isArray(src)) {
                this.tree = src;
                return;
        }

        if (typeof(src) === 'string') {
                src = [src];
        }

        var Parser = require('./parse/' + this.opts.format);
        if (!Parser) {
                throw new Error('invalid module format "' + this.opts.format + '"');
        }

        this.tree = new Parser(src, this.opts).tree;
}

/**
 * Return the module dependency graph as an object.
 * @api public
 * @return {Object}
 */
GenDeps.prototype.obj = function () {
        return this.tree;
};

/**
 * Return the modules that has circular dependencies.
 * @api public
 * @return {Object}
 */
GenDeps.prototype.circular = function () {
        return require('./analysis/circular')(this.tree);
};

/**
 * Return a list of modules that depends on the given module.
 * @api public
 * @param  {String} id
 * @return {Array}
 */
GenDeps.prototype.depends = function (id) {
        return require('./analysis/depends')(this.tree, id);
};