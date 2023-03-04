import express from 'express';
import passport from 'passport';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
const googleAuthRouter = express.Router();

googleAuthRouter.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile'] })
);

googleAuthRouter.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.redirect(process.env.CLIENT_URL);
	}
);
googleAuthRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});
googleAuthRouter.get('/auth/user', (req, res) => {
	console.log(req.isAuthenticated());
	res.json(req.user);
});
export default googleAuthRouter;
