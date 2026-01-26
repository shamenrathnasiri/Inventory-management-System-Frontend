import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Shield,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Save,
  RefreshCw,
  AlertCircle,
  User,
  Filter,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAllUsers,
  getUserPermissions,
  updateUserPermissions,
} from "../../services/PermissionService";
import {
  permissionModules,
  getCategories,
  getModulesByCategory,
  actionLabels,
} from "../../config/permissionModules";

const UserPermissions = () => {
  useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});
  const [originalPermissions, setOriginalPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [notification, setNotification] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = getCategories();

  // Fetch all users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.data || response || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        showNotification("Failed to load users", "error");
        // Demo data for development
        setUsers([
          { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
          { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "hr" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const fetchUserPermissions = async (userId) => {
    try {
      setLoading(true);
      const response = await getUserPermissions(userId);
      const perms = response.data || response || {};
      setUserPermissions(perms);
      setOriginalPermissions(JSON.parse(JSON.stringify(perms)));
    } catch (error) {
      console.error("Error fetching user permissions:", error);
      // Initialize with empty permissions
      const emptyPerms = {};
      Object.keys(permissionModules).forEach((moduleKey) => {
        emptyPerms[moduleKey] = {};
        permissionModules[moduleKey].actions.forEach((action) => {
          emptyPerms[moduleKey][action] = false;
        });
      });
      setUserPermissions(emptyPerms);
      setOriginalPermissions(JSON.parse(JSON.stringify(emptyPerms)));
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchUserPermissions(user.id);
    // Expand all categories by default when selecting a user
    const expanded = {};
    categories.forEach((cat) => (expanded[cat] = true));
    setExpandedCategories(expanded);
  };

  const togglePermission = (moduleKey, action) => {
    setUserPermissions((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [action]: !prev[moduleKey]?.[action],
      },
    }));
  };

  const toggleAllModulePermissions = (moduleKey, enable) => {
    const module = permissionModules[moduleKey];
    const newPerms = {};
    module.actions.forEach((action) => {
      newPerms[action] = enable;
    });
    setUserPermissions((prev) => ({
      ...prev,
      [moduleKey]: newPerms,
    }));
  };

  const toggleCategoryPermissions = (category, enable) => {
    const modules = getModulesByCategory(category);
    const updates = {};
    modules.forEach((module) => {
      updates[module.key] = {};
      module.actions.forEach((action) => {
        updates[module.key][action] = enable;
      });
    });
    setUserPermissions((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const hasChanges = () => {
    return JSON.stringify(userPermissions) !== JSON.stringify(originalPermissions);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      setSaving(true);
      await updateUserPermissions(selectedUser.id, userPermissions);
      setOriginalPermissions(JSON.parse(JSON.stringify(userPermissions)));
      showNotification("Permissions saved successfully!", "success");
    } catch (error) {
      console.error("Error saving permissions:", error);
      showNotification("Failed to save permissions", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setUserPermissions(JSON.parse(JSON.stringify(originalPermissions)));
    showNotification("Changes reverted", "info");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getModulePermissionCount = (moduleKey) => {
    const module = permissionModules[moduleKey];
    const enabled = module.actions.filter(
      (action) => userPermissions[moduleKey]?.[action]
    ).length;
    return `${enabled}/${module.actions.length}`;
  };

  const getCategoryPermissionCount = (category) => {
    const modules = getModulesByCategory(category);
    let enabled = 0;
    let total = 0;
    modules.forEach((module) => {
      module.actions.forEach((action) => {
        total++;
        if (userPermissions[module.key]?.[action]) enabled++;
      });
    });
    return `${enabled}/${total}`;
  };

  // Check if user is admin - only admin can manage permissions
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            Only administrators can access permission management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {notification.type === "success" && <Check className="h-5 w-5" />}
          {notification.type === "error" && <AlertCircle className="h-5 w-5" />}
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="h-8 w-8 text-red-600" />
            User Permission Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage access permissions for each user. Enable or disable specific
            features and actions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User List Panel */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users
              </h2>
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {loading && !selectedUser ? (
                <div className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto" />
                  <p className="text-gray-500 mt-2">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No users found
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === user.id
                          ? "bg-red-50 border-l-4 border-red-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold">
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || <User className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user.email}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Permissions Panel */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {!selectedUser ? (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Select a User
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Choose a user from the list to manage their permissions
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* User Info Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl font-semibold">
                        {selectedUser.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {selectedUser.name}
                        </h2>
                        <p className="text-gray-500">{selectedUser.email}</p>
                        <span className="inline-block mt-1 px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded-full">
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {hasChanges() && (
                        <button
                          onClick={handleReset}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Reset
                        </button>
                      )}
                      <button
                        onClick={handleSave}
                        disabled={!hasChanges() || saving}
                        className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                          hasChanges() && !saving
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {saving ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mt-4 flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Permissions List */}
                <div className="max-h-[500px] overflow-y-auto p-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {categories
                        .filter(
                          (cat) => filterCategory === "all" || filterCategory === cat
                        )
                        .map((category) => {
                          const modules = getModulesByCategory(category);
                          const isExpanded = expandedCategories[category];

                          return (
                            <div
                              key={category}
                              className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                              {/* Category Header */}
                              <div
                                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => toggleCategory(category)}
                              >
                                <div className="flex items-center gap-3">
                                  {isExpanded ? (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                  )}
                                  <h3 className="font-semibold text-gray-800">
                                    {category}
                                  </h3>
                                  <span className="text-sm text-gray-500">
                                    ({getCategoryPermissionCount(category)} enabled)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCategoryPermissions(category, true);
                                    }}
                                    className="px-3 py-1 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  >
                                    Enable All
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCategoryPermissions(category, false);
                                    }}
                                    className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    Disable All
                                  </button>
                                </div>
                              </div>

                              {/* Modules */}
                              {isExpanded && (
                                <div className="divide-y divide-gray-100">
                                  {modules.map((module) => (
                                    <div
                                      key={module.key}
                                      className="p-4 hover:bg-gray-50 transition-colors"
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-gray-800">
                                            {module.label}
                                          </span>
                                          <span className="text-xs text-gray-400">
                                            ({getModulePermissionCount(module.key)})
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() =>
                                              toggleAllModulePermissions(
                                                module.key,
                                                true
                                              )
                                            }
                                            className="text-xs text-green-600 hover:underline"
                                          >
                                            All
                                          </button>
                                          <span className="text-gray-300">|</span>
                                          <button
                                            onClick={() =>
                                              toggleAllModulePermissions(
                                                module.key,
                                                false
                                              )
                                            }
                                            className="text-xs text-red-600 hover:underline"
                                          >
                                            None
                                          </button>
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {module.actions.map((action) => {
                                          const isEnabled =
                                            userPermissions[module.key]?.[action];
                                          return (
                                            <button
                                              key={action}
                                              onClick={() =>
                                                togglePermission(module.key, action)
                                              }
                                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                                                isEnabled
                                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                              }`}
                                            >
                                              {isEnabled ? (
                                                <Check className="h-3.5 w-3.5" />
                                              ) : (
                                                <X className="h-3.5 w-3.5" />
                                              )}
                                              {actionLabels[action] || action}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
