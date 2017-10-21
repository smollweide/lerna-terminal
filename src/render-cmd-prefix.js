'use strict';

const cmdPrefix = 'lerna-terminal~$ ';

/**
 * @description provides an string in terminal with cursor afterwards
 * @returns {void}
**/
function renderCmdPrefix() {
	process.stdout.write(cmdPrefix);
}

module.exports = renderCmdPrefix;
