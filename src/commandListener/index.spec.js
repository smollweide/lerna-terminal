const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { commandListener } = require('./index');

const process = {
	stdin: {
		setEncoding() {},
		on() {},
		read() {
			return 'test';
		},
	},
};

describe('commandListener', () => {
	it('execute without error', done => {
		const _process = dcopy(process);
		_process.stdin.on = (value, cb) => {
			expect(value).toBe('readable');
			cb();
		};
		const _commandListener = resolve(commandListener, { process: _process });
		expect(
			_commandListener(value => {
				expect(value).toBe('test');
				done();
			})
		).toBe(undefined);
	});
	it('execute without error when chunk is null', () => {
		const _process = dcopy(process);
		_process.stdin.on = (value, cb) => {
			expect(value).toBe('readable');
			cb();
		};
		_process.stdin.read = () => {
			return null;
		};
		const _commandListener = resolve(commandListener, { process: _process });
		expect(_commandListener(() => {})).toBe(undefined);
	});
});
