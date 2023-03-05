import express from 'express';
import passport from 'passport';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
import { register } from './auth.controller.js';
const authRouter = express.Router();

authRouter.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		res.redirect(process.env.CLIENT_URL);
	}
);
authRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});
authRouter.get('/auth/user', isUserAuthenticated, (req, res) => {
	res.json(req.user);
});
authRouter.post('/auth/register', register);
authRouter.post('/auth/login', passport.authenticate('local'), (req, res) => {
	res.send('success');
});

export default authRouter;
