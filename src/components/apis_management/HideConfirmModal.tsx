import React from 'react'

export default function HideConfirmModal({ show, onConfirm }) {
  return (
    <>
      {show ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-2/5">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">Hide Subscription Plan</h2>
            <p className="text-sm text-mapi-text  mb-5">
              Hidden plans won't be visible on the Hub by end-users. Existing users will keep their subscription to this plan, but new users won't be allowed to subscribe.
            </p>           
           <div className="flex gap-2 flex-1 justify-end w-full">
            <button onClick={() => onConfirm(false)} className="text-base py-2 px-4 text-white">
             Cancel
           </button>
            <button onClick={() => onConfirm(true)} className="text-base py-2 px-4 text-white bg-red-600 rounded-md">
             Hide
           </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
