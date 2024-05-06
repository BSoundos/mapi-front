import React, { useState } from 'react'
import PaginationR from '@/components/PaginationR';
import Review from '@/components/Review';

const ApiAbout = () => {
    const totalReviews = 5;
    const reviewsPerPage = 3; // le nmb de review par page 

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = Math.min(startIndex + reviewsPerPage, totalReviews);

    const renderReviews = () => {
        const reviews = [];
        for (let i = startIndex; i < endIndex; i++) {
            reviews.push(<Review key={i} />);
        }
        return reviews;
    };
    return (
        <section>
            <div className='pl-16 pr-8 py-4'>
                <pre className='text-white text-sm font-inter font-normal opacity-[87%] pb-4 whitespace-pre-line'>
                    Extremely Comprehensive Local Business / Place Data from Google Maps - Reviews, Photos, Emails, Social, and 30+ additional data points with the most comprehensive and
                    maintained local business API on the market.
                    Local Business Data by OpenWeb Ninja is a fast, reliable, and comprehensive local businesses API. As the most comprehensive and maintained option available, Local Business Data
                    empowers you to seamlessly access most-up-to-date business and POI information from Google Maps and the web in real-time.
                    Comprehensive in terms of data and capabilities:
                    ✨ Complete and worldwide coverage - 200+ Million businesses and POIs.
                    ✨ Rich business data with more than 40 data points per business, including reviews, photos, emails, social profiles (Facebook, Instagram, LinkedIn, Yelp, etc) and more.
                    ✨ Extensive search and querying capabilities.

                    Chat with us live on Discord: https://discord.gg/wxJxGsZgha
                </pre>

            </div>
            <div className='flex items-center justify-between pl-16 pr-8 py-2'>
                <p className='text-white font-Inter font-semibold text-2xl'>Reviews</p>
                <button className='text-[#21C3FC] bg-[#081028] w-fit py-2 px-4 border border-[#7E89AC] border-opacity-30 rounded-lg' >+ New Review</button>
            </div>
            <div className='pl-16 pr-8 '>
                {renderReviews()}
            </div>
            <div className='pl-16 pr-8 py-2'>
                <div className='flex items-center justify-center pt-8 pb-20'>
                    <PaginationR
                        currentPage={1}
                        totalPages={Math.ceil(4)}
                        onPageChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </section>
    )
}

export default ApiAbout