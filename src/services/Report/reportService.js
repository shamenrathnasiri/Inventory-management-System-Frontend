import axios from "../../utils/axios";

// GRN Report
export const getGrnReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/grn", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching GRN report:", error);
    throw error;
  }
};

// Invoice Report
export const getInvoiceReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/invoice", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Invoice report:", error);
    throw error;
  }
};

// Sales Order Report
export const getSalesOrderReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/sales-order", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Sales Order report:", error);
    throw error;
  }
};

// Sales Return Report
export const getSalesReturnReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/sales-return", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Sales Return report:", error);
    throw error;
  }
};

// Purchase Order Report
export const getPurchaseOrderReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/purchase-order", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Purchase Order report:", error);
    throw error;
  }
};

// Purchase Return Report
export const getPurchaseReturnReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/purchase-return", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Purchase Return report:", error);
    throw error;
  }
};

// Stock Transfer Report
export const getStockTransferReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/stock-transfer", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Transfer report:", error);
    throw error;
  }
};

// Stock Verification Report
export const getStockVerificationReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/stock-verification", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Stock Verification report:", error);
    throw error;
  }
};

// Customer Report
export const getCustomerReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/customer", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Customer report:", error);
    throw error;
  }
};

// Supplier Report
export const getSupplierReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/supplier", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Supplier report:", error);
    throw error;
  }
};

// Product Report
export const getProductReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/product", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Product report:", error);
    throw error;
  }
};

// Center Report
export const getCenterReport = async (params = {}) => {
  try {
    const response = await axios.get("/reports/center", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Center report:", error);
    throw error;
  }
};

// Generic report fetcher - can be used for custom reports
export const getReport = async (reportType, params = {}) => {
  try {
    const response = await axios.get(`/reports/${reportType}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${reportType} report:`, error);
    throw error;
  }
};

// Export report to PDF
export const exportReportToPdf = async (reportType, params = {}) => {
  try {
    const response = await axios.get(`/reports/${reportType}/export/pdf`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error(`Error exporting ${reportType} report to PDF:`, error);
    throw error;
  }
};

// Export report to Excel
export const exportReportToExcel = async (reportType, params = {}) => {
  try {
    const response = await axios.get(`/reports/${reportType}/export/excel`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error(`Error exporting ${reportType} report to Excel:`, error);
    throw error;
  }
};
