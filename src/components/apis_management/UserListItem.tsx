import React from 'react';
import { User } from '@/types/user';

interface UserListItemProps {
  user: User;
  onUserSelect: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onUserSelect }) => {
  const handleClick = () => {
    onUserSelect(user);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer py-1 px-4 rounded-md hover:bg-gray-700"
      onClick={handleClick}
    >
      <div className="w-7 h-7 bg-primary-dark rounded-full flex items-center justify-center text-mapi-text text-sm">
        {user.last_name.charAt(0)}
      </div>
      <span className='text-mapi-text text-sm'>{user.username}</span>
    </div>
  );
};

export default UserListItem;