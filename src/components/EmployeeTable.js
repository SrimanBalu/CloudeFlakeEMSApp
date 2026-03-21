import React from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';

function EmployeeTable({ employees, onEdit, onDelete, isLoading, error }) {
  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`);
    if (confirmed) {
      onDelete(id);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={{ marginTop: '12px', color: '#6b7280' }}>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚠️</span>
        <span>{error}</span>
      </Alert>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <Alert 
        variant="info"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '24px'
        }}
      >
        <FiUsers size={24} />
        <span>No employees found. Add a new employee using the form above.</span>
      </Alert>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover striped>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ width: '60px' }}>S/No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: '140px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} style={{ alignItems: 'center' }}>
              <td style={{ fontWeight: '600', color: '#6366f1', textAlign: 'center' }}>
                {index + 1}
              </td>
              <td style={{ fontWeight: '500', color: '#1f2937' }}>
                {employee.name}
              </td>
              <td>{employee.age}</td>
              <td>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: '#eff6ff',
                  color: '#0c2d6b',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {employee.department}
                </span>
              </td>
              <td style={{ fontSize: '0.9375rem', color: '#6366f1' }}>
                {employee.email}
              </td>
              <td>{employee.phone}</td>
              <td>
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(employee)}
                    className="d-flex align-items-center gap-1 text-white"
                    title="Edit employee"
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.8125rem',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <FiEdit2 size={14} />
                    <span className="d-none d-lg-inline">Edit</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(employee.id, employee.name)}
                    title="Delete employee"
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.8125rem',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <FiTrash2 size={14} />
                    <span className="d-none d-lg-inline">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
