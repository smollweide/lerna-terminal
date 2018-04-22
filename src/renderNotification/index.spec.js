/* global jest */
const renderNotification = require('./index');
const renderClear = require('../renderClear');
const { getUiState } = require('../store');
const { getBox } = require('../getTerminalPanel');
const { getDimensions } = require('../getDimensions');

jest.mock('../renderClear');
jest.mock('../store');
jest.mock('../getTerminalPanel');
jest.mock('../getDimensions');

describe('renderNotification', () => {
	beforeEach(() => {
		renderClear.mockClear();
		getUiState.mockClear();
		getBox.mockClear();
		getDimensions.mockClear();
	});
	it('error', done => {
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
		};
		renderClear.mockImplementation(() => {});
		getUiState.mockImplementation(() => ({
			notifications: [
				{
					type: 'error',
					message: 'message',
					delay: 100,
				},
			],
		}));
		getDimensions.mockImplementation(() => ({
			width: 40,
		}));
		getBox.mockImplementation(() => 'test');
		renderNotification(() => {
			done();
		});
	});
	it('warning', done => {
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
		};
		renderClear.mockImplementation(() => {});
		getUiState.mockImplementation(() => ({
			notifications: [
				{
					type: 'warning',
					message: 'message',
					delay: 100,
				},
			],
		}));
		getDimensions.mockImplementation(() => ({
			width: 40,
		}));
		getBox.mockImplementation(() => 'test');
		renderNotification(() => {
			done();
		});
	});
	it('success', done => {
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
		};
		renderClear.mockImplementation(() => {});
		getUiState.mockImplementation(() => ({
			notifications: [
				{
					type: 'success',
					message: 'message',
					delay: 100,
				},
			],
		}));
		getDimensions.mockImplementation(() => ({
			width: 40,
		}));
		getBox.mockImplementation(() => 'test');
		renderNotification(() => {
			done();
		});
	});
	it('default', done => {
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
		};
		renderClear.mockImplementation(() => {});
		getUiState.mockImplementation(() => ({
			notifications: [
				{
					type: 'default',
					message: 'message',
					delay: 100,
				},
			],
		}));
		getDimensions.mockImplementation(() => ({
			width: 40,
		}));
		getBox.mockImplementation(() => 'test');
		renderNotification(() => {
			done();
		});
	});
	it('fallback', done => {
		global.console.log = logText => {
			expect(typeof logText).toBe('string');
		};
		renderClear.mockImplementation(() => {});
		getUiState.mockImplementation(() => ({
			notifications: [
				{
					message: 'message',
				},
			],
		}));
		getDimensions.mockImplementation(() => ({
			width: 40,
		}));
		getBox.mockImplementation(() => 'test');
		renderNotification(() => {
			done();
		});
	});
});
