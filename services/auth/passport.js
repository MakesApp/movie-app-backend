import passport from 'passport';
import User from '../../components/users/users.models.js';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

const authenticateUser = (userName, password, done) => {
	User.findOne({ userName }).then((user) => {
		if (!user) return done(null, false, { message: 'failed to find user' });

		bcrypt
			.compare(password, user.password)
			.then((isMatch) => {
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'password incorrect' });
				}
			})
			.catch((e) => done(e));
	});
};
passport.use(new LocalStrategy(authenticateUser));

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }, (err, user) => {
		done(err, user);
	});
});
