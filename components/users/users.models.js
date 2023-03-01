import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	googleId: String,
	profile: String,
	favorites: [],
});
const User = mongoose.model('User', userSchema);
export default User;
