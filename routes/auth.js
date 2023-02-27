import express from 'express';
import passport from 'passport';
export const authRoute = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;

authRoute.get('auth/login/success', (req, res) => {
	if (req.user) {
		res.status(200).send(req.user);
	}
});
authRoute.get('auth/login/failed', (req, res) => {
	res.status(400).send('login failed!!');
});

authRoute.get('auth/logout', (req, res) => {
	req.logout();
	res.redirect(CLIENT_URL);
});

authRoute.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile'] })
);

authRoute.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: CLIENT_URL,
		failureRedirect: 'auth/login/failed',
	})
);

// authRoute.get(
// 	'/current',
// 	passport.authenticate('user-rule', { session: false }),
// 	(req, res) => {
// 		res.json({
// 			id: req.user.id,
// 			username: req.user.username,
// 			email: req.user.email,
// 		});
// 	}
// );

// authRoute.get(
// 	'/github',
// 	passport.authenticate('github', { scope: ['profile'] })
// );

// authRoute.get(
// 	'/github/callback',
// 	passport.authenticate('github', {
// 		successRedirect: CLIENT_URL,
// 		failureRedirect: '/login/failed',
// 	})
// );

// authRoute.get(
// 	'/facebook',
// 	passport.authenticate('facebook', { scope: ['profile'] })
// );

// authRoute.get(
// 	'/facebook/callback',
// 	passport.authenticate('facebook', {
// 		successRedirect: CLIENT_URL,
// 		failureRedirect: '/login/failed',
// 	})
// );
