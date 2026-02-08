import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getGrnReport } from "../../services/Report/reportService";

const GrnReport = () => {
  const columns = [
    {
      key: "created_at",
      label: "Date",
      minWidth: "110px",
      primary: true,
      render: (value) => (value ? new Date(value).toLocaleDateString("en-GB") : "-"),
    },
    { key: "voucherNumber", label: "GRN No", minWidth: "130px", primary: true },
    {
      key: "supplier",
      label: "Supplier",
      minWidth: "150px",
      primary: true,
      render: (_value, row) => row?.supplier?.supplier_name || "-",
    },
    {
      key: "amount",
      label: "Total Amount",
      minWidth: "120px",
      primary: true,
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "discountValue",
      label: "Discount",
      minWidth: "110px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "Rs. 0"),
    },
    {
      key: "center",
      label: "Center",
      minWidth: "120px",
      render: (_value, row) => row?.center?.name || "-",
    },
    {
      key: "products",
      label: "Products",
      minWidth: "200px",
      render: (_value, row) => {
        const parts = (row?.items || []).map((item) => {
          const name = item?.product?.name || item?.item_name || item?.product_name || "Unnamed";
          return `${name} `;
        });
        return parts.length > 0 ? parts.join(", ") : "-";
      },
    },
    {
      key: "items",
      label: "Items",
      minWidth: "80px",
      render: (_value, row) => {
        const totalQty = (row?.items || []).reduce((sum, it) => sum + (it?.quantity ?? 0), 0);
        return totalQty || 0;
      }
    },

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
