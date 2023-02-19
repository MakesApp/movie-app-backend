import logger from '../services/logger/index.js';

export const asyncWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
			logger.debug(`Success: ${JSON.stringify(req.body)}`);
		} catch (error) {
			logger.error(error.message);
			next(error);
		}
	};
};
