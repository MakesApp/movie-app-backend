import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	googleId: String,
	favorites: [],
});
export const User = mongoose.model('User', userSchema);
