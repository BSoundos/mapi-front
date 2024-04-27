import React from 'react';
import "@/styles/index.css"


const SupportNavBar: React.FC = () => {
    return (
        <div className="pt-10">
            <div className='flex space-x-10 pl-10'>  
                <a href="" className="font-inter text-xl text-mapi-secondary-3 font-bold">Tickets</a>
                <a href="" className="font-inter text-xl text-white">Discussions</a>
            </div>

            <div className='relative mt-2'>  
                <div className="absolute inset-x-0 border-b border-white opacity-50"></div>  
                <div className="absolute w-24 border-b-2 border-mapi-secondary-3" style={{ left: '35px' }}></div>  
            </div>
        </div>
    );
}

export default SupportNavBar;

