import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import store, { RootState } from '@/app/store';
import Navbar from '@/components/NavBar';
import NavBar2 from '@/components/NavBar2';
import Footer from '@/components/Footer';
import { Link, useParams } from 'react-router-dom';
import { fetchReplies } from '@/components/features/discussions/ReplySlice';
import { fetchDiscussion } from '@/components/features/discussions/discussionSlice';
import { postReply } from '@/components/features/discussions/addReplySlice';






export type AppDispatch = typeof store.dispatch



const DiscussionDetailsPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  //for the reply
  const replies = useSelector((state: RootState) => state.replies.replies);
  const loading = useSelector((state: RootState) => state.discussion.loading);
  const error = useSelector((state: RootState) => state.discussion.error);

  //for the discussion
  const discussion = useSelector((state: RootState) => state.discussion.discussion);
  const { discussionId } = useParams();

  //for adding a reply
  const [content, setContent] = useState('');




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




  //To fetsch the discussion and the replies of the discussion
  useEffect(() => {
    console.log(discussionId)
    if (discussionId) {
      const discussionIdNumber = parseInt(discussionId, 10);
      dispatch(fetchDiscussion(discussionIdNumber)); // Fetch discussion when component mounts
      dispatch(fetchReplies(discussionIdNumber)); // Fetch replies for a specific discussion
    }

  }, [dispatch, discussionId]);


  //To add a new reply:
  const handlePostComment = () => {
    if (!content.trim() || !discussionId) return; // Prevent posting empty content or invalid discussionId

    const discussionIdNumber = parseInt(discussionId, 10); // Parse discussionId to a number
    const newReply = {
      discussionId: discussionIdNumber,
      content,
    };

    dispatch(postReply(newReply)).then(() => {
      // After posting the reply successfully, reload the page
      history.go(0); // Reload the current page
    });

    setContent(''); // Clear the textarea after posting
  };




  if (loading) {
    return <div>Loading for replies...</div>;
  }

  if (error) {
    return <div>Error in fetching Replies: {error}</div>;
  }




  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {discussion && (
        <div className="flex-grow bg-mapi-neutral-3 ">
          <div className="mx-auto max-w-7xl mt-4">
            <div className="border border-white border-opacity-10 rounded-md">
              <NavBar2 api={discussion.api} />

              {/*Displaying the discussion info:*/}
              <div className='pl-16 pr-8 py-2'>
                <Link to={`/Discussions/${discussion.api?.api_id}`}>
                  <p className='font-inter font-normal text-sm text-[#007BFF]  py-4'>&lt; Back to All Discussions</p>
                </Link>
                <p className='font-inter font-normal text-2xl text-secondary-gray  py-4'>{discussion.title}</p>

                <div >
                  <p className='text-base text-[#007BFF] '>{discussion.user?.username}</p>
                  <p className='text-sm text-white opacity-80'>
                    {formatDate(discussion.discussion_date)}
                  </p>
                  <br />
                </div>
                <p className='text-base text-white opacity-80'>{discussion.content}</p>
              </div>

              {/*Displaying the replies:*/}
              <div className='pl-16 pr-8 py-2'>
                {replies.map(reply => (
                  <div key={reply.reply_id} className='flex flex-col my-7 border-b border-white border-opacity-10'>
                    <div className='bg-[#081028] border-b border-white border-opacity-10 pl-6 pr-8 flex items-center justify-between'>
                      <p className='text-base text-[#007BFF]'>
                        {reply.author.username} <span className='text-sm text-white opacity-80'>Commented {formatDate(reply.reply_date)}</span>
                      </p>
                    </div>
                    <div className='pl-6 pr-8 py-2'>
                      <p className='text-sm text-white opacity-80'>
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='pl-16 pr-8 py-1 flex flex-col'>
                <p className='text-sm text-white opacity-80 pb-1'>Join in the discussion - add comment below:</p>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-[#081028] text-white border border-[#404040] h-40 rounded-md p-2"
                />
                <button
                  onClick={handlePostComment}
                  className="text-white font-semibold text-sm bg-[#141943] border border-[#404040] px-1 py-1 my-2 max-w-[9rem] rounded-md"
                >
                  Post Comment
                </button>
              </div>


            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};


export default DiscussionDetailsPage;
