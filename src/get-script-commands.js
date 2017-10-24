'use strict';
const resolveDependency = require('./resolve-dependency');
const getLernaPackages = require('./get-lerna-packages');
const getPackage = require('./get-package');

const _getScriptCommands = ({ _getLernaPackages, _getPackage }) => {
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
};

/**
 * @param {Object|undefined} di - dependency injection for tests
 * @returns {Object} returns an object of available scripts as key and their packages as array
**/
function getScriptCommands(di) {
	return _getScriptCommands(
		Object.assign(
			resolveDependency(di, 'getLernaPackages', getLernaPackages),
			resolveDependency(di, 'getPackage', getPackage)
		)
	);
}

module.exports = getScriptCommands;
