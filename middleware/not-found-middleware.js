import { StatusCodes } from 'http-status-codes';

export const notFoundRoute = (req, res) => {
	return res.status(StatusCodes.NOT_FOUND).send('Route does not exist');
};
