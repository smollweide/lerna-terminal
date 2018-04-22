'use strict';
const getLernaPackages = require('../getLernaPackages');
const getPackage = require('../getPackage');
const { getProgram } = require('../commander');
const fs = require('fs');

/**
 * @returns {Object} returns an object of available scripts as key and their packages as array
 **/
function getScriptCommands() {
	const commands = {};
	const appDirectory = fs.realpathSync(process.cwd());

	const appendPackage = packagePath => {
		const packageData = getPackage(packagePath);

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

	getLernaPackages(appendPackage);

	// include root script in case of cli option is set
	if (getProgram().root) {
		appendPackage(appDirectory);
	}

	return commands;
}

module.exports = getScriptCommands;
