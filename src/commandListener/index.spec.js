/* global jest, afterEach */
/* eslint global-require: 0*/
const commandListener = require('./index');

const _process = {
	stdin: {
		setEncoding: jest.fn(),
		setRawMode: jest.fn(),
		resume: jest.fn(),
		on: jest.fn(),
		read() {
			return 'test';
		},
	},
	stdout: {
		write: jest.fn(),
	},
};

const addString = inValue => {
	global.process = Object.assign(_process, {
		stdin: Object.assign(_process.stdin, {
			on: (value, cb) => {
				cb(inValue);
			},
		}),
	});
};

describe('commandListener', () => {
	it('write result in buffer', done => {
		addString('test');
		global.process = Object.assign(_process, {
			stdout: Object.assign(_process.stdout, {
				write: value => {
					if (value !== '') {
						expect(value).toBe('test');
						done();
					}
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('send command by press enter', done => {
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					expect(value).toBe('keypress');
					cb('', {
						ctrl: false,
						name: 'return',
					});
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
	it('press enter but without anything entered', () => {
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press ctrl c', done => {
		addString('test');
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					expect(value).toBe('keypress');
					cb('c', {
						ctrl: true,
						name: 'c',
					});
				},
			}),
		});
		global.process = Object.assign(_process, {
			exit: () => {
				done();
			},
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('write result in buffer', () => {
		addString('test');
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press backspace', done => {
		addString('test');
		global.process = Object.assign(_process, {
			stdin: Object.assign(_process.stdin, {
				on: (value, cb) => {
					cb('', {
						ctrl: false,
						name: 'backspace',
					});
				},
			}),
		});
		global.process = Object.assign(_process, {
			stdout: Object.assign(_process.stdout, {
				write: value => {
					if (value[0] === 't') {
						expect(value).toBe('tes');
						done();
					}
				},
			}),
		});
		expect(commandListener(() => {})).toBe(undefined);
	});
	it('press undefined key', () => {
		addString(undefined);
		expect(commandListener(() => {})).toBe(undefined);
	});
});
