/* global jest */
const renderAllPanels = require('./index');
const { getColumnsAndRows } = require('./index');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');
const { getState } = require('../store');
const { getDimensions } = require('../getDimensions');

jest.mock('../renderCmdPrefix');
jest.mock('../renderClear');
jest.mock('../store');
jest.mock('../getDimensions');

getDimensions.mockImplementation(() => ({
	width: 120,
	height: 20,
}));
getState.mockImplementation(() => ({
	utils: {
		log: ['started'],
		terminal: {
			isRunning: true,
		},
	},
	ui: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
	},
	ui2: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
	},
	ui3: {
		log: ['row'],
		terminal: {
			isRunning: true,
		},
	},
	dateTime: {},
}));
getDimensions.mockImplementation(() => ({
	width: 120,
	height: 20,
}));
renderClear.mockImplementation(() => {});
renderCmdPrefix.mockImplementation(() => {});

describe('renderAllPanels', () => {
	it('default', done => {
		global.console = Object.assign(global.console, {
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
		});
		expect(renderAllPanels()).toBe(undefined);
	});
});

describe('getColumnsAndRows', () => {
	it('1', () => {
		expect(getColumnsAndRows(1)).toEqual({
			columns: 1,
			rows: 1,
		});
	});
	it('2', () => {
		expect(getColumnsAndRows(2)).toEqual({
			columns: 2,
			rows: 1,
		});
	});
	it('3', () => {
		expect(getColumnsAndRows(3)).toEqual({
			columns: 2,
			rows: 2,
		});
	});
	it('4', () => {
		expect(getColumnsAndRows(4)).toEqual({
			columns: 2,
			rows: 2,
		});
	});
	it('5', () => {
		expect(getColumnsAndRows(5)).toEqual({
			columns: 3,
			rows: 2,
		});
	});
	it('6', () => {
		expect(getColumnsAndRows(6)).toEqual({
			columns: 3,
			rows: 2,
		});
	});
	it('7', () => {
		expect(getColumnsAndRows(7)).toEqual({
			columns: 4,
			rows: 2,
		});
	});
	it('8', () => {
		expect(getColumnsAndRows(8)).toEqual({
			columns: 4,
			rows: 2,
		});
	});
	it('9', () => {
		expect(getColumnsAndRows(9)).toEqual({
			columns: 3,
			rows: 3,
		});
	});
	it('10', () => {
		expect(getColumnsAndRows(10)).toEqual({
			columns: 4,
			rows: 3,
		});
	});
});
