'use strict';
const { program } = require('../commander');

const state = {};
const uiState = {
	notifications: [],
	help: false,
};

/**
 * @description prepares the initial store
 * @returns {void}
 **/
function provideStore() {
	/* istanbul ignore next */
	uiState.focus = program.focus ? program.focus : 'all';
}

module.exports = { state, uiState, provideStore };
