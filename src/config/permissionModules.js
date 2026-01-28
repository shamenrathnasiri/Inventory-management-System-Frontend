// Define all permission modules and their available actions
// This serves as the master list of all controllable permissions in the system

export const permissionModules = {
  // Dashboard
  dashboard: {
    label: "Dashboard",
    category: "General",
    actions: ["view", "edit"],
  },

  // Pending Approvals
  pendingApprovals: {
    label: "Pending Approvals",
    category: "General",
    actions: ["view", "edit", "approve"],
  },

  // Master Files
  customer: {
    label: "Customer",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  supplier: {
    label: "Supplier",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  center: {
    label: "Center",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  discountLevel: {
    label: "Discount Level",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  productType: {
    label: "Product Type",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  product: {
    label: "Product List",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },
  productList: {
    label: "Product List (Legacy)",
    category: "Master Files",
    actions: ["view", "edit", "delete", "create"],
  },

  // Inventory Control
  invoices: {
    label: "Invoice",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "print", "approve"],
  },
  salesOrder: {
    label: "Sales Order",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  salesReturn: {
    label: "Sales Return",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  grn: {
    label: "GRN (Goods Received Note)",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  purchaseReturn: {
    label: "Purchase Return",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  purchaseOrder: {
    label: "Purchase Order",
    category: "Inventory Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },

  // Stock Control
  stockTransfer: {
    label: "Stock Transfer",
    category: "Stock Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  stockVerification: {
    label: "Stock Verification",
    category: "Stock Control",
    actions: ["view", "edit", "delete", "create", "approve"],
  },
  inventory: {
    label: "Inventory",
    category: "Stock Control",
    actions: ["view", "edit"],
  },

  // Admin & User Management
  userManagement: {
    label: "User Management",
    category: "Administration",
    actions: ["view", "edit", "delete", "create"],
  },
  permissionManagement: {
    label: "Permission Management",
    category: "Administration",
    actions: ["view", "edit"],
  },
  roleManagement: {
    label: "Role Management",
    category: "Administration",
    actions: ["view", "edit", "delete", "create"],
  },

  // Accounting
  

  

  // Settings
  accountingSettings: {
    label: "Accounting Settings",
    category: "Settings",
    actions: ["view", "edit"],
  },
  usersAndRoles: {
    label: "Users and Roles",
    category: "Settings",
    actions: ["view", "edit"],
  },
};

// Get all categories
export const getCategories = () => {
  const categories = new Set();
  Object.values(permissionModules).forEach((module) => {
    categories.add(module.category);
  });
  return Array.from(categories);
};

// Get modules by category
export const getModulesByCategory = (category) => {
  return Object.entries(permissionModules)
    .filter(([_, module]) => module.category === category)
    .map(([key, module]) => ({ key, ...module }));
};

// Get all action types
export const getAllActions = () => {
  const actions = new Set();
  Object.values(permissionModules).forEach((module) => {
    module.actions.forEach((action) => actions.add(action));
  });
  return Array.from(actions);
};

// Action labels for display
export const actionLabels = {
  view: "View",
  edit: "Edit",
  delete: "Delete",
  create: "Create",
  approve: "Approve",
  print: "Print",
  export: "Export",
};

export default permissionModules;
