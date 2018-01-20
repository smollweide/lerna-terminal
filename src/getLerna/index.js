'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('../resolve');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} returns the lerna.json data object
 **/
function getLerna({ _fs, _path, _process }) {
	const appDirectory = _fs.realpathSync(_process.cwd());
	return JSON.parse(_fs.readFileSync(_path.join(appDirectory, 'lerna.json'), 'utf8'));
}

module.exports = resolve(getLerna, { fs, path, process });
module.exports.getLerna = getLerna;
