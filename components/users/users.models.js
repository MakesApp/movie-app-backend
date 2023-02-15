import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	favorites: [],
});
export const User = mongoose.model('User', userSchema);
