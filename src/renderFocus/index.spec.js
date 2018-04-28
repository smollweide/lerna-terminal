/* global jest */
const { getState, getUiState } = require('../store');
const { getDimensions } = require('../getDimensions');
const renderAllPanels = require('../renderAllPanels');

const renderFocus = require('./index');

jest.mock('../store');
jest.mock('../getDimensions');
jest.mock('../renderAllPanels');

describe('renderFocus', () => {
	beforeEach(() => {
		getState.mockClear();
		getUiState.mockClear();
		getDimensions.mockClear();
		renderAllPanels.mockClear();
	});
	it('default', done => {
		getState.mockImplementation(() => ({
			utils: { log: [123] },
			ui: { log: ['started'] },
			dateTime: {},
		}));
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
				done();
			},
			focus: 'utils',
		}));
		getDimensions.mockImplementation(() => ({ width: 20, height: 20 }));
		renderAllPanels.mockImplementation(() => {});
		renderFocus();
	});
	it('unknow focus -> renderAllPanels', done => {
		getState.mockImplementation(() => ({
			utils: { log: [123] },
			ui: { log: ['started'] },
			dateTime: {},
		}));
		getUiState.mockImplementation(() => ({
			print() {},
			focus: 'test',
		}));
		getDimensions.mockImplementation(() => ({ width: 20, height: 20 }));
		renderAllPanels.mockImplementation(() => {
			done();
		});
		renderFocus();
	});
});
