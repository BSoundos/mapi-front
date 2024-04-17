import React from 'react';
import { useState } from 'react';
import "../index.css"
import img1 from "../assets/user.png"
import img2 from "../assets/Frame.png"
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
const AjouterReview:React.FC<ModalProps>  = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [value, setValue] = useState<number | null>(0); 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
            <div className='bg-[#081028] p-8'>
                <div className='text-white text-xl pb-2 font-semibold border-b border-[#404040] '>Add Review</div>
                <div className='flex items-center justify-between pt-10'>
                    <p className='text-[#BFBFBF] font-semibold text-xs'>Rating</p>
                        <Rating
                        name="simple-controlled"
                        value={value}
                        icon={<StarIcon style={{ color: '#FFFFFF' }}/>}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        />
                </div>
                <div className='flex items-center justify-between  pt-10'>
                    <p className='text-[#BFBFBF] font-semibold pr-10'>Review</p>
                    <textarea
                        // value=""
                        // onChange=
                        // rows={4} 
                        // cols={50}
                        
                        className=' bg-[#081028] text-white border border-[#404040]  w-96 h-30  rounded-md p-2' 
                        placeholder="Write your review here..."
                    />
                </div>
                <div className='flex items-center justify-end pt-10'>
                    <button className='text-white pr-4' onClick={onClose}>Cancel</button>
                    <button className='text-white text-semibold bg-[#141943] border border-[#404040] px-6 py-1 rounded-md'>Post Review</button>

                </div>
            </div>
        </div>
    </div>
  );
}

export default AjouterReview;
