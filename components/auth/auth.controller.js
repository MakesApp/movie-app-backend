import User from '../users/users.models.js';
import bcrypt from 'bcrypt';
import { asyncWrapper } from '../../middleware/asyncWrapper.js';
export const register = asyncWrapper(async (req, res) => {
	const { password, username } = req.body;
	User.findOne({ username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.status(409).send({ message: 'Username Already Exists' });
		if (!doc) {
			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				username: username,
				password: hashedPassword,
			});
			await newUser.save();
			res.send('User Regsitered!');
		}
	});
});
