const resolve = require('../resolve');
const handleKillProcess = require('./index');

const _getProcess = cmd => ({
	on(type, cb) {
		if (type === cmd) {
			cb();
		}
	},
});

describe('handleKillProcess', () => {
	it('cmdStop on SIGINT', done => {
		resolve(handleKillProcess, {
			cmdStop() {
				done();
			},
			process: _getProcess('SIGINT'),
			exit() {},
		})();
	});
	it('cmdStop on SIGTERM', done => {
		resolve(handleKillProcess, {
			cmdStop() {
				done();
			},
			process: _getProcess('SIGTERM'),
			exit() {},
		})();
	});

	it('run process.exit on SIGINT', done => {
		resolve(handleKillProcess, {
			cmdStop(packageName, cb) {
				expect(packageName).toBe(undefined);
				cb();
			},
			process: Object.assign({}, _getProcess('SIGINT'), {
				exit() {
					done();
				},
			}),
		})();
	});
	it('run process.exit on SIGTERM', done => {
		resolve(handleKillProcess, {
			cmdStop(packageName, cb) {
				expect(packageName).toBe(undefined);
				cb();
			},
			process: Object.assign({}, _getProcess('SIGTERM'), {
				exit() {
					done();
				},
			}),
		})();
	});
});
