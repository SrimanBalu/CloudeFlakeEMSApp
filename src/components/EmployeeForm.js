import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FiRotateCcw, FiCheck } from 'react-icons/fi';

// Move FormField outside component to prevent recreation on re-renders
const FormField = ({ label, name, type = 'text', placeholder, required = true, value, onChange, onBlur, touched, error, isLoading }) => (
  <Form.Group className="mb-3">
    <Form.Label style={{ fontWeight: '500', marginBottom: '8px' }}>
      {label}
      {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
    </Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      isInvalid={touched && !!error}
      disabled={isLoading}
      style={{
        background: touched && error ? 'rgba(239, 68, 68, 0.02)' : undefined,
      }}
    />
    {touched && error && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#ef4444',
        fontSize: '0.8125rem',
        marginTop: '6px',
        fontWeight: '500'
      }}>
        ⚠️ {error}
      </div>
    )}
  </Form.Group>
);

function EmployeeForm({ onSubmit, initialData, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    department: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData && initialData.id) {
      // Load data when editing
      setFormData(initialData);
      setTouched({});
      setErrors({});
    } else if (!initialData) {
      // Reset form when Cancel is clicked or no employee selected
      setFormData({
        name: '',
        age: '',
        department: '',
        email: '',
        phone: '',
      });
      setTouched({});
      setErrors({});
    }
  }, [initialData?.id, !!initialData]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) <= 18) {
      newErrors.age = 'Age must be greater than 18';
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      department: '',
      email: '',
      phone: '',
    });
    setErrors({});
    setTouched({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Row 1: Name and Age */}
      <Row className="g-3">
        <Col md={6}>
          <FormField
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.name}
            error={errors.name}
            isLoading={isLoading}
          />
        </Col>
        <Col md={6}>
          <FormField
            label="Age"
            name="age"
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.age}
            error={errors.age}
            isLoading={isLoading}
          />
        </Col>
      </Row>

      {/* Row 2: Department and Email */}
      <Row className="g-3">
        <Col md={6}>
          <FormField
            label="Department"
            name="department"
            placeholder="Engineering"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.department}
            error={errors.department}
            isLoading={isLoading}
          />
        </Col>
        <Col md={6}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            isLoading={isLoading}
          />
        </Col>
      </Row>

      {/* Row 3: Phone */}
      <Row className="g-3">
        <Col md={6}>
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="1234567890"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.phone}
            error={errors.phone}
            isLoading={isLoading}
          />
        </Col>
      </Row>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
        flexWrap: 'wrap'
      }}>
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="d-flex align-items-center gap-2"
          style={{ minWidth: '140px', justifyContent: 'center' }}
        >
          <FiCheck size={18} />
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={resetForm}
          disabled={isLoading}
          className="d-flex align-items-center gap-2"
          style={{ minWidth: '120px', justifyContent: 'center' }}
        >
          <FiRotateCcw size={18} />
          Reset
        </Button>
      </div>
    </Form>
  );
}

export default EmployeeForm;
