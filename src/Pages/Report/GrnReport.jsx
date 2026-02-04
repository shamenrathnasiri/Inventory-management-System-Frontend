import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getGrnReport } from "../../services/Report/reportService";

const GrnReport = () => {
  const columns = [
    { key: "grnNo", label: "GRN No", minWidth: "120px" },
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
            value === "Approved"
              ? "bg-green-100 text-green-700"
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
        { value: "Approved", label: "Approved" },
        { value: "Pending", label: "Pending" },
        { value: "Rejected", label: "Rejected" },
      ],
    },
    {
      key: "center",
      label: "Center",
      type: "select",
      options: [], // Populate from API
    },
  ];

  return (
    <ReportViewer
      title="GRN Report"
      reportType="grn"
      columns={columns}
      fetchData={getGrnReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default GrnReport;
