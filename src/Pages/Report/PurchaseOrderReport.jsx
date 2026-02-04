import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getPurchaseOrderReport } from "../../services/Report/reportService";

const PurchaseOrderReport = () => {
  const columns = [
    { key: "orderNo", label: "PO No", minWidth: "120px" },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "supplierName", label: "Supplier", minWidth: "150px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
    {
      key: "totalAmount",
      label: "Total Amount",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
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
    {
      key: "receivedStatus",
      label: "Received",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Full"
              ? "bg-green-100 text-green-700"
              : value === "Partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {value || "Not Received"}
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
      key: "receivedStatus",
      label: "Received Status",
      type: "select",
      options: [
        { value: "Full", label: "Full" },
        { value: "Partial", label: "Partial" },
        { value: "Not Received", label: "Not Received" },
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
      title="Purchase Order Report"
      reportType="purchase-order"
      columns={columns}
      fetchData={getPurchaseOrderReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default PurchaseOrderReport;
