import { format, createLogger, transports } from "winston";
const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  levels,
  //   defaultMeta: { service: "user-service" },
  //transport - where you write your error to. can be a file/a console log
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "logs.js" }),
  ],
});

export default logger;
