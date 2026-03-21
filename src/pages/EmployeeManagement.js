import React, { useState, useEffect } from 'react';
import { Container, Alert, Row, Col, InputGroup, Form } from 'react-bootstrap';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import { employeeAPI, handleApiError } from '../services/api';
import { FiSearch, FiX, FiUsers, FiInfo, FiTrendingUp } from 'react-icons/fi';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tableError, setTableError] = useState('');

  // Fetch all employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term)
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    setIsTableLoading(true);
    setTableError('');
    try {
      const response = await employeeAPI.getAllEmployees();
      // Handle different response formats
      let employeeData = [];
      if (Array.isArray(response.data)) {
        employeeData = response.data;
      } else if (response.data?.value && Array.isArray(response.data.value)) {
        employeeData = response.data.value;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        employeeData = response.data.data;
      } else if (response.data?.employees && Array.isArray(response.data.employees)) {
        employeeData = response.data.employees;
      }
      setEmployees(employeeData);
      setFilteredEmployees(employeeData);
    } catch (error) {
      const errorMsg = handleApiError(error);
      setTableError(errorMsg);
      console.error('Error fetching employees:', error);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (selectedEmployee && selectedEmployee.id) {
        // Update existing employee
        await employeeAPI.updateEmployee(selectedEmployee.id, formData);
        setSuccessMessage('Employee updated successfully!');
      } else {
        // Create new employee
        await employeeAPI.createEmployee(formData);
        setSuccessMessage('Employee added successfully!');
      }

      // Refresh employee list
      await fetchEmployees();
      setSelectedEmployee(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const errorMsg = handleApiError(error);
      setErrorMessage(errorMsg);
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    // Scroll to form
    const formElement = document.getElementById('employee-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteEmployee = async (id) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await employeeAPI.deleteEmployee(id);
      setSuccessMessage('Employee deleted successfully!');
      await fetchEmployees();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const errorMsg = handleApiError(error);
      setErrorMessage(errorMsg);
      console.error('Error deleting employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: 'var(--spacing-2xl) var(--spacing-lg)' }}>
      <Container>
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
            <FiUsers size={32} color="#6366f1" />
            Employee Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
            Manage employee records, add new staff, and update information all in one place.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert 
            variant="success" 
            dismissible 
            onClose={() => setSuccessMessage('')} 
            className="success-message"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}
          >
            <span>✓</span>
            <span style={{ flex: 1 }}>{successMessage}</span>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert 
            variant="danger" 
            dismissible 
            onClose={() => setErrorMessage('')}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}
          >
            <span>✕</span>
            <span style={{ flex: 1 }}>{errorMessage}</span>
          </Alert>
        )}

        <Row className="g-4">
          {/* Form Section - Left */}
          <Col lg={8}>
            <div id="employee-form" className="form-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
                <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  {selectedEmployee && selectedEmployee.id ? '✏️ Edit Employee' : '➕ Add New Employee'}
                </h4>
                {selectedEmployee && selectedEmployee.id && (
                  <button
                    className="btn btn-sm"
                    onClick={handleCancelEdit}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all var(--transition-base)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'var(--bg-secondary)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'var(--bg-tertiary)';
                    }}
                  >
                    <FiX size={16} /> Cancel
                  </button>
                )}
              </div>
              <EmployeeForm
                onSubmit={handleFormSubmit}
                initialData={selectedEmployee}
                isLoading={isLoading}
              />
            </div>
          </Col>

          {/* Sidebar - Right */}
          <Col lg={4}>
            {/* Stats Card */}
            <div className="form-section" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
                <FiTrendingUp size={20} color="#6366f1" />
                Quick Stats
              </h4>
              <div style={{
                padding: 'var(--spacing-lg)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Total Employees</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#6366f1' }}>
                    {employees.length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Filtered Results</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#8b5cf6' }}>
                    {filteredEmployees.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="form-section">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
                <FiInfo size={20} color="#6366f1" />
                Tips & Shortcuts
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)'
              }}>
                {[
                  { icon: '🔍', text: 'Use search to filter by name or email' },
                  { icon: '✏️', text: 'Click Edit to update employee info' },
                  { icon: '🗑️', text: 'Delete removes record permanently' },
                  { icon: '⚠️', text: 'Confirm all actions before submitting' }
                ].map((tip, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{ fontSize: '1.125rem' }}>{tip.icon}</span>
                    <span>{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

        {/* Search and Employee Table */}
        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
              <FiUsers size={20} color="#6366f1" />
              Employee List
            </h4>

            {/* Search Box */}
            <InputGroup 
              className="search-box"
              style={{
                boxShadow: 'var(--shadow-sm)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}
            >
              <InputGroup.Text style={{
                background: 'var(--bg-primary)',
                border: '2px solid var(--border-color)',
                borderRight: 'none'
              }}>
                <FiSearch size={18} color="#6366f1" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isTableLoading}
                style={{
                  border: '2px solid var(--border-color)',
                  borderLeft: 'none',
                  borderRight: searchTerm ? 'none' : undefined,
                }}
              />
              {searchTerm && (
                <button
                  className="btn"
                  onClick={() => setSearchTerm('')}
                  style={{
                    border: '2px solid var(--border-color)',
                    borderLeft: 'none',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                    padding: '0 var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all var(--transition-base)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--bg-secondary)';
                    e.target.style.color = 'var(--text-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'var(--bg-tertiary)';
                    e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  <FiX size={18} />
                </button>
              )}
            </InputGroup>
          </div>

          {/* Employees Table */}
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            isLoading={isTableLoading}
            error={tableError}
          />
        </div>
      </Container>
    </div>
  );
}

export default EmployeeManagement;
