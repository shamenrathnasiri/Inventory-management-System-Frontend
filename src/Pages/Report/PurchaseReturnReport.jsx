import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getPurchaseReturnReport } from "../../services/Report/reportService";

const PurchaseReturnReport = () => {
  const columns = [
    { key: "returnNo", label: "Return No", minWidth: "120px", primary: true },
    { key: "supplierName", label: "Supplier", minWidth: "150px", primary: true },
    {
      key: "totalAmount",
      label: "Total Amount",
      minWidth: "120px",
      primary: true,
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "grnNo", label: "GRN No", minWidth: "120px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
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
      title="Purchase Return Report"
      reportType="purchase-return"
      columns={columns}
      fetchData={getPurchaseReturnReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default PurchaseReturnReport;
