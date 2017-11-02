const resolve = require('../resolve');
const { renderNotification } = require('./index');

describe('renderNotification', () => {
	it('error', done => {
		const _renderNotification = resolve(renderNotification, {
			log(logText) {
				expect(typeof logText).toBe('string');
			},
			renderClear() {},
			uiState: {
				notifications: [
					{
						type: 'error',
						message: 'message',
						delay: 100,
					},
				],
			},
			dimensions: {
				width: 40,
			},
			getBox: () => 'test',
		});
		_renderNotification(done);
	});
	it('warning', done => {
		const _renderNotification = resolve(renderNotification, {
			log(logText) {
				expect(typeof logText).toBe('string');
			},
			renderClear() {},
			uiState: {
				notifications: [
					{
						type: 'warning',
						message: 'message',
						delay: 100,
					},
				],
			},
			dimensions: {
				width: 40,
			},
			getBox: () => 'test',
		});
		_renderNotification(done);
	});
	it('success', done => {
		const _renderNotification = resolve(renderNotification, {
			log(logText) {
				expect(typeof logText).toBe('string');
			},
			renderClear() {},
			uiState: {
				notifications: [
					{
						type: 'success',
						message: 'message',
						delay: 100,
					},
				],
			},
			dimensions: {
				width: 40,
			},
			getBox: () => 'test',
		});
		_renderNotification(done);
	});
	it('default', done => {
		const _renderNotification = resolve(renderNotification, {
			log(logText) {
				expect(typeof logText).toBe('string');
			},
			renderClear() {},
			uiState: {
				notifications: [
					{
						type: 'default',
						message: 'message',
						delay: 100,
					},
				],
			},
			dimensions: {
				width: 40,
			},
			getBox: () => 'test',
		});
		_renderNotification(done);
	});
	it('fallback', done => {
		const _renderNotification = resolve(renderNotification, {
			log(logText) {
				expect(typeof logText).toBe('string');
			},
			renderClear() {},
			uiState: {
				notifications: [
					{
						message: 'message',
					},
				],
			},
			dimensions: {
				width: 40,
			},
			getBox: () => 'test',
		});
		_renderNotification(done);
	});
});
