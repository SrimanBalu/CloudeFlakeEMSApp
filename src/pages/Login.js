import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { TiBusinessCard } from 'react-icons/ti';
import { authAPI, handleApiError } from '../services/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Call the backend login API
      const response = await authAPI.login(email, password);

      if (response.data.success) {
        // Store the token and user info
        authAPI.setToken(response.data.token);
        const userData = response.data.data || response.data;
        authAPI.setUser({
          email: userData.email,
          userId: userData.id || userData.userId,
          name: userData.name,
          roleName: userData.roleName,
        });
        
        // console.log('User data stored:', {
        //   email: userData.email,
        //   userId: userData.id || userData.userId,
        //   name: userData.name,
        //   roleName: userData.roleName,
        // });

        // Call the onLogin callback
        onLogin(email);

        // Navigate to dashboard after a tick to allow state updates
        setTimeout(() => {
          navigate('/dashboard');
        }, 0);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="text-center mb-2">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <TiBusinessCard size={32} color="#6366f1" />
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
              CloudFlake EMS
            </h2>
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.9375rem', margin: '8px 0 16px 0' }}>
            Employee Management System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError('')}
            style={{ marginBottom: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </Alert>
        )}

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FiMail
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#9ca3af',
                  pointerEvents: 'none'
                }}
              />
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoFocus
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FiLock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: '#9ca3af',
                  pointerEvents: 'none'
                }}
              />
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ paddingLeft: '40px', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                disabled={isLoading}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
            disabled={isLoading}
            style={{ padding: '10px', fontWeight: '500' }}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight size={18} />
              </>
            )}
          </Button>
        </Form>

        {/* Demo Credentials Info removed */}

        {/* Footer */}
        <p style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '16px',
          marginBottom: 0
        }}>
          © 2026 Employee Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
