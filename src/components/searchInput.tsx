import React, { useState, useEffect } from 'react';

const SearchInput = ({ searchTerm, setSearchTerm, handleSearch, placeholder }) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const delayDebouncedSearch = setTimeout(() => {
      if (debouncedTerm) {
        handleSearch();
      }
    }, 300); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(delayDebouncedSearch);
  }, [debouncedTerm, handleSearch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    setDebouncedTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className="text-white w-full rounded-md px-2 py-1.5 placeholder-[#757575] bg-mapi-neutral-1 hover:outline-none focus:outline-none hover:border-none focus:border-none"
    />
  );
};

export default SearchInput;