import axios from 'axios';

const API_BASE_URL = 'https://localhost:7107/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const employeeAPI = {
  // Get all employees
  getAllEmployees: () => {
    return apiClient.get('/Employees');
  },

  // Get employee by ID
  getEmployeeById: (id) => {
    return apiClient.get(`/employees/${id}`);
  },

  // Create new employee
  createEmployee: (employeeData) => {
    return apiClient.post('/employees', employeeData);
  },

  // Update employee
  updateEmployee: (id, employeeData) => {
    return apiClient.put(`/employees/${id}`, employeeData);
  },

  // Delete employee
  deleteEmployee: (id) => {
    return apiClient.delete(`/employees/${id}`);
  },

  // Search employees (if backend supports it)
  searchEmployees: (query) => {
    return apiClient.get(`/employees/search?q=${query}`);
  },
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response received
    return 'No response from server. Please check your connection.';
  } else {
    // Error occurred during request setup
    return error.message || 'An error occurred';
  }
};

export default apiClient;
