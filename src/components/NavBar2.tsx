import React from 'react';
import "@/styles/index.css"
import img2 from "../assets/Development Icon.png"
import img1 from "../assets/popularityimg.png"
import img3 from "../assets/voteimg.png"
import img4 from "../assets/latencyimg.png"
import img5 from "../assets/plusimg.png"
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


interface NavBar2Props {
    data: any;
}

const NavBar2: React.FC<NavBar2Props> = ({ data }) => {
    // const category_name = data["category"]["name"]

    return (

        <div className=''>
            <div className='bg-[#081028] border-b border-white border-opacity-10 pl-16 pr-8  flex items-center justify-between '>
                <div className='mb-4'>
                    <div className='flex '>
                        <p className='text-inter text-white text-xl font-bold mt-5'>Local Business Data</p>
                        <div className="flex items-center justify-between pl-2 ">
                            <div className="flex mt-4 py-0.5 px-1 bg-[#57C3FF] bg-opacity-30  border border-[#57C3FF] border-opacity-30 rounded-sm">
                                <img className="w-[10px]" src={img2} />
                                {data && (<p className="text-white text-xs font-semibold pl-2">{data.category.name}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className='flex '><p className='text-white text-opacity-87 text-xs'>By</p><p className='pl-2 text-[#21C3FC] text-xs underline'>Belhadef Mohamed Anis</p></div>

                </div>
                <div className='flex items-center justify-between w-[60%]'>
                    <div className=' border-r border-[#FFFFFF] border-opacity-30 pr-4 '>
                        <div className='flex'>
                            <img className='' width="auto" height="auto" src={img1} />
                            <p className='text-sm text-white text-opacity-60 pl-2'> Popularity</p>
                        </div>
                        {data && (<div className='text-white'>{data.Popularity}</div>)}
                    </div>
                    <div className=' border-r border-[#FFFFFF] border-opacity-30 pr-4 '>
                        <div className='flex'>
                            <img className='w-[10px]' src={img3} />
                            <p className='text-sm  text-white text-opacity-60 pl-2'> vote</p>
                        </div>
                        {data && (<Rating name="read-only" icon={<StarIcon style={{ color: '#FFFFFF' }} />} value={data.vote} readOnly />)}

                    </div>
                    <div className=' border-r border-[#FFFFFF] border-opacity-30 pr-4 '>
                        <div className='flex'>
                            <img className='w-[10px]' src={img4} />
                            <p className='text-sm  text-white text-opacity-60 pl-2'> Latency</p>
                        </div>
                        {data && (<div className='text-white'>{data.latency}</div>)}
                    </div>
                    <div className=' border-r border-[#FFFFFF] border-opacity-30 pr-4 '>
                        <div className='flex'>
                            <img className='w-[10px]' src={img3} />
                            <p className='text-sm  text-white text-opacity-60 pl-2'> Service Level</p>
                        </div>
                        {data && (<div className='text-white'>{data.service_level}</div>)}
                    </div>
                    <div className=' '>
                        <div className='flex'>
                            <img className='w-[10px]' src={img5} />
                            <p className='text-sm text-white text-opacity-60 pl-2'> Heath Check</p>
                        </div>
                        {data && (<div className='text-[#1F9E00] '>{data.health_check}</div>)}
                    </div>

                </div>
            </div>
            <div className='border-b border-white border-opacity-10 '>
                <div className=' flex items-center justify-between w-[35%] font-inter font-semibold text-sm text-[#007BFF] pl-16 py-2'>
                    <a>About</a>
                    <a>Endpoints</a>
                    <a>Documentation</a>
                    <a>Pricing</a>
                    <a>Support</a>

                </div>
            </div>
        </div>

    );
}

export default NavBar2;
