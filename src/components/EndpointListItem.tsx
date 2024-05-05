import React from 'react'

const EndpointListItem = ({ httpMethod, endpointName }) => {
    return (
        <li>
            <button className='px-4 py-2 hover:bg-white hover:bg-opacity-5 transition duration-150 w-full text-left'>
                <span className='text-[#1B8032] text-[10px] font-lato mr-1.5'>{httpMethod}</span>
                <span className='text-opacity-85 text-sm'>{endpointName}</span>
            </button>
        </li>
    )
}

export default EndpointListItem