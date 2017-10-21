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
			const _diProcess = dcopy(diProcess);
			expect(resizeListener(undefined, _diProcess)).toBe(undefined);
		});
		it('onResize', done => {
			const _diProcess = dcopy(diProcess);
			_diProcess.stdout.columns = 22;
			expect(resizeListener(done, _diProcess)).toBe(undefined);
		});
	});
});
