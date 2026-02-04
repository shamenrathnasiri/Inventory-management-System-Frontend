import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getSalesReturnReport } from "../../services/Report/reportService";

const SalesReturnReport = () => {
  const columns = [
    { key: "returnNo", label: "Return No", minWidth: "120px" },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "invoiceNo", label: "Invoice No", minWidth: "120px" },
    { key: "customerName", label: "Customer", minWidth: "150px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
    {
      key: "totalAmount",
      label: "Total Amount",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "reason",
      label: "Reason",
      minWidth: "150px",
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
      options: [],
    },
  ];

  return (
    <ReportViewer
      title="Sales Return Report"
      reportType="sales-return"
      columns={columns}
      fetchData={getSalesReturnReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default SalesReturnReport;
