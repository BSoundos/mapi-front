import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteAccessKey, disableAccessKey, enableAccessKey } from './features/subscriptions/Accesskeysmanagement';
import store from '@/app/store';
import { fetchSubscriptions } from './features/subscriptions/SubscriptionsListSlice';
export type AppDispatch = typeof store.dispatch

const Popup = ({ keyInfo, onClose }) => {
    const accessKeyId = parseInt(keyInfo.access_key_id);
    const dispatch = useDispatch<AppDispatch>();
  
    const handlePauseKey = async () => {
      dispatch(disableAccessKey(accessKeyId));
      await dispatch(fetchSubscriptions());
    };
  
    const handleActivateKey = async () => {
      dispatch(enableAccessKey(accessKeyId));
      await dispatch(fetchSubscriptions());
    };
  
    const handleDeleteKey = async () => {
      dispatch(deleteAccessKey(accessKeyId));
      await dispatch(fetchSubscriptions());
      window.location.reload(); 

    };
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-90 z-50">
        <div className="bg-mapi-neutral-2 border-2 border-mapi-neutral-3 p-8 rounded-lg shadow-md">
          <h2 className=" font-semibold text-base text-left text-plus-jakarta-sans text-mapi-neutral-5 mb-1">API Key</h2>
          <hr className="border-mapi-neutral-3 mb-9" />
          <p className="text-xl mb-6 text-left text-plus-jakarta-sans text-mapi-neutral-5">
            Key value: 
            <span className="text-sm ml-7 text-plus-jakarta-sans text-mapi-neutral-5">{keyInfo.access_key}</span>
            <button
              className="text-sm ml-7 underline cursor-pointer text-plus-jakarta-sans text-mapi-neutral-5"
              onClick={() => {
                navigator.clipboard.writeText(keyInfo.access_key);
                alert("Access key copied to clipboard!");
              }}
            >
              Copy
            </button>
          </p>
          <p className="text-xl mb-12 text-left text-plus-jakarta-sans text-mapi-neutral-5">
            Status: 
            <span className="inline-block ">
              {keyInfo.status === 1 ? (
                <div className="ml-16 text-base">
                  <span className="inline-block px-4 py-0.25 border border-customGreen text-customTextGreen bg-customBackground text-plus-jakarta-sans text-mapi-neutral-5">Active</span>
                  <button
                    className="text-sm ml-7 underline cursor-pointer"
                    onClick={handlePauseKey}
                  >
                    Pause key
                  </button>
                  <button
                    className="text-sm ml-7 underline cursor-pointer text-customTextRed text-plus-jakarta-sans "
                    onClick={handleDeleteKey}
                  >
                    Delete key
                  </button>
                </div>
              ) : (
                <div className="ml-16 text-base">
                  <span className="inline-block px-4 py-0.25 border border-customRed  bg-customBackground text-plus-jakarta-sans text-mapi-neutral-5">Paused</span>
                  <button
                    className="text-sm ml-7 underline cursor-pointer text-plus-jakarta-sans text-mapi-neutral-5"
                    onClick={handleActivateKey}
                  >
                    Activate key
                  </button>
                  <button
                    className="text-sm ml-7 underline cursor-pointer text-plus-jakarta-sans "
                    onClick={handleDeleteKey}
                  >
                    Delete key
                  </button>
                </div>
              )}
            </span>
          </p>
          {}
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="px-12 py-2 bg-primary-dark text-plus-jakarta-sans text-mapi-neutral-5 rounded-md mr-2 cursor-pointer">Close</button>
            {}
          </div>
        </div>
      </div>
    );
  };
  
  export default Popup;
  