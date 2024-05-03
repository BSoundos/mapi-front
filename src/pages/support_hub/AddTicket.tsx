import React, { useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { addTicket } from '@/components/features/tickets/TicketSlice';
import { useNavigate,useParams } from 'react-router-dom';


const UserAddTicket = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { pk } = useParams(); // Get the API ID from the URL
  
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const apiPk = parseInt(pk);

        if (isNaN(apiPk)) {
          // Handle the case when pk is not a valid number
          console.error('Invalid API ID :',apiPk);
          return;
        }
      
        await dispatch(addTicket({ apiPk, title, content }));
      
        setTitle('');
        setContent('');
        navigate('/userTickets');
    };
  

 



  return (
    // <div className="flex">
    //   <div className="flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-[100vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
    //     <div className="m-12">
    //       <h4 className="ml-4 font-inter font-bold text-white text-2xl">Add ticket</h4>
    //       <div className="bg-mapi-neutral-3 border border-corner-1-300 p-5 rounded-[7px] mt-7 flex" style={{ height: '500px' }}>
    //       {/* Flex container */}
          
    //         <div className="flex flex-col items-center justify-center w-full h-full" > {/*width for replies */}
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="flex items-center mb-6">
    //                         <label htmlFor="title" className="text-sm text-white font-semibold">Title:</label>
    //                         <input
    //                         type="text"
    //                         id="title"
    //                         value={title}
    //                         onChange={(e) => setTitle(e.target.value)}
    //                         required
    //                         />
    //                     </div>
    //                     <div className="flex items-center">
                        
    //                         <label htmlFor="content" className="text-sm text-white font-semibold">Content:</label>
    //                         <textarea
    //                         id="content"
    //                         value={content}
    //                         onChange={(e) => setContent(e.target.value)}
    //                         required
    //                         className="w-full px-3 py-2 border rounded"
    //                         />
    //                     </div>
    //                     <button type="submit" className="bg-primary-dark mt-5 border font-bold text-base py-2 px-16 rounded-md text-white">Add Ticket</button>
    //             </form>

              
    //         </div>
    //       </div>
          
    //     </div>
    //   </div>
    // </div>
    <div className="flex">
            <div className="flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-[100vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
                <div className="m-12">
                    <h4 className="ml-4 font-inter font-bold text-white text-2xl">Add Ticket</h4>
                    <div className="bg-mapi-neutral-3 border border-corner-1-300 p-5 rounded-[7px] mt-7 flex justify-center" style={{ height: '500px' }}>
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <form onSubmit={handleSubmit} className="w-2/3"> {/* Form has fixed width */}
                                <div className="mb-6 flex flex-col"> {/* Flex container for alignment */}
                                    <label htmlFor="title" className="text-sm mb-2  text-white font-semibold">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="text-white bg-mapi-neutral-3 px-3 py-2 border border-opacity-50 border-[#343B4F] rounded w-full" 
                                    />
                                </div>

                                <div className="mb-6 flex flex-col"> {/* Another flex container for consistent alignment */}
                                    <label htmlFor="content" className="mb-2 text-sm text-white font-semibold">Content:</label>
                                    <textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        className="text-white bg-mapi-neutral-3 px-3 py-2 border border-opacity-50 border-[#343B4F] rounded w-full" 
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary-dark border font-bold text-base py-2 px-16 rounded-md text-white"
                                >
                                    Add Ticket
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default UserAddTicket;
