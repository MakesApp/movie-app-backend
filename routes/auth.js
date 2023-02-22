import express from 'express';
import passport from 'passport';
export const authRoute = express.Router();
const CLIENT_URL =
	process.env.NODE_ENV === 'production' ? '' : process.env.LOCAL_URL;

authRoute.get('/login/success', (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: 'successfull',
			user: req.user,
		});
	}
});

authRoute.get('/login/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: 'failure',
	});
});

authRoute.get('/logout', (req, res) => {
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
		failureRedirect: '/login/failed',
	})
);

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
