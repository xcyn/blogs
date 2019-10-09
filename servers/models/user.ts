const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const userSchema = new Schema({
	id: Number,
	phone: String,
	name: String,
})
userSchema.index({id: 1});

const User:any = mongoose.model('alluser', userSchema, 'alluser');

export default User
