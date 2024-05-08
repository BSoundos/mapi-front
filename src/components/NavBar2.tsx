import React from 'react';

import devIcon from '@/assets/icons/dev.svg';
import popularityIcon from '@/assets/icons/popularity.svg';
import voteIcon from '@/assets/icons/vote.svg';
import latencyIcon from '@/assets/icons/latency.svg';
import plusIcon from '@/assets/icons/plus.svg';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Api } from '@/components/features/discussions/discussionsSlice';
import NavItem from './NavItem';




interface NavBar2Props {
    api?: Api;
}

const NavBar2: React.FC<NavBar2Props> = ({ api}) => {
    // const category_name = data["category"]["name"]

    return (

        <div className='border-b border-white border-opacity-10 font-plus-jakarta-sans'>
            <div className='bg-[#081028] border-b border-white border-opacity-5 pl-16 pr-4 py-4 flex items-center justify-between '>
                <div className='mb-4'>
                    <div className='flex '>
                        <p className='text-inter text-white text-xl font-bold mt-5'>Local Business Data</p>
                        <div className="flex items-center justify-between pl-2 ">
                            <div className="flex mt-4 py-0.5 px-1 bg-[#57C3FF] bg-opacity-30  border border-[#57C3FF] border-opacity-30 rounded-sm">
                                <img src={devIcon} />
                                {api && (<p className="text-white text-xs font-semibold pl-2">{api?.category.name}</p>)}
                            </div>
                        </div>
                    </div>
                    <p>
                        <span className='text-white text-opacity-87 text-xs'>By</span>
                        <span className='ml-2 text-[#21C3FC] text-xs underline font-inter'>{api?.provider.last_name} {api?.provider.first_name}</span>
                    </p>
                </div>
                <div className='flex items-center justify-end'>
                    <div className='border-r-2 border-[#FFFFFF] border-opacity-5 px-10 '>
                        <div className='flex mb-2'>
                            <img src={popularityIcon} />
                            <p className=' text-white text-opacity-60 pl-2 text-[14px]'> Popularity</p>
                        </div>
                        {api && (<div className='text-white text-center text-[24px]'>{api?.popularity}</div>)}
                    </div>
                    <div className=' border-r-2 border-[#FFFFFF] border-opacity-5 px-10'>
                        <div className='flex mb-2 justify-center pb-2'>
                            <img src={voteIcon} />
                            <p className='  text-white text-opacity-60 pl-2 text-[14px]'> vote</p>
                        </div>
                        {api && (<Rating name="read-only" icon={<StarIcon style={{ color: '#FFFFFF', fontSize: 24 }} />} value={api?.votes} readOnly />)}
                    </div>
                    <div className=' border-r-2 border-[#FFFFFF] border-opacity-5 px-10'>
                        <div className='flex mb-2'>
                            <img src={latencyIcon} />
                            <p className=' text-white text-opacity-60 pl-2 text-[14px]'> Latency</p>
                        </div>
                        {api && (<div className='text-white text-center text-[24px]'>{api?.latency}</div>)}
                    </div>
                    <div className=' border-r-2 border-[#FFFFFF] border-opacity-5 px-10'>
                        <div className='flex mb-2'>
                            <img src={voteIcon} />
                            <p className='  text-white text-opacity-60 pl-2 text-[14px]'> Service Level</p>
                        </div>
                        {api && (<div className='text-white text-center text-[24px]'>{api?.service_level}%</div>)}
                    </div>
                    <div className=' px-12'>
                        <div className='flex mb-2'>
                            <img src={plusIcon} />
                            <p className=' text-white text-opacity-60 pl-2 text-[14px]'> Heath Check</p>
                        </div>
                        {api && (<div className='text-[#1F9E00] text-center text-[24px]'>{api?.health_check}</div>)}
                    </div>

                </div>
            </div>
            <div className='w-full border-b border-white border-opacity-5 bg-mapi-neutral-3 bg-opacity-[90%]'>
                <nav className='flex items-center gap-4 w-[40%] font-inter font-normal text-sm text-[#007BFF] pl-16 h-full '>
                    <NavItem path='about' text='About' />
                    <NavItem path='endpoints' text='Endpoints' />
                    <NavItem path='documentation' text='Documentation' />
                    <NavItem path='pricing' text='Pricing' />
                    <NavItem path={`/userAddTicket/${api?.api_id}`} text='Support' />
                    <NavItem path={`/Discussions/${api?.api_id}`} text='Discussions' />
                </nav>
            </div>
        </div >

    );
}

export default NavBar2;