/* global jest, afterEach */
/* eslint global-require: 0*/
const commandListener = require('./index');

const _process = {
	stdin: {
		setEncoding: jest.fn(),
		on: jest.fn(),
		read() {
			return 'test';
		},
	},
};

describe('commandListener', () => {
	it('execute without error', done => {
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					expect(value).toBe('readable');
					cb();
				},
			}),
		});
		expect(
			commandListener(value => {
				expect(value).toBe('test');
				done();
			})
		).toBe(undefined);
	});
	it('execute without error when chunk is null', () => {
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					expect(value).toBe('readable');
					cb();
				},
				read() {
					return null;
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
});
