var util = require('util');
var locateStrategy = require('./_locateStrategy.js');

/**
 * Sets the locate strategy for selectors to `auto`, therefore every following selector will be auto detected and will use the good strategy.
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser
 *     .useAuto() // we're back to auto selector now
 *     .setValue('input[type=text]', 'nightwatch');
 * };
 * ```
 *
 * @method useAuto
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

function Command() {
  this.strategy = 'auto';
  locateStrategy.call(this);
}

util.inherits(Command, locateStrategy);

module.exports = Command;
