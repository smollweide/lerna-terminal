'use strict';

const fs = require('fs');
const path = require('path');

/**
 * @param {string} packagePath - the path to the package
 * @returns {Object} returns the lerna.json data object
 **/
function getPackage(packagePath) {
	return JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8'));
}

module.exports = getPackage;
