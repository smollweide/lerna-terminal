/* eslint no-console: 0*/
'use strict';
const renderCmdPrefix = require('./render-cmd-prefix');
const renderClear = require('./render-clear');
const getFilledArray = require('./get-filled-array');
const { state } = require('./store');
const { getTerminalPanel } = require('./get-terminal-panel');
const mergePanelsRow = require('./merge-panels-row');
const { dimensions } = require('./get-dimensions');

/**
 * @returns {void}
**/
function renderAllPanels() {
	const currentState = Object.assign({}, state);
	const stateKeys = Object.keys(currentState);
	const boardColumns = 3;
	const panelWidth = parseInt(dimensions.width / boardColumns, 10);
	const boardRows = Math.ceil(stateKeys.length / boardColumns);
	const panelHeight = parseInt(dimensions.height / boardRows, 10) - 1;
	const renderArrInner = getFilledArray(boardColumns, '');
	const renderArr = getFilledArray(boardRows, renderArrInner);

	renderClear();

	// map panel into row structure
	let counterColumn = 0;
	let counterRow = 0;

	stateKeys.forEach(packageName => {
		renderArr[counterRow][counterColumn] = getTerminalPanel(
			panelWidth,
			panelHeight,
			packageName,
			currentState[packageName].log
		);
		counterColumn += 1;
		if (counterColumn >= boardColumns) {
			counterColumn = 0;
			counterRow += 1;
		}
	});

	renderArr.forEach(panelRow => {
		console.log(mergePanelsRow(panelRow, panelHeight).join('\n'));
	});
	renderCmdPrefix();
}

module.exports = renderAllPanels;
