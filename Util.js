'use strict';

const console = require('console');

class Util {
	constructor() {}

	static logError(error) {
		console.error(error);
	}
}

module.exports = Util;