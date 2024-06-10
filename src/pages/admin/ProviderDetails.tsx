import React from 'react';
import AdminSidebar from '@/components/AdminSideBar';
import { Button } from '@mui/material';

const sampleProvider = {
    id: 1,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith@example.com',
    status: 'ACTIVE',
    blocked: false,
};

const AdminProviderDetails: React.FC<{ provider: typeof sampleProvider }> = ({ provider }) => {
    const handleBlockToggle = () => {
        console.log(provider.blocked ? 'Unblocking provider' : 'Blocking provider');
    };

    return (
        <div className='flex'>
            <AdminSidebar />
            <div className="flex flex-col px-10 bg-[#081028] w-full py-10">
                <h1 className="text-3xl font-bold text-white mb-10">Provider Details</h1>

                {/* Clickable text to go back to all providers */}
                <a href="#" className="text-blue-300 mb-4">&lt; Back to all providers</a>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <p className="text-white"><span className="font-bold">First Name:</span> {provider.firstname}</p>
                                <p className="text-white"><span className="font-bold">Last Name:</span> {provider.lastname}</p>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <p className="text-white"><span className="font-bold">Email:</span> {provider.email}</p>
                                <p className="text-white"><span className="font-bold">Status:</span> {provider.status}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={handleBlockToggle}
                            style={{ backgroundColor: 'red' }}
                        >
                            {provider.blocked ? 'Unblock Provider' : 'Block Provider'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => <AdminProviderDetails provider={sampleProvider} />;
