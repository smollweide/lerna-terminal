'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const resolve = require('../resolve');
const getLerna = require('../getLerna');

/**
 * @param {Function} onMatch - the callback
 * @param {Object} di - dependency injection
 * @returns {Array<string>} returns an array of pathes to the packages
**/
function getLernaPackages(onMatch, { _fs, _glob, _path, _getLerna, _process }) {
	const appDirectory = _fs.realpathSync(_process.cwd());
	const lerna = _getLerna();
	const packagePaths = [];

	lerna.packages.forEach(packageRelPath => {
		const files = _glob.sync(_path.join(appDirectory, packageRelPath, 'package.json'));
		files.forEach(file => {
			const cleanPath = file.replace(/\/package.json$/, '');
			packagePaths.push(cleanPath);
			if (onMatch) {
				onMatch(cleanPath);
			}
		});
	});

	return packagePaths;
}

module.exports = resolve(getLernaPackages, { fs, glob, path, getLerna, process });
module.exports.getLernaPackages = getLernaPackages;
