'use strict';

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const getLerna = require('../getLerna');

/**
 * @param {Function} onMatch - the callback
 * @returns {Array<string>} returns an array of pathes to the packages
 **/
function getLernaPackages(onMatch) {
	const appDirectory = fs.realpathSync(process.cwd());
	const lerna = getLerna();
	const packagePaths = [];

	lerna.packages.forEach(packageRelPath => {
		const files = glob.sync(path.join(appDirectory, packageRelPath, 'package.json'));
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

module.exports = getLernaPackages;
