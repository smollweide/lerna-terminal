/* eslint no-console: 0*/
/* eslint complexity: 0*/
/* eslint no-empty: 0*/
'use strict';
const spawn = require('cross-spawn');

/**
 * @description run the given script in childProcess
 * @param {Object} options - the options
 * @param {string} options.scriptName - the name of the script which should be executed
 * @param {string} options.packagePath - the path in which the given script should be executed
 * @param {Function} options.onExit - callback which will be fired if childProcess was killed
 * @param {Function} options.onRecieve - callback which will be fired if childProcess recieved an message
 * @param {Function} options.onError - callback which will be fired if childProcess recieved an error message
 * @returns {Object} returns an object including an start and stop method
 **/
function runNpmScript({ scriptName, packagePath, onExit = () => {}, onRecieve = () => {}, onError = () => {} }) {
	const run = cmd => {
		const cmdArr = cmd.split(' ');

		const childProcessObj = { isRunning: true };

		const childProcess = spawn(cmdArr[0], cmdArr.slice(1, cmdArr.length), {
			cwd: packagePath,
		});

		childProcess.stdout.on('data', data => {
			onRecieve(data.toString().replace(/\n$/, ''));
		});
		childProcess.stderr.on('data', data => {
			onError(data.toString().replace(/\n$/, ''));
		});
		childProcess.on('exit', () => {
			childProcessObj.isRunning = false;
			onExit();
		});

		return Object.assign(childProcessObj, {
			stop() {
				childProcessObj.isRunning = false;
				/* istanbul ignore next */
				try {
					process.kill(childProcess.pid, 'SIGINT');
				} catch (err) {
					console.error(`process.kill(SIGINT): ${err}`);
				}
			},
			start() {
				this.stop();
				return run(`npm run ${scriptName}`);
			},
			execute(newCmd) {
				this.stop();
				return run(newCmd);
			},
		});
	};

	return run(`npm run ${scriptName}`);
}

module.exports = runNpmScript;
