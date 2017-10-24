'use strict';
const resolveDependency = require('./resolve-dependency');

const dimensions = {
	width: process.stdout.columns,
	height: process.stdout.rows,
};

const _resizeListener = (onResize, { _process }) => {
	/**
	 * @returns {void}
	**/
	function check() {
		if (dimensions.width !== _process.stdout.columns || dimensions.height !== _process.stdout.rows) {
			dimensions.width = _process.stdout.columns;
			dimensions.height = _process.stdout.rows;
			onResize();
		}
	}
	setInterval(check, 500);
};

/**
 * @param {Function<string>} onResize - the callback function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function resizeListener(onResize, di) {
	_resizeListener(onResize, Object.assign(resolveDependency(di, 'process', process)));
}

module.exports = { dimensions, resizeListener };
