import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getCustomerReport } from "../../services/Report/reportService";

const CustomerReport = () => {
  const columns = [
    { key: "id", label: "Customer ID", minWidth: "100px", primary: true, render: (_v, row) => row?.id ?? "-" },
    { key: "name", label: "Customer Name", minWidth: "150px", primary: true, render: (_v, row) => row?.name || row?.customerName || "-" },
    {
      key: "total_purchase_amount",
      label: "Total Purchases",
      minWidth: "130px",
      primary: true,
      render: (_v, row) => (row?.total_purchase_amount ? `Rs. ${Number(row.total_purchase_amount).toLocaleString()}` : "Rs. 0"),
    },
    { key: "phone", label: "Phone", minWidth: "120px", render: (_v, row) => row?.phone || "-" },
    { key: "email", label: "Email", minWidth: "180px", render: (_v, row) => row?.email || "-" },
    { key: "address", label: "Address", minWidth: "200px", render: (_v, row) => row?.address || "-" },
    { key: "city", label: "City", minWidth: "100px", render: (_v, row) => row?.city || "-" },
    {
      key: "total_orders",
      label: "Total Orders",
      minWidth: "110px",
      render: (_v, row) => row?.total_sales_orders ?? row?.total_invoices ?? 0,
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
