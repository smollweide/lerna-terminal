/* global jest */
const renderHelp = require('./index');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');

jest.mock('../renderCmdPrefix');
jest.mock('../renderClear');

global.console.log = () => {};

describe('renderHelp', () => {
	beforeEach(() => {
		renderCmdPrefix.mockClear();
		renderClear.mockClear();
	});
	it('default', done => {
		renderCmdPrefix.mockImplementation(() => {
			done();
		});
		renderClear.mockImplementation(() => {});
		renderHelp();
	});
});
