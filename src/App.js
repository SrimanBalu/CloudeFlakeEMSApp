import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import { authAPI } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Listen for storage changes to detect login/logout from other tabs or components
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      setIsAuth(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuth(false);
  };

  const handleLogin = () => {
    setIsAuth(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {isAuth && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Login Route */}
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />

        {/* Dashboard Route - All authenticated users */}
        <Route 
          path="/dashboard" 
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />} 
        />

        {/* Employees Route - Admin only */}
        <Route 
          path="/employees" 
          element={
            <AdminRoute>
              <EmployeeManagement />
            </AdminRoute>
          } 
        />

        {/* Home Route */}
        <Route 
          path="/" 
          element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
