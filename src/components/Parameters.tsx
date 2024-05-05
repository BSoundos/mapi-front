import React from 'react'
import Parameter from './Parameter'

const Parameters = () => {
    return (
        < section className='px-4 border-t-2 border-white border-opacity-5 text-sm' >
            <Parameter
                name="X-User-Agent"
                value="Desktop"
                is_required={true}
                description="Device type for the search."
                defaultValue="desktop"
                dataType="ENUM" />
            <Parameter
                name="X-User-Agent"
                value="Desktop"
                is_required={true}
                description="Device type for the search."
                defaultValue="desktop"
                dataType="ENUM" />
            <Parameter
                name="X-User-Agent"
                value="Desktop"
                is_required={true}
                description="Device type for the search."
                defaultValue="desktop"
                dataType="ENUM" />
        </ section>
    )
}

export default Parameters