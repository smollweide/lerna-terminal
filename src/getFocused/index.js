'use strict';
const resolve = require('../resolve');
const isValidPackageName = require('../isValidPackageName');
const { uiState } = require('../store');

/**
 * @param {Object} di - dependency injection
 * @returns {boolean} returns focused packageName
**/
function getFocused({ _uiState, _isValidPackageName }) {
	if (!_uiState.focus || _uiState.focus === 'all' || _uiState.focus === '') {
		return undefined;
	}

	if (!_isValidPackageName(_uiState.focus)) {
		return undefined;
	}

	return _uiState.focus;
}

module.exports = resolve(getFocused, { uiState, isValidPackageName });
module.exports.getFocused = getFocused;
