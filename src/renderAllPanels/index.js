/* eslint no-console: 0*/
'use strict';
const resolve = require('../resolve');
const renderCmdPrefix = require('../renderCmdPrefix');
const renderClear = require('../renderClear');
const getFilledArray = require('../getFilledArray');
const { state } = require('../store');
const { getTerminalPanel } = require('../getTerminalPanel');
const mergePanelsRow = require('../mergePanelsRow');
const { dimensions } = require('../getDimensions');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderAllPanels({ _state, _log, _renderClear, _renderCmdPrefix, _dimensions }) {
	const currentState = Object.assign({}, _state);
	const stateKeys = Object.keys(currentState);
	const boardColumns = 3;
	const panelWidth = parseInt(_dimensions.width / boardColumns, 10);
	const boardRows = Math.ceil(stateKeys.length / boardColumns);
	const panelHeight = parseInt(_dimensions.height / boardRows, 10) - 1;
	const renderArrInner = getFilledArray(boardColumns, '');
	const renderArr = getFilledArray(boardRows, renderArrInner);

	_renderClear();

	// map panel into row structure
	let counterColumn = 0;
	let counterRow = 0;

	stateKeys.forEach(packageName => {
		if (!currentState[packageName].log) {
			return;
		}
		renderArr[counterRow][counterColumn] = getTerminalPanel({
			width: panelWidth,
			height: panelHeight,
			title: packageName,
			lines: currentState[packageName].log,
			isRunning: currentState[packageName].terminal.isRunning,
		});
		counterColumn += 1;
		if (counterColumn >= boardColumns) {
			counterColumn = 0;
			counterRow += 1;
		}
	});

	renderArr.forEach(panelRow => {
		_log(mergePanelsRow(panelRow, panelHeight).join('\n'));
	});
	_renderCmdPrefix();
}

module.exports = resolve(renderAllPanels, { state, log: console.log, renderClear, renderCmdPrefix, dimensions });
module.exports.renderAllPanels = renderAllPanels;
