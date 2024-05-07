import React from 'react';
import { Choice } from '@/types/choices';

interface CustomSelectProps {
  options: Choice[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultFirstOption: string; // Text for the first option
  className?: string; // Additional Tailwind classes for styling
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  defaultFirstOption,
  className = '',
}) => {
  return (
    <select
      className={`bg-mapi-neutral-1 rounded-md px-5 py-2 hover:border hover:border-mapi-secondary-3 focus:outline-none focus:border-mapi-secondary-3 ${className}`}
      onChange={onChange}
    >
      <option value="">{defaultFirstOption}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
