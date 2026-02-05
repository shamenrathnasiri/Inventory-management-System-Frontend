import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getCustomerReport } from "../../services/Report/reportService";

const CustomerReport = () => {
  const columns = [
    { key: "customerCode", label: "Customer Code", minWidth: "120px", primary: true },
    { key: "customerName", label: "Customer Name", minWidth: "150px", primary: true },
    {
      key: "totalPurchases",
      label: "Total Purchases",
      minWidth: "130px",
      primary: true,
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    { key: "contactPerson", label: "Contact Person", minWidth: "130px" },
    { key: "phone", label: "Phone", minWidth: "120px" },
    { key: "email", label: "Email", minWidth: "180px" },
    { key: "address", label: "Address", minWidth: "200px" },
    { key: "city", label: "City", minWidth: "100px" },
    {
      key: "totalOrders",
      label: "Total Orders",
      minWidth: "110px",
    },
    {
      key: "outstandingBalance",
      label: "Outstanding",
      minWidth: "120px",
      render: (value) => (
        <span className={value > 0 ? "text-red-600 font-semibold" : "text-green-600"}>
          {value ? `Rs. ${Number(value).toLocaleString()}` : "Rs. 0"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {value || "Active"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
    {
      key: "city",
      label: "City",
      type: "text",
      placeholder: "Enter city name",
    },
  ];

  return (
    <ReportViewer
      title="Customer Report"
      reportType="customer"
      columns={columns}
      fetchData={getCustomerReport}
      filterOptions={filterOptions}
      showDateRange={false}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default CustomerReport;
