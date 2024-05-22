import SideBarPro from "@/components/apis_management/SideBarPro";
import NavBarRe from "@/components/NavBarRe";
import search from '@/assets/search.png';
import ApiEnd from '@/components/ApiEnd'
import PaginationR from "@/components/PaginationR";
import React, { useState,useEffect } from 'react'

const PerformanceTrack = () => {
    const totalReviews = 20; // le nombre max d' APIs
    const reviewsPerPage = 7; // le nmb  d'APIs par page 

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = Math.min(startIndex + reviewsPerPage, totalReviews);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    //cette function pour afficher les APIS
    const renderReviews = () => {
        const resultReviews = [];
        for (let i = startIndex; i < endIndex; i++) {
            //si juste une simulaion pour gerer le poucentage et la couleur 
            const isEven = i % 2 === 0;
            const color = isEven ? 'green' : 'red';
            const pourcentage = isEven ? '100%' : '0%';
          
            resultReviews.push(
              <a href="/PerformanceTracking/1"><ApiEnd color={color} pourcentage={pourcentage} key={i} /></a>
            );
          }
        return resultReviews;

    };
    return ( 
        <div>
      
        <div className="bg-[#0B1739]    flex">
              {/* c la place de SideBar */}
              <SideBarPro/>
              <div className=" flex-1   border-l border-opacity-30 border-[#7E89AC] ">
                  <NavBarRe/>
                  <div className="px-10  ">    
                  <div className="pl-20 ">                  
                       <h1 className="text-white font-bold text-3xl">Performance Tracking</h1>
                       <p className="text-[#BFBFBF] opacity-[85%]">Keep track of all your APIs here</p>
                       <div className=" flex mt-6">
                           <div className="w-[70%]">
                                <div className="flex justify-end ">
                                        <div className="flex items-center bg-[#081028] border border-opacity-30 border-[#7E89AC] w-[40%] rounded p-2 mr-4">
                                                <div className="mx-2 cursor-pointer">
                                                    <img src={search} height="24" width="24" />
                                                </div>
                                                <input type="text"    placeholder="Search for APIs" className="flex-grow bg-[#081028] text-[#FFFFFF] text-sm focus:outline-none" />
                                        </div>
                                        <select className="py-1 px-3 bg-[#081028] border border-opacity-30 border-[#7E89AC] text-white focus:outline-none rounded " >
                                                <option value="newest">Newest</option>         
                                        </select>
                                        <select className="py-1 px-3 bg-[#081028] border border-opacity-30 border-[#7E89AC] text-white focus:outline-none rounded ml-4" >
                                                <option value="all">All</option>
                                               <option value="Paused only">Paused only</option>
                                               <option value="Down only">Down only</option>
                                               <option value="Up only">Up only</option>

                                        </select>       
                                </div>
                                <div className="mt-4 ">
                                    {renderReviews()}
                                    <div className="mt-4">
                                    <PaginationR
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(totalReviews/ reviewsPerPage)}
                                        onPageChange={handlePageChange}
                                    />
                                     </div>
                                </div>
                           </div>
                           <div className="ml-10 w-[40%] ">
                                 <div className="mb-4 border border-opacity-30 border-[#7E89AC] rounded-xl w-[65%] pb-10 flex flex-col justify-center items-center">
                                      <p className="font-bold text-white text-xl my-4">Current status.</p>
                                      <div className="w-10 h-10 rounded-full bg-[#3BD671] font-bold flex flex-col justify-center items-center shadow " style={{ boxShadow: '0px 0px 16px 0px rgba(59, 214, 113, 0.5)' }}>UP</div>
                                      <div className="flex justify-between w-[80%] pl-6 pt-2 pb-4 ">
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-white font-bold">0</p>
                                            <p className="text-[#7E89AC]">Down</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-white font-bold">5</p>
                                            <p className="text-[#7E89AC]">up</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-white font-bold">1</p>
                                            <p className="text-[#7E89AC]">paused</p>
                                        </div>
                                      </div>
                                 </div>
                                 <div className="border border-opacity-30 border-[#7E89AC] rounded-xl w-[65%] pb-10 p-4">
                                      <div className="flex justify-between pb-4">
                                           <p className="text-white font-bold text-2xl">Last 24 hours.</p>
                                      </div>
                                      <div className="flex justify-between mb-4 ">
                                          <div >
                                             <p className="text-[#DF484A] font-bold text-2xl">25.023%</p>
                                             <p className="text-[#7E89AC] text-lg">Overall uptime</p>
                                           </div>
                                           <div>
                                             <p className="text-white font-bold text-2xl">1</p>
                                             <p  className="text-[#7E89AC] text-lg">Incidents</p>
                                           </div>
                                      </div>
                                      <div className="flex justify-between">
                                          <div >
                                             <p className="text-white font-bold text-2xl">5 hours</p>
                                             <p className="text-[#7E89AC] text-lg">Overall uptime</p>
                                           </div>
                                           <div>
                                             <p className="text-white font-bold text-2xl">1</p>
                                             <p  className="text-[#7E89AC] text-lg">Incidents</p>
                                           </div>
                                      </div>
                                 </div>
                           </div>
                       </div>
                  </div>
                  </div>
              </div>
          </div>
        </div>
    )  
}

export default PerformanceTrack;
