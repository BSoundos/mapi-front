import { useState } from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  const AddDiscussion = ({ isOpen, onClose }: ModalProps) => {

    if (!isOpen) return null;
    const [value, setValue] = useState<number | null>(0); 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
            <div className='bg-[#081028] p-8'>
                <div className='text-white text-xl pb-2 font-semibold border-b border-[#404040] '>Add Discussion</div>
                <div className='flex items-center justify-between  pt-10'>
                    <p className='text-[#BFBFBF] font-semibold pr-10'>Title</p>
                    <textarea
                        className=' bg-[#081028] text-white border border-[#404040]  w-96 h-10  rounded-md p-2' 
                        
                    />
                </div>
                <div className='flex items-center justify-between  pt-10'>
                    <p className='text-[#BFBFBF] font-semibold pr-10'>Content</p>
                    <textarea
                        // value=""
                        // onChange=
                        // rows={4} 
                        // cols={50}
                        
                        className=' bg-[#081028] text-white border border-[#404040]  w-96 h-40  rounded-md p-2' 
                    />
                </div>
                <div className='flex items-center justify-end pt-10'>
                    <button className='text-white pr-4' onClick={onClose}>Cancel</button>
                    <button className='text-white text-semibold bg-[#141943] border border-[#404040] px-6 py-1 rounded-md'>Post Discussion</button>

                </div>
            </div>
        </div>
    </div>
  );
}

export default AddDiscussion;
