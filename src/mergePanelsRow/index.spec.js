const fs = require('fs');
const mergePanelsRow = require('./index');

describe('mergePanelsRow', () => {
	it('default', () => {
		const panel = JSON.parse(
			fs.readFileSync('./src/mergePanelsRow/__snapshots__/get-terminal-panel-1.json', 'utf8')
		).terminalPanel;
		const result = JSON.stringify({
			merged: mergePanelsRow([panel, panel], panel.length),
		});
		// fs.writeFileSync('./src/mergePanelsRow/__snapshots__/merge-panels-row-1.json', result);
		const expected = fs.readFileSync('./src/mergePanelsRow/__snapshots__/merge-panels-row-1.json', 'utf8');
		expect(result).toEqual(expected);
	});
	it('un equal line length', () => {
		const panel1 = JSON.parse(
			fs.readFileSync('./src/mergePanelsRow/__snapshots__/get-terminal-panel-1.json', 'utf8')
		).terminalPanel;
		const panel2 = JSON.parse(
			fs.readFileSync('./src/mergePanelsRow/__snapshots__/get-terminal-panel-2.json', 'utf8')
		).terminalPanel;
		const result = JSON.stringify({
			merged: mergePanelsRow([panel1, panel2], panel1.length),
		});
		// fs.writeFileSync('./src/mergePanelsRow/__snapshots__/merge-panels-row-2.json', result);
		const expected = fs.readFileSync('./src/mergePanelsRow/__snapshots__/merge-panels-row-2.json', 'utf8');
		expect(result).toEqual(expected);
	});
});
