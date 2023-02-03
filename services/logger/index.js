import buildProdLogger from './logger.js';

let logger = buildProdLogger();

// logger.info('text info', { meta: 100 });
// logger.warn();
// logger.error();
// logger.debug("test");

export default logger;
