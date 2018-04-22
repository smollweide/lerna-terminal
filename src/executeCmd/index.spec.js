/* global jest, afterEach */
/* eslint global-require: 0*/
const executeCmd = require('./index');
const cmdFocus = require('../cmdFocus');
const cmdNative = require('../cmdNative');
const cmdStart = require('../cmdStart');
const cmdInvalid = require('../cmdInvalid');
const render = require('../render');
const getFocused = require('../getFocused');
const isValidPackageName = require('../isValidPackageName');

jest.mock('../cmdFocus', () => jest.fn());
jest.mock('../cmdNative', () => jest.fn());
jest.mock('../cmdStart', () => jest.fn());
jest.mock('../cmdInvalid', () => jest.fn());
jest.mock('../isValidPackageName', () => jest.fn());
jest.mock('../render', () => jest.fn());
jest.mock('../getFocused', () => jest.fn());

describe('executeCmd', () => {
	it('invalid with empty string', () => {
		expect(executeCmd('')).toBe(undefined);
	});
	it('invalid with undefined', () => {
		expect(executeCmd(undefined)).toBe(undefined);
	});

	// focus shortcut
	it('focus shortcut', () => {
		isValidPackageName.mockReturnValueOnce(true);
		executeCmd('utils');
		expect(cmdFocus).toBeCalledWith('utils', render);
	});

	// focusedPackageName
	describe('focusedPackageName', () => {
		it('execute native (means cmd for package child_process)', () => {
			getFocused.mockReturnValueOnce('utils');
			executeCmd('npm run test');
			expect(cmdNative).toBeCalledWith('npm run test', 'utils', render);
		});
		it('execute start child_process because of focused', () => {
			getFocused.mockReturnValueOnce('utils');
			executeCmd('start utils');
			expect(cmdStart).toBeCalledWith('utils', render);
		});
	});

	describe('isValidCmd', () => {
		it('execute start all', () => {
			executeCmd('start');
			expect(cmdStart).toBeCalledWith(undefined, render);
		});
		it('execute start child_process because of second cmd argument', () => {
			executeCmd('start utils');
			expect(cmdStart).toBeCalledWith('utils', render);
		});
	});

	it('nothing', () => {
		executeCmd('unknown');
		expect(cmdInvalid).toBeCalledWith(render, 'unknown');
	});
});
