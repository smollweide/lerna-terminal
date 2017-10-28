const dcopy = require('deep-copy');
const resolve = require('../resolve');
const { resizeListener, dimensions } = require('./index');

const process = {
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
			const _process = dcopy(process);
			const _resizeListener = resolve(resizeListener, { process: _process, dimensions });
			expect(_resizeListener(undefined)).toBe(undefined);
		});
		it('onResize', done => {
			const _process = dcopy(process);
			_process.stdout.columns = 22;
			const _resizeListener = resolve(resizeListener, { process: _process, dimensions });
			expect(_resizeListener(done)).toBe(undefined);
		});
	});
});
