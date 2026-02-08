import React from "react";
import ReportViewer from "../../components/Report/ReportViewer";
import { getPurchaseOrderReport } from "../../services/Report/reportService";

const PurchaseOrderReport = () => {
  const columns = [
    {
      key: "created_at",
      label: "Date",
      minWidth: "110px",
      primary: true,
      render: (value) =>
        value ? new Date(value).toLocaleDateString("en-GB") : "-",
    },
    { key: "voucherNumber", label: "PO No", minWidth: "130px", primary: true },
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
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "-",
    },
    {
      key: "discountValue",
      label: "Discount",
      minWidth: "110px",
      primary: true,
      render: (value) =>
        value ? `Rs. ${Number(value).toLocaleString()}` : "Rs. 0",
    },
    {
      key: "center",
      label: "Center",
      minWidth: "120px",
      render: (_value, row) => row?.center?.name || "-",
    },

    { key: "referNumber", label: "Reference", minWidth: "110px" },
     
    {
      key: "products",
      label: "Products",
      minWidth: "200px",
      render: (_value, row) => {
        const parts = (row?.items || []).map((item) => {
          const name = item?.product?.name || item?.item_name || item?.product_name || item?.item?.name || "Unnamed";
          return `${name} `;
        });
        return parts.length > 0 ? parts.join(", ") : "-";
      },
    },

    {
      key: "costprice",
      label: "Cost Price",
      minWidth: "120px",
      render: (_value, row) => {
        const costprice = (row?.items || []).reduce((sum, item) => {
          const itemCost = Number(item?.cost ?? item?.amount ?? 0);
          return  itemCost ;
        }, 0);
        return costprice ? `Rs. ${Number(costprice).toLocaleString()}` : "-";
      }
    },
    {
      key: "mrpprice",
      label: "MRP Price",
      minWidth: "120px",
      render: (_value, row) => {
        const mrpprice = (row?.items || []).reduce((sum, item) => {
          const itemMrp = Number(item?.mrp ?? 0);
          return  itemMrp ;
        }, 0);
        return mrpprice ? `Rs. ${Number(mrpprice).toLocaleString()}` : "-";
      }
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
        { value: "completed", label: "Completed" },
        { value: "processing", label: "Processing" },
        { value: "pending", label: "Pending" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "is_confirmed",
      label: "Confirmed",
      type: "select",
      options: [
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    {
      key: "supplier",
      label: "Supplier",
      type: "text",
      placeholder: "Search supplier",
    },
  ];

  return (
    <ReportViewer
      title="Purchase Order Report"
      reportType="purchase-order"
      columns={columns}
      fetchData={getPurchaseOrderReport}
      filterOptions={filterOptions}
      showDateRange={true}
      showSearch={true}
      pageSize={10}
    />
  );
};

export default PurchaseOrderReport;
