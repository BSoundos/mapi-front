import React, {useState} from 'react';
import AdminSidebar from './AdminSideBar';
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
import {SearchIcon} from "lucide-react";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    contact_info: string;
    status: number;
    blocked: boolean; // Added property for block status
}

interface UsersTableProps {
    users: User[];
}

const sampleUsers: User[] = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
        {
        id: 2,
        firstname: 'Haleem',
        lastname: 'Bkm',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
        {
        id: 3,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
            {
        id: 4,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
            {
        id: 5,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
            {
        id: 6,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
            {
        id: 7,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
            {
        id: 8,
        firstname: 'Ayoub',
        lastname: 'Boukhemis',
        username: 'john.doe',
        password: 'password123',
        contact_info: 'john@example.com',
        status: 1,
        blocked: false,
    },
    // Add other sample users
];

const UsersTable: React.FC<UsersTableProps> = ({users}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBlockToggle = (userId: number) => {
        // Update the block status of the user with the given userId
        const updatedUsers = users.map(user =>
            user.id === userId ? {...user, blocked: !user.blocked} : user
        );
        // Update the state with the updated users
        // Assuming you have a function to update users in the parent component
        updateUsers(updatedUsers);
    };

    const filteredUsers = users.filter(user =>
        user.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.contact_info.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='flex '>
            <AdminSidebar/>
            <div className="flex flex-col px-10 bg-[#081028] w-full py-10">
                <h1 className="text-3xl font-bold text-white mb-10">Users List</h1>
                <div className="w-full mb-4">
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        InputLabelProps={{style: {color: '#BFBFBF', borderColor: 'white'}}}
                        InputProps={{
                            style: {
                                color: '#BFBFBF',
                                borderColor: 'white',
                                backgroundColor: '#060C1D',
                                borderRadius: '5px',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon style={{color: '#BFBFBF'}}/>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor: '#060C1D'}}>
                                <TableCell
                                    style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>ID</TableCell>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>First
                                    Name</TableCell>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>Last
                                    Name</TableCell>
                                <TableCell style={{
                                    color: 'white',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>Username</TableCell>
                                <TableCell style={{
                                    color: 'white',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>Password</TableCell>
                                <TableCell style={{color: 'white', border: '2px solid rgba(126,137,172,0.3)'}}>Contact
                                    Info</TableCell>
                                <TableCell style={{
                                    color: 'white',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>Status</TableCell>
                                <TableCell style={{
                                    color: 'white',
                                    border: '2px solid rgba(126,137,172,0.3)'
                                }}>Action</TableCell> {/* Add Action column header */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                <TableRow key={user.id} style={{backgroundColor: '#081028'}}>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.id}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.firstname}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.lastname}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.username}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.password}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.contact_info}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>{user.status}</TableCell>
                                    <TableCell style={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '2px solid rgba(126,137,172,0.3)'
                                    }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleBlockToggle(user.id)}
                                            style={{backgroundColor: 'red'}} // Change button color to red
                                        >
                                            {user.blocked ? 'Unblock' : 'Block'}
                                        </Button>
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
                        style={{color: '#BFBFBF'}}
                    />
                </div>
            </div>
        </div>
    );
};

export default () => <UsersTable users={sampleUsers}/>;
