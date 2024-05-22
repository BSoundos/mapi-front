import SideBarPro from "@/components/apis_management/SideBarPro";
import NavBarRe from "@/components/NavBarRe";
import pause from '@/assets/pause.png'
import edit from '@/assets/edit.png'
import Informations from "@/components/Informations";
import PerformanceChart from "@/components/PerformanceChart";
import pause2 from '@/assets/pause2.png'
import React, { useState } from 'react';

const PerformanceTrack2 = () => {
    const [Pause,SetPause] = useState(true)
    
    const changePause = () =>{
        if (Pause) {
            SetPause(false)
        }else{
            SetPause(true)
        }
    }
    return (
        <div className="bg-[#0B1739] flex">
            <SideBarPro />
            <div className="flex-1  border-l border-opacity-30 border-[#7E89AC] h-screen overflow-y-scroll">
                <NavBarRe />
                <div className="px-10 pb-20">
                    <div className="pl-20 mb-10">
                        <h1 className="text-white font-bold text-3xl">Performance Tracking</h1>
                        <p className="text-[#BFBFBF] opacity-[85%]">Keep track of all your APIs here</p>
                    </div>
                    <nav className=" py-3">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <a href="/PerformanceTracking" className="flex items-center text-[#99BDE6] underline text-sm font-medium hover:text-gray-300">
                            <svg className="flex-shrink-0 h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                            </svg>
                            Back to all pages
                            </a>
                        </div>
                    </nav>
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center">
                            <div className="w-10 h-10 mr-2 rounded-full bg-[#3BD671] font-bold flex flex-col justify-center items-center shadow" style={{ boxShadow: '0px 0px 16px 0px rgba(59, 214, 113, 0.5)' }}>UP</div>
                            <div>
                                <p className="text-white font-bold">https://rapidapi.com/studio/api_f3dca8dd-8e19-422d-9476-317b9ba5a6b1/</p>
                                <div className="flex text-xs">
                                    <p className="text-[#7E89AC] mr-2">HTTP(S) monitor for</p>
                                    <p className="text-[#3BD671] underline">https://rapidapi.com/studio/api_f3dca8dd-8e19-422d-9476-317b9ba5a6b1/testing/dashboard/api/_/performance</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <button onClick={changePause} className="flex items-center  py-1 px-3 bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] rounded ml-4">
                               { Pause && <img  src={pause} alt="Pause" />}
                               { !Pause && <img  className="w-3 mr-1"  src={pause2} alt="Pause" />}
                                <p className="">Pause</p>
                            </button>
                            <button className="flex items-center py-1 px-3 bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] rounded ml-4">
                                <img src={edit} alt="Edit" />
                                <p>Edit</p>
                            </button>
                        </div>
                    </div>
                    <Informations />
                    <div className="mt-4 border border-[#7E89AC] border-opacity-30  "> {/* Hauteur et largeur définies */}
                        <PerformanceChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceTrack2;
