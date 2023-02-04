import logger from "../services/logger/index.js";

export const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      logger.debug(`Movie added successfully: ${JSON.stringify(req.body)}`);
      await fn(req, res, next);
    } catch (error) {
      logger.error(error.message);
      res.send(error.message);
    }
  };
};
