import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getSupplierReport } from "../../services/Report/reportService";

const SupplierReport = () => {
  const columns = [
    { key: "id", label: "ID", minWidth: "60px" },
    { key: "supplier_name", label: "Supplier Name", minWidth: "150px" },
    { key: "phone_number", label: "Phone", minWidth: "130px" },
    { key: "nic", label: "NIC", minWidth: "140px" },
    { key: "email", label: "Email", minWidth: "180px" },
    {
      key: "address",
      label: "Address",
      minWidth: "220px",
      render: (_value, row) => {
        const parts = [row?.address1, row?.address2].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : "-";
      },
    },
    {
      key: "credit_value",
      label: "Credit Limit",
      minWidth: "130px",
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "-",
    },
    {
      key: "credit_period",
      label: "Credit Period",
      minWidth: "120px",
      render: (value) => (value ? `${value} days` : "-"),
    },
    
    
    {
      key: "deleted_at",
      label: "Status",
      minWidth: "100px",
      render: (value) => {
        const isActive = !value;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      key: "address",
      label: "Address/City",
      type: "text",
      placeholder: "Search by address or city",
    },
  ];

  return (
    <ReportViewer
      title="Supplier Report"
      reportType="supplier"
      columns={columns}
      fetchData={getSupplierReport}
      filterOptions={filterOptions}
      showDateRange={false}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default SupplierReport;
