import React, { useEffect, useState } from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getProductReport } from "../../services/Report/reportService";
import { fetchCenters } from "../../services/Inventory/centerService";

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
    {
      key: "cost",
      label: "Cost Price",
      minWidth: "120px",
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "-",
    },
    {
      key: "min_price",
      label: "Min Price",
      minWidth: "120px",
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
      key: "total_stock_quantity",
      label: "Total Stock",
      minWidth: "110px",
      render: (_value, row) => {
        const stock = Number(
          // if a center is selected, show stock for that center only
          (selectedCenter
            ? (row?.inventory_stocks || []).find((s) => String(s?.center_id) === String(selectedCenter))?.quantity
            : row?.total_stock_quantity ?? row?.quantity) ?? 0
        );
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
    {
      key: "inventory_stocks",
      label: "Stock by Warehouse",
      minWidth: "220px",
      render: (_value, row) => {
        const stocks = row?.inventory_stocks || [];
        if (stocks.length === 0) return "-";
        if (selectedCenter) {
          const s = stocks.find((st) => String(st?.center_id) === String(selectedCenter));
          return s ? `${s?.center?.name || "Unknown"}: ${s?.quantity ?? 0}` : "-";
        }
        return stocks
          .map((s) => `${s?.center?.name || "Unknown"}: ${s?.quantity ?? 0}`)
          .join(" | ");
      },
    },
    {
      key: "stockValue",
      label: "Stock Value",
      minWidth: "140px",
      render: (_value, row) => {
        const stock = Number(
          (selectedCenter
            ? (row?.inventory_stocks || []).find((s) => String(s?.center_id) === String(selectedCenter))?.quantity
            : row?.total_stock_quantity ?? row?.quantity) ?? 0
        );
        const cost = Number(row?.cost ?? 0);
        const val = stock * cost;
        return val ? `Rs. ${Number(val).toLocaleString()}` : "-";
      },
    },
    {
      key: "total_sold_quantity",
      label: "Sold Qty",
      minWidth: "100px",
      render: (_value, row) => Number(row?.total_sold_quantity ?? 0),
    },
    {
      key: "total_sales_amount",
      label: "Sales Amount",
      minWidth: "130px",
      render: (_value, row) =>
        row?.total_sales_amount
          ? `Rs. ${Number(row.total_sales_amount).toLocaleString()}`
          : "Rs. 0",
    },
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
      placeholder: "e.g. boxes",
    },
    {
      key: "center",
      label: "Warehouse",
      type: "text",
      placeholder: "Search warehouse",
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

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");

  useEffect(() => {
    let mounted = true;
    fetchCenters()
      .then((data) => {
        if (!mounted) return;
        setCenters(Array.isArray(data) ? data : []);
      })
      .catch(() => setCenters([]));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Warehouse:</label>
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Warehouses</option>
          {centers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <ReportViewer
        title="Product Report"
        reportType="product"
        columns={columns}
        fetchData={(params) => getProductReport({ ...params, center: selectedCenter })}
        filterOptions={filterOptions}
        showDateRange={false}
        showSearch={true}
        pageSize={10}
      />
    </div>
  );
};

export default ProductReport;
