import React from 'react'
import AccordionMenu from '@/components/AccordionMenu'
import EndpointListItem from '@/components/EndpointListItem'
import NavItem from '@/components/NavItem'
import Parameters from '@/components/Parameters'
import SelectVersion from '@/components/SelectVersion'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const Endpoints = () => {
    return (
        <section className='text-white text-sm font-inter'>
            {/* Api Version dropdown menu */}
            <header className='bg-mapi-neutral-2 px-4 py-2 w-full border-b border-white border-opacity-5'>
                <SelectVersion />
            </header>
            {/* Endpoints details section*/}
            <section className='flex w-full h-max'>
                {/* Endpoints List */}
                <aside className='w-[25%] border-r border-white border-opacity-5 pb-8'>
                    {/* Endpoints Search Bar */}
                    <header className='bg-mapi-neutral-2 flex w-full justify-center py-1.5'>
                        <div className="relative px-4 py-2 w-[95%] flex">
                            <input
                                type="text"
                                className="bg-mapi-neutral-1 rounded-lg pr-4 py-2 pl-10 w-full text-white opacity-75 border border-corner-1-300 border-0.5 text-sm "
                                placeholder="Search Endpoints"
                            />
                            <FontAwesomeIcon icon={faSearch} className="text-white text-opacity-65 absolute left-8 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </header>
                    {/* Endpoints List */}
                    <ul className='bg-mapi-neutral-2'>
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                        <EndpointListItem httpMethod={"GET"} endpointName={"Search"} />
                    </ul>
                </aside>
                <aside className='w-[40%] border-r border-white border-opacity-5 '>
                    {/* Endpoint Name , HTTP method and status */}
                    <header className='bg-mapi-neutral-2 w-full flex justify-between px-4 py-5 border-b-2 border-white border-opacity-5'>
                        <p>
                            <span className='text-[#1B8032] text-base font-bold font-lato mr-1.5'>GET</span>
                            <span className='text-mapi-neutral-8 text-opacity-85 text-sm'>Search</span>
                        </p>
                        <p className='text-mapi-neutral-8 text-opacity-85'>Status: <span className='text-mapi-secondary-5 font-bold'>Active</span></p>
                    </header>
                    <article className='py-3'>
                        {/* Endpoint description & documentation*/}
                        <div className='px-4 pb-3'>
                            <p className='mb-2'><span className='font-semibold'>Description: </span>Search local businesses on Google Maps.</p>
                            <a className='text-[#007BFF] underline' href="">View Documentation</a>
                        </div>
                        {/* Header parameters */}
                        <AccordionMenu title={"Header Parameters"}>
                            <Parameters />
                        </AccordionMenu>
                        {/* Required Query parameters */}
                        <AccordionMenu title={"Required Parameters"}>
                            <Parameters />
                        </AccordionMenu>
                        {/* Optional Query parameters */}
                        <AccordionMenu title={"Optional Parameters"}>
                            <Parameters />
                        </AccordionMenu>
                    </article>
                </aside>
                <aside className='w-[35%] '>
                    <header className='bg-mapi-neutral-2 w-full px-8 py-2 flex border-b-2 border-white border-opacity-5'>
                        <nav className='flex justify-center gap-4 w-full py-0.5 font-inter font-normal text-sm text-mapi-neutral-8 text-opacity-85'>
                            <NavItem path='example_code' text='Code Example' />
                            <NavItem path='example_response' text='Response Example' />
                            <NavItem path='request_format' text='Request Format' />
                            <NavItem path='response_format' text='Response Format' />
                        </nav>
                    </header>

                </aside>
            </section>
        </section>
    )
}

export default Endpoints