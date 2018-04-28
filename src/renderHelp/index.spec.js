/* global jest */
const renderHelp = require('./index');

global.console.log = () => {};

describe('renderHelp', () => {
	it('default', () => {
		renderHelp();
	});
});
