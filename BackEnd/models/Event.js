const mongoose = require("mongoose")
const EventSchema = new mongoose.Schema({
	name: String,
	date: Date,
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("Event", EventSchema)