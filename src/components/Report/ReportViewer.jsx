import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { exportReportToPdf, exportReportToExcel } from "../../services/Report/reportService";

// Mobile Card Component for responsive display
const MobileCard = ({ row, columns, isExpanded, onToggle }) => {
  // Show first 3 columns always, rest on expand
  const primaryColumns = columns.slice(0, 3);
  const secondaryColumns = columns.slice(3);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {/* Primary Info */}
      <div className="space-y-2">
        {primaryColumns.map((col) => (
          <div key={col.key} className="flex justify-between items-start gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {col.label}
            </span>
            <span className="text-sm text-gray-900 text-right font-medium">
              {col.render ? col.render(row[col.key], row) : row[col.key] ?? "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Expandable Secondary Info */}
      {secondaryColumns.length > 0 && (
        <>
          <button
            onClick={onToggle}
            className="w-full mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show {secondaryColumns.length} more fields
              </>
            )}
          </button>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              {secondaryColumns.map((col) => (
                <div key={col.key} className="flex justify-between items-start gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {col.label}
                  </span>
                  <span className="text-sm text-gray-900 text-right">
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ReportViewer = ({
  title,
  reportType,
  columns,
  fetchData,
  filterOptions = [],
  showDateRange = true,
  showSearch = true,
  pageSize = 10,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  // Toggle card expansion
  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Fetch report data
  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...filters,
        ...(dateRange.startDate && { startDate: dateRange.startDate }),
        ...(dateRange.endDate && { endDate: dateRange.endDate }),
        ...(searchTerm && { search: searchTerm }),
      };
      const result = await fetchData(params);
      setData(result?.data || result || []);
    } catch (err) {
      setError(err.message || "Failed to fetch report data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchData, filters, dateRange.startDate, dateRange.endDate, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((item) =>
        columns.some((col) => {
          const value = item[col.key];
          return value && String(value).toLowerCase().includes(searchLower);
        })
      );
    }

    return result;
  }, [data, searchTerm, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle date range change
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    loadData();
    setShowFilters(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    setDateRange({ startDate: "", endDate: "" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Export handlers
  const handleExportPdf = async () => {
    setExporting(true);
    try {
      const blob = await exportReportToPdf(reportType, {
        ...filters,
        ...dateRange,
        search: searchTerm,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportType}-report.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const blob = await exportReportToExcel(reportType, {
        ...filters,
        ...dateRange,
        search: searchTerm,
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${reportType}-report.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
        {/* Title Row */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-red-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">{title}</h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {filteredData.length} records found
                </p>
              </div>
            </div>
            
            {/* Mobile: Refresh only */}
            <button
              onClick={loadData}
              disabled={loading}
              className="lg:hidden p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Refresh Button - Desktop */}
            <button
              onClick={loadData}
              disabled={loading}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
                showFilters
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {Object.keys(filters).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {Object.keys(filters).filter(k => filters[k]).length}
                </span>
              )}
            </button>

            {/* Export Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleExportPdf}
                disabled={exporting || loading}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden xs:inline sm:inline">PDF</span>
              </button>
              <button
                onClick={handleExportExcel}
                disabled={exporting || loading}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg sm:rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4" />
                )}
                <span className="hidden xs:inline sm:inline">Excel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search in report..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Date Range */}
              {showDateRange && (
                <>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) =>
                          handleDateChange("startDate", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) =>
                          handleDateChange("endDate", e.target.value)
                        }
                        className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Dynamic Filter Options */}
              {filterOptions.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {filter.label}
                  </label>
                  {filter.type === "select" ? (
                    <select
                      value={filters[filter.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.key, e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">All</option>
                      {filter.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={filter.type || "text"}
                      value={filters[filter.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(filter.key, e.target.value)
                      }
                      placeholder={filter.placeholder}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors order-1 sm:order-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {loading ? (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-red-500" />
            <span className="ml-3 text-sm sm:text-base text-gray-600">Loading report data...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-red-500">
            <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 mb-3" />
            <p className="text-base sm:text-lg font-medium text-center">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-gray-500">
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 mb-3 opacity-50" />
            <p className="text-base sm:text-lg font-medium">No data found</p>
            <p className="text-xs sm:text-sm text-center">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="lg:hidden p-3 sm:p-4 space-y-3">
              {paginatedData.map((row, rowIndex) => (
                <MobileCard
                  key={row.id || rowIndex}
                  row={row}
                  columns={columns}
                  isExpanded={expandedCards[row.id || rowIndex]}
                  onToggle={() => toggleCardExpansion(row.id || rowIndex)}
                />
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs xl:text-sm font-semibold uppercase tracking-wider whitespace-nowrap"
                        style={{ minWidth: col.minWidth || "auto" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((row, rowIndex) => (
                    <tr
                      key={row.id || rowIndex}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm text-gray-700"
                        >
                          {col.render
                            ? col.render(row[col.key], row)
                            : row[col.key] ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
                  {filteredData.length} entries
                </p>
                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? "bg-red-500 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportViewer;
