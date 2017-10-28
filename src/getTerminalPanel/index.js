/* eslint no-console: 0*/
/* eslint complexity: 0*/
'use strict';

const stringLength = require('string-length');
const chalk = require('chalk');
const getFilledArray = require('../getFilledArray');
const truncate = require('../truncate');
const { program } = require('../commander');

/* istanbul ignore next */
const themeSymbolMap = {
	test: {
		title: text => text,
		msg: text => text,
		error: text => text,
		titleSpace: ' ',
		topLeft: '┌',
		topRight: '┐',
		content: '│',
		separatorTop: '─',
		separatorBottom: '─',
		bottomLeft: '└',
		bottomRight: '┘',
	},
	default: {
		title: text => chalk.blue.bgWhite.bold(text),
		msg: text => text,
		error: text => chalk.red(text),
		titleSpace: chalk.bgWhite(' '),
		topLeft: chalk.white('┌'),
		topRight: chalk.white('┐'),
		content: chalk.white('│'),
		separatorTop: chalk.white('─'),
		separatorBottom: chalk.white('─'),
		bottomLeft: chalk.white('└'),
		bottomRight: chalk.white('┘'),
	},
	massive: {
		title: text => chalk.blue.bgWhite.bold(text),
		msg: text => text,
		error: text => chalk.red(text),
		titleSpace: chalk.bgWhite(' '),
		topLeft: chalk.bgWhite(' '),
		topRight: chalk.bgWhite(' '),
		content: chalk.bgWhite(' '),
		separatorTop: chalk.bgWhite(' '),
		separatorBottom: chalk.bgWhite(' '),
		bottomLeft: chalk.bgWhite(' '),
		bottomRight: chalk.bgWhite(' '),
	},
	minimal: {
		title: text => chalk.blue.bgWhite.bold(text),
		msg: text => text,
		error: text => chalk.red(text),
		titleSpace: chalk.bgWhite(' '),
		topLeft: ' ',
		topRight: ' ',
		content: ' ',
		separatorTop: ' ',
		separatorBottom: ' ',
		bottomLeft: ' ',
		bottomRight: ' ',
	},
};

/**
 * @param {string} type - the symbol type eg. content,topLeft,...
 * @returns {Object} returns the package.json data object
**/
function getThemeSymbol(type) {
	/* istanbul ignore next */
	if (process.env.NODE_ENV === 'test') {
		return themeSymbolMap.test[type];
	}
	/* istanbul ignore next */
	return themeSymbolMap[program.theme || 'default'][type];
}

/**
 * @param {string} filled - empty space of line filled with
 * @param {string} start - the first part of the line
 * @param {string} content - the inner part of the line, filled with "filled" till end of line
 * @param {string} end - the last part of the line
 * @param {number} width - the line width
 * @returns {string} - returns an line
**/
function getLine({ filled, start, content, end, width }) {
	if (filled !== '') {
		return getFilledArray(width, filled).join('');
	}

	let out = '';
	const maxContentLength = width - 3;

	if (start) {
		out += start;
	}
	if (content) {
		if (stringLength(content) > maxContentLength) {
			content = truncate(content, maxContentLength, false);
		}
		out += ` ${content}`;
		out += getFilledArray(maxContentLength - stringLength(content), ' ').join('');
	} else {
		out += getFilledArray(maxContentLength, ' ').join('');
	}
	if (end) {
		out += end;
	}
	return out;
}

/**
 * @param {string} title - the title which will be displayed in start line
 * @param {number} width - the line width
 * @returns {string} - returns an start line
**/
function getStartLine(title, width) {
	title = getThemeSymbol('title')(title);
	const separator = getThemeSymbol('separatorTop');
	const titleSpace = getThemeSymbol('titleSpace');
	const topLeft = getThemeSymbol('topLeft');
	const topRight = getThemeSymbol('topRight');
	let line = `${topLeft}${separator}${separator}${titleSpace}${title}${titleSpace}`;
	line += getFilledArray(width - stringLength(line) - 1, separator).join('');
	line += topRight;
	return line;
}

/**
 * @param {number} width - the line width
 * @returns {string} - returns an empty line
**/
function getEmptyLine(width) {
	return getLine({
		filled: '',
		start: getThemeSymbol('content'),
		content: ' ',
		end: getThemeSymbol('content'),
		width,
	});
}

/**
 * @param {number} width - the line width
 * @returns {string} - returns an end line
**/
function getEndLine(width) {
	const line = getFilledArray(width, getThemeSymbol('separatorBottom'));
	line[0] = getThemeSymbol('bottomLeft');
	line[line.length - 1] = getThemeSymbol('bottomRight');
	return line.join('');
}

/**
 * @param {number} width - the panel width
 * @param {number} height - the panel height
 * @param {string} title - the title which will be displayed in start line
 * @param {Array<string>} lines - array with the content of the panel
 * @returns {string} - returns an bordered panel
**/
function getTerminalPanel(width, height, title, lines) {
	width = parseInt(width, 10);
	const out = [];
	const rLines = lines.concat([]);
	let availableLines = height - 4;
	let renderedLines = 0;
	let shortenLines;
	if (rLines.length > availableLines) {
		shortenLines = rLines.slice(rLines.length - availableLines, rLines.length);
	} else {
		shortenLines = rLines.concat([]);
	}

	out.push(getStartLine(title, width));
	out.push(getEmptyLine(width));
	while (availableLines > 0) {
		if (shortenLines[renderedLines]) {
			out.push(
				getLine({
					filled: '',
					start: getThemeSymbol('content'),
					content: shortenLines[renderedLines],
					end: getThemeSymbol('content'),
					width,
				})
			);
		} else {
			out.push(getEmptyLine(width));
		}
		availableLines -= 1;
		renderedLines += 1;
	}
	out.push(getEmptyLine(width));
	out.push(getEndLine(width));
	return out;
}

/**
 * @param {number} width - the panel width
 * @param {number} height - the panel height
 * @param {string} title - the title which will be displayed in start line
 * @param {Array<string>} lines - array with the content of the panel
 * @returns {string} - returns an bordered panel
**/
function getTerminal(width, height, title, lines) {
	return lines.map(line => `${line}\n`);
}

/**
 * @param {string} text - the text
 * @param {string} type - the text type eg. error or msg
 * @returns {string} - returns an colored text
**/
function getText(text, type) {
	return getThemeSymbol(type)(text);
}

module.exports = {
	getTerminal,
	getTerminalPanel,
	getLine,
	getStartLine,
	getEndLine,
	getText,
};
