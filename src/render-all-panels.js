/* eslint no-console: 0*/
'use strict';
const resolveDependency = require('./resolve-dependency');
const renderCmdPrefix = require('./render-cmd-prefix');
const renderClear = require('./render-clear');
const getFilledArray = require('./get-filled-array');
const { state } = require('./store');
const { getTerminalPanel } = require('./get-terminal-panel');
const mergePanelsRow = require('./merge-panels-row');
const { dimensions } = require('./get-dimensions');

const _renderAllPanels = ({ _state, _log, _renderClear, _renderCmdPrefix, _dimensions }) => {
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
		_log(mergePanelsRow(panelRow, panelHeight).join('\n'));
	});
	_renderCmdPrefix();
};

/**
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function renderAllPanels(di) {
	_renderAllPanels(
		Object.assign(
			resolveDependency(di, 'state', state),
			resolveDependency(di, 'log', console.log),
			resolveDependency(di, 'renderClear', renderClear),
			resolveDependency(di, 'renderCmdPrefix', renderCmdPrefix),
			resolveDependency(di, 'dimensions', dimensions)
		)
	);
}

module.exports = renderAllPanels;
