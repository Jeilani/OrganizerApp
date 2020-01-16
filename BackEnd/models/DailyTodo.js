const mongoose = require("mongoose")

const DailyTodoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
	},
	completed: {
		type: Boolean,
		default: false
	},
	userId: {
		type: String,
		required: true
	}
})

const DailyTodo = mongoose.model("DailyTodo", DailyTodoSchema)

module.exports = DailyTodo