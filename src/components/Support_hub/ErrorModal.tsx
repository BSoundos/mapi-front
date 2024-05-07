import React from 'react';

interface ErrorModalProps {
  isOpen: boolean; // Whether the modal is open
  title: string; // Title of the modal
  message: string; // The error message
  onClose: () => void; // Callback for closing the modal
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
}) => {
  if (!isOpen) {
    return null; // Do not render if the modal is not open
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"> 
      <div className="bg-mapi-neutral-1 p-6 rounded-md w-1/2 shadow-lg"> 
        <h2 className="text-lg font-semibold text-white pb-2 border-b border-gray-600">{title}</h2> 
        <p className="text-white mt-4 mb-8">{message}</p> 

        <div className="flex justify-end">
          <button
            className="bg-mapi-neutral-1 text-white rounded-md px-4 py-2 hover:text-gray-400" 
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
