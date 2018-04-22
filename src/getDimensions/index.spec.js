/* global jest, afterEach */
/* eslint global-require: 0*/
const { resizeListener, getDimensions } = require('./index');

describe('getDimensions', () => {
	it('default', () => {
		expect(typeof getDimensions().height).toBe('number');
		expect(typeof getDimensions().width).toBe('number');
	});
	describe('resizeListener', () => {
		it('execute without error', () => {
			global.process = {
				stdout: {
					columns: 20,
					rows: 20,
				},
			};
			resizeListener(() => {});
		});
		it('onResize', done => {
			global.process = {
				stdout: {
					columns: 20,
					rows: 20,
				},
			};
			setTimeout(() => {
				global.process = {
					stdout: {
						columns: 30,
						rows: 20,
					},
				};
			}, 500);
			resizeListener(() => {
				done();
			});
		});
		it('nothing changed', done => {
			global.process = {
				stdout: {
					columns: 20,
					rows: 20,
				},
			};
			setTimeout(() => {
				global.process = {
					stdout: {
						columns: 20,
						rows: 20,
					},
				};
				setTimeout(() => {
					global.process = {
						stdout: {
							columns: 30,
							rows: 20,
						},
					};
				}, 500);
			}, 500);
			resizeListener(() => {
				done();
			});
		});
	});
});
