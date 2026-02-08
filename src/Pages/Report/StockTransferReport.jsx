import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getStockTransferReport } from "../../services/Report/reportService";

const StockTransferReport = () => {
  const columns = [
    {
      key: "created_at",
      label: "Date",
      minWidth: "110px",
      primary: true,
      render: (value) => (value ? new Date(value).toLocaleDateString("en-GB") : "-"),
    },
    { key: "voucherNumber", label: "Transfer No", minWidth: "130px", primary: true },
    {
      key: "fromCenter",
      label: "From Center",
      minWidth: "130px",
      primary: true,
      render: (_v, row) => row?.fromCenter?.name || row?.center?.name || "-",
    },
    {
      key: "toCenter",
      label: "To Center",
      minWidth: "130px",
      render: (_v, row) => row?.toCenter?.name || "-",
    },
    {
      key: "totalValue",
      label: "Total Value",
      minWidth: "120px",
      render: (_v, row) => {
        const value = Number(row?.amount ?? row?.totalValue ?? 0);
        if (value) return `Rs. ${Number(value).toLocaleString()}`;
        const sum = (row?.items || []).reduce((s, item) => {
          const itmAmt = Number(item?.amount ?? item?.cost ?? 0);
          const q = item?.quantity ?? 1;
          return s + itmAmt * q;
        }, 0);
        return sum ? `Rs. ${Number(sum).toLocaleString()}` : "Rs. 0";
      },
    },
    {
      key: "products",
      label: "Products",
      minWidth: "220px",
      render: (_value, row) => {
        const parts = (row?.items || []).map((item) => {
          const name = item?.product?.name || item?.item_name || item?.product_name || "Unnamed";
          return `${name} `;
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
          const itemCost = Number(item?.cost ?? item?.amount ?? 0);
          return  itemCost ;
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
          const itemMrp = Number(item?.mrp ?? 0);
          return  itemMrp ;
        }, 0);
        return mrpprice ? `Rs. ${Number(mrpprice).toLocaleString()}` : "-";
      },
    },
    {
      key: "items",
      label: "Total Items",
      minWidth: "100px",
      render: (_v, row) => (row?.items || []).reduce((s, it) => s + (it?.quantity ?? 0), 0) || 0,
    },
    { key: "createdBy", label: "Created By", minWidth: "140px", render: (_v, row) => row?.creator?.name || row?.creator_name || "-" },
    { key: "approvedBy", label: "Approved By", minWidth: "140px", render: (_v, row) => row?.approver?.name || row?.approver_name || "-" },
    {
      key: "status",
      label: "Status",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "completed" || value === "Completed"
              ? "bg-green-100 text-green-700"
              : value === "In Transit"
              ? "bg-blue-100 text-blue-700"
              : value === "pending" || value === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value || "N/A"}
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
        { value: "completed", label: "Completed" },
        { value: "In Transit", label: "In Transit" },
        { value: "pending", label: "Pending" },
        { value: "cancelled", label: "Cancelled" },
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
