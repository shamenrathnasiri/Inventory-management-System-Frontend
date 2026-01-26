import React, { createContext, useContext, useState, useEffect } from "react";
import { loadUser } from "../services/AuthService";
import { permissions as defaultPermissions } from "../config/permissions";
import { getMyPermissions } from "../services/PermissionService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user-specific permissions from server
  const fetchUserPermissions = async (userData) => {
    try {
      // Try to fetch custom permissions from server
      const serverPermissions = await getMyPermissions();
      if (serverPermissions && Object.keys(serverPermissions).length > 0) {
        // Use server-provided permissions (customized by admin)
        setUserPermissions(serverPermissions.data || serverPermissions);
      } else {
        // Fallback to role-based default permissions
        setUserPermissions(defaultPermissions[userData.role] || {});
      }
    } catch (error) {
      // If server call fails, use default role-based permissions
      console.warn("Could not fetch custom permissions, using role defaults:", error);
      setUserPermissions(defaultPermissions[userData.role] || {});
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await loadUser();
        setUser(userData);
        await fetchUserPermissions(userData);
      } catch (error) {
        setUser(null);
        setUserPermissions({});
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Keep permissions in sync if user's role changes (e.g., after re-login)
  useEffect(() => {
    if (user && user.role) {
      fetchUserPermissions(user);
    } else {
      setUserPermissions({});
    }
  }, [user?.role]);

  // Allow app code to push a new user into context after login/register
  const setAuthUser = async (newUser) => {
    setUser(newUser);
    if (newUser) {
      await fetchUserPermissions(newUser);
    } else {
      setUserPermissions({});
    }
  };

  // Refresh permissions (call after admin updates permissions)
  const refreshPermissions = async () => {
    if (user) {
      await fetchUserPermissions(user);
    }
  };

  // Clear auth state on logout
  const clearAuth = () => {
    setUser(null);
    setUserPermissions({});
  };

  const isAdminRole = (u) => {
    return !!(u?.role && String(u.role).toLowerCase().includes("admin"));
  };

  const hasPermission = (module, action) => {
    // Administrators have implicit access to everything
    if (isAdminRole(user)) return true;
    return userPermissions[module]?.[action] || false;
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        userPermissions, 
        hasPermission, 
        setAuthUser, 
        clearAuth,
        refreshPermissions,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
