import React from 'react';

interface ConfirmationModalProps {
  title:string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null; // Don't render if the modal is not open
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-mapi-neutral-1 p-6 rounded-md w-1/2 shadow-lg"> 
        <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-600">{title}</h2>

        <p className="text-white mt-4 mb-8">{message}</p> {/* Displaying the confirmation message */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-base py-2 px-4 text-white hover:text-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-500 border font-bold text-base py-2 px-16 rounded-md text-white hover:bg-red-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
