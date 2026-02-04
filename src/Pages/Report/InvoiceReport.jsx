import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getInvoiceReport } from "../../services/Report/reportService";

const InvoiceReport = () => {
  const columns = [
    { key: "invoiceNo", label: "Invoice No", minWidth: "120px" },
    { key: "date", label: "Date", minWidth: "100px" },
    { key: "customerName", label: "Customer", minWidth: "150px" },
    { key: "centerName", label: "Center", minWidth: "120px" },
    { key: "totalItems", label: "Total Items", minWidth: "100px" },
    {
      key: "subtotal",
      label: "Subtotal",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "discount",
      label: "Discount",
      minWidth: "100px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      minWidth: "120px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Paid"
              ? "bg-green-100 text-green-700"
              : value === "Partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value || "Unpaid"}
        </span>
      ),
    },
    { key: "createdBy", label: "Created By", minWidth: "120px" },
  ];

  const filterOptions = [
    {
      key: "paymentStatus",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "Paid", label: "Paid" },
        { value: "Partial", label: "Partial" },
        { value: "Unpaid", label: "Unpaid" },
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
      title="Invoice Report"
      reportType="invoice"
      columns={columns}
      fetchData={getInvoiceReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default InvoiceReport;
