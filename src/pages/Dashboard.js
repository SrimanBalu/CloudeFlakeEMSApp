import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FiUsers, FiTrendingUp, FiArrowRight, FiCheckCircle, FiEdit2, FiX, FiSave } from 'react-icons/fi';
import { employeeAPI, handleApiError } from '../services/api';
import EmployeeForm from '../components/EmployeeForm';

function Dashboard() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [roles, setRoles] = useState([]);

  const getUserData = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return {};
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return {};
    }
  };

  const user = getUserData();
  const username = user?.name || 'User';
  const userId = user?.userId;
  const isAdmin = user?.roleName === 'Admin';

  // Fetch roles for the form
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await employeeAPI.getRoles();
        if (response.data.success) {
          setRoles(response.data.data || response.data.roles || []);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };

    fetchRoles();
  }, []);

  // Fetch user's own employee details if not admin
  useEffect(() => {
    if (!isAdmin && userId) {
      fetchEmployeeDetails();
    }
  }, [isAdmin, userId]);

  const fetchEmployeeDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await employeeAPI.getEmployeeById(userId);
      if (response.data.success) {
        setEmployeeData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load employee details');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmployee = async (formData) => {
    setUpdateLoading(true);
    setUpdateMessage('');
    try {
      const response = await employeeAPI.updateEmployee(userId, formData);
      if (response.data.success) {
        setUpdateMessage('Profile updated successfully!');
        setEmployeeData(response.data.data);
        setIsEditingProfile(false);
        // Clear message after 3 seconds
        setTimeout(() => setUpdateMessage(''), 3000);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setUpdateLoading(false);
    }
  };


  // ========== ADMIN DASHBOARD VIEW ==========
  const renderAdminDashboard = () => (
    <>
      {/* Welcome Hero Section */}
      <div className="welcome-card">
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ marginBottom: '12px' }}>
            Welcome back, <span style={{ color: '#e0e7ff' }}>{username}</span> 👋
          </h1>
          <p style={{ fontSize: '1.0625rem', marginBottom: 0 }}>
            Manage your workforce efficiently. Get started by exploring your employee data and making updates.
          </p>
        </div>
      </div>

      {/* Quick Stats Row */}
      <Row className="mb-4 g-3">
        <Col md={6} lg={3}>
          <Card className="h-100" style={{ borderTop: '4px solid #6366f1' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                    Total Employees
                  </p>
                  <h3 style={{ color: '#6366f1', margin: 0, fontSize: '2rem' }}>—</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginTop: '4px', marginBottom: 0 }}>
                    Manage all profiles
                  </p>
                </div>
                <FiUsers size={32} color="#6366f1" opacity={0.2} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100" style={{ borderTop: '4px solid #10b981' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                    Active
                  </p>
                  <h3 style={{ color: '#10b981', margin: 0, fontSize: '2rem' }}>—</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginTop: '4px', marginBottom: 0 }}>
                    Last 30 days
                  </p>
                </div>
                <FiTrendingUp size={32} color="#10b981" opacity={0.2} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100" style={{ borderTop: '4px solid #f59e0b' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                    Pending
                  </p>
                  <h3 style={{ color: '#f59e0b', margin: 0, fontSize: '2rem' }}>—</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginTop: '4px', marginBottom: 0 }}>
                    Actions needed
                  </p>
                </div>
                <FiCheckCircle size={32} color="#f59e0b" opacity={0.2} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100" style={{ borderTop: '4px solid #8b5cf6' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                    Departments
                  </p>
                  <h3 style={{ color: '#8b5cf6', margin: 0, fontSize: '2rem' }}>—</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginTop: '4px', marginBottom: 0 }}>
                    Total divisions
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Actions Row */}
      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100" style={{ overflow: 'hidden' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiUsers size={24} color="#6366f1" />
                    Manage Employees
                  </h4>
                  <p style={{ color: '#6b7280', marginBottom: 0 }}>
                    Add, edit, search, and manage all employee records
                  </p>
                </div>
                <Link to="/employees">
                  <Button 
                    variant="primary"
                    className="d-flex align-items-center gap-2"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    View <FiArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100" style={{ overflow: 'hidden' }}>
            <Card.Body>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiTrendingUp size={24} color="#10b981" />
                    Analytics
                  </h4>
                  <p style={{ color: '#6b7280', marginBottom: 0 }}>
                    View reports and insights about your workforce
                  </p>
                </div>
                <Button 
                  variant="success"
                  disabled
                  className="d-flex align-items-center gap-2"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Coming Soon
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Start Guide */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0, fontSize: '1.25rem', fontWeight: '600' }}>
            <FiCheckCircle size={24} color="#6366f1" />
            Quick Start Guide
          </h3>
        </div>
        <Row className="g-4">
          {[
            {
              step: '01',
              title: 'Navigate to Employees',
              desc: 'Go to the Employees section to access all employee records'
            },
            {
              step: '02',
              title: 'Add New Employee',
              desc: 'Use the form to create new employee profiles with validation'
            },
            {
              step: '03',
              title: 'Search & Filter',
              desc: 'Quickly find employees by name or email address'
            },
            {
              step: '04',
              title: 'Edit & Delete',
              desc: 'Update employee information or remove records with confirmation'
            }
          ].map((item) => (
            <Col key={item.step} lg={3} md={6} xs={12}>
              <Card 
                className="h-100"
                style={{
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Card.Body style={{ padding: '24px' }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    margin: '0 0 12px 0',
                    letterSpacing: '0.08em'
                  }}>
                    Step {item.step}
                  </p>
                  <h5 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    margin: '0 0 8px 0',
                    color: '#1f2937'
                  }}>
                    {item.title}
                  </h5>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.875rem', 
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );

  // ========== EMPLOYEE PROFILE VIEW ==========
  const renderEmployeeProfile = () => (
    <>
      {/* Welcome Section */}
      <div className="welcome-card">
        <div>
          <h1 style={{ marginBottom: '12px' }}>
            Welcome back, <span style={{ color: '#e0e7ff' }}>{username}</span> 👋
          </h1>
          <p style={{ fontSize: '1.0625rem', marginBottom: 0 }}>
            View and manage your employee profile information
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Card className="text-center py-5">
          <Card.Body>
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading your profile...</p>
          </Card.Body>
        </Card>
      )}

      {/* Error Messages */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Success Message */}
      {updateMessage && (
        <Alert variant="success" dismissible onClose={() => setUpdateMessage('')}>
          {updateMessage}
        </Alert>
      )}

      {/* Edit Mode */}
      {isEditingProfile && employeeData ? (
        <Card className="mb-4">
          <Card.Header className="bg-light">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Edit Your Profile</h5>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setIsEditingProfile(false)}
                className="d-flex align-items-center gap-2"
              >
                <FiX size={16} />
                Cancel
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <EmployeeForm
              onSubmit={handleUpdateEmployee}
              initialData={employeeData}
              isLoading={updateLoading}
              roles={roles}
            />
          </Card.Body>
        </Card>
      ) : null}

      {/* Profile View Mode */}
      {!isEditingProfile && employeeData ? (
        <Card className="mb-4">
          <Card.Header className="bg-light d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Your Profile Information</h5>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsEditingProfile(true)}
              className="d-flex align-items-center gap-2"
            >
              <FiEdit2 size={16} />
              Edit Profile
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Full Name
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.name}
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Email Address
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.email}
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Phone
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.phone}
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Age
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.age}
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Department
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.department}
                  </p>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Role
                  </label>
                  <p style={{ fontSize: '1rem', color: '#1f2937', marginBottom: 0 }}>
                    {employeeData.roleName || 'N/A'}
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '0.875rem' }}>
                    Status
                  </label>
                  <p>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      backgroundColor: employeeData.isActive ? '#dcfce7' : '#fee2e2',
                      color: employeeData.isActive ? '#166534' : '#991b1b'
                    }}>
                      {employeeData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );

  return (
    <div className="dashboard-container">
      <Container>
        {isAdmin ? renderAdminDashboard() : renderEmployeeProfile()}
      </Container>
    </div>
  );
}

export default Dashboard;
