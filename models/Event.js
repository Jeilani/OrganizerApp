const mongoose = require("mongoose")
const EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	completed: {
		type: Boolean,
		default: false
	},
	userId: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Event", EventSchema)