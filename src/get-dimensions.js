'use strict';

const dimensions = {
	width: process.stdout.columns,
	height: process.stdout.rows,
};

/**
 * @param {Function<string>} onResize - the callback function
 * @param {Object} diProcess - dependency injection process for tests
 * @returns {void}
**/
function resizeListener(onResize, diProcess = process) {
	/**
	 * @returns {void}
	**/
	function check() {
		if (dimensions.width !== diProcess.stdout.columns || dimensions.height !== diProcess.stdout.rows) {
			dimensions.width = diProcess.stdout.columns;
			dimensions.height = diProcess.stdout.rows;
			onResize();
		}
	}
	setInterval(check, 500);
}

module.exports = { dimensions, resizeListener };
