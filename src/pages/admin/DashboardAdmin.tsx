import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { ProviderCount, UserCount, ApisPurchasesCount, TotalEarnings, TotalEarningsPerMonth, ApiCategoryPercentages , FetchTopApis, fetchYearlyData, fetchTopPayingProviders, fetchTopSellingAPIs } from '@/components/features/admin/dashboardAdminSlice';
import { Doughnut, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export type AppDispatch = typeof store.dispatch
const DashboardAdmin: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  
    useEffect(() => {
        dispatch(ProviderCount());
        dispatch(UserCount());
        dispatch(ApisPurchasesCount());
        dispatch(TotalEarnings());
        dispatch(TotalEarningsPerMonth());
        dispatch(ApiCategoryPercentages());
        dispatch(FetchTopApis());
        dispatch(fetchYearlyData(selectedYear));
        dispatch(fetchTopPayingProviders());
        dispatch(fetchTopSellingAPIs());


    }, [dispatch, selectedYear]);

    const { providerCount, userCount, apisPurchasesCount, totalEarnings, totalEarningsPerMonth, categoryPercentages, topApis, yearlyData, topPayingProviders, topSellingApi,loading, error } = useSelector((state: RootState) => state.admin);
    const apiNames = topApis.map(api => api.name);
    const apiVotes = topApis.map(api => api.votes);

    const data2 = {
        labels: apiNames,
        datasets: [{
            label: 'Votes',
            data: apiVotes,
            backgroundColor: '#21C3FC', // Couleur des barres
        }]
    };

    const options2 = {
        scales: {
            y: {
                beginAtZero: true // Commencer l'axe y à zéro
            }
        },
        onClick: (event, activeElements) => {
            // Gestionnaire d'événements de clic pour le graphique à barres
            if (activeElements.length > 0) {
                const index = activeElements[0].index;
                const apiId = topApis[index].id;
                window.location.href = `/api/about/${apiId}`;
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true,
            onHover: (event, chartElement) => {
                event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
            }
        }
    };
    

    const data = {
        labels: Object.keys(categoryPercentages),
        datasets: [{
            data: Object.values(categoryPercentages),
            backgroundColor: [
                '#21C3FC',
                '#FDB52A',
                '#D1DBF9',
                'rgba(33, 195, 252, 0.5)',
                'rgba(253, 181, 42, 0.5)',
                'rgba(209, 219, 249, 0.5)',
            ],
            hoverBackgroundColor: [
                '#21C3FC',
                '#FDB52A',
                '#D1DBF9',
                'rgba(33, 195, 252, 0.5)',
                'rgba(253, 181, 42, 0.5)',
                'rgba(209, 219, 249, 0.5)',
            ]
        }]
    };

    const options: ChartOptions<'doughnut'> = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 17
                    }
                }
            }
        },
    };

     // Transform yearlyData to get the correct labels and values
     const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        totalAmount: 0,
    }));

    yearlyData?.forEach(data => {
        const monthIndex = data.subscription_date__month - 1;
        if (monthlyData[monthIndex]) {
            monthlyData[monthIndex].totalAmount = data.total_amount;
        }
    });

    const yearlyLabels = monthlyData.map(data => `Month ${data.month}`);
    const yearlyDataValues = monthlyData.map(data => data.totalAmount);

    const yearlySubscriptionData = {
        labels: yearlyLabels,
        datasets: [{
            label: 'Monthly Subscriptions',
            data: yearlyDataValues,
            backgroundColor: 'rgba(33, 195, 252, 0.5)',
            borderColor: '#21C3FC',
            fill: true,
        }]
    };

    const yearlySubscriptionOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(e.target.value));
    };
    const handlePrevYear = () => {
        setSelectedYear(prevYear => prevYear - 1);
    };

    const handleNextYear = () => {
        setSelectedYear(prevYear => prevYear + 1);
    };

    return (
        <div className='flex'>
      <AdminSidebar  />
            <div className="flex flex-col px-10 bg-[#081028] w-full py-10 text-mapi-text">
                <h1 className="text-3xl font-semibold text-mapi-secondary-1 mb-0 mr-10">Dashboard</h1>
                <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 ">
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-center pt-5">Number of active providers</h3>
                            <p className="text-3xl text-center">{providerCount}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-center pt-5">Total users</h3>
                            <p className="text-3xl text-center">{userCount}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold mb-3 text-center pt-5">Total API purchases</h3>
                            <p className="text-3xl text-center">{apisPurchasesCount}</p>
                        </div>
                        <div className="mb-5">
                            <h3 className="text-sm font-semibold mb-3 text-center pt-5">Earnings this month</h3>
                            <p className="text-3xl text-center">{totalEarningsPerMonth} DA</p>
                        </div>
                        <div className="mb-5 ">
                            <h3 className="text-sm font-semibold mb-3 text-center pt-5">Total Earnings</h3>
                            <p className="text-3xl text-center">{totalEarnings} DA</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full">
        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 mr-4 " style={{ width: '50%' }}>
            <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Top 3 paying users this month:</h2>
            {topPayingProviders.slice(0, 3).map(provider => (
                <div key={provider.provider_id} className="rounded-lg p-4 mb-4 bg-dark-text border border-gray-300 border-opacity-10">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold text-mapi-secondary-1 pb-5 ml-10">{provider.provider_name}</p>
                        {/* Lien pour voir le profil du fournisseur */}
                        <Link to={`/provider/profile/${provider.provider_id}`} className="text-sm font-semibold text-mapi-secondary-1 mr-10 pb-5">View Profile</Link>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm font-semibold text-mapi-secondary-1 mr-2 ml-12">Total money paid:</p>
                        <p className="text-sm font-semibold text-mapi-secondary-1 ml-8">{provider.total_amount} DA</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 mr-4 " style={{ width: '50%' }}>
                            <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Top Selling APIs</h2>
                            {topSellingApi.map(api => (
                                <div key={api.api_name} className="rounded-lg p-4 mb-4 bg-dark-text border border-gray-300 border-opacity-10">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-lg font-semibold text-mapi-secondary-1 pb-5 ml-10">{api.api_name}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-sm font-semibold text-mapi-secondary-1 mr-2 ml-12">Total Earnings:</p>
                                        <p className="text-sm font-semibold text-mapi-secondary-1 ml-8">{api. total_earnings} DA</p>
                                    </div>
                                </div>
                            ))}
                        </div>
    </div>
                <div className="flex px-10 bg-[#081028] py-10 text-mapi-text">
                    <div className="flex justify-between w-full">
                        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4   ml-4" style={{ width: '45%' }}>
                            <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Top 5 APIs by Votes</h2>
                            <div className="w-full h-96 mb-10">
                                <Bar data={data2} options={options2} />
                            </div>
                        </div>
                        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mr-4" style={{ width: '45%' }}>
                            <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Category distribution</h2>
                            <div className="w-full h-96 mb-10">
                                <Doughnut 
                                    data={data} 
                                    options={options}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                


            <div className="flex px-10 bg-[#081028] py-10 text-mapi-secondary-1" >
                <div className="flex justify-between w-full">
                <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mb-10 mr-4" style={{ width: '100%' }}>
                <div className="w-full mt-8 mx-auto">
                    <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Yearly Subscriptions</h2>
                    <div className="flex justify-end items-center mb-4">
                        <button onClick={handlePrevYear} className="bg-[#081028] text-white py-1 px-4 rounded-l">
                            &larr;
                        </button>
                        <select value={selectedYear} onChange={handleYearChange} className="block appearance-none bg-[#081028] rounded-l rounded-r border border-gray-300 text-white py-1 px-8 leading-tight focus:outline-none">
                            <option value={2024}>2024</option>
                            <option value={2023}>2023</option>
                            <option value={2022}>2022</option>
                            <option value={2021}>2021</option>
                            <option value={2020}>2020</option>
                            <option value={2019}>2019</option>
                            <option value={2018}>2018</option>
                        </select>
                        <button onClick={handleNextYear} className="bg-[#081028] text-white py-1 px-4 rounded-r">
                            &rarr;
                        </button>
                    </div>
                    <Line data={yearlySubscriptionData} options={yearlySubscriptionOptions} />
                </div>
                </div>
        </div>  </div>
        
              
            </div>
        </div>
    );
}

export default DashboardAdmin;