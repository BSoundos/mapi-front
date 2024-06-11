import React, { useEffect, useRef, useState } from 'react';

const SearchResultDropdown = ({ searchResults, onFunctionalitySelect }) => {
  const [visible, setVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (result) => {
    onFunctionalitySelect(result);
    setVisible(false);
  };

  return visible ? (
    <div
      ref={dropdownRef}
      className="absolute z-50 top-full left-0 right-0 max-h-20 overflow-y-auto bg-primary-dark rounded-md scrollbar-thin scrollbar-thumb-rounded-full text-mapi-text scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]"
    >
      {searchResults.map((result) => (
        <div
          key={result.functionality_id}
          className="p-2 cursor-pointer hover:bg-gray-200 hover:text-primary-dark"
          onClick={() => handleSelect(result)}
        >
          {result.name}
        </div>
      ))}
    </div>
  ) : null;
};

export default SearchResultDropdown;
