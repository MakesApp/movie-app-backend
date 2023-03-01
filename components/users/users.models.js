import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	favorites: [],
	WatchLater: [],
});
export const User = mongoose.model('User', userSchema);
