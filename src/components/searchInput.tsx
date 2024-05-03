import React from 'react';

const SearchInput = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setSearchTerm('');
    }
  };

  return (
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for username or ticket"
        className="text-white w-full rounded-[7px] px-2 py-1 placeholder-[#757575] bg-mapi-neutral-1"
      />
  );
};

export default SearchInput;
