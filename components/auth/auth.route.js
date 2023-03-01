import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();
// function isLoggedIn(req, res, next) {
// 	req.user ? next() : res.sendStatus(401);
// }

authRouter.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: '/auth/google/failure',
	})
);

authRouter.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('Goodbye!');
});

authRouter.get('/auth/google/failure', (req, res) => {
	res.send('Failed to authenticate..');
});

export default authRouter;
