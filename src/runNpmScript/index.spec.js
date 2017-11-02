const resolve = require('../resolve');
const runNpmScript = require('./index');

const options = {
	scriptName: 'utils',
	packagePath: '/path/',
};

const spawnReturn = {
	stdout: {
		on() {},
	},
	stderr: {
		on() {},
	},
	on() {},
	kill() {},
};

describe('runNpmScript', () => {
	it('start exist', () => {
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return spawnReturn;
			},
		});
		expect(typeof _runNpmScript(options).start).toBe('function');
	});
	it('stop exist', () => {
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return spawnReturn;
			},
		});
		expect(typeof _runNpmScript(options).stop).toBe('function');
	});
	it('onRecieve', done => {
		const _options = Object.assign({}, options);
		_options.onRecieve = text => {
			expect(text).toBe('test');
			done();
		};
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.stdout.on = (value, cb) => {
			cb('test\n');
		};
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options)).toBe('object');
	});
	it('onError', done => {
		const _options = Object.assign({}, options);
		_options.onError = text => {
			expect(text).toBe('test');
			done();
		};
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.stderr.on = (value, cb) => {
			cb('test\n');
		};
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options)).toBe('object');
	});
	it('onExit', done => {
		const _options = Object.assign({}, options);
		_options.onExit = done;
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.on = (value, cb) => {
			cb();
		};
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options)).toBe('object');
	});
	it('onExit undefined', () => {
		const _options = Object.assign({}, options);
		_options.onExit = undefined;
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.on = (value, cb) => {
			cb();
		};
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options)).toBe('object');
	});
	it('stop() -> kill', done => {
		const _options = Object.assign({}, options);
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.kill = type => {
			expect(type).toBe('SIGINT');
			done();
		};
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		_runNpmScript(_options).stop();
	});
	it('start() -> return run()', () => {
		const _options = Object.assign({}, options);
		const _spawnReturn = Object.assign({}, spawnReturn);
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options).start()).toBe('object');
	});
	it('execute() -> return run()', () => {
		const _options = Object.assign({}, options);
		const _spawnReturn = Object.assign({}, spawnReturn);
		const _runNpmScript = resolve(runNpmScript, {
			spawn() {
				return _spawnReturn;
			},
		});
		expect(typeof _runNpmScript(_options).execute('npm run test')).toBe('object');
	});
});
