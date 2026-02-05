import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getProductReport } from "../../services/Report/reportService";

const ProductReport = () => {
  const columns = [
    { key: "code", label: "Product Code", minWidth: "140px", primary: true },
    { key: "name", label: "Product Name", minWidth: "180px", primary: true },
    {
      key: "mrp",
      label: "MRP",
      minWidth: "120px",
      primary: true,
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "-",
    },
    { key: "barcode", label: "Barcode", minWidth: "140px" },
    {
      key: "productType",
      label: "Type",
      minWidth: "120px",
      render: (_value, row) => row?.product_type?.type || "-",
    },
    {
      key: "discountLevel",
      label: "Discount Level",
      minWidth: "150px",
      render: (_value, row) => row?.discount_level?.name || "-",
    },
    {
      key: "cost",
      label: "Cost Price",
      minWidth: "120px",
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "-",
    },
    {
      key: "quantity",
      label: "Stock",
      minWidth: "100px",
      render: (value) => {
        const stock = Number(value || 0);
        return (
          <span
            className={`font-semibold ${
              stock <= 0
                ? "text-red-600"
                : stock <= 5
                  ? "text-yellow-600"
                  : "text-green-600"
            }`}
          >
            {stock}
          </span>
        );
      },
    },
    // {
    //   key: "stockValue",
    //   label: "Stock Value",
    //   minWidth: "140px",
    //   render: (_value, row) => {
    //     const stock = Number(row?.quantity || 0);
    //     const cost = Number(row?.cost || 0);
    //     const value = stock * cost;
    //     return value ? `Rs. ${Number(value).toLocaleString()}` : "-";
    //   },
    // },
    {
      key: "is_active",
      label: "Status",
      minWidth: "110px",
      render: (value) => {
        const label = value ? "Active" : "Inactive";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              value
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {label}
          </span>
        );
      },
    },
  ];

  const filterOptions = [
    {
      key: "is_active",
      label: "Status",
      type: "select",
      options: [
        { value: "1", label: "Active" },
        { value: "0", label: "Inactive" },
      ],
    },
    {
      key: "productType",
      label: "Product Type",
      type: "text",
      placeholder: "e.g. boxex",
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
