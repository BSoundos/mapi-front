// PlanUsers.tsx
import React, { useState } from 'react';
import {useAppDispatch } from '@/app/store';
import SearchInput from '../searchInput';
import { User } from '@/types/user';
import { inviteUser, searchUsers } from '../features/apis_management/privatePlanSlice';
import SearchResultsDropdown from './SearchResultsDropDown';

const PlanUsers = ({ showModal, setShowModal,selectedPlan }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = async () => {
    const actionResult = await dispatch(searchUsers(searchTerm));
    if (searchUsers.fulfilled.match(actionResult)) {
      setSearchResults(actionResult.payload);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchTerm(user.username); 
  };
  const handleInvite=()=>{
    dispatch(inviteUser({id:selectedPlan?.id,data:{selected_user_id:selectedUser?.id}}))
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/3 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">
              Invite user
            </h2>
            <div className="flex flex-col gap-2 relative">
            <div className="w-full border-[#404040] border rounded hover:outline-none focus:outline-none relative">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                placeholder="Search for user by username or email"
              />
            </div>
            {searchResults.length > 0 && (
                <SearchResultsDropdown
                  searchResults={searchResults}
                  onUserSelect={handleUserSelect}
                />
              )}
              </div>
            <div className="flex gap-2 justify-end mt-12 ">
              <button
                className="text-base py-2 px-4 text-white"
                onClick={() => {setShowModal(false);setSearchTerm("")}}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className={`bg-primary-dark border border-[#616161] font-bold text-base py-2 px-12 rounded-md text-white ${
                  selectedUser ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!selectedUser}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanUsers;