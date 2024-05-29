import React from 'react';
import "@/styles/index.css"
import Upload from './upload';


const ApiEnd = ({color,pourcentage}) => {

  return (
    <div className='flex items-center justify-between bg-[#081028] border border-opacity-30 border-[#7E89AC] py-2 px-4 rounded'>
      <div className='flex items-center gap-6 w-[60%]'>
      <div className="w-5 h-5 rounded-full " style={{ backgroundColor: color }}></div>
        <div>
          <p className='text-sm text-[#E6EAEB]'>Sample API Name / Endpoint</p>
          <p className=' text-white opacity-60 '>Paused</p>
        </div>
      </div>
      <div>
        <Upload color={color} pourcentage={pourcentage}/>
      </div>
    </div>
  );
}

export default ApiEnd;
