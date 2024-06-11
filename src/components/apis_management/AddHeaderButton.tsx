import React from 'react';

interface AddHeaderButtonProps {
  onClick: () => void;
}

const AddHeaderButton: React.FC<AddHeaderButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
    >
      Add Header
    </button>
  );
};

export default AddHeaderButton;