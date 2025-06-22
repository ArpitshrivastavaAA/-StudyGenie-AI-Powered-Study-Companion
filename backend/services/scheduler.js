const StudyPlan = require('../models/studyPlanModel');

// This is a placeholder. In a real app, you'd use a service like Nodemailer or Twilio.
const sendDailyReminders = async () => {
    console.log("Checking for study plans for today...");
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // This logic is simplified. A more robust solution would check which day of the plan corresponds to today.
    const plans = await StudyPlan.find({ 'plan.isCompleted': false });

    plans.forEach(plan => {
        // Find the first uncompleted topic
        const upcomingTopic = plan.plan.find(day => !day.isCompleted);
        if(upcomingTopic) {
            console.log(`REMINDER: For plan "${plan.title}", your next topic is: "${upcomingTopic.topic}"`);
        }
    });
};

module.exports = { sendDailyReminders };