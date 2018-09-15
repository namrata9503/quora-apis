const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    question: String,
    noOfAnswers: Number,
    noOfViews: Number,
    createdBy: String,
	createdAt: Date,
    updatedAt: Date,
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;