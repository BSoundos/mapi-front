import React, { useEffect } from 'react';
import AdminSidebar from '../../components/AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { ProviderCount, UserCount, ApisPurchasesCount, TotalEarnings, TotalEarningsPerMonth, ApiCategoryPercentages , FetchTopApis } from '@/components/features/admin/dashboardAdminSlice';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export type AppDispatch = typeof store.dispatch
const DashboardAdmin: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(ProviderCount());
        dispatch(UserCount());
        dispatch(ApisPurchasesCount());
        dispatch(TotalEarnings());
        dispatch(TotalEarningsPerMonth());
        dispatch(ApiCategoryPercentages());
        dispatch(FetchTopApis());
    }, [dispatch]);

    const { providerCount, userCount, apisPurchasesCount, totalEarnings, totalEarningsPerMonth, categoryPercentages, topApis, loading, error } = useSelector((state: RootState) => state.admin);
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

    return (
        <div className='flex'>
            <AdminSidebar />
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
                <div className="flex px-10 bg-[#081028] py-10 text-mapi-text">
                    <div className="flex justify-between w-full">
                        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 mb-10 ml-4" style={{ width: '50%' }}>
                            <h2 className="text-xl font-semibold text-center text-mapi-secondary-1 mb-4">Top 5 APIs by Votes</h2>
                            <div className="w-full h-96 mb-10">
                                <Bar data={data2} options={options2} />
                            </div>
                        </div>
                        <div className="border border-gray-300 border-opacity-10 rounded-lg p-4 mt-8 mb-10 mr-4" style={{ width: '50%' }}>
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



                
            </div>
        </div>
    );
}

export default DashboardAdmin;
