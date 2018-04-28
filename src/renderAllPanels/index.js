/* eslint no-console: 0*/
'use strict';
const getFilledArray = require('../getFilledArray');
const { getState, getUiState } = require('../store');
const { getTerminalPanel } = require('../getTerminalPanel');
const mergePanelsRow = require('../mergePanelsRow');
const { getDimensions } = require('../getDimensions');

/**
 * @param {number} amountOfProcesses - amount of processes
 * @returns {void}
 **/
function getColumnsAndRows(amountOfProcesses) {
	let columns = Math.ceil(amountOfProcesses / 2);

	if (amountOfProcesses === 2) {
		columns = 2;
	} else if (amountOfProcesses === 9) {
		columns = 3;
	} else if (amountOfProcesses >= 10) {
		columns = 4;
	}

	return {
		columns,
		rows: Math.ceil(amountOfProcesses / columns),
	};
}

/**
 * @returns {void}
 **/
function renderAllPanels() {
	const currentState = Object.assign({}, getState());
	const dimensions = getDimensions();
	const stateKeys = Object.keys(currentState);
	const { columns, rows } = getColumnsAndRows(stateKeys.length);
	const panelWidth = parseInt(dimensions.width / columns, 10);
	const panelHeight = parseInt(dimensions.height / rows, 10) - 1;
	const renderArrInner = getFilledArray(columns, '');
	const renderArr = getFilledArray(rows, renderArrInner);

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
		if (counterColumn >= columns) {
			counterColumn = 0;
			counterRow += 1;
		}
	});
	getUiState().print(`${renderArr.map(panelRow => mergePanelsRow(panelRow, panelHeight).join('\n')).join('')}\n`);
}

module.exports = renderAllPanels;
module.exports.getColumnsAndRows = getColumnsAndRows;
