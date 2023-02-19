import { Router } from 'express';
import passport from 'passport';
export const authRouter = Router();

authRouter.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get(
	'/auth/google/movie-app',
	passport.authenticate('google', {
		successRedirect: '/homepage',
		failureRedirect: '/login',
	})
);

authRouter.get(
	'/auth/google/movie-app',
	passport.authenticate('google', {
		successRedirect: '/homepage',
		failureRedirect: '/login',
	})
);
