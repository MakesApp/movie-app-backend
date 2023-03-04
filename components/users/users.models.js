import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	userName: String,
	password: String,
	googleId: String,
	profile: String,
	favorites: [],
});
const User = mongoose.model('User', userSchema);
export default User;
