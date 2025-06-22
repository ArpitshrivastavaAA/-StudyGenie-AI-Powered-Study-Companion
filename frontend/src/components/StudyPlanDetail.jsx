import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudyPlanById } from '../services/api';
import Loader from './Loader';
import Flashcard from './Flashcard';

const StudyPlanDetail = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentFlashcard, setCurrentFlashcard] = useState(0);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await getStudyPlanById(id);
                setPlan(response.data);
            } catch (err) {
                setError('Failed to fetch study plan details.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center p-6">{error}</p>;
    if (!plan) return <p className="text-gray-500 text-center p-6">Study plan not found.</p>;

    const nextCard = () => {
        setCurrentFlashcard((prev) => (prev + 1) % plan.flashcards.length);
    };

    const prevCard = () => {
        setCurrentFlashcard((prev) => (prev - 1 + plan.flashcards.length) % plan.flashcards.length);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
            <p className="text-gray-600 mb-8">Deadline: {new Date(plan.deadline).toLocaleDateString()}</p>

            {/* Daily Plan */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">📅 Daily Study Schedule</h2>
                <div className="space-y-3">
                    {plan.plan.map((day) => (
                        <div key={day._id} className="bg-white p-4 rounded-lg shadow flex items-center">
                            <span className="text-xl font-bold text-blue-500 mr-4">Day {day.day}</span>
                            <p className="text-gray-800">{day.topic}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flashcards */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">🃏 Flashcards</h2>
                {plan.flashcards.length > 0 ? (
                    <div className="max-w-md mx-auto">
                        <Flashcard
                            question={plan.flashcards[currentFlashcard].question}
                            answer={plan.flashcards[currentFlashcard].answer}
                        />
                        <div className="flex justify-between mt-4">
                            <button onClick={prevCard} className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">Previous</button>
                            <p className="self-center">{currentFlashcard + 1} / {plan.flashcards.length}</p>
                            <button onClick={nextCard} className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">Next</button>
                        </div>
                    </div>
                ) : <p>No flashcards available.</p>}
            </div>

            {/* Quizzes */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">✏️ Quick Quiz</h2>
                {plan.quizzes.length > 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow space-y-6">
                        {plan.quizzes.map((q, index) => (
                            <div key={q._id}>
                                <h3 className="font-semibold">{index + 1}. {q.question}</h3>
                                <div className="space-y-2 mt-2">
                                    {q.options.map((option, i) => (
                                        <p key={i} className="p-2 border rounded">{option}</p>
                                    ))}
                                </div>
                                <p className="mt-2 text-sm text-green-600 font-bold">Correct Answer: {q.correctAnswer}</p>
                            </div>
                        ))}
                    </div>
                ) : <p>No quiz available.</p>}
            </div>
        </div>
    );
};

export default StudyPlanDetail;