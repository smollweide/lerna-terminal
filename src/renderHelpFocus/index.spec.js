/* global jest */
const renderHelpFocus = require('./index');

global.console.log = () => {};

describe('renderHelpFocus', () => {
	it('default', () => {
		renderHelpFocus();
	});
});
