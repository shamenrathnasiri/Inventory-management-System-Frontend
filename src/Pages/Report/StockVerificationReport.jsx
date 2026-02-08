import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getStockVerificationReport } from "../../services/Report/reportService";

const StockVerificationReport = () => {
  const columns = [
    {
      key: "created_at",
      label: "Date",
      minWidth: "110px",
      primary: true,
      render: (value) => (value ? new Date(value).toLocaleDateString("en-GB") : "-"),
    },
    { key: "voucherNumber", label: "Verification No", minWidth: "140px", primary: true },
    {
      key: "center",
      label: "Center",
      minWidth: "120px",
      primary: true,
      render: (_v, row) => row?.center?.name || "-",
    },
    {
      key: "discrepancyValue",
      label: "Discrepancy Value",
      minWidth: "140px",
      primary: true,
      render: (_v, row) => {
        // fallback to provided field or sum of item amounts
        const provided = Number(row?.discrepancyValue ?? row?.discrepancy_value ?? 0);
        if (provided) return `Rs. ${Number(provided).toLocaleString()}`;
        const sum = (row?.items || []).reduce((s, it) => s + (Number(it?.amount ?? 0) || 0), 0);
        return sum ? `Rs. ${Number(sum).toLocaleString()}` : "-";
      },
    },
    {
      key: "products",
      label: "Products",
      minWidth: "220px",
      render: (_v, row) => {
        const parts = (row?.items || []).map((item) => {
          const name = item?.product?.name || item?.item_name || item?.product_name || "Unnamed";
          const qty = item?.quantity ?? 0;
          const amt = item?.amount ?? item?.cost ?? 0;
          const cost = item?.cost ?? 0;
          const mrp = item?.mrp ?? 0;
          return `${name} (${qty} x Rs. ${Number(amt).toLocaleString()} | cost: Rs. ${Number(cost).toLocaleString()} | mrp: Rs. ${Number(mrp).toLocaleString()})`;
        });
        return parts.length > 0 ? parts.join(", ") : "-";
      },
    },
    {
      key: "costprice",
      label: "Cost Price",
      minWidth: "120px",
      render: (_v, row) => {
        const costprice = (row?.items || []).reduce((sum, item) => {
          const c = Number(item?.cost ?? item?.amount ?? 0);
          const q = item?.quantity ?? 1;
          return sum + c * q;
        }, 0);
        return costprice ? `Rs. ${Number(costprice).toLocaleString()}` : "-";
      },
    },
    {
      key: "mrpprice",
      label: "MRP Price",
      minWidth: "120px",
      render: (_v, row) => {
        const mrpprice = (row?.items || []).reduce((sum, item) => {
          const m = Number(item?.mrp ?? 0);
          const q = item?.quantity ?? 1;
          return sum + m * q;
        }, 0);
        return mrpprice ? `Rs. ${Number(mrpprice).toLocaleString()}` : "-";
      },
    },
    {
      key: "totalItems",
      label: "Total Items",
      minWidth: "100px",
      render: (_v, row) => (row?.items || []).reduce((s, it) => s + (it?.quantity ?? 0), 0) || 0,
    },
    {
      key: "matchedItems",
      label: "Matched",
      minWidth: "100px",
      render: (_v, row) => row?.matched_items ?? row?.matchedItems ?? 0,
    },
    {
      key: "discrepancies",
      label: "Discrepancies",
      minWidth: "110px",
      render: (_v, row) => row?.discrepancies ?? "-",
    },
    {
      key: "status",
      label: "Status",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "completed" || value === "Completed"
              ? "bg-green-100 text-green-700"
              : value === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : value === "pending" || value === "Pending Review"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value || "N/A"}
        </span>
      ),
    },
    { key: "verifiedBy", label: "Verified By", minWidth: "120px", render: (_v, row) => row?.approver?.name || "-" },
    { key: "approvedBy", label: "Approved By", minWidth: "120px", render: (_v, row) => row?.creator?.name || "-" },
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
