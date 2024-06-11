import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSideBar';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import { CheckIcon, LockIcon, MapIcon, PhoneIcon, SearchIcon, User2Icon } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { fetchUsers } from '@/components/features/admin/usersSlice';
import { blockUserAccount, unblockUserAccount } from '@/components/features/admin/accounts_management';
import { User } from '@/types/user';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export type AppDispatch = typeof store.dispatch;

const UsersTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleBlock = async (user: User) => {
        if (user.status === 1) {
            dispatch(blockUserAccount(user.id));
        } else {
            dispatch(unblockUserAccount(user.id));
        }
        await dispatch(fetchUsers());
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.contact_info.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='flex '>
            <AdminSidebar />
            <div className="flex flex-col px-10 bg-[#081028] w-full py-4 ">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-white mb-0 mr-14">List of users</h1>
                        <div className="w-75">
                            <TextField
                                fullWidth
                                label="Search for users"
                                variant="outlined"
                                value={searchText}
                                InputLabelProps={{ style: { color: '#BFBFBF', borderColor: 'white' } }}
                                InputProps={{
                                    style: {
                                        color: '#BFBFBF',
                                        borderColor: 'white',
                                        backgroundColor: '#060C1D',
                                        borderRadius: '5px',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon style={{ color: '#BFBFBF' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52] ">
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#060C1D' }}>
                                <TableCell style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                    <User2Icon style={{ marginRight: '5px' }} />
                                    Name
                                </TableCell>
                                <TableCell style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                    <PhoneIcon style={{ marginRight: '5px' }} />
                                    Phone
                                </TableCell>
                                <TableCell className='text-white border ' style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                    <CheckIcon />
                                    Status
                                </TableCell>
                                <TableCell style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                <TableRow key={user.id} style={{ backgroundColor: '#081028' }}>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.first_name} {user.last_name}
                                        <div>
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.contact_info}</TableCell>
                                    <TableCell >
                                        {user.status === 1 ? (
                                            <span className="inline-block px-4 py-0.25 border border-customGreen text-customTextGreen bg-customBackground">Online</span>
                                        ) : (
                                            <span className="inline-block px-4 py-0.25 border border-customRed text-customTextRed bg-customBackground">Offline</span>
                                        )}
                                    </TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleBlock(user)}
                                            style={{ backgroundColor: 'red' }}
                                        >
                                            {user.status ? 'Block' : 'Unblock'}
                                        </Button>
                                        {/* Add Link to the details page */}
                                        <Link to={`/admin/users/details/${user.username}`} className="text-blue-500 ml-2">Details</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{ color: '#BFBFBF' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
