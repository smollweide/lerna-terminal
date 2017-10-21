'use strict';
const { program } = require('./commander');

const state = {};
const uiState = {};

/**
 * @description prepares the initial store
 * @returns {void}
**/
function provideStore() {
	uiState.focus = program.focus ? program.focus : 'all';
}

module.exports = { state, uiState, provideStore };
