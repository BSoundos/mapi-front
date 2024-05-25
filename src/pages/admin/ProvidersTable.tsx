import React, {useEffect, useState} from 'react';
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
import {CheckIcon, LockIcon, MapIcon, PhoneIcon, SearchIcon, User2Icon} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '@/app/store';
import { fetchProviders } from '@/components/features/admin/providersSlice';
import { blockProviderAccount, unblockProviderAccount } from '@/components/features/admin/accounts_management';
import { User } from '@/types/user';
import { Link } from 'react-router-dom';




export type AppDispatch = typeof store.dispatch


const ProvidersTable: React.FC= () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');





    const dispatch = useDispatch<AppDispatch>();
    const providers = useSelector((state: RootState) => state.providers.providers);
    const loading = useSelector((state: RootState) => state.providers.loading);
    const error = useSelector((state: RootState) => state.providers.error);
  
    useEffect(() => {
      dispatch(fetchProviders());
    }, [dispatch]);


    const handleBlock = async (provider: User) => {
        if(provider.status === 1){
            dispatch(blockProviderAccount(provider.id));
        }else{
            dispatch(unblockProviderAccount(provider.id));
        }
        await dispatch(fetchProviders());
      };




    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
/*
    const handleBlockToggle = (userId: number) => {
        // Update the block status of the user with the given userId
        const updatedUsers = users.map(user =>
            user.id === userId ? {...user, blocked: !user.blocked} : user
        );
        // Update the state with the updated users
        // Assuming you have a function to update users in the parent component
        updateUsers(updatedUsers);
    };

*/

    const filteredProviders = providers.filter(provider =>
        provider.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.username.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.contact_info.toLowerCase().includes(searchText.toLowerCase())
    );





    const getStatusColorClasses = (status: number): string => {
        return status === 1 ? 'text-green-500' : 'text-gray-500';
    };








   

    return (
        <div className='flex '>
            <AdminSidebar/>
            <div className="flex flex-col px-10 bg-[#081028] w-full py-4">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-white mb-0 mr-14">List of providers</h1>
                    <div className="w-75">
                    <TextField
                        fullWidth
                        label="Search for providers"
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
                            
                            <TableCell className='text-white border '  style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                <CheckIcon  />
                                Status
                            </TableCell>
                            <TableCell style={{ color: 'white', border: '2px solid rgba(126,137,172,0.3)' }}>
                                
                            </TableCell>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProviders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((provider, index) => (
                                <TableRow key={provider.id} style={{backgroundColor: '#081028'}}>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{provider.first_name} {provider.last_name}
                                    <div>
                                    {provider.email}
                                    </div>
                                    </TableCell>
                                    
                                    
                                    
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{provider.contact_info}</TableCell>
                                    <TableCell >
                                    {provider.status === 1 ? (
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
                                            onClick={() => handleBlock(provider)}
                                            style={{backgroundColor: 'red'}} // Change button color to red
                                        >
                                            {provider.status ? 'Block' : 'Unblock'}
                                        </Button>

                                        <Link to={`/dashboard-provider/${provider.id}`} className="inline-block bg-primary-dark text-white no-underline px-4 py-2 border border-gray-600 rounded-md ml-2">
                                            View Analytics
                                        </Link>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredProviders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{color: '#BFBFBF'}}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProvidersTable;
