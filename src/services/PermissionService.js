// Permission Service - Handles user permission management API calls
import axios from "../utils/axios";

// Get all available permissions/modules
export const getAllPermissions = async () => {
  const response = await axios.get("/permissions");
  return response.data;
};

// Get all users with their permissions
export const getAllUsersWithPermissions = async () => {
  const response = await axios.get("/users/permissions");
  return response.data;
};

// Get permissions for a specific user
export const getUserPermissions = async (userId) => {
  const response = await axios.get(`/users/${userId}/permissions`);
  return response.data;
};

// Update permissions for a specific user
export const updateUserPermissions = async (userId, permissions) => {
  const response = await axios.put(`/users/${userId}/permissions`, { permissions });
  return response.data;
};

// Get current logged-in user's permissions from server
export const getMyPermissions = async () => {
  const response = await axios.get("/users/me/permissions");
  return response.data;
};

// Get all users list
export const getAllUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

// Create a new role with permissions
export const createRole = async (roleData) => {
  const response = await axios.post("/roles", roleData);
  return response.data;
};

// Get all roles
export const getAllRoles = async () => {
  const response = await axios.get("/roles");
  return response.data;
};

// Update role permissions
export const updateRolePermissions = async (roleId, permissions) => {
  const response = await axios.put(`/roles/${roleId}/permissions`, { permissions });
  return response.data;
};

// Assign role to user
export const assignRoleToUser = async (userId, roleId) => {
  const response = await axios.put(`/users/${userId}/role`, { roleId });
  return response.data;
};

export default {
  getAllPermissions,
  getAllUsersWithPermissions,
  getUserPermissions,
  updateUserPermissions,
  getMyPermissions,
  getAllUsers,
  createRole,
  getAllRoles,
  updateRolePermissions,
  assignRoleToUser,
};
