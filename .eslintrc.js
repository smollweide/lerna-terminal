module.exports = {
	extends: [
		'@namics/eslint-config/configurations/es6-node.js',
		'@namics/eslint-config/configurations/es6-node-disable-styles.js',
	],
	globals: {
		describe: true,
		it: true,
		expect: true,
	},
};
