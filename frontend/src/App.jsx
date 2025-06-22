import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudyPlanDetail from './components/StudyPlanDetail';
import './App.css'; // For the 3D flashcard effect

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan/:id" element={<StudyPlanDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;