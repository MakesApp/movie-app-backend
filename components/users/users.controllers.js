import passport from 'passport';
import { User } from './users.models.js';
export const createUser = (req, res) => {
	User.register(
		{ username: req.body.username },
		req.body.password,
		function (err) {
			if (err) {
				console.log('error');
				res.send(err);
			} else {
				passport.authenticate('local')(req, res, function () {
					res.send('user was creating successfully ...');
				});
			}
		}
	);
};

export const login = async (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});
	req.login(user, function (err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function () {
				res.status(200).send('user signed in ..');
			});
		}
	});
};

export const logout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	res.send('logging out');
};
