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
		function (request, accessToken, refreshToken, profile, done) {
			const user = userModel.findAndModify({
				query: { googleId: profile.id },
				update: {
					$setOnInsert: { googleId: profile.id },
				},
				new: true, // return new doc if one is upserted
				upsert: true, // insert the document if it does not exist
			});
			done(null, user);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
