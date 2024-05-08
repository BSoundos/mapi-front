import React from 'react';
import "@/styles/index.css"
import img1 from "@/assets/user.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

// Function to format date with default value handling
const formatDate = (dateString) => {
  if (!dateString) return 'Invalid date';

  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = (timePart.split('.')[0]).split(':');
  
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const Review = ({ content , rating , author , created_at }) => {

  return (
    <div className='flex items-center justify-between border-b border-opacity-[6%] border-[#7E89AC] py-2'>
      <div className='flex items-center gap-6 w-[60%]'>
        <img src={img1} />
        <div>
          <p className='text-sm text-white opacity-60'>{author}</p>
          <p className=' text-white '>{content}</p>
          <p className='text-sm text-white opacity-80'>{formatDate(created_at)}</p>

        </div>
      </div>
      <div>
        <Rating name="read-only" icon={<StarIcon style={{ color: '#FFFFFF' }} />} value={rating} readOnly />
      </div>
    </div>
  );
}

export default Review;
