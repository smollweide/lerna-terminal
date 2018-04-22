/* global jest */
const renderHelpFocus = require('./index');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');

jest.mock('../renderCmdPrefix');
jest.mock('../renderClear');

global.console.log = () => {};

describe('renderHelpFocus', () => {
	beforeEach(() => {
		renderCmdPrefix.mockClear();
		renderClear.mockClear();
	});
	it('default', done => {
		renderCmdPrefix.mockImplementation(() => {
			done();
		});
		renderClear.mockImplementation(() => {});
		renderHelpFocus();
	});
});
