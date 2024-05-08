import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '@/components/features/apis/ReviewSlice';
import { RootState, useAppDispatch } from '@/app/store';

interface AddReviewProps {
  apiId: number; 
  onClose: () => void; 
  isOpen: boolean; 
}


const AddReviewModal: React.FC<AddReviewProps> = ({ apiId, onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); 
  const status = useSelector((state: RootState) => state.review.loading);
  const error = useSelector((state: RootState) => state.review.error);

  const handleSubmit = () => {
    if (comment === '' || rating === 0) {
      console.error('Content or rating is missing');
      return;
    }
    dispatch(addReview({ apiId, comment, rating })).then(() => {
      setComment('');
      setRating(0); 
      onClose(); 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="text-gray-900 text-xl font-semibold pb-2 border-b border-gray-400">Add Review</div>
        <div className="flex flex-col mt-6">
          <label className="text-gray-800 font-semibold mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 h-32"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-gray-800 font-semibold mb-2">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="text-gray-800 font-semibold px-4 py-2 mr-2"
            onClick={onClose} 
          >
            Cancel
          </button>
          <button
            className="text-white font-semibold bg-[#141943] px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>} 
      </div>
    </div>
  );
};

export default AddReviewModal;