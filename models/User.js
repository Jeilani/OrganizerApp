const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type:  String,
		required: true,
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password)
}



const User = mongoose.model("User", UserSchema)

module.exports = User