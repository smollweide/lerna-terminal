'use strict';
const isValidPackageName = require('../isValidPackageName');
const { uiState } = require('../store');

/**
 * @returns {boolean} returns focused packageName
 **/
function getFocused() {
	if (!uiState.focus || uiState.focus === 'all' || uiState.focus === '') {
		return undefined;
	}

	if (!isValidPackageName(uiState.focus)) {
		return undefined;
	}

	return uiState.focus;
}

module.exports = getFocused;
