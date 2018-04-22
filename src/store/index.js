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

/**
 * @returns {Object} state
 **/
function getState() {
	return state;
}
/**
 * @returns {Object} uiState
 **/
function getUiState() {
	return uiState;
}

module.exports = { state, getState, uiState, getUiState, provideStore };
