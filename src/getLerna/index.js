'use strict';

const fs = require('fs');
const path = require('path');

/**
 * @returns {Object} returns the lerna.json data object
 **/
function getLerna() {
	const appDirectory = fs.realpathSync(process.cwd());
	return JSON.parse(fs.readFileSync(path.join(appDirectory, 'lerna.json'), 'utf8'));
}

module.exports = getLerna;
