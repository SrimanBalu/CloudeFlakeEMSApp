import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { TiBusinessCard } from 'react-icons/ti';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // Hardcoded credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '1234';

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin(username);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 500);
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
              EMS
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
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username or Email</Form.Label>
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
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ paddingLeft: '40px' }}
              />
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

        {/* Demo Credentials Info */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#0c2d6b', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Demo Credentials
          </p>
          <div style={{ fontSize: '0.875rem', color: '#0c2d6b' }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>Username:</strong> <code style={{ background: 'rgba(6,46,107,0.1)', padding: '2px 6px', borderRadius: '4px' }}>admin</code>
            </div>
            <div>
              <strong>Password:</strong> <code style={{ background: 'rgba(6,46,107,0.1)', padding: '2px 6px', borderRadius: '4px' }}>1234</code>
            </div>
          </div>
        </div>

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
