'use strict';
const resolve = require('../resolve');

const dimensions = {
	width: process.stdout.columns,
	height: process.stdout.rows,
};

/**
 * @param {Function<string>} onResize - the callback function
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function resizeListener(onResize, { _dimensions, _process }) {
	const check = () => {
		if (_dimensions.width !== _process.stdout.columns || _dimensions.height !== _process.stdout.rows) {
			_dimensions.width = _process.stdout.columns;
			_dimensions.height = _process.stdout.rows;
			onResize();
		}
	};
	setInterval(check, 500);
}

module.exports = { dimensions, resizeListener: resolve(resizeListener, { dimensions, process }) };
