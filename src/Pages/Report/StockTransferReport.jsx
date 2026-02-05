import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getStockTransferReport } from "../../services/Report/reportService";

const StockTransferReport = () => {
  const columns = [
    { key: "transferNo", label: "Transfer No", minWidth: "120px", primary: true },
    { key: "fromCenter", label: "From Center", minWidth: "130px", primary: true },
    {
      key: "totalValue",
      label: "Total Value",
      minWidth: "120px",
      primary: true,
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "toCenter", label: "To Center", minWidth: "130px" },
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
              : value === "In Transit"
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
    { key: "approvedBy", label: "Approved By", minWidth: "120px" },
    { key: "createdBy", label: "Created By", minWidth: "120px" },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Completed", label: "Completed" },
        { value: "In Transit", label: "In Transit" },
        { value: "Pending", label: "Pending" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "fromCenter",
      label: "From Center",
      type: "select",
      options: [],
    },
    {
      key: "toCenter",
      label: "To Center",
      type: "select",
      options: [],
    },
  ];

  return (
    <ReportViewer
      title="Stock Transfer Report"
      reportType="stock-transfer"
      columns={columns}
      fetchData={getStockTransferReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default StockTransferReport;
