const dcopy = require('deep-copy');
const { resizeListener, dimensions } = require('../get-dimensions');

const diProcess = {
	stdout: {
		columns: 20,
		rows: 20,
	},
};

dimensions.width = 20;
dimensions.height = 20;

describe('getDimensions', () => {
	describe('resizeListener', () => {
		it('execute without error', () => {
			const _process = dcopy(diProcess);
			expect(resizeListener(undefined, { process: _process })).toBe(undefined);
		});
		it('onResize', done => {
			const _process = dcopy(diProcess);
			_process.stdout.columns = 22;
			expect(resizeListener(done, { process: _process })).toBe(undefined);
		});
	});
});
