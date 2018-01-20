'use strict';
const resolve = require('../resolve');
const getLernaPackages = require('../getLernaPackages');
const getPackage = require('../getPackage');
const { program } = require('../commander');
const fs = require('fs');

/**
 * @param {Object|undefined} di - dependency injection for tests
 * @returns {Object} returns an object of available scripts as key and their packages as array
 **/
function getScriptCommands({ _getLernaPackages, _getPackage, _program, _fs, _process }) {
	const commands = {};
	const appDirectory = _fs.realpathSync(_process.cwd());

	const appendPackage = packagePath => {
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
	};

	_getLernaPackages(appendPackage);

	// include root script in case of cli option is set
	if (_program.root) {
		appendPackage(appDirectory);
	}

	return commands;
}

module.exports = resolve(getScriptCommands, { getLernaPackages, getPackage, program, fs, process });
module.exports.getScriptCommands = getScriptCommands;
