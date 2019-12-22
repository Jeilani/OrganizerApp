const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const DailyTodoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
})

const GeneralTodoSchema = new mongoose.Schema({
	name: String,
	date: Date
})

const MiscTodoSchema = new mongoose.Schema({
	name: String,
	date: Date
})

const JournalSchema = new mongoose.Schema({
	name: String,
	date: Date
})

const EventSchema = new mongoose.Schema({
	name: String,
	date: Date
})


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

module.exports = Todo;