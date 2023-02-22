import { format, createLogger, transports } from 'winston';
const { combine, timestamp, errors, json, prettyPrint } = format;

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
		format: combine(
			timestamp(),
			errors({ stack: true }),
			json(),
			prettyPrint()
		),
		levels,
		defaultMeta: { service: 'user-service' },
		transports: [
			new transports.Console(),
			new transports.File({
				filename: 'logs/errors.log',
				level: 'error',
				maxsize: 1024 * 1024,
				maxFiles: 10,
				tailable: true,
				zippedArchive: true,
				format: combine(timestamp(), prettyPrint()),
			}),
			new transports.File({
				filename: 'logs/requests.log',
				maxsize: 1024 * 1024,
				maxFiles: 10,
				tailable: true,
				zippedArchive: true,
				format: combine(timestamp(), prettyPrint()),
				rotationFormat: (options) => {
					const date = new Date();
					date.setDate(date.getDate() - 3);
					const formattedDate = date.toISOString().slice(0, 10);
					return `${options.baseName}.${formattedDate}${options.extension}`;
				},
			}),
		],
	});
}

export default buildProdLogger;
