import { User } from './users.models.js';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const usersController = {
	createUser: (req, res) => {
		const user = new User({
			username: req.body.username,
			password: hashSync(req.body.password, 10),
		});

		user
			.save()
			.then((user) => {
				res.send({
					success: true,
					message: 'User created successfully.',
					user: {
						id: user._id,
						username: user.username,
					},
				});
			})
			.catch((err) => {
				res.send({
					success: false,
					message: 'Something went wrong',
					error: err,
				});
			});
	},
	login: (req, res) => {
		User.findOne({ username: req.body.username }).then((user) => {
			//No user found
			if (!user) {
				return res.status(401).send({
					success: false,
					message: 'Could not find the user.',
				});
			}

			//Incorrect password
			if (!compareSync(req.body.password, user.password)) {
				return res.status(401).send({
					success: false,
					message: 'Incorrect password',
				});
			}

			const payload = {
				username: user.username,
				id: user._id,
			};

			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '1d',
			});

			return res.status(200).send({
				success: true,
				message: 'Logged in successfully!',
				token: 'Bearer ' + token,
			});
		});
	},

	logout: (req, res, next) => {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
		});
		res.send('logging out');
	},
};
