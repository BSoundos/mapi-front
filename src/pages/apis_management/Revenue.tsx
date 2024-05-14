
import MyChart from "@/components/MyChart";
import SideBarPro from "@/components/apis_management/SideBarPro";
import NavBarRe from "@/components/NavBarRe";

import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {  fetchEarningsStatistics } from '@/components/features/apis_management/statisticsSlice';
import { useAppDispatch,RootState } from '@/app/store'; 

const Revenue = () => {

    const dispatch = useAppDispatch();
   
    const earnings = useSelector((state: RootState) => state.statistics.earnings);
    const loading = useSelector((state: RootState) => state.statistics.loading);
    const error = useSelector((state: RootState) => state.statistics.error);

    useEffect(() => {
        
        dispatch(fetchEarningsStatistics());
        
      }, [dispatch]);




  return (
    <div className="flex">
      <SideBarPro/>
      <div className="bg-mapi-neutral-2  flex-col flex-1">
         <NavBarRe/>
            <div className=" flex-1 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52] border border-[#343B4F] p-4 rounded  border-l border-opacity-30 border-[#7E89AC] w-full">
                <div className="px-10 pb-2 ">                      
                        <h1 className="text-white py-4 text-2xl font-bold">Analytics</h1>
                        <div className="flex justify-between   text-white text-xs mb-4 p-4 border border-opacity-30 border-[#7E89AC]">
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Earnings to date</p>
                                <p>{earnings?.total_earnings_to_date ?? '0'} DA</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Avg. selling price</p>
                                <p>{earnings?.average_selling_price ?? '0'} DA</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Number of purchases</p>
                                <p>{earnings?.total_purchases ?? '0'}</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Successful requests rate</p>
                                <p className="text-[#AAC166]">100%</p>
                            </div>
                            <div className="border-r border-opacity-30 border-[#7E89AC] pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Requests number</p>
                                <p className="">1900</p>
                            </div>
                            <div className=" pr-4 pl-4 flex flex-col justify-center items-center ">
                                <p className="pb-2">Earned this month</p>
                                <p>{earnings?.earnings_this_month ?? '0'} DA</p>
                            </div>

                        </div>
                        <MyChart/>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Revenue;
