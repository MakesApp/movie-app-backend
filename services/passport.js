import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GithubStrategy } from 'passport-github2';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
import passport from 'passport';
import { User } from '../components/users/users.models';
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
console.log(GOOGLE_CLIENT_ID);
// const GITHUB_CLIENT_ID = 'your id';
// const GITHUB_CLIENT_SECRET = 'your id';

// const FACEBOOK_APP_ID = 'your id';
// const FACEBOOK_APP_SECRET = 'your id';

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			});
		}
	)
);

// passport.use(

// 	new GithubStrategy(
// 		{
// 			clientID: GITHUB_CLIENT_ID,
// 			clientSecret: GITHUB_CLIENT_SECRET,
// 			callbackURL: '/auth/github/callback',
// 		},
// 		function (accessToken, refreshToken, profile, done) {
// 			done(null, profile);
// 		}
// 	)
// );

// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: FACEBOOK_APP_ID,
// 			clientSecret: FACEBOOK_APP_SECRET,
// 			callbackURL: '/auth/facebook/callback',
// 		},
// 		function (accessToken, refreshToken, profile, done) {
// 			done(null, profile);
// 		}
// 	)
// );

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			id: user.id,
			username: user.username,
			picture: user.picture,
		});
	});
});

passport.deserializeUser(function (id, cb) {
	User.findById(id, function (err, user) {
		cb(err, user);
	});
});
