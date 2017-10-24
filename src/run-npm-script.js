/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';
const { spawn } = require('child_process');
const resolveDependency = require('./resolve-dependency');

const _runNpmScript = (
	{ scriptName, packagePath, onExit = () => {}, onRecieve = () => {}, onError = () => {} },
	{ _spawn }
) => {
	const run = () => {
		const cmd = _spawn('npm', ['run', scriptName], {
			shell: true,
			cwd: packagePath,
		});

		cmd.stdout.on('data', data => {
			onRecieve(data.toString().replace(/\n$/, ''));
		});
		cmd.stderr.on('data', data => {
			onError(data.toString().replace(/\n$/, ''));
		});
		cmd.on('exit', onExit);

		return {
			stop() {
				cmd.kill('SIGINT');
			},
			start() {
				this.stop();
				return run();
			},
		};
	};

	return run();
};

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
function runNpmScript(options, di) {
	return _runNpmScript(options, Object.assign(resolveDependency(di, 'spawn', spawn)));
}

module.exports = runNpmScript;
