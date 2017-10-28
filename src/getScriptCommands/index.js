'use strict';
const resolve = require('../resolve');
const getLernaPackages = require('../getLernaPackages');
const getPackage = require('../getPackage');

/**
 * @param {Object|undefined} di - dependency injection for tests
 * @returns {Object} returns an object of available scripts as key and their packages as array
**/
function getScriptCommands({ _getLernaPackages, _getPackage }) {
	const commands = {};

	_getLernaPackages(packagePath => {
		const packageData = _getPackage(packagePath);

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

module.exports = resolve(getScriptCommands, { getLernaPackages, getPackage });
module.exports.getScriptCommands = getScriptCommands;
