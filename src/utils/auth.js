import { authAPI } from '../services/api';

/**
 * Get current user from localStorage
 * @returns {Object|null} User object with {id, name, email, roleName} or null
 */
export const getUser = () => {
  return authAPI.getUser();
};

/**
 * Check if current user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return authAPI.isAuthenticated();
};

/**
 * Check if current user has Admin role
 * @returns {boolean}
 */
export const isAdmin = () => {
  const user = getUser();
  return user && user.roleName === 'Admin';
};

/**
 * Check if current user owns a resource
 * @param {number} resourceOwnerId
 * @returns {boolean}
 */
export const isOwner = (resourceOwnerId) => {
  const user = getUser();
  return user && user.id === resourceOwnerId;
};

/**
 * Get user role name
 * @returns {string|null}
 */
export const getUserRole = () => {
  const user = getUser();
  return user ? user.roleName : null;
};

/**
 * Logout current user
 */
export const logout = () => {
  authAPI.logout();
};
