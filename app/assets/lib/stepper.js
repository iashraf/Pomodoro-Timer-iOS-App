/*
 * Javascript Stepper class
 * http://www.iashraf.com
 *
 * Copyright 2013 Isfahan Ashraf
 */

// * Stepper class {{{
Stepper = function(currentValue, maximumValue) {
	this.currentValue = currentValue || 0;
	this.maxValue = (maximumValue != undefined ? maximumValue : 100);
};
Stepper.prototype.up = function() {
	if (this.currentValue < this.maxValue) {
		this.currentValue = this.currentValue + 1;
	}
};
Stepper.prototype.down = function() {
	if (this.currentValue > 1) {
		this.currentValue = this.currentValue - 1;
	}
};
Stepper.prototype.getValue = function() {
	return this.currentValue;
};
// }}}
