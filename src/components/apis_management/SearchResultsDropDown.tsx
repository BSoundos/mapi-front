// SearchResultsDropdown.tsx
import React, { useRef, useEffect } from 'react';
import { User } from '@/types/user';
import UserListItem from './UserListItem';

interface SearchResultsDropdownProps {
  searchResults: User[];
  onUserSelect: (user: User) => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  searchResults,
  onUserSelect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 top-full left-0 right-0 max-h-20 overflow-y-auto bg-primary-dark rounded-md  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]"
    >
      {searchResults.map((user) => (
        <UserListItem key={user.id} user={user} onUserSelect={onUserSelect} />
      ))}
    </div>
  );
};

export default SearchResultsDropdown;