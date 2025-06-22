import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createStudyPlan, getStudyPlans } from '../services/api';
import Loader from './Loader';

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [deadline, setDeadline] = useState('');
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getStudyPlans();
                setPlans(response.data);
            } catch (err) {
                setError('Failed to fetch study plans.');
            }
        };
        fetchPlans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !syllabus || !deadline) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await createStudyPlan({ title, syllabus, deadline });
            setPlans([response.data, ...plans]); // Add new plan to the top
            setTitle('');
            setSyllabus('');
            setDeadline('');
        } catch (err) {
            setError('Failed to create study plan. The AI might be busy. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

            {/* Form to create a new study plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Create New Study Plan</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Plan Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Final Exam Prep" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="syllabus" className="block text-gray-700 font-medium mb-2">Syllabus / Topics</label>
                        <textarea id="syllabus" value={syllabus} onChange={(e) => setSyllabus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            rows="4" placeholder="Paste your syllabus here or list topics..."></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">Deadline</label>
                        <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                        {loading ? 'Generating...' : 'Create Plan'}
                    </button>
                    {loading && <Loader />}
                </form>
            </div>

            {/* List of existing study plans */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Your Study Plans</h2>
                {plans.length > 0 ? (
                    <ul className="space-y-4">
                        {plans.map(plan => (
                            <li key={plan._id} className="p-4 border rounded-md hover:shadow-md transition-shadow">
                                <Link to={`/plan/${plan._id}`} className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-700">{plan.title}</h3>
                                        <p className="text-gray-600">Deadline: {new Date(plan.deadline).toLocaleDateString()}</p>
                                    </div>
                                    <span className="text-blue-500 font-bold">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">You haven't created any study plans yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;