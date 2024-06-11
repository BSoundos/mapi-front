import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import SideBarPro from '@/components/apis_management/SideBarPro';
import { APIEarning, fetchAPIEarning, fetchProviderInfo, fetchPublishedApis, fetchSubscribedUsers, fetchTotalEarnings, fetchTotalEarningsPerMonth, fetchUserSubscription } from '@/components/features/apis_management/dashboardProviderSlice';
import APIEarningCard from '@/components/APIEarningCard';
import PaginationR from '@/components/PaginationR';
import UserSubscriptionChart from '@/components/UserSubscriptionChart';

export type AppDispatch = typeof store.dispatch

const DashboardProvider: React.FC = () => {


    
    
    const provider_id = localStorage.getItem('user_id');
    console.log(provider_id)
    
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const providerPk = parseInt(provider_id, 10);

        dispatch(fetchProviderInfo(providerPk));
        dispatch(fetchSubscribedUsers(providerPk));
        dispatch(fetchPublishedApis(providerPk));
        dispatch(fetchTotalEarningsPerMonth(providerPk));
        dispatch(fetchTotalEarnings(providerPk));
        dispatch(fetchAPIEarning(providerPk));
        dispatch(fetchUserSubscription(providerPk));
        
    }, [dispatch, provider_id]);



    const { provider, subscribedUsers, publishedApis, totalEarningsPerMonth, totalEarnings,  apiEarning, userSubscription, loading, error } = useSelector((state: RootState) => state.providerActivity);
    
    

    //for pagination:
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = apiEarning.slice(startIndex, endIndex);
    const totalPages = Math.ceil(apiEarning.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



    //for the filter and search:
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const uniqueCategories = Array.from(new Set(apiEarning.map(earning => earning.category)));


    const filteredData = apiEarning.filter((earning) => {
        const nameMatch = earning.name.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = filterCategory ? earning.category === filterCategory : true;
    
        return nameMatch && categoryMatch;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if there was an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if provider data is available
    if (!provider) {
        return <div>No provider data available</div>;
    }


    return (
        <div className='flex'>
            <SideBarPro/>
            <div className="flex flex-col px-10 bg-primary-darker w-full py-10 text-mapi-text">
                <h1 className="text-3xl font-semibold text-white mb-0 mr-10">Provider Activity</h1>
                <h4 className="text-base font-light text-white mb-0 mr-10">of <span className="text-base font-semibold text-mapi-secondary-3 underline mb-0 mr-10">{provider.first_name} {provider.last_name}</span></h4>
                {/*for the 1st section of statistics */}
                <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 ">
                    <div className="grid grid-cols-5 gap-4">
                        <div className='text-center'>
                            <h3 className="text-xs text-[#DCDCDC] font-semibold mb-3 text-center pt-5">Profile Name</h3>
                            <p className="text-3xl font-semibold text-mapi-secondary-3 text-center mb-3">{provider.first_name} {provider.last_name} </p>
                            <Link to={`/providerProfileSettings`} className=" text-[#99BDE6] underline text-center">
                                View Profile
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xs  text-[#DCDCDC] font-semibold mb-3 text-center pt-5">Number of subscribed users</h3>
                            <p className="text-3xl font-light text-center">{subscribedUsers}</p>
                        </div>
                        <div>
                            <h3 className="text-xs text-[#DCDCDC] font-semibold mb-3 text-center pt-5">APIs published</h3>
                            <p className="text-3xl font-light text-center">{publishedApis}</p>
                        </div>
                        <div className="mb-5">
                            <h3 className="text-xs text-[#DCDCDC] font-semibold mb-3 text-center pt-5">Earnings this month</h3>
                            <p className="text-3xl font-light text-center">{totalEarningsPerMonth} DA</p>
                        </div>
                        <div className="mb-5 ">
                            <h3 className="text-xs text-[#DCDCDC] font-semibold mb-3 text-center pt-5">Total Earnings</h3>
                            <p className="text-3xl font-light text-[#AAC166] text-center">{totalEarnings} DA</p>
                        </div>
                    </div>
                </div>

                {/*for the 2nd section of statistics */}
                <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 ">
                    <h2 className="text-base text-[#DCDCDC] font-semibold mb-5 ml-5 pt-5">List of APIs of this provider</h2>

                    {/*For the seach and filter functionalitites */}
                    <div className='flex justify-between'>
                        <input
                            type="text"
                            placeholder="Search by API name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            
                            className='bg-mapi-neutral-1 font-normal border border-gray-300 border-opacity-10 rounded-lg p-3 mt-5 mb-4  '
                        />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className='bg-mapi-neutral-1 font-normal border border-gray-300 border-opacity-10 rounded-lg p-1 mt-5 mb-4'
                        >
                            <option value="">All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                        </select>
                    </div>
                    
                    {/*For displaying the cards of ApiEarning */}
                    {filteredData.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-3 gap-4">
                                {filteredData.slice(startIndex, endIndex).map((earning, index) => (
                                    <APIEarningCard
                                        key={index}
                                        name={earning.name}
                                        category={earning.category}
                                        totalEarnings={earning.total_earnings}
                                        taxEarnings={earning.tax_earnings}
                                    />
                                ))}
                            </div>
                            <br />
                            <PaginationR
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        ) : (
                            <p>No API earnings data available.</p>
                    )}
                </div>

                {/*for the 3rd and last section of statistics */}
                <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 ">
                    <h2 className="text-base text-[#DCDCDC] font-semibold mb-5 ml-5 pt-5">User Subscription Graph of <span className="text-base font-semibold text-mapi-secondary-3 underline mb-0 mr-10">{provider.first_name} {provider.last_name}</span></h2>
                    {userSubscription.length > 0 ? (
                        <UserSubscriptionChart userSubscription={userSubscription[0]} />
                    ) : (
                        <p>No user subscription data available.</p>
                    )}
                    
                </div>
                



                
            </div>
        </div>
    );
}

export default DashboardProvider;
