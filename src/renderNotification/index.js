/* eslint no-console: 0*/
'use strict';
const chalk = require('chalk');
const { getUiState } = require('../store');
const { getBox } = require('../getTerminalPanel');
const { getDimensions } = require('../getDimensions');

/**
 * @description clears the terminal
 * @param {Function} render - the render function
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function renderNotification(render) {
	const uiState = getUiState();
	const dimensions = getDimensions();
	const { type = 'info', message, delay = 2000 } = uiState.notifications[0];
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
	uiState.print(getBox(type, [msg], dimensions.width));
	setTimeout(() => {
		const notifications = uiState.notifications.slice(1, uiState.notifications.length - 1);
		uiState.notifications = notifications;
		render();
	}, delay);
}

module.exports = renderNotification;
