const fs = require('fs');
const path = require('path');

const logFilePath = path.resolve(__dirname, '..', 'log.txt');

const readLog = () => {
	try {
		return fs.readFileSync(logFilePath, 'utf8');
	} catch (err) {
		return '';
	}
};

const log = value => {
	fs.writeFileSync(logFilePath, `${readLog()}\n[${new Date()}]:  ${value}`);
};

module.exports = log;
