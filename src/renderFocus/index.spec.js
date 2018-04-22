/* global jest */
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');
const { getState, getUiState } = require('../store');
const { getDimensions } = require('../getDimensions');
const renderAllPanels = require('../renderAllPanels');

const renderFocus = require('./index');

jest.mock('../renderCmdPrefix');
jest.mock('../renderClear');
jest.mock('../store');
jest.mock('../getDimensions');
jest.mock('../renderAllPanels');

describe('renderFocus', () => {
	beforeEach(() => {
		getState.mockClear();
		getUiState.mockClear();
		getDimensions.mockClear();
		renderClear.mockClear();
		renderCmdPrefix.mockClear();
		renderAllPanels.mockClear();
	});
	it('default', done => {
		getState.mockImplementation(() => ({
			utils: { log: [123] },
			ui: { log: ['started'] },
			dateTime: {},
		}));
		getUiState.mockImplementation(() => ({ focus: 'utils' }));
		getDimensions.mockImplementation(() => ({ width: 20, height: 20 }));
		renderClear.mockImplementation(() => {});
		renderCmdPrefix.mockImplementation(() => {});
		renderAllPanels.mockImplementation(() => {});
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
			done();
		};
		renderFocus();
	});
	it('unknow focus -> renderAllPanels', done => {
		getState.mockImplementation(() => ({
			utils: { log: [123] },
			ui: { log: ['started'] },
			dateTime: {},
		}));
		getUiState.mockImplementation(() => ({ focus: 'test' }));
		getDimensions.mockImplementation(() => ({ width: 20, height: 20 }));
		renderClear.mockImplementation(() => {});
		renderCmdPrefix.mockImplementation(() => {});
		renderAllPanels.mockImplementation(() => {
			done();
		});
		global.console.log = () => {};
		renderFocus();
	});
});
