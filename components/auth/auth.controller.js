import { asyncWrapper } from '../../middleware/asyncWrapper.js';
import User from '../../components/users/users.models.js';
import jwt from 'jsonwebtoken';
const CLIENT_URL = process.env.CLIENT_URL;
export const authController = {
	googleLogin: (req, res) => {
		if (req.user) {
			res.status(200).json({
				success: true,
				message: 'successfull',
				user: req.user,
				cookies: req.cookies,
			});
		}
	},
	googleLoginFail: (req, res) => {
		res.status(401).json({
			success: false,
			message: 'failure',
		});
	},
	googleLogout: (req, res) => {
		req.logout();
		res.redirect(CLIENT_URL);
	},
	login: asyncWrapper(async (req, res) => {
		const { username, password } = req.body;

		const userWithUsername = await User.findOne({ username });
		console.log(userWithUsername);
		if (!userWithUsername)
			return res.status(400).json({ message: 'Username  does not match!' });

		if (userWithUsername.password !== password)
			return res.status(400).json({ message: 'Password  does not match!' });

		const jwtToken = jwt.sign(
			{ id: userWithUsername.id, username: userWithUsername.username },
			process.env.JWT_SECRET
		);

		res.json({ user: userWithUsername, token: jwtToken });
	}),
	register: asyncWrapper(async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password)
			res.status(400).json({ message: 'userName or password are missing' });

		const alreadyExistsUser = await User.findOne({ where: { username } }).catch(
			(err) => {
				console.log('Error: ', err);
			}
		);

		if (alreadyExistsUser) {
			return res
				.status(409)
				.json({ message: 'User with email already exists!' });
		}

		const newUser = new User({ username, password });
		const savedUser = await newUser.save().catch((err) => {
			console.log('Error: ', err);
			res.status(500).json({ error: 'Cannot register user at the moment!' });
		});

		if (savedUser) res.json(savedUser);
	}),
};
