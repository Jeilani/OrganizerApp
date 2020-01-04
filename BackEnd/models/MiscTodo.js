const mongoose = require("mongoose")

const MiscTodoSchema = new mongoose.Schema({
	name: String,
	date: Date,
	completed: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("MiscTodo", MiscTodoSchema)