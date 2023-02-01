import buildProdLogger from './logger.js';

let logger = buildProdLogger();

logger.info('text info', { meta: 100 });
logger.warn('text warn');
logger.error('text error');
logger.debug('text debug');

export default logger;
