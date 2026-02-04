import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getStockVerificationReport } from "../../services/Report/reportService";

const StockVerificationReport = () => {
  const columns = [
    { key: "verificationNo", label: "Verification No", minWidth: "130px" },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
    { key: "matchedItems", label: "Matched", minWidth: "100px" },
    { key: "discrepancies", label: "Discrepancies", minWidth: "110px" },
    {
      key: "discrepancyValue",
      label: "Discrepancy Value",
      minWidth: "140px",
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
              : value === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : value === "Pending Review"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value || "N/A"}
        </span>
      ),
    },
    { key: "verifiedBy", label: "Verified By", minWidth: "120px" },
    { key: "approvedBy", label: "Approved By", minWidth: "120px" },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Completed", label: "Completed" },
        { value: "In Progress", label: "In Progress" },
        { value: "Pending Review", label: "Pending Review" },
      ],
    },
    {
      key: "center",
      label: "Center",
      type: "select",
      options: [],
    },
    {
      key: "hasDiscrepancies",
      label: "Has Discrepancies",
      type: "select",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
    },
  ];

  return (
    <ReportViewer
      title="Stock Verification Report"
      reportType="stock-verification"
      columns={columns}
      fetchData={getStockVerificationReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default StockVerificationReport;
