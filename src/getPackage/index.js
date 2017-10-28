'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('../resolve');

/**
 * @param {string} packagePath - the path to the package
 * @param {Object} di - dependency injection
 * @returns {Object} returns the lerna.json data object
**/
function getPackage(packagePath, { _fs, _path }) {
	return JSON.parse(_fs.readFileSync(_path.join(packagePath, 'package.json'), 'utf8'));
}

module.exports = resolve(getPackage, { fs, path });
module.exports.getPackage = getPackage;
