'use strict';

/**
 * @description merges the given panels into one row
 * @param {Array<Array<string>>} panels - the panel array
 * @param {number} linesCount - number of lines for this row
 * @returns {Array} returns the merged lines
**/
function mergePanelsRow(panels, linesCount) {
	const lines = [];
	let i = 0;

	const mergeLine = panel => {
		if (!lines[i]) {
			lines.push('');
		}
		if (panel[i]) {
			lines[i] += panel[i];
		}
	};

	for (i = 0; i < linesCount; i += 1) {
		panels.forEach(mergeLine);
	}

	return lines;
}

module.exports = mergePanelsRow;
