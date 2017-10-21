// const dcopy = require('deep-copy');
const fs = require('fs');
const { getTerminalPanel, getLine, getTerminal, getText } = require('../get-terminal-panel');

describe('getTerminalPanel', () => {
	describe('getTerminalPanel', () => {
		it('default', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					terminalPanel: getTerminalPanel(30, 10, 'title', ['npm run start', 'server started']),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-terminal-panel-1', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-panel-1', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('more lines then available', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					terminalPanel: getTerminalPanel(30, 5, 'title', ['npm run start', 'server started', 'a', 'b', 'c']),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-terminal-panel-2', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-panel-2', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getLine', () => {
		it('not filled', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({ filled: '', start: '│', content: 'content', end: '│', width: 20 }),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-1', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-1', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('filled', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({ filled: '-', start: '│', content: 'content', end: '│', width: 20 }),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-2', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-2', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no start', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({ filled: '', content: 'content', end: '│', width: 20 }),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-3', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-3', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no content', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({ filled: '', start: '│', end: '│', width: 20 }),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-4', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-4', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('long content -> truncate', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({
						filled: '',
						start: '│',
						content: 'long-long-long-long-long-long-content',
						end: '│',
						width: 20,
					}),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-5', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-5', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no end', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					line: getLine({
						filled: '',
						start: '│',
						content: 'content',
						width: 20,
					}),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-line-6', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-line-6', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getTerminal', () => {
		it('default', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					terminal: getTerminal(30, 10, 'title', ['npm run start', 'server started']),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-terminal-1', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-1', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getText', () => {
		it('msg', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					text: getText('npm run start', 'msg'),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-text-1', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-text-1', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('error', () => {
			const terminalPanel = encodeURI(
				JSON.stringify({
					text: getText('error 0', 'error'),
				})
			);
			// fs.writeFileSync('./src/__tests__/__snapshots__/get-text-2', terminalPanel);
			const expected = fs.readFileSync('./src/__tests__/__snapshots__/get-text-2', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
});
