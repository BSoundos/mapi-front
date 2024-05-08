import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import img1 from "@/assets/user.png"
import commentIcon from "@/assets/icons/comment.svg"
import store, { RootState } from '@/app/store';
import { useParams } from 'react-router-dom';
import { fetchDiscussions } from '@/components/features/discussions/discussionsSlice';
import Navbar from '@/components/NavBar';
import NavBar2 from '@/components/NavBar2';
import PaginationR from '@/components/PaginationR';
import Footer from '@/components/Footer';
import AddDiscussionModal from '@/pages/discussions/AddDiscussionModal';



export type AppDispatch = typeof store.dispatch



const DiscussionsPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const discussions = useSelector((state: RootState) => state.discussions.discussions);
  const loading = useSelector((state: RootState) => state.discussions.loading);
  const error = useSelector((state: RootState) => state.discussions.error);
  const {id} = useParams();






  //For the pagination:
  const discussionsPerPage = 4; 

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * discussionsPerPage;
  const endIndex = Math.min(startIndex + discussionsPerPage, discussions.length);


  const currentDiscussions = discussions.slice(startIndex, endIndex);






  //For the add Discussion modal:
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  //This function is to get a new format for the date (ex: from 'dd/MM/yyyy' to 'n days ago')
  const formatDate = (discussionDate: string) => {
    const currentDate = new Date();
    const discussionDateObj = new Date(discussionDate);
  
    // Set time components to midnight to compare date parts only
    currentDate.setHours(0, 0, 0, 0);
    discussionDateObj.setHours(0, 0, 0, 0);
  
    // Calculate the difference in milliseconds
    const differenceInMs = currentDate.getTime() - discussionDateObj.getTime();
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  
    if (differenceInDays === 0) {
      return 'today';
    } else if (differenceInDays === 1) {
      return 'yesterday';
    } else if (differenceInDays > 365) {
      const differenceInYears = Math.floor(differenceInDays / 365);
      return `${differenceInYears} year${differenceInYears > 1 ? 's' : ''} ago`;
    } else {
      return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
    }
  };
  
  
  useEffect(() => {
    if (id) {
      const parameterNumber = parseInt(id, 10);
      dispatch(fetchDiscussions(parameterNumber)); // Fetch discussions

      
    }
  }, [dispatch, id]);

 

  




  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">

    <div className="flex-grow bg-mapi-neutral-3 ">
      <div className="mx-auto max-w-7xl mt-4"> 
        <div className="border border-white border-opacity-10 rounded-md">
          <div className='flex items-center justify-between pl-16 pr-8 py-2 mt-10'>
          <p className='text-white font-Inter font-normal text-2xl'>Discussions</p>
          <button onClick={handleOpenModal} className='text-[#21C3FC] bg-[#081028] w-fit py-1 px-2 border border-[#7E89AC] border-opacity-30 rounded-lg' >+ New Discussion</button>
          
          <AddDiscussionModal
            apiId={discussions.length > 0 ? discussions[0].api.api_id : undefined}  
            onClose={handleCloseModal}
            isOpen={isModalOpen}
          /> 
        </div>
        <div className='pl-16 pr-8 py-2 '>
        {currentDiscussions.map((discussion) => (
          <Link
            key={discussion.discussion_id}
            to={`${discussion.discussion_id}`} // Specify your dynamic URL here
            className='flex items-center w-[97%] my-7 border-b border-white border-opacity-10'
          >
            <img src={img1} alt="User Avatar" />
            <div className='mx-5 flex flex-col flex-grow'>
              <p key={`${discussion.discussion_id}-name`} className='text-sm text-white opacity-60'>
                {discussion.user.first_name} {discussion.user.last_name}
              </p>
              <p key={`${discussion.discussion_id}-title`} className='text-white'>
                {discussion.title}
              </p>
              <p key={`${discussion.discussion_id}-date`} className='text-sm text-white opacity-80'>
                {formatDate(discussion.discussion_date)}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <img src={commentIcon} alt="Comment Icon" className="w-4 h-4 mr-2" />
                <p className="text-sm text-white opacity-80">
                  Comments
                </p>
              </div>
            </div>
          </Link>
        ))}



          
          <div className='flex items-center justify-center pt-8 pb-20'>
          <PaginationR
                  currentPage={currentPage}
                  totalPages={Math.ceil(discussions.length / discussionsPerPage)}
                  onPageChange={(page: number) => setCurrentPage(page)}
                />
          </div>
              

        </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
  );
};

export default DiscussionsPage;
