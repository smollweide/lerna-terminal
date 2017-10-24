const runNpmScript = require('../run-npm-script');

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
		expect(
			typeof runNpmScript(options, {
				spawn() {
					return spawnReturn;
				},
			}).start
		).toBe('function');
	});
	it('stop exist', () => {
		expect(
			typeof runNpmScript(options, {
				spawn() {
					return spawnReturn;
				},
			}).stop
		).toBe('function');
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
		expect(
			typeof runNpmScript(_options, {
				spawn() {
					return _spawnReturn;
				},
			})
		).toBe('object');
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
		expect(
			typeof runNpmScript(_options, {
				spawn() {
					return _spawnReturn;
				},
			})
		).toBe('object');
	});
	it('onExit', done => {
		const _options = Object.assign({}, options);
		_options.onExit = done;
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.on = (value, cb) => {
			cb();
		};
		expect(
			typeof runNpmScript(_options, {
				spawn() {
					return _spawnReturn;
				},
			})
		).toBe('object');
	});
	it('stop() -> kill', done => {
		const _options = Object.assign({}, options);
		const _spawnReturn = Object.assign({}, spawnReturn);
		_spawnReturn.kill = type => {
			expect(type).toBe('SIGINT');
			done();
		};
		runNpmScript(_options, {
			spawn() {
				return _spawnReturn;
			},
		}).stop();
	});
	it('start() -> return run()', () => {
		const _options = Object.assign({}, options);
		const _spawnReturn = Object.assign({}, spawnReturn);
		expect(
			typeof runNpmScript(_options, {
				spawn() {
					return _spawnReturn;
				},
			}).start()
		).toBe('object');
	});
});
