/* global jest */
const { spawn } = require('child_process');
const runNpmScript = require('./index');

jest.mock('child_process');

const options = {
	scriptName: 'utils',
	packagePath: '/path/',
};

describe('runNpmScript', () => {
	beforeEach(() => {
		spawn.mockClear();
	});
	it('start exist', () => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(options).start).toBe('function');
	});
	it('stop exist', () => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(options).stop).toBe('function');
	});
	it('onRecieve', done => {
		spawn.mockImplementation(() => ({
			stdout: {
				on(value, cb) {
					cb('test\n');
				},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		const _options = Object.assign({}, options, {
			onRecieve(text) {
				expect(text).toBe('test');
				done();
			},
		});
		expect(typeof runNpmScript(_options)).toBe('object');
	});
	it('onError', done => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on(value, cb) {
					cb('test\n');
				},
			},
			on() {},
			kill() {},
		}));
		const _options = Object.assign({}, options, {
			onError(text) {
				expect(text).toBe('test');
				done();
			},
		});
		expect(typeof runNpmScript(_options)).toBe('object');
	});
	it('onExit', done => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on(value, cb) {
				cb();
			},
			kill() {},
		}));
		const _options = Object.assign({}, options, {
			onExit() {
				done();
			},
		});
		expect(typeof runNpmScript(_options)).toBe('object');
	});
	it('onExit undefined', () => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on(value, cb) {
				cb();
			},
			kill() {},
		}));
		const _options = Object.assign({}, options, {
			onExit: undefined,
		});
		expect(typeof runNpmScript(_options)).toBe('object');
	});
	it('stop() -> kill', done => {
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on(value, cb) {
				cb();
			},
			kill() {},
		}));
		const _options = Object.assign({}, options);
		global.process.kill = () => {
			done();
		};
		runNpmScript(_options).stop();
	});
	it('start() -> return run()', () => {
		const _options = Object.assign({}, options);
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(_options).start()).toBe('object');
	});
	it('execute() -> return run()', () => {
		const _options = Object.assign({}, options);
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(_options).execute('npm run test')).toBe('object');
	});
	it('dafault fallback onRecieve', () => {
		const _options = Object.assign({}, options, {
			onRecieve: undefined,
		});
		spawn.mockImplementation(() => ({
			stdout: {
				on(value, cb) {
					cb('test\n');
				},
			},
			stderr: {
				on() {},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(_options).execute('npm run test')).toBe('object');
	});
	it('dafault fallback onError', () => {
		const _options = Object.assign({}, options, {
			onError: undefined,
		});
		spawn.mockImplementation(() => ({
			stdout: {
				on() {},
			},
			stderr: {
				on(value, cb) {
					cb('test\n');
				},
			},
			on() {},
			kill() {},
		}));
		expect(typeof runNpmScript(_options).execute('npm run test')).toBe('object');
	});
});
