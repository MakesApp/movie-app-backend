import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../../components/users/users.models.js';
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			let response;
			const user = await userModel.findOne({ googleId: profile.id });
			if (user) response = user;
			else {
				const newUser = new userModel({
					googleId: profile.id,
					profile: profile.picture,
				});
				response = await newUser.save();
			}
			done(null, response);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
