import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getProductReport } from "../../services/Report/reportService";

const ProductReport = () => {
  const columns = [
    { key: "productCode", label: "Product Code", minWidth: "120px" },
    { key: "productName", label: "Product Name", minWidth: "180px" },
    { key: "productType", label: "Type", minWidth: "100px" },
    { key: "category", label: "Category", minWidth: "120px" },
    { key: "unit", label: "Unit", minWidth: "80px" },
    {
      key: "costPrice",
      label: "Cost Price",
      minWidth: "110px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "sellingPrice",
      label: "Selling Price",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    {
      key: "currentStock",
      label: "Stock",
      minWidth: "100px",
      render: (value, row) => (
        <span
          className={`font-semibold ${
            value <= (row.reorderLevel || 10)
              ? "text-red-600"
              : value <= (row.reorderLevel || 10) * 2
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {value || 0}
        </span>
      ),
    },
    {
      key: "stockValue",
      label: "Stock Value",
      minWidth: "120px",
      render: (value) => (value ? `Rs. ${Number(value).toLocaleString()}` : "-"),
    },
    { key: "reorderLevel", label: "Reorder Level", minWidth: "120px" },
    {
      key: "status",
      label: "Status",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {value || "Active"}
        </span>
      ),
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
      key: "productType",
      label: "Product Type",
      type: "select",
      options: [],
    },
    {
      key: "lowStock",
      label: "Stock Level",
      type: "select",
      options: [
        { value: "low", label: "Low Stock" },
        { value: "out", label: "Out of Stock" },
        { value: "normal", label: "Normal" },
      ],
    },
  ];

  return (
    <ReportViewer
      title="Product Report"
      reportType="product"
      columns={columns}
      fetchData={getProductReport}
      filterOptions={filterOptions}
      showDateRange={false}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default ProductReport;
