import React from 'react'

const Parameter = ({ name, value, is_required, description, defaultValue, dataType }) => {
    return (
        <div className='pt-6'>
            <div className='flex justify-between mb-3'>
                <p className='w-16'>{name}</p>
                <div className='w-1/2'>
                    <input className='w-full bg-mapi-neutral-1 p-2 mb-2 truncate' value={value} />
                    <p className='text-xs'><span className='text-[#4A90E2] uppercase mr-2'>{is_required ? 'required' : 'optional'}</span><span>{description} Default: {defaultValue}</span></p>
                </div>
            </div>
            <p className='text-white text-opacity-50 uppercase'>{dataType}</p>
        </div>
    )
}

export default Parameter