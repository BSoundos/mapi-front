import React, { useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { addTicket } from '@/components/features/tickets/TicketSlice';
import { useNavigate,useParams } from 'react-router-dom';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import NavBar2 from '@/components/NavBar2';


const UserAddTicket = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { pk } = useParams(); // Get the API ID from the URL
  
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const apiPk = parseInt(pk);

        
      
        await dispatch(addTicket({ apiPk, title, content }));
      
        setTitle('');
        setContent('');
        navigate('/userTickets');
    };
  

 



  return (
    <main>
      <Navbar />
          <div className="flex min-h-screen"> 
            <div className="flex-1 bg-mapi-neutral-3"> 
              <div className="m-12">

                <div className="mb-10 border-b border-corner-1-300"> 
                  <h4 className="font-inter font-bold text-white text-2xl mb-3">New Ticket</h4>
                  <p className="text-[#BFBFBF] pb-3">Send a ticket to the provider for support.</p>
                </div>

                <div className="mt-7"> 
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex justify-between"> 
                      <label htmlFor="title" className="text-sm text-[#BFBFBF] font-semibold w-1/6">Title :</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-white bg-mapi-neutral-3 px-3 py-2 border border-opacity-50 border-[#BFBFBF] rounded w-5/6" 
                      />
                    </div>

                    <div className="mb-6 flex justify-between"> 
                      <label htmlFor="content" className="text-sm text-[#BFBFBF] font-semibold w-1/6">Description :</label>
                      <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="text-white bg-mapi-neutral-3 px-3 py-2 border border-opacity-50 border-[#BFBFBF] rounded w-5/6"
                        rows={10} 
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-primary-dark border font-bold text-base py-2 px-16 rounded-md text-white"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    <Footer />
  </main>
);
};

export default UserAddTicket;
