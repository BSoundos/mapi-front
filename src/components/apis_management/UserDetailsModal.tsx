import React from 'react';
import { FaUserSlash, FaUserCheck, FaHourglassHalf } from 'react-icons/fa';

const UserDetailsModal = ({ userInfo, onClose, onBlock, onUnBlock, onDelete }) => {
  const isBlocked = userInfo?.status === 'blocked';
  const isWaiting = userInfo?.status === 'waiting';
  const isConfirmed = userInfo?.status === 'confirmed';


  
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-[35%] ">
        <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">
          Invite user
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className=" text-mapi-text">Username:</span>
            <span className=" text-mapi-text">{userInfo.username}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="text-mapi-text">Status:</span>
            <div className="flex items-center mt-1.5">
              {isBlocked ? (
                <>
                  <span className="inline-block px-4 py-1 bg-customRed text-white rounded mr-3 ">
                    <FaUserSlash className="inline-block mr-1" /> Blocked
                  </span>
                  <button
                    className="text-sm ml-4 underline cursor-pointer text-mapi-text"
                    onClick={onUnBlock}
                  >
                    Unblock user
                  </button>
                </>
              ) : isWaiting ? (
                <>
                <span className="inline-block px-4 py-1 bg-yellow-500 text-white rounded mr-3">
                  <FaHourglassHalf className="inline-block mr-1" /> Waiting
                </span>
                <button
                    className="text-sm ml-4 underline cursor-pointer text-mapi-neutral-5"
                    onClick={onBlock}
                  >
                    Block user
                  </button>
              </>
              ) : isConfirmed ? (
                <>
                <span className="inline-block px-4 py-1 bg-customGreen text-white rounded mr-3 ">
                  <FaUserCheck className="inline-block mr-1" /> Confirmed
                </span>
                <button
                    className="text-sm ml-4 underline cursor-pointer text-mapi-neutral-5"
                    onClick={onBlock}
                  >
                    Block user
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-sm ml-4 underline cursor-pointer text-mapi-neutral-5"
                    onClick={onBlock}
                  >
                    Block user
                  </button>
                </>
              )}
              <button
                className="text-sm ml-4 underline cursor-pointer text-customTextRed "
                onClick={()=>{onDelete(),onClose()}}
              >
                Delete user
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end ">
          <button
            onClick={onClose}
            className="px-12 py-2 bg-primary-dark text-mapi-text rounded-md mr-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;