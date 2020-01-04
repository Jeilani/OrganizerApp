const mongoose = require("mongoose")

const GeneralTodoSchema = new mongoose.Schema({
	name: String,
	date: Date,
	completed: {
		type: Boolean,
		default: false,
	}
})

const GeneralTodo = mongoose.model("GeneralTodo", GeneralTodoSchema)

module.exports = GeneralTodo