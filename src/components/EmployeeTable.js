import React, { useState } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import { employeeAPI, handleApiError } from '../services/api';

function EmployeeTable({ employees, onEdit, onDelete, isLoading, error, onStatusChange }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      onDelete(employeeToDelete.id);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleStatusToggle = async (employee) => {
    setTogglingId(employee.id);
    try {
      // Send the entire employee data with updated isActive status
      await employeeAPI.updateEmployee(employee.id, {
        name: employee.name,
        age: employee.age,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        roleId: employee.roleId,
        isActive: !employee.isActive
      });
      // Call the callback to refresh employee data
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      const errorMsg = handleApiError(error);
      alert('Error updating status: ' + errorMsg);
      console.error('Error updating employee status:', error);
    } finally {
      setTogglingId(null);
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
    <>
      <div className="table-responsive">
        <Table hover striped>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ width: '60px' }}>S/No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
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
              <td>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: '#f3e8ff',
                  color: '#5b21b6',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {employee.roleName || 'N/A'}
                </span>
              </td>
              <td style={{ fontSize: '0.9375rem', color: '#6366f1' }}>
                {employee.email}
              </td>
              <td>{employee.phone}</td>
              <td>
                <Form.Check
                    type="switch"
                    id={`switch-${employee.id}`}
                    checked={employee.isActive}
                    onChange={() => handleStatusToggle(employee)}
                    disabled={togglingId === employee.id}
                    style={{ margin: 0 }}
                    title="Toggle employee status"
                  />
                {/* <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: employee.isActive ? '#dcfce7' : '#fee2e2',
                  color: employee.isActive ? '#166534' : '#991b1b',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {employee.isActive ? '✓ Active' : '✕ Inactive'}
                </span> */}
              </td>
              <td>
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  alignItems: 'center'
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
                    {/* <span className="d-none d-lg-inline">Edit</span> */}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(employee)}
                    title="Delete employee"
                    className="d-flex align-items-center gap-1"
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.8125rem',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <FiTrash2 size={14} />
                    {/* <span className="d-none d-lg-inline">Delete</span> */}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    {/* Delete Confirmation Modal */}
    <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>
              Delete "{employeeToDelete?.name}"?
            </p>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
              This action cannot be undone. The employee record will be permanently deleted from the system.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCancelDelete}
          className="d-flex align-items-center gap-2"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          className="d-flex align-items-center gap-2"
        >
          <FiTrash2 size={16} />
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default EmployeeTable;
