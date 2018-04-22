/* global jest */
const render = require('./index');
const { getUiState } = require('../store');
const renderAllPanels = require('../renderAllPanels');
const renderFocus = require('../renderFocus');
const renderHelp = require('../renderHelp');
const renderHelpFocus = require('../renderHelpFocus');
const renderNotification = require('../renderNotification');

jest.mock('../store');
jest.mock('../renderAllPanels');
jest.mock('../renderFocus');
jest.mock('../renderHelp');
jest.mock('../renderHelpFocus');
jest.mock('../renderNotification');

describe('render', () => {
	beforeEach(() => {
		getUiState.mockClear();
		renderAllPanels.mockClear();
		renderHelp.mockClear();
		renderFocus.mockClear();
		renderHelpFocus.mockClear();
		renderNotification.mockClear();
	});
	it('focus all', done => {
		getUiState.mockImplementation(() => ({ focus: 'all', notifications: [] }));
		renderAllPanels.mockImplementation(() => {
			done();
		});
		renderHelp.mockImplementation(() => {});
		renderFocus.mockImplementation(() => {});
		renderHelpFocus.mockImplementation(() => {});
		renderNotification.mockImplementation(() => {});
		expect(render()).toBe(undefined);
	});
	it('render notification', done => {
		getUiState.mockImplementation(() => ({
			focus: 'all',
			notifications: [
				{
					type: 'error',
					message: 'message',
					delay: 10,
				},
			],
		}));
		renderAllPanels.mockImplementation(() => {});
		renderHelp.mockImplementation(() => {});
		renderFocus.mockImplementation(() => {});
		renderHelpFocus.mockImplementation(() => {});
		renderNotification.mockImplementation(() => {
			done();
		});
		expect(render()).toBe(undefined);
	});
	it('focus empty string', done => {
		getUiState.mockImplementation(() => ({ focus: '', notifications: [] }));
		renderAllPanels.mockImplementation(() => {
			done();
		});
		renderHelp.mockImplementation(() => {});
		renderFocus.mockImplementation(() => {});
		renderHelpFocus.mockImplementation(() => {});
		renderNotification.mockImplementation(() => {});
		expect(render()).toBe(undefined);
	});
	it('help', done => {
		getUiState.mockImplementation(() => ({ focus: '', notifications: [], help: true }));
		renderAllPanels.mockImplementation(() => {});
		renderHelp.mockImplementation(() => {
			done();
		});
		renderFocus.mockImplementation(() => {});
		renderHelpFocus.mockImplementation(() => {});
		renderNotification.mockImplementation(() => {});
		expect(render()).toBe(undefined);
	});
	it('focus help', done => {
		getUiState.mockImplementation(() => ({ focus: 'test', notifications: [], help: true }));
		renderAllPanels.mockImplementation(() => {});
		renderHelp.mockImplementation(() => {});
		renderFocus.mockImplementation(() => {});
		renderHelpFocus.mockImplementation(() => {
			done();
		});
		renderNotification.mockImplementation(() => {});
		expect(render()).toBe(undefined);
	});
	it('focus', done => {
		getUiState.mockImplementation(() => ({ focus: 'test', notifications: [] }));
		renderAllPanels.mockImplementation(() => {});
		renderHelp.mockImplementation(() => {});
		renderFocus.mockImplementation(() => {
			done();
		});
		renderHelpFocus.mockImplementation(() => {});
		renderNotification.mockImplementation(() => {});
		expect(render()).toBe(undefined);
	});
});
