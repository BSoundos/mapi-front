import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import min from '@/assets/min.png'
import max from '@/assets/max.png'
import average from '@/assets/average.png'
const data = [
  { name: 'May 1, \'24', responseTime: 150 },
  { name: 'May 2, \'24', responseTime: 251 },
  { name: 'May 3, \'24', responseTime: 252 },
  { name: 'May 4, \'24', responseTime: 253 },
];

const PerformanceChart = () => {
  return (
    <div className="text-white p-6 rounded-lg">
      <div className='flex justify-between mb-4'>
           <h3 className="text-lg font-semibold mb-4">Response time.</h3>
           <div className="relative  flex items-center">
              <select className="appearance-none bg-gray-900 text-white py-2 pl-8 pr-12 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
              </div>
          </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Line type="monotone" dataKey="responseTime" stroke="#3BD671" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-6">
        <div className="text-center border-r-2 border-[#2D3340] w-[25%]">
          <div className="text-2xl font-bold flex items-center">
            <img src={average} className='mr-1 mt-2'/>
            250 ms</div>
          <div className='text-[#E6EAEB] flex justify-start'>Average</div>
        </div>
        <div className="text-center border-r-2 border-[#2D3340] w-[25%]">
          <div className="text-2xl font-bold flex items-center">
            <img src={min} className='mr-1 mt-2'/>
            247 ms</div>
          <div className='text-[#E6EAEB] flex justify-start'>Minimum</div>
        </div>
        <div className="text-center  w-[25%]">
          <div className="text-2xl font-bold flex items-center">
          <img src={max} className='mr-1 mt-2'/>
            253 ms</div>
          <div className='text-[#E6EAEB] flex justify-start'>Maximum</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
