const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const quizQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

const dailyPlanSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    topic: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
});

const studyPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    syllabus: { type: String, required: true },
    deadline: { type: Date, required: true },
    plan: [dailyPlanSchema],
    flashcards: [flashcardSchema],
    quizzes: [quizQuestionSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);