/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const resolve = require('../resolve');
const renderClear = require('../renderClear');
const { uiState } = require('../store');
const { getBox } = require('../getTerminalPanel');
const { dimensions } = require('../getDimensions');

/**
 * @description clears the terminal
 * @param {Function} render - the render function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderNotification(render, { _log, _renderClear, _uiState, _dimensions, _getBox }) {
	_renderClear();
	const { type = 'info', message, delay = 2000 } = _uiState.notifications[0];
	let msg;

	const colored = (color, value) => {
		/* istanbul ignore next */
		if (process.env.NODE_ENV === 'test') {
			return value;
		}
		/* istanbul ignore next */
		return chalk[color].bold(value);
	};

	switch (type) {
		case 'error':
			msg = colored('red', message);
			break;
		case 'warning':
			msg = colored('yellow', message);
			break;
		case 'success':
			msg = colored('green', message);
			break;
		default:
			msg = message;
			break;
	}
	_log(_getBox(type, [msg], _dimensions.width));
	setTimeout(() => {
		const notifications = _uiState.notifications.slice(1, _uiState.notifications.length - 1);
		_uiState.notifications = notifications;
		render();
	}, delay);
}

module.exports = resolve(renderNotification, { log: console.log, renderClear, uiState, dimensions, getBox });
module.exports.renderNotification = renderNotification;
