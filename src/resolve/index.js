'use strict';
const resolveDependency = require('./resolve-dependency');

/**
 * @param {Function} func - the function in which should be injected
 * @param {Object} dependencies - dependencies in object
 * @returns {boolean} returns true if packageName is valid
 **/
function resolve(func, dependencies) {
	const out = {};
	Object.keys(dependencies).forEach(dependencyName => {
		Object.assign(out, resolveDependency(dependencies, dependencyName, dependencies[dependencyName]));
	});
	return (...args) => {
		return func(...args, out);
	};
}

module.exports = resolve;
