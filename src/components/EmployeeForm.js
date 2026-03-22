import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FiRotateCcw, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';

// Move FormField outside component to prevent recreation on re-renders
const FormField = ({ label, name, type = 'text', placeholder, required = true, value, onChange, onBlur, touched, error, isLoading, showPassword, onPasswordToggle }) => {
  const isPasswordField = type === 'password';
  
  return (
    <Form.Group className="mb-3">
      <Form.Label style={{ fontWeight: '500', marginBottom: '8px' }}>
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </Form.Label>
      
      {isPasswordField ? (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            isInvalid={touched && !!error}
            disabled={isLoading}
            style={{
              background: touched && error ? 'rgba(239, 68, 68, 0.02)' : undefined,
              paddingRight: '40px'
            }}
          />
          <button
            type="button"
            onClick={onPasswordToggle}
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
      ) : (
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
      )}
      
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
};

function EmployeeForm({ onSubmit, initialData, isLoading, roles = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    department: '',
    email: '',
    phone: '',
    password: '',
    roleId: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
        password: '',
        roleId: '',
        isActive: true,
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

    // Role validation
    if (!formData.roleId) {
      newErrors.roleId = 'Role is required';
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

    // Password validation (required for new employees, optional for edit if not changed)
    if (!initialData?.id && !formData.password.trim()) {
      newErrors.password = 'Password is required for new employees';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Convert age and roleId to numbers before submitting
      const ageNum = parseInt(formData.age);
      const roleIdNum = parseInt(formData.roleId);
      
      // Ensure valid numbers
      if (isNaN(ageNum) || isNaN(roleIdNum)) {
        console.error('Invalid form data - age or roleId is not a valid number');
        return;
      }
      
      let submitData = {
        name: formData.name,
        age: ageNum,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        roleId: roleIdNum,
        isActive: formData.isActive,
      };

      // Only include password if it has a value
      if (formData.password) {
        submitData.password = formData.password;
      }

      console.log('Submitting data:', submitData);
      onSubmit(submitData);
      resetForm();
    } else {
      // Mark all fields as touched to show validation errors
      setTouched({
        name: true,
        age: true,
        department: true,
        email: true,
        phone: true,
        password: true,
        roleId: true,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      department: '',
      email: '',
      phone: '',
      password: '',
      roleId: '',
      isActive: true,
    });
    setErrors({});
    setTouched({});
    setShowPassword(false);
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

      {/* Row 2: Department and Role */}
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
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '500', marginBottom: '8px' }}>
              Role
              <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
            </Form.Label>
            <Form.Select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.roleId && !!errors.roleId}
              disabled={isLoading || roles.length === 0}
              style={{
                background: touched.roleId && errors.roleId ? 'rgba(239, 68, 68, 0.02)' : undefined,
              }}
            >
              <option value="">-- Select a Role --</option>
              {roles.map((role) => (
                <option key={role.id} value={String(role.id)}>
                  {role.roleName}
                </option>
              ))}
            </Form.Select>
            {touched.roleId && errors.roleId && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#ef4444',
                fontSize: '0.8125rem',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                ⚠️ {errors.roleId}
              </div>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Row 3: Email and Phone */}
      <Row className="g-3">
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

      {/* Row 4: Password and IsActive */}
      <Row className="g-3">
        <Col md={6}>
          <FormField
            label={`Password${!initialData?.id ? '' : ' (leave empty to keep current)'}`}
            name="password"
            type="password"
            placeholder={initialData?.id ? "Leave blank to keep current password" : "Enter password"}
            required={!initialData?.id}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            isLoading={isLoading}
            showPassword={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Form.Check
                type="checkbox"
                id="isActive"
                name="isActive"
                label="Active"
                checked={formData.isActive}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    isActive: e.target.checked,
                  }));
                }}
                disabled={isLoading}
                style={{ margin: 0 }}
              />
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </Form.Group>
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
        {!initialData?.id && (
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
        )}
      </div>
    </Form>
  );
}

export default EmployeeForm;
