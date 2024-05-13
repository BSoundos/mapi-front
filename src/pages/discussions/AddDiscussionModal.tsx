import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store  from '@/app/store';
import { postDiscussion, selectAddDiscussionError, selectAddDiscussionStatus } from '@/components/features/discussions/addDiscussionSlice';

interface AddDiscussionProps {
  apiId: number | undefined;
  onClose: () => void;
  isOpen: boolean;
}

export type AppDispatch = typeof store.dispatch


const AddDiscussionModal = ({ apiId, onClose, isOpen }: AddDiscussionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const error: string | null = useSelector(selectAddDiscussionError);
  const status = useSelector(selectAddDiscussionStatus);


  //This is for adding a discussion logic
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (apiId === undefined) {
    } else {
        dispatch(postDiscussion({ apiId, title, content })).then(() => {
          // After posting the reply successfully, reload the page
          history.go(0); // Reload the current page
        });
        setContent('');
        setTitle('');
      }  
  };
    
  if (!isOpen) return null;


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="text-gray-900 text-xl font-semibold pb-2 border-b border-gray-400">Add Discussion</div>
        <div className="flex flex-col mt-6">
          <label className="text-gray-800 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-gray-800 font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 h-32"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button className="text-gray-800 font-semibold px-4 py-2 mr-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="text-white font-semibold bg-[#141943] px-6 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Adding...' : 'Add Discussion'}
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default AddDiscussionModal;
