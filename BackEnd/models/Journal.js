const mongoose = require("mongoose")

const JournalSchema = new mongoose.Schema({
	name: String,
	date: Date
})

module.exports = mongoose.model("Journal", JournalSchema)