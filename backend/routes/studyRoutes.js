const express = require('express');
const router = express.Router();
const {
    createStudyPlan,
    getAllStudyPlans,
    getStudyPlanById,
} = require('../controllers/studyController');

// POST /api/study - Create a new study plan
router.post('/', createStudyPlan);

// GET /api/study - Get all study plans
router.get('/', getAllStudyPlans);

// GET /api/study/:id - Get a single plan by ID
router.get('/:id', getStudyPlanById);

module.exports = router;