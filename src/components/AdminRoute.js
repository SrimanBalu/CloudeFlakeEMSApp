import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../utils/auth';
import { Container, Alert } from 'react-bootstrap';

/**
 * AdminRoute - Protects routes to admin-only pages
 * Shows access denied message for non-admin users
 */
const AdminRoute = ({ children }) => {
  // Not authenticated - redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Not admin - show access denied
  if (!isAdmin()) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <h4>Access Denied</h4>
          <p>You don't have permission to access the Employee Management section. This is an admin-only feature.</p>
          <a href="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </a>
        </Alert>
      </Container>
    );
  }

  // Admin - render the component
  return children;
};

export default AdminRoute;
