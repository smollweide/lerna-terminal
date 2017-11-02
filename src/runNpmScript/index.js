/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';
const { spawn } = require('child_process');
const resolve = require('../resolve');

/**
 * @description run the given script in childProcess
 * @param {Object} options - the options
 * @param {string} options.scriptName - the name of the script which should be executed
 * @param {string} options.packagePath - the path in which the given script should be executed
 * @param {Function} options.onExit - callback which will be fired if childProcess was killed
 * @param {Function} options.onRecieve - callback which will be fired if childProcess recieved an message
 * @param {Function} options.onError - callback which will be fired if childProcess recieved an error message
 * @param {Function} options.onError - callback which will be fired if childProcess recieved an error message
 * @param {Object} di - dependency injection
 * @returns {Object} returns an object including an start and stop method
**/
function runNpmScript(
	{ scriptName, packagePath, onExit = () => {}, onRecieve = () => {}, onError = () => {} },
	{ _spawn }
) {
	const run = cmd => {
		const cmdArr = cmd.split(' ');

		const childProcess = _spawn(cmdArr[0], cmdArr.slice(1, cmdArr.length), {
			shell: true,
			cwd: packagePath,
		});

		childProcess.stdout.on('data', data => {
			onRecieve(data.toString().replace(/\n$/, ''));
		});
		childProcess.stderr.on('data', data => {
			onError(data.toString().replace(/\n$/, ''));
		});
		childProcess.on('exit', onExit);

		return {
			stop() {
				childProcess.kill('SIGINT');
			},
			start() {
				this.stop();
				return run(`npm run ${scriptName}`);
			},
			execute(newCmd) {
				this.stop();
				return run(newCmd);
			},
		};
	};

	return run(`npm run ${scriptName}`);
}

module.exports = resolve(runNpmScript, { spawn });
