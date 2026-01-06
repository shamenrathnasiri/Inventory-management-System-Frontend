import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./Login/LoginPage";
import { loadUser, logout } from "../services/AuthService";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Simple user storage utilities (replacing UserService)
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem("user");
};

// Home Page (Landing + Auth)
function Home() {
  const [user, setUserState] = useState(getUser());
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthUser, clearAuth } = useAuth();

  // Try to load user on mount (if token exists)
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await loadUser();
        setUserState(userData);
        setUser(userData);
        navigate("/dashboard", { replace: true });
      } catch {
        setUserState(null);
        clearUser();
      }
    }
    // Only fetch if not already in localStorage
    if (!user) {
      fetchUser();
    } else {
      // only navigate to /dashboard if we're not already on a dashboard route
      if (!location.pathname.startsWith("/dashboard")) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAuthSuccess = async () => {
    try {
      const userData = await loadUser();
      setUserState(userData);
      setUser(userData);
      // also update AuthContext so permissions recalc without a full refresh
      setAuthUser(userData);
      // After successful login, navigate to previous attempted path if any,
      // otherwise go to /dashboard
      const dest = (location.state && location.state.from) || "/dashboard";
      navigate(dest);
    } catch {
      setUserState(null);
      clearUser();
      clearAuth();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("employeeFormData");
    } catch {
      // Optionally handle error
    }
    clearUser();
    setUserState(null);
    clearAuth();
    navigate("/", { replace: true });
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="flex min-h-screen">
        {/* Right Section - Login Form */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <LoginPage onSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
