import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
      {message}
    </div>
  );
};

export default ErrorMessage;
