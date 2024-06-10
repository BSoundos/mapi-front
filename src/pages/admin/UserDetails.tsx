import React from 'react';
import AdminSidebar from '@/components/AdminSideBar';
import TransactionsTable from '@/components/TransactionsTable';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@mui/material';
import APIsTable from "@/components/APIsTable.tsx";

const sampleUser = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    status: 'ACTIVE',
    blocked: false,
    apiSubscriptions: 5,
    dispensesThisMonth: 10,
    totalApiCalls: 50,
};

const sampleTransactions = [
    {id: 1, apiName: 'API 1', totalAmount: 100, planName: 'Plan A', createdAt: '2024-05-01'},
    {id: 2, apiName: 'API 2', totalAmount: 200, planName: 'Plan B', createdAt: '2024-05-02'},
    {id: 3, apiName: 'API 3', totalAmount: 150, planName: 'Plan C', createdAt: '2024-05-03'},
    // Add more sample transactions as needed
];
const sampleSubscriptions = [
    {
        subscription_id: 1,
        api_name: 'API 1',
        subscription_plan: {name: 'Plan A'},
        user_plan: {name: 'Free Plan'},
        subscription_date: '2024-05-15',
        access_key: {status: 1}
    },
    {
        subscription_id: 2,
        api_name: 'API 2',
        subscription_plan: {name: 'Plan B'},
        user_plan: {name: 'Pro Plan'},
        subscription_date: '2024-05-20',
        access_key: {status: 0}
    },
    {
        subscription_id: 3,
        api_name: 'API 3',
        subscription_plan: null,
        user_plan: {name: 'Free Plan'},
        subscription_date: '2024-05-10',
        access_key: {status: 1}
    }
];


const AdminUserDetails: React.FC<{ user: typeof sampleUser }> = ({user}) => {
    const handleBlockToggle = () => {
        console.log(user.blocked ? 'Unblocking user' : 'Blocking user');
    };

    return (
        <div className='flex'>
            <AdminSidebar/>
            <div className="flex flex-col px-10 bg-[#081028] w-full py-10">
                <h1 className="text-3xl font-bold text-white mb-10">User Details</h1>


                {/* Clickable text to go back to all users */}
                <a href="#" className="text-blue-300 mb-4">&lt; Back to all users</a>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <p className="text-white"><span
                                    className="font-bold">First Name:</span> {user.firstname}</p>
                                <p className="text-white"><span className="font-bold">Last Name:</span> {user.lastname}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <p className="text-white"><span className="font-bold">Email:</span> {user.email}</p>
                                <p className="text-white"><span className="font-bold">Status:</span> {user.status}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={handleBlockToggle}
                            style={{backgroundColor: 'red'}}
                        >
                            {user.blocked ? 'Unblock User' : 'Block User'}
                        </Button>
                    </div>
                </div>


                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor: '#060C1D'}}>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>
                                    Number of API Subscriptions
                                </TableCell>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>
                                    Dispenses This Month
                                </TableCell>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>
                                    Total API Calls
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow style={{backgroundColor: '#081028'}}>
                                <TableCell style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>
                                    {user.apiSubscriptions}
                                </TableCell>
                                <TableCell style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>
                                    {user.dispensesThisMonth}
                                </TableCell>
                                <TableCell style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>
                                    {user.totalApiCalls}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
                    <TransactionsTable transactions={sampleTransactions}/>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">API Subscription</h2>
                    <APIsTable subscriptions={sampleSubscriptions}/>
                </div>
            </div>
        </div>
    );
};

export default () => <AdminUserDetails user={sampleUser}/>;
