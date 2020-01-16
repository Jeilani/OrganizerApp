const mongoose = require("mongoose")

const JournalSchema = new mongoose.Schema({
	name: String,
	date: Date,
	userId: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Journal", JournalSchema)