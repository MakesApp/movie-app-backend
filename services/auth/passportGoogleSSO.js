import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import User from '../../components/users/users.models.js';
const GoogleStrategy = Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err, null);
		});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (req, accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const newUser = await new User({ googleId: profile.id }).save();

			done(null, newUser);
		}
	)
);
