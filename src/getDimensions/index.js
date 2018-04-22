'use strict';

const dimensions = {
	width: process.stdout.columns,
	height: process.stdout.rows,
};

/**
 * @param {Function<string>} onResize - the callback function
 * @returns {void}
 **/
function resizeListener(onResize) {
	const check = () => {
		if (dimensions.width !== process.stdout.columns || dimensions.height !== process.stdout.rows) {
			dimensions.width = process.stdout.columns;
			dimensions.height = process.stdout.rows;
			onResize();
		}
	};
	setInterval(check, 500);
}

/**
 * @returns {Object} dimensions
 **/
function getDimensions() {
	return dimensions;
}

module.exports = { dimensions, getDimensions, resizeListener };
