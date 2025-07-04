// Error message component

import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
      <div className="text-red-400 mb-2">⚠️ Error</div>
      <p className="text-gray-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;