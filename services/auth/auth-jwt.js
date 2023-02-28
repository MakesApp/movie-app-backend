import passport from 'passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import User from '../../components/users/users.models.js';

passport.use(
	new StrategyJwt(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		function (jwtPayload, done) {
			return User.findOne({ where: { id: jwtPayload.id } })
				.then((user) => {
					return done(null, user);
				})
				.catch((err) => {
					return done(err);
				});
		}
	)
);
