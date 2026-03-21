import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem('user', username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="spinner"><div className="spinner-border"></div></div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/employees" 
          element={isAuthenticated ? <EmployeeManagement /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
