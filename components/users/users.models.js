import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	googleId: String,
	favorites: [],
});
const User = mongoose.model('User', userSchema);
export default User;
