import React, { useMemo, useState, useEffect } from "react";
import { Home, FileText, ChevronDown, ChevronRight, Settings, LogOut, X, BoxSelect, BookXIcon, Torus, Shield, Users, PenBox } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Adjust path

const Sidebar = ({
  user,
  onLogout,
  activeItem,
  setActiveItem,
  isOpen,
  setIsOpen,
}) => {
  const { hasPermission } = useAuth();
  
  // Check if user is admin for administration menu (case-insensitive)
  const isAdmin = !!(user?.role && String(user.role).toLowerCase().includes("admin"));

  const menuItems = useMemo(
    () => [
      { id: "dashboard", name: "Dashboard", icon: Home, badge: null },
      { id: "pendingApprovals", name: "Pending Approval",  icon: Torus, badge: 3 },
      {
        id: "masterFiles",
        name: "Master Files",
        icon: FileText,
        subItems: [
          { id: "customer", name: "Customer" },
          { id: "supplier", name: "Supplier" },
          { id: "center", name: "Center" },
          { id: "discountLevel", name: "Discount Level" },
          { id: "productType", name: "Product Type" },
          { id: "product", name: "Product List" },
        ],
      },
      
      {
        id: "Inventory control",
        name: "Inventory Control",
        icon: BookXIcon,
        subItems: [
        { id: "invoices", name: "Invoice" },
      { id: "salesOrder", name: "Sales Order" },
      { id: "salesReturn", name: "Sales Return" },
      { id: "grn", name: "GRN" },
      { id: "purchaseReturn", name: "Purchase Return" },
      { id: "purchaseOrder", name: "Purchase Order" },
        ],
      },
     {
        id: "Stock control",
        name: "Stock Control",
        icon: BoxSelect,
        subItems: [
      { id: "stockTransfer", name: "Stock Transfer" },
      { id: "stockVerification", name: "Stock Verification" },
        ]
     },

     {
        id: "Report",
        name: "Report",
        icon: PenBox,
        subItems: [
          { id: "reportGrn", name: "GRN Report" },
          { id: "reportInvoice", name: "Invoice Report" },
          { id: "reportSalesOrder", name: "Sales Order Report" },
          { id: "reportSalesReturn", name: "Sales Return Report" },
          { id: "reportPurchaseOrder", name: "Purchase Order Report" },
          { id: "reportPurchaseReturn", name: "Purchase Return Report" },
          { id: "reportStockTransfer", name: "Stock Transfer Report" },
          { id: "reportStockVerification", name: "Stock Verification Report" },
          { id: "reportCustomer", name: "Customer Report" },
          { id: "reportSupplier", name: "Supplier Report" },
          { id: "reportProduct", name: "Product Report" },
        ]
     },

     // Only show Administration menu for admin users
     ...(isAdmin ? [{
        id: "administration",
        name: "Administration",
        icon: Shield,
        subItems: [
          { id: "userPermissions", name: "User Permissions" },
        ]
     }] : [])
    ],
    [isAdmin]
  );

  // Inventory grouping removed; menu items are flat top-level entries

  // Which top-level group is open (accordion behavior). null = all closed.
  const [openGroup, setOpenGroup] = useState(null);

  // Auto-open the group that contains the activeItem; otherwise keep all closed.
  useEffect(() => {
    let openId = null;
    for (const item of menuItems) {
      if (item.subItems && item.subItems.some((s) => s.id === activeItem)) {
        openId = item.id;
        break;
      }
    }
    setOpenGroup(openId);
  }, [activeItem, menuItems]);

  // Recursive function to filter menu items based on permissions
  // Maps menu item IDs to their corresponding permission module IDs
  const getPermissionModule = (itemId) => {
    const permissionMap = {
      userPermissions: "permissionManagement",
      // Add more mappings here if menu item IDs differ from permission module IDs
    };
    return permissionMap[itemId] || itemId;
  };

  const filterMenuItems = (items, ancestors = []) => {
    // If user is admin, show everything (administrators have full visibility)
    if (isAdmin) return items;

    return items
      .map((item) => {
        const permModule = getPermissionModule(item.id);
        if (item.subItems) {
          const filteredSubItems = filterMenuItems(item.subItems, [...ancestors, item.id]);
          // Show parent if:
          // - it has permitted children, OR
          // - the parent itself has permission, OR
          // - any ancestor higher up has permission (fallback for broader permissions)
          if (
            filteredSubItems.length > 0 ||
            hasPermission(permModule, "view") ||
            ancestors.some((a) => hasPermission(getPermissionModule(a), "view"))
          ) {
            return { ...item, subItems: filteredSubItems };
          }
        } else if (
          hasPermission(permModule, "view") ||
          // if user has permission for any ancestor (e.g., "inventory" or "masterFiles"), allow the child
          ancestors.some((a) => hasPermission(getPermissionModule(a), "view"))
        ) {
          return item;
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        min-h-screen w-72 fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0
      `}
      >
        <div className="flex h-full flex-col bg-gradient-to-b from-red-800 to-red-950 text-white shadow-2xl rounded-r-3xl border border-red-900">
          <div className="px-6 pt-8 pb-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200">Menu</p>
            
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-red-200 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 bg-white/10 rounded-2xl px-4 py-3">
              <div className="h-12 w-12 rounded-2xl bg-red-500 grid place-items-center text-xl font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold leading-snug">{user.name}</p>
                <p className="text-xs uppercase tracking-wide text-red-200">
                  {user.role || "HR Manager"}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
              {filteredMenuItems.map((item) => (
                <div key={item.id}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => setOpenGroup((cur) => (cur === item.id ? null : item.id))}
                        className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                          item.subItems.some((sub) => activeItem === sub.id) || activeItem === item.id
                            ? "bg-white/10 text-white"
                            : "text-red-200 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-red-100" />
                          <span>{item.name}</span>
                        </div>
                        <div>{openGroup === item.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</div>
                      </button>

                      {openGroup === item.id && (
                        <ul className="space-y-1 pl-6 list-disc">
                          {item.subItems.map((sub) => (
                            <li key={sub.id} className="list-item">
                              <button
                                onClick={() => setActiveItem(sub.id)}
                                className={`w-full text-left rounded-2xl px-2 py-1 text-sm transition-all duration-200 ${
                                  activeItem === sub.id ? "bg-red-300/20 text-white" : "text-red-100 hover:bg-white/10"
                                }`}
                              >
                                {sub.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        activeItem === item.id ? "bg-white/10 text-white" : "text-red-200 hover:bg-white/10"
                      }`}
                    >
                      {item.icon ? (
                        <item.icon className={`h-5 w-5 ${activeItem === item.id ? "text-red-100" : "text-red-200"}`} />
                      ) : (
                        <span className="inline-block w-5" />
                      )}
                      <span>{item.name}</span>
                    </button>
                  )}
                </div>
              ))}
          </nav>

          <div className="space-y-3 px-6 pb-6">
        
            <button
              onClick={onLogout}
              className="w-full rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold transition hover:border-white hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
