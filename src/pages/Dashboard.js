import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { FiUsers, FiTrendingUp, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

function Dashboard() {
  const username = localStorage.getItem('user');

  return (
    <div className="dashboard-container">
      <Container>
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
        <Card>
          <Card.Body>
            <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCheckCircle size={20} color="#6366f1" />
              Quick Start Guide
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
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
                <div 
                  key={item.step}
                  style={{
                    padding: '16px',
                    background: '#fafbfc',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    margin: '0 0 4px 0',
                    letterSpacing: '0.05em'
                  }}>
                    Step {item.step}
                  </p>
                  <h5 style={{ fontSize: '0.9375rem', fontWeight: '600', margin: '0 0 4px 0' }}>
                    {item.title}
                  </h5>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Dashboard;
