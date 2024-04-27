import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { postDiscussion, selectAddDiscussionError, selectAddDiscussionStatus } from '@/components/features/discussions/addDiscussionSlice';

interface AddDiscussionProps {
  apiId: number | undefined;
  onClose: () => void;
  isOpen: boolean;
}

export type AppDispatch = typeof store.dispatch


const AddDiscussionModal = ({ apiId, onClose, isOpen }: AddDiscussionProps) => {
  const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Explicitly cast the error state to string | null
    const error: string | null = useSelector(selectAddDiscussionError);

    const status = useSelector(selectAddDiscussionStatus);

  const handleSubmit = () => {
    if (apiId === undefined) {
        console.log("We have a problem in the apiId")
    } else {
        dispatch(postDiscussion({ apiId, title, content }));
      }  };
    
    if (!isOpen) return null;


  return (
    
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="bg-[#081028] p-8">
          <div className="text-white text-xl pb-2 font-semibold border-b border-[#404040]">Add Discussion</div>
          <div className="flex items-center justify-between pt-10">
            <p className="text-[#BFBFBF] font-semibold pr-10">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#081028] text-white border border-[#404040] w-96 rounded-md p-2"
            />
          </div>
          <div className="flex items-center justify-between pt-10">
            <p className="text-[#BFBFBF] font-semibold pr-10">Content</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-[#081028] text-white border border-[#404040] w-96 h-40 rounded-md p-2"
            />
          </div>
          <div className="flex items-center justify-end pt-10">
            <button className="text-white pr-4" onClick={onClose}>
              Cancel
            </button>
            <button
              className="text-white text-semibold bg-[#141943] border border-[#404040] px-6 py-1 rounded-md"
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding...' : 'Add Discussion'}
            </button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddDiscussionModal;
