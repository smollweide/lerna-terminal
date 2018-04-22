const fs = require('fs');
const { getTerminalPanel, getLine, getTerminal, getText, getBox } = require('./index');

describe('getTerminalPanel', () => {
	describe('getTerminalPanel', () => {
		it('default', () => {
			const terminalPanel = JSON.stringify({
				terminalPanel: getTerminalPanel({
					width: 30,
					height: 10,
					title: 'title',
					lines: ['npm run start', 'server started'],
				}),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-panel-1.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-panel-1.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('more lines then available', () => {
			const terminalPanel = JSON.stringify({
				terminalPanel: getTerminalPanel({
					width: 30,
					height: 5,
					title: 'title',
					lines: ['npm run start', 'server started', 'a', 'b', 'c'],
				}),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-panel-2.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-panel-2.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getLine', () => {
		it('not filled', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({ filled: '', start: '│', content: 'content', end: '│', width: 20 }),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-1.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-1.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('filled', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({ filled: '-', start: '│', content: 'content', end: '│', width: 20 }),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-2.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-2.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no start', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({ filled: '', content: 'content', end: '│', width: 20 }),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-3.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-3.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no content', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({ filled: '', start: '│', end: '│', width: 20 }),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-4.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-4.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('long content -> truncate', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({
					filled: '',
					start: '│',
					content: 'long-long-long-long-long-long-content',
					end: '│',
					width: 20,
				}),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-5.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-5.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('no end', () => {
			const terminalPanel = JSON.stringify({
				line: getLine({
					filled: '',
					start: '│',
					content: 'content',
					width: 20,
				}),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-line-6.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-line-6.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getTerminal', () => {
		it('default', () => {
			const terminalPanel = JSON.stringify({
				terminal: getTerminal(30, 10, 'title', ['npm run start', 'server started']),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-1.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-terminal-1.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
	describe('getBox', () => {
		it('default', () => {
			const box = JSON.stringify({
				box: getBox('test', ['msg'], 30),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-box-1.json', box);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-box-1.json', 'utf8');
			expect(box).toEqual(expected);
		});
	});
	describe('getText', () => {
		it('msg', () => {
			const terminalPanel = JSON.stringify({
				text: getText('npm run start', 'msg'),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-text-1.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-text-1.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
		it('error', () => {
			const terminalPanel = JSON.stringify({
				text: getText('error 0', 'error'),
			});
			// fs.writeFileSync('./src/getTerminalPanel/__snapshots__/get-text-2.json', terminalPanel);
			const expected = fs.readFileSync('./src/getTerminalPanel/__snapshots__/get-text-2.json', 'utf8');
			expect(terminalPanel).toEqual(expected);
		});
	});
});
