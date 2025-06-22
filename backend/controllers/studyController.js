const StudyPlan = require('../models/studyPlanModel');
const { generateStudyPlan, generateFlashcards, generateQuiz } = require('../services/openAiService');

// Create a new study plan
exports.createStudyPlan = async (req, res) => {
    try {
        const { title, syllabus, deadline } = req.body;

        // 1. Generate Study Plan from AI
        const planData = await generateStudyPlan(syllabus, deadline);
        
        // 2. Generate Flashcards for the first topic as an example
        const firstTopic = planData.plan[0]?.topic || "Introduction";
        const flashcardData = await generateFlashcards(firstTopic);
        
        // 3. Generate a Quiz for the first topic
        const quizData = await generateQuiz(firstTopic);

        // 4. Create and save the new study plan document
        const newStudyPlan = new StudyPlan({
            title,
            syllabus,
            deadline,
            plan: planData.plan,
            flashcards: flashcardData.flashcards,
            quizzes: quizData.quizzes,
        });

        const savedPlan = await newStudyPlan.save();
        res.status(201).json(savedPlan);

    } catch (error) {
        console.error("Error creating study plan:", error);
        res.status(500).json({ message: "Failed to create study plan", error: error.message });
    }
};

// Get all study plans
exports.getAllStudyPlans = async (req, res) => {
    try {
        const plans = await StudyPlan.find().sort({ createdAt: -1 });
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch study plans", error: error.message });
    }
};

// Get a single study plan by ID
exports.getStudyPlanById = async (req, res) => {
    try {
        const plan = await StudyPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Study plan not found" });
        }
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch study plan", error: error.message });
    }
};