import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import { model, Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
dotenv.config();
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

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
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		});
	})
);

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
