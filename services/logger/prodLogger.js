import { format, createLogger, transports } from 'winston';
const { combine, timestamp, errors, json, colorize } = format;

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

function buildProdLogger() {
	return createLogger({
		level: 'debug',
		format: combine(timestamp(), errors({ stack: true }), json(), colorize()),
		levels,
		defaultMeta: { service: 'user-service' },
		transports: [
			new transports.Console(),
			new transports.File({ filename: 'logs.js', level: 'error' }),
		],
	});
}

export default buildProdLogger;
