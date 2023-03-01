import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	googleId: String,
	favorites: [],
	WatchLater: [],
});
const User = mongoose.model('User', userSchema);
export default User;
