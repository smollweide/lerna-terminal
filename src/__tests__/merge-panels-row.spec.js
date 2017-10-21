// const dcopy = require('deep-copy');
const fs = require('fs');
const mergePanelsRow = require('../merge-panels-row');

describe('mergePanelsRow', () => {
	it('default', () => {
		const panel = JSON.parse(
			decodeURI(fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-panel-1', 'utf8'))
		).terminalPanel;
		const result = encodeURI(
			JSON.stringify({
				merged: mergePanelsRow([panel, panel], panel.length),
			})
		);
		// fs.writeFileSync('./src/__tests__/__snapshots__/merge-panels-row-1', result);
		const expected = fs.readFileSync('./src/__tests__/__snapshots__/merge-panels-row-1', 'utf8');
		expect(result).toEqual(expected);
	});
	it('un equal line length', () => {
		const panel1 = JSON.parse(
			decodeURI(fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-panel-1', 'utf8'))
		).terminalPanel;
		const panel2 = JSON.parse(
			decodeURI(fs.readFileSync('./src/__tests__/__snapshots__/get-terminal-panel-2', 'utf8'))
		).terminalPanel;
		const result = JSON.stringify({
			merged: mergePanelsRow([panel1, panel2], panel1.length),
		});
		// fs.writeFileSync('./src/__tests__/__snapshots__/merge-panels-row-2', result);
		const expected = fs.readFileSync('./src/__tests__/__snapshots__/merge-panels-row-2', 'utf8');
		expect(result).toEqual(expected);
	});
});
