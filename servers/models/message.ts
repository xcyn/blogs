const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const messageSchema = new Schema({
	id: Number,
	phone: String,
	name: String,
	message: String,
})
messageSchema.index({id: 1});

const Message:any = mongoose.model('allMessage', messageSchema, 'allMessage');

export default Message
