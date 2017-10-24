/* istanbul ignore next */
module.exports = (di, attr, dependency) => {
	return {
		[`_${attr}`]: di ? di[attr] : dependency,
	};
};
