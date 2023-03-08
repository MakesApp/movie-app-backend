import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../components/users/users.models';
const JwtStrategy = Strategy;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		UserModel.findOne({ id: jwt_payload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);
