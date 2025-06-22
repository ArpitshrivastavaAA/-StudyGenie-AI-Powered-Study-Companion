const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateStudyPlan(syllabus, deadline) {
    const prompt = `
        Based on the following syllabus and a deadline of ${deadline}, create a daily study plan.
        Syllabus: "${syllabus}".
        Break it down into manageable daily topics leading up to the deadline.
        Respond ONLY with a JSON object in the following format: { "plan": [{ "day": 1, "topic": "Topic for Day 1" }, ...] }.
    `;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106", // Model that's good with JSON
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
}

async function generateFlashcards(topic) {
    const prompt = `
        Create 5 flashcards for the topic: "${topic}".
        A flashcard has a "question" and an "answer".
        Respond ONLY with a JSON object in the following format: { "flashcards": [{ "question": "...", "answer": "..." }, ...] }.
    `;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
}

async function generateQuiz(topic) {
    const prompt = `
        Create a 3-question multiple-choice quiz for the topic: "${topic}".
        Each question should have 4 options and a correct answer.
        Respond ONLY with a JSON object in the following format: { "quizzes": [{ "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "..." }, ...] }.
    `;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content);
}

module.exports = { generateStudyPlan, generateFlashcards, generateQuiz };