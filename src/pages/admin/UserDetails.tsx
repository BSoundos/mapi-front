import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AdminSidebar from '@/components/AdminSideBar';
import TransactionsTable from '@/components/TransactionsTable';
import APIsTable from "@/components/APIsTable";
import {Table, TableHead, TableBody, TableRow, TableCell, Button} from '@mui/material';
import {fetchInvoices} from '@/components/features/invoices/invoiceSlice';
import store, {RootState} from '@/app/store';
import {useParams} from "react-router-dom";
import {GetInformationUser} from "@/components/features/UserSetting/UserSlice.tsx";

export type AppDispatch = typeof store.dispatch;

const AdminUserDetails: React.FC = () => {
    const {username} = useParams<{ username: string }>(); // Change userId to username
    const dispatch = useDispatch<AppDispatch>();
    const invoices = useSelector((state: RootState) => state.invoiceHistory.invoices);
    const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
    const loadingInvoices = useSelector((state: RootState) => state.invoiceHistory.loading);
    const loadingSubscriptions = useSelector((state: RootState) => state.subscriptions.loading);
    const errorInvoices = useSelector((state: RootState) => state.invoiceHistory.error);
    const errorSubscriptions = useSelector((state: RootState) => state.subscriptions.error);
    const [user, setUser] = useState<any>(null); // State to store user information

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch user info based on username
                const userInfo = await GetInformationUser(username);
                setUser(userInfo);
                dispatch(fetchInvoices(userInfo.username)); // Fetch invoices based on userId
                // dispatch(fetchSubscriptions(userInfo.id)); // Fetch subscriptions based on userId
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUser();
    }, [dispatch, username]);


    useEffect(() => {
    }, [invoices]);

    const handleBlockToggle = () => {
        console.log(user.blocked ? 'Unblocking user' : 'Blocking user');
    };

    if (loadingInvoices || loadingSubscriptions) {
        return <div>Loading...</div>;
    }

    if (errorInvoices || errorSubscriptions) {
        return <div>Error: {errorInvoices || errorSubscriptions}</div>;
    }

    // Transform invoices to ensure planName is treated as a string
    const transactions = invoices.map(invoice => ({
        ...invoice,
        planName: String(invoice.planName)
    }));


    return (
        <div className='flex'>
            <AdminSidebar/>
            <div className="flex flex-col px-10 bg-[#081028] w-full py-10">
                <h1 className="text-3xl font-bold text-white mb-10">User Details</h1>
                <a href="/admin/users" className="text-blue-300 mb-4">&lt; Back to all users</a>

                {user && (
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="mb-4">
                                    <p className="text-white"><span
                                        className="font-bold">First Name:</span> {user.first_name}</p>
                                    <p className="text-white"><span
                                        className="font-bold">Last Name:</span> {user.last_name}</p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <p className="text-white"><span className="font-bold">Email:</span> {user.email}</p>
                                    <p className="text-white"><span className="font-bold">Status:</span> {user.status}
                                    </p>
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
                )}

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
                                    {/*{user.apiSubscriptions}*/}
                                </TableCell>
                                <TableCell style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>
                                    {/*{user.dispensesThisMonth}*/}
                                </TableCell>
                                <TableCell style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>
                                    {/*{user.totalApiCalls}*/}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Transaction History</h2>
                    <TransactionsTable transactions={transactions}/>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">API Subscription</h2>
                    <APIsTable subscriptions={subscriptions}/>
                </div>
            </div>
        </div>
    );
};

export default AdminUserDetails;
