import React from "react";

function DeleteConfirmModal({ onClose, onConfirm, cvvInput, setCvvInput }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold text-center">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please enter CVV to confirm deletion of this card.
        </p>
        <input
          type="password"
          value={cvvInput}
          onChange={(e) => setCvvInput(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter CVV"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
