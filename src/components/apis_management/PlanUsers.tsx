// PlanUsers.tsx
import React, { useState } from 'react';
import {RootState, useAppDispatch } from '@/app/store';
import SearchInput from '../searchInput';
import { User } from '@/types/user';
import { blockUserInvitation, deleteUserFromPlan, inviteUser, searchUsers, unBlockUserInvitation } from '@/components/features/apis_management/privatePlanSlice';
import SearchResultsDropdown from './SearchResultsDropDown';
import { useSelector } from 'react-redux';
import UserDetailsModal from './UserDetailsModal';

const PlanUsers = ({ showModal, setShowModal,selectedPlan }) => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserForDetails, setSelectedUserForDetails] = useState<User | null>(null);
    const users = useSelector((state: RootState) => state.privatePlan.users);

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

    const handleInvite = () => {
      dispatch(inviteUser({ id: selectedPlan?.id, data: { selected_user_id: selectedUser?.id } }));
      setShowModal(false);
    };

    const handleSelect = (userId: number) => {
      const selectedUser = users.find((user) => user.user === userId);
      setSelectedUserForDetails(selectedUser || null);
    };

    const onBlock = async () => {
      try {
        const { user_plan, user } = selectedUserForDetails || {};
        await dispatch(blockUserInvitation({ idPlan: user_plan, idUser: user }));
        setSelectedUserForDetails((prevUserInfo) => ({
          ...prevUserInfo,
          status: 'blocked',
        }));
      } catch (error) {
        // Handle error
      }
    };

    const onUnBlock = async () => {
      try {
        const { user_plan, user,received } = selectedUserForDetails || {};
        const response = await dispatch(unBlockUserInvitation({ idPlan: user_plan, idUser: user }));
        const newStatus = received ? 'confirmed' : 'waiting';
        setSelectedUserForDetails((prevUserInfo) => ({
          ...prevUserInfo,
          status: newStatus,
        }));
      } catch (error) {
        // Handle error
      }
    };

    const onDelete = () => {
      const { user_plan,user } = selectedUserForDetails || {};
      dispatch(deleteUserFromPlan({ idPlan: user_plan, idUser: user }));
      setSelectedUserForDetails(null);
    };

  return (
    <>
    {users.length > 0 ? (
        <div className="flex flex-col gap-3 mt-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex  items-center gap-2 cursor-pointer py-1 px-4 rounded-md hover:bg-primary-dark"
              onClick={()=>handleSelect(user.user)}
            >
              <div className="w-7 h-7 bg-primary-dark rounded-full flex items-center justify-center text-mapi-text text-sm">
                {user.last_name.charAt(0)}
              </div>
              <span className="text-mapi-text text-sm">{user.username}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="text-mapi-text">No User Found For this Plan</div>
        </div>
      )}
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
      {selectedUserForDetails && (
      <UserDetailsModal
        userInfo={selectedUserForDetails}
        onClose={() => setSelectedUserForDetails(null)}
        onBlock={onBlock}
        onUnBlock={onUnBlock}
        onDelete={onDelete}
      />
      )}
    </>
  );
};

export default PlanUsers;