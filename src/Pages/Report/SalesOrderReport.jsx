import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getSalesOrderReport } from "../../services/Report/reportService";

const SalesOrderReport = () => {
  const columns = [
    { key: "orderNo", label: "Order No", minWidth: "120px", primary: true },
    { key: "customerName", label: "Customer", minWidth: "150px", primary: true },
    {
      key: "totalAmount",
      label: "Total Amount",
      minWidth: "120px",
      primary: true,
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
    {
      key: "status",
      label: "Status",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Completed"
              ? "bg-green-100 text-green-700"
              : value === "Processing"
              ? "bg-blue-100 text-blue-700"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value || "N/A"}
        </span>
      ),
    },
    { key: "createdBy", label: "Created By", minWidth: "120px" },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Completed", label: "Completed" },
        { value: "Processing", label: "Processing" },
        { value: "Pending", label: "Pending" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "center",
      label: "Center",
      type: "select",
      options: [],
    },
  ];

  return (
    <ReportViewer
      title="Sales Order Report"
      reportType="sales-order"
      columns={columns}
      fetchData={getSalesOrderReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default SalesOrderReport;
