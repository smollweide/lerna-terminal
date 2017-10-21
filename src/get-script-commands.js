'use strict';

const getLernaPackages = require('./get-lerna-packages');
const getPackage = require('./get-package');

/**
 * @returns {Object} returns an object of available scripts as key and their packages as array
**/
function getScriptCommands({ diGetLernaPackages = getLernaPackages, diGetPackage = getPackage }) {
	const commands = {};

	diGetLernaPackages(packagePath => {
		const packageData = diGetPackage(packagePath);

		if (!packageData.scripts) {
			return;
		}

		Object.keys(packageData.scripts).forEach(scriptKey => {
			if (!commands[scriptKey]) {
				commands[scriptKey] = [];
			}
			commands[scriptKey].push(packagePath);
		});
	});

	return commands;
}

module.exports = getScriptCommands;
