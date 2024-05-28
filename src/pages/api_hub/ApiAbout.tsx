import React, { useState,useEffect } from 'react'
import PaginationR from '@/components/PaginationR';
import Review from '@/components/Review';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import {fetchApiById} from '@/components/features/apis/AboutSlice';
import {fetchReviewsByApiId} from '@/components/features/apis/ReviewSlice';
import AddReviewModal from '@/components/AddReviewModal';

const ApiAbout = () => {

    const dispatch = useAppDispatch();
    const api = useSelector((state: RootState) => state.AboutSlice.data);
    // const status = useSelector((state: RootState) => state.AboutSlice.status);
    // const error = useSelector((state: RootState) => state.AboutSlice.error);

    const reviews = useSelector((state: RootState) => state.review.reviews); 
    // const loadingReviews = useSelector((state: RootState) => state.review.loading);
    // const errorReviews = useSelector((state: RootState) => state.review.error);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [localReviews, setLocalReviews] = useState(reviews);


    const { id } = useParams(); // Get the API ID from the URL
    const apiId = parseInt(id, 10);
     
    const totalReviews = localReviews.length;
    const reviewsPerPage = 3; // le nmb de review par page 

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = Math.min(startIndex + reviewsPerPage, totalReviews);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const apiPk = parseInt(id, 10);
    
        if (isNaN(apiPk)) {
          console.error('Invalid API ID:', apiPk);
          return; 
        }

        dispatch(fetchApiById(apiPk));
        dispatch(fetchReviewsByApiId(apiPk));

    }, [dispatch, id]);

    useEffect(() => {
        setLocalReviews(reviews); // Mettez à jour les avis locaux lorsque Redux change
      }, [reviews]);

      
      const renderReviews = () => {
        const resultReviews = [];
        for (let i = startIndex; i < endIndex; i++) {
            const review = localReviews[i];
            if(review){
                resultReviews.push(
                    <Review 
                        key={review.id}
                        content={review.comment}
                        author={review.user.username}
                        rating={review.rating}
                        created_at={review.review_date}
                    />
                );
            }
            
        }
        return resultReviews;

    };

    


    

    return (
        <section>
            <div className='pl-16 pr-8 py-4'>
                <pre className='text-white text-sm font-inter font-normal opacity-[87%] pb-4 whitespace-pre-line'>
                    {api?.description}
                    
                </pre>

            </div>
            <div className='flex items-center justify-between pl-16 pr-8 py-2'>
                <p className='text-white font-Inter font-semibold text-2xl'>Reviews</p>
                <button className='text-[#21C3FC] bg-[#081028] w-fit py-2 px-4 border border-[#7E89AC] border-opacity-30 rounded-lg' onClick={() => setIsFormVisible(true)} >
                    + New Review
                </button>
                
            </div>
            <AddReviewModal
                apiId={apiId}
                isOpen={isFormVisible}
                onClose={() => setIsFormVisible(false)} 
            />
            
            <div className='pl-16 pr-8 '>
                {renderReviews()}
            </div>
            <div className='pl-16 pr-8 py-2'>
                <div className='flex items-center justify-center pt-8 pb-20'>
                    <PaginationR
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalReviews/ reviewsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}

export default ApiAbout;