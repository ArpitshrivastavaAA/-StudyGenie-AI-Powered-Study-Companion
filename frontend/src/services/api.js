import axios from 'axios';

const API_URL = 'http://localhost:5001/api/study'; // Your backend URL

const api = axios.create({
    baseURL: API_URL,
});

export const createStudyPlan = (data) => api.post('/', data);
export const getStudyPlans = () => api.get('/');
export const getStudyPlanById = (id) => api.get(`/${id}`);