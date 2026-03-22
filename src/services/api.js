import axios from 'axios';

const API_BASE_URL = 'https://localhost:7107/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  // Login with email and password
  login: (email, password) => {
    return apiClient.post('/Auth/login', {
      email,
      password,
    });
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Set token after login
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    // Add token to axios headers for future requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Store user info
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get stored user info
  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Employee APIs
export const employeeAPI = {
  // Get all employees
  getAllEmployees: () => {
    return apiClient.get('/Employees');
  },

  // Get all roles
  getRoles: () => {
    return apiClient.get('/roles');
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

  // Search employees
  searchEmployees: (query) => {
    return apiClient.get(`/employees/search?q=${query}`);
  },
};

// Dashboard APIs
export const dashboardAPI = {
  // Get employees grouped by role with count
  getEmployeesByRole: () => {
    return apiClient.get('/Dashboard/employees-by-role');
  },

  // Get employees grouped by year with count
  getEmployeesByYear: () => {
    return apiClient.get('/Dashboard/employees-by-year');
  },

  // Get dashboard statistics
  getStats: () => {
    return apiClient.get('/Dashboard/stats');
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
