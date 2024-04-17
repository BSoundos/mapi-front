import React from 'react';
import { useState } from 'react';
import "../index.css"
import img1 from "../assets/user.png"
import img2 from "../assets/Frame.png"
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const Review:React.FC  = () => {

  return (
    <div className='flex items-center justify-between border-b border-opacity-30 border-[#7E89AC] py-2'>
         <div className='flex items-center justify-between w-[15%]'>
             <img src={img1} />
             <div>
                <p className='text-sm text-white opacity-60'>belhadef  anis</p>
                <p className=' text-white '>Dedicated API</p>
                <p className='text-sm text-white opacity-80'>12 days ago</p>

             </div>
         </div>
         <div>
         <Rating name="read-only"    icon={<StarIcon style={{ color: '#FFFFFF' }}/>} value={2} readOnly />
         </div>
    </div>
  );
}

export default Review;
