import React from "react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const ResponsivePageWrapper = ({ children, className = "" }) => (
  <div className={cx("p-4 sm:p-6 lg:p-8", className)}>{children}</div>
);

export const ResponsiveCard = ({ children, className = "" }) => (
  <div className={cx("bg-white shadow-sm rounded-lg border border-gray-200", className)}>
    {children}
  </div>
);

export const ResponsiveGrid = ({ children, className = "" }) => (
  <div className={cx("grid gap-4", className)}>{children}</div>
);

export const ResponsiveTable = ({ children, className = "" }) => (
  <div className={cx("overflow-x-auto", className)}>
    <table className="min-w-full text-sm text-left text-gray-700">{children}</table>
  </div>
);

export const ResponsiveTableHeader = ({ children, className = "" }) => (
  <thead className={cx("bg-gray-50", className)}>{children}</thead>
);

export const ResponsiveTableHeaderCell = ({ children, className = "" }) => (
  <th className={cx("px-3 py-2 font-semibold text-gray-900", className)}>{children}</th>
);

export const ResponsiveTableBody = ({ children, className = "" }) => (
  <tbody className={cx("divide-y divide-gray-100", className)}>{children}</tbody>
);

export const ResponsiveTableRow = ({ children, className = "" }) => (
  <tr className={cx("hover:bg-gray-50", className)}>{children}</tr>
);

export const ResponsiveTableCell = ({ children, className = "" }) => (
  <td className={cx("px-3 py-2 align-top", className)}>{children}</td>
);

export const ResponsiveButton = ({ children, className = "", ...rest }) => (
  <button
    className={cx(
      "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition",
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export const ResponsiveFormGroup = ({ children, className = "" }) => (
  <div className={cx("space-y-1", className)}>{children}</div>
);

export const ResponsiveSelect = ({ className = "", ...rest }) => (
  <select
    className={cx(
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500",
      className
    )}
    {...rest}
  />
);

export const ResponsiveInput = ({ className = "", ...rest }) => (
  <input
    className={cx(
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500",
      className
    )}
    {...rest}
  />
);

export const ResponsiveTextarea = ({ className = "", ...rest }) => (
  <textarea
    className={cx(
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500",
      className
    )}
    {...rest}
  />
);

export const ResponsiveModal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-[90%] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const ResponsiveLoadingSpinner = ({ label = "Loading..." }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span className="h-4 w-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
    <span>{label}</span>
  </div>
);

export const ResponsiveBadge = ({ children, className = "" }) => (
  <span
    className={cx(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700",
      className
    )}
  >
    {children}
  </span>
);

export const ResponsiveAlert = ({ children, tone = "info", className = "" }) => {
  const tones = {
    info: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200",
  };
  return (
    <div className={cx("border rounded-md px-3 py-2 text-sm", tones[tone] || tones.info, className)}>
      {children}
    </div>
  );
};

export default {
  ResponsivePageWrapper,
  ResponsiveCard,
  ResponsiveGrid,
  ResponsiveTable,
  ResponsiveTableHeader,
  ResponsiveTableHeaderCell,
  ResponsiveTableBody,
  ResponsiveTableRow,
  ResponsiveTableCell,
  ResponsiveButton,
  ResponsiveFormGroup,
  ResponsiveSelect,
  ResponsiveInput,
  ResponsiveTextarea,
  ResponsiveModal,
  ResponsiveLoadingSpinner,
  ResponsiveBadge,
  ResponsiveAlert,
};

