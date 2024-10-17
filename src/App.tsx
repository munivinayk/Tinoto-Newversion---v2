import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import PlanningPage from './components/PlanningPage';
import WriteGuidePage from './components/WriteGuidePage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Features />
                  </>
                } />
                <Route path="/plan" element={<PlanningPage />} />
                <Route path="/write-guide" element={<WriteGuidePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;