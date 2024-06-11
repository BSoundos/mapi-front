import React from 'react';

interface HeaderInputProps {
  header: { name: string, value: string };
  index: number;
  onChange: (index: number, updatedHeader: { name: string, value: string }) => void;
}

const HeaderInput: React.FC<HeaderInputProps> = ({ header, index, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'name' | 'value') => {
    const updatedHeader = { ...header, [field]: event.target.value };
    onChange(index, updatedHeader);
  };

  return (
    <div key={index} className="flex gap-6 items-center pl-[116px]">
      <input
        type="text"
        placeholder="Name"
        value={header.name}
        onChange={(e) => handleChange(e, 'name')}
        className="add-plan w-30"
      />
      <input
        type="text"
        placeholder="Value"
        value={header.value}
        onChange={(e) => handleChange(e, 'value')}
        className="add-plan w-30"
      />
    </div>
  );
};

export default HeaderInput;