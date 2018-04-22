const jest = require('jest');
const handleKillProcess = require('./index');
const cmdStop = require('../cmdStop');

jest.mock('../cmdStop');

global.process = Object.assign(process, {
	on(type, cb) {
		cb();
	},
	exit() {},
});

describe('handleKillProcess', () => {
	beforeEach(() => {
		cmdStop.mockClear();
	});
	it('cmdStop on SIGINT', () => {
		global.process = Object.assign(process, {
			on(type, cb) {
				if (type === 'SIGINT') {
					cb();
				}
			},
			exit() {},
		});
		handleKillProcess();
		expect(cmdStop).toHaveBeenCalledTimes(1);
	});
	it('cmdStop on SIGTERM', () => {
		global.process = Object.assign(process, {
			on(type, cb) {
				if (type === 'SIGTERM') {
					cb();
				}
			},
			exit() {},
		});
		handleKillProcess();
		expect(cmdStop).toHaveBeenCalledTimes(1);
	});

	it('run process.exit on SIGINT', done => {
		cmdStop.mockImplementation((packageName, cb) => {
			expect(packageName).toBe(undefined);
			cb();
		});
		global.process = Object.assign(process, {
			on(type, cb) {
				if (type === 'SIGINT') {
					cb();
				}
			},
			exit() {
				done();
			},
		});
		handleKillProcess();
	});
	it('run process.exit on SIGTERM', done => {
		cmdStop.mockImplementation((packageName, cb) => {
			expect(packageName).toBe(undefined);
			cb();
		});
		global.process = Object.assign(process, {
			on(type, cb) {
				if (type === 'SIGTERM') {
					cb();
				}
			},
			exit() {
				done();
			},
		});
		handleKillProcess();
	});
});
