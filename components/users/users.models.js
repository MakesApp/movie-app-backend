import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	googleId: String,
	profile: String,
	favorites: [],
	watchLater: [String],
});
const User = mongoose.model('User', userSchema);
export default User;
