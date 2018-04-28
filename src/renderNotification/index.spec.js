/* global jest */
const renderNotification = require('./index');
const { getUiState } = require('../store');
const { getBox } = require('../getTerminalPanel');
const { getDimensions } = require('../getDimensions');

jest.mock('../store');
jest.mock('../getTerminalPanel');
jest.mock('../getDimensions');

describe('renderNotification', () => {
	beforeEach(() => {
		getUiState.mockClear();
		getBox.mockClear();
		getDimensions.mockClear();
	});
	it('error', done => {
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
			},
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
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
			},
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
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
			},
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
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
			},
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
		getUiState.mockImplementation(() => ({
			print(logText) {
				expect(typeof logText).toBe('string');
			},
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
