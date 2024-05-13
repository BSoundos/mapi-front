import React from 'react';
import "@/styles/index.css"
import img1 from "@/assets/user.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

// Function to format date with default value handling
const formatDate = (discussionDate: string) => {
  const currentDate = new Date();
  const discussionDateObj = new Date(discussionDate);

  // Set time components to midnight to compare date parts only
  currentDate.setHours(0, 0, 0, 0);
  discussionDateObj.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const differenceInMs = currentDate.getTime() - discussionDateObj.getTime();
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return 'today';
  } else if (differenceInDays === 1) {
    return 'yesterday';
  } else if (differenceInDays > 365) {
    const differenceInYears = Math.floor(differenceInDays / 365);
    return `${differenceInYears} year${differenceInYears > 1 ? 's' : ''} ago`;
  } else {
    return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
  }
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
