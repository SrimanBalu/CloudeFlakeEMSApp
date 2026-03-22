import React, { useState, useEffect } from 'react';
import { Container, Alert, Row, Col, InputGroup, Form, Modal, Button } from 'react-bootstrap';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import { employeeAPI, handleApiError } from '../services/api';
import { FiSearch, FiX, FiUsers, FiInfo, FiTrendingUp, FiPlus } from 'react-icons/fi';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isRolesLoading, setIsRolesLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tableError, setTableError] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);

  // Fetch roles and employees on mount
  useEffect(() => {
    fetchRoles();
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
          employee.email.toLowerCase().includes(term) ||
          (employee.roleName && employee.roleName.toLowerCase().includes(term)) ||
          (employee.department && employee.department.toLowerCase().includes(term)) ||
          (employee.phone && employee.phone.includes(term)) ||
          (employee.age && employee.age.toString().includes(term))
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

  const fetchRoles = async () => {
    setIsRolesLoading(true);
    try {
      const response = await employeeAPI.getRoles();
      // Handle different response formats
      let rolesData = [];
      if (Array.isArray(response.data)) {
        rolesData = response.data;
      } else if (response.data?.value && Array.isArray(response.data.value)) {
        rolesData = response.data.value;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        rolesData = response.data.data;
      } else if (response.data?.roles && Array.isArray(response.data.roles)) {
        rolesData = response.data.roles;
      }
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Don't show error to user as roles might be optional
      setRoles([]);
    } finally {
      setIsRolesLoading(false);
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
    setShowFormModal(false);
  };

  const handleOpenCreateModal = () => {
    setSelectedEmployee(null);
    setShowFormModal(true);
  };

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowFormModal(true);
  };

  const handleFormSubmitModal = async (formData) => {
    await handleFormSubmit(formData);
    setShowFormModal(false);
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: 'var(--spacing-md) var(--spacing-lg)' }}>
      <Container>
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
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

        {/* Row 2: Stats & Tips */}
        <Row className="g-2" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          {/* Stats Card */}
          <Col xs={12} sm={12} md={4} lg={4}>
            <div className="form-section">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '8px', fontSize: '1rem' }}>
                <FiTrendingUp size={20} color="#6366f1" />
                Quick Stats
              </h4>
              <div style={{
                padding: '6px 10px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.0125rem' }}>Total Employees</span>
                  <span style={{ fontSize: '1.375rem', fontWeight: '700', color: '#6366f1' }}>
                    {employees.length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.0125rem' }}>Active</span>
                  <span style={{ fontSize: '1.375rem', fontWeight: '700', color: '#6366f1' }}>
                    {employees.filter(emp => emp.isActive).length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.0125rem' }}>Inactive</span>
                  <span style={{ fontSize: '1.375rem', fontWeight: '700', color: '#6366f1' }}>
                    {employees.filter(emp => !emp.isActive).length}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1.0125rem' }}>Filtered Results</span>
                  <span style={{ fontSize: '1.375rem', fontWeight: '700', color: '#6366f1' }}>
                    {filteredEmployees.length}
                  </span>
                </div>
              </div>
            </div>
          </Col>

          {/* Tips Card */}
          <Col xs={12} sm={12} md={8} lg={8}>
            <div className="form-section">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '8px' }}>
                <FiInfo size={20} color="#6366f1" />
                Tips & Shortcuts
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '4px'
              }}>
                {[
                  { icon: '🔍', text: 'Search by name, email, role, department, phone or age' },
                  { icon: '👤', text: 'Select a role from the dropdown (required)' },
                  // { icon: '🔐', text: 'Set password for new employees' },
                  { icon: '✓', text: 'Toggle Active/Inactive status for each employee' }
                ].map((tip, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '5px',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9125rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{ fontSize: '1.125rem' }}>{tip.icon}</span>
                    <span style={{ lineHeight: '1.4' }}>{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Search and Employee Table */}
        <div style={{ marginTop: 'var(--spacing-md)' }}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 0 }}>
                <FiUsers size={20} color="#6366f1" />
                Employee List
              </h4>
              <Button
                variant="primary"
                onClick={handleOpenCreateModal}
                className="d-flex align-items-center gap-2"
                style={{
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 16px',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  transition: 'all var(--transition-base)'
                }}
              >
                <FiPlus size={18} />
                Create New Employee
              </Button>
            </div>

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
                placeholder="Search by name, email, role, department, phone or age..."
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
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteEmployee}
            isLoading={isTableLoading}
            error={tableError}
            onStatusChange={fetchEmployees}
          />
        </div>

        {/* Form Modal */}
        <Modal show={showFormModal} onHide={handleCancelEdit} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedEmployee && selectedEmployee.id ? '✏️ Edit Employee' : '➕ Add New Employee'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: 'var(--bg-secondary)' }}>
            <EmployeeForm
              onSubmit={handleFormSubmitModal}
              initialData={selectedEmployee}
              isLoading={isLoading}
              roles={roles}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default EmployeeManagement;
