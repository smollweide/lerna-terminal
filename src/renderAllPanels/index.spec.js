const resolve = require('../resolve');
const { renderAllPanels, getColumnsAndRows } = require('./index');

const state = {
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
};

describe('renderAllPanels', () => {
	it('default', done => {
		const _renderAllPanels = resolve(renderAllPanels, {
			dimensions: {
				width: 120,
				height: 20,
			},
			state,
			log(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
			renderClear() {},
			renderCmdPrefix() {},
		});
		_renderAllPanels();
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
