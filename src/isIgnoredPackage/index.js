'use strict';
const path = require('path');

/**
 * @param {string} packagePath - the path to the package
 * @param {string} ignoredPackages - a comma separated list of package names
 * @returns {boolean} returns true if packageName is a part of packagePath
 **/
function isIgnoredPackage(packagePath, ignoredPackages) {
	if (typeof ignoredPackages !== 'string' || ignoredPackages === '') {
		return false;
	}

	const packageName = path.basename(packagePath);
	let ignoreCounter = 0;
	ignoredPackages.split(',').forEach(ignoredPackage => {
		if (packageName.match(new RegExp(`^${ignoredPackage}$`)) !== null) {
			ignoreCounter += 1;
		}
	});

	return Boolean(ignoreCounter > 0);
}

module.exports = isIgnoredPackage;
