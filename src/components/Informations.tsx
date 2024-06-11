import React from 'react';
import Upload from './upload';
const Informations = () =>{
    return (

        <div>
            <div className='flex justify-between mb-4'>
                <div className='border border-[#7E89AC] border-opacity-30 w-[30%] rounded p-4'>
                      <p className='text-[#E6EAEB] mb-1'>Current status</p>
                      <p className='text-[#3BD671] text-xl font-bold'>Up</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>Currently up for 0h 15m 2s</p>
                </div>
                <div className='border border-[#7E89AC] border-opacity-30 w-[30%] rounded p-4'>
                      <p className='text-[#E6EAEB] mb-1'>Last check</p>
                      <p className='text-white text-xl font-bold'>Coming soon</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>Checked every 5 minutes</p>
                </div>
                <div className='border border-[#7E89AC] border-opacity-30 w-[30%] rounded p-4'>
                      <p className='text-[#E6EAEB] mb-1'>Last 24 hours</p>
                       <Upload color="green" pourcentage="100%"/>
                      <p className='text-[#E6EAEB] text-xs mt-1'>0 incidents, 0m down</p>
                </div>
            </div>
            <div className='flex justify-between border border-[#7E89AC] border-opacity-30'>
                <div className=' w-[30%] rounded p-4 border-r border-[#7E89AC] border-opacity-30' >
                      <p className='text-[#E6EAEB] mb-1'>Last 7 days</p>
                      <p className='text-[#3BD671] text-xl font-bold'>100%</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>0 incidents, 0m down</p>
                </div>
                <div className=' w-[30%] rounded p-4  border-r border-[#7E89AC] border-opacity-30'>
                      <p className='text-[#E6EAEB] mb-1'>Last 30 days</p>
                      <p className='text-[#3BD671] text-xl font-bold'>100%</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>0 incidents, 0m down</p>
                </div>
                <div className=' w-[30%] rounded p-4  border-r border-[#7E89AC] border-opacity-30'>
                      <p className='text-[#E6EAEB] mb-1'>Last 365 days</p>
                      <p className='text-white text-xl font-bold'>--.---%</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>— incidents, — down</p>
                </div>
                <div className=' w-[30%] rounded p-4  border-r border-[#7E89AC] border-opacity-30'>
                <div className="relative inline-block">
                  <input
                  type="date"
                  
                  className=" bg-gray-900 text-white py-2 pl-10 pr-4 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                  </div>
              </div>                   
                      <p className='text-white text-xl font-bold'>--.---%</p>
                      <p className='text-[#E6EAEB] text-xs mt-1'>— incidents, — down</p>
            </div>
            </div>
        </div >

    );
}

export default Informations;