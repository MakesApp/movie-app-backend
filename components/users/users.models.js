import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import { model, Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new Schema({
	username: { type: String },
	password: {
		type: String,
		validate(value) {
			if (value.length < 8) throw Error('min length of password is 8 digits !');
		},
	},
	googleId: { type: String },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export const User = new model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			id: user.id,
			username: user.username,
			picture: user.picture,
		});
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:5000/auth/google/movie-app',
			userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			});
		}
	)
);
