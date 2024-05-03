import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FetchTicketReplies } from '@/components/features/tickets/TicketDiscussionSlice';
import { useAppDispatch, RootState } from '@/app/store';
import TicketDiscussion from '@/components/Support_hub/TicketDiscussion';
import { useParams,Link } from 'react-router-dom';
import { getTicketById } from '@/components/features/tickets/TicketSlice';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

const UserTicketDiscussionPage = () => {
  const dispatch = useAppDispatch();
  const { ticketId } = useParams(); // Extract the ticketID from the URL

  // Fetch the ticketdata from Redux
  const ticket= useSelector((state: RootState) => state.ticket.ticket);
  const loadingTicket= useSelector((state: RootState) => state.ticket.loading);
  const errorTicket= useSelector((state: RootState) => state.ticket.error);

  // Fetch the ticketby ID when the component mounts or when the ticketID changes
  useEffect(() => {
    if (ticketId) {
      const ticketIdNum = parseInt(ticketId, 10); // Convert the ticketID to a number
      dispatch(getTicketById(ticketIdNum)); // Fetch the ticketby ID
    }
  }, [ticketId, dispatch]); // Re-run when ticketId changes

  if (loadingTicket) {
    return <div>Loading...</div>; // Display loading message
  }

  if (errorTicket) {
    return <div>Error: {errorTicket}</div>; // Display error message
  }
 

  return ( 
    <main>
      <Navbar />
        <div className="flex min-h-screen">
          <div className="flex-1 bg-mapi-neutral-2 ">
          <div className='m-12'>
                <div className='mb-10'>
                    <h4 className="font-inter font-bold text-white text-2xl mb-3">Support & Tickets Tracking</h4>
                    <p className='text-[#BFBFBF] pb-3'>Keep track of your support tickets.</p>
                    <Link
                    to="/userTickets"  // Link to UserTicketsPage
                    className="text-secondary-blue underline hover:text-secondary-blue transition" 
                  >
                    Go back to all tickets
                  </Link>
                </div>
                
              

                <div className="bg-mapi-neutral-3 p-2 border border-opacity-50 border-[#343B4F] rounded-md flex h-screen">
                <div className="w-full h-full " > 
                  {ticket !== null && (
                    <TicketDiscussion
                      key={ticket.id}
                      id={ticket.id}
                      userid={ticket.user.id}
                      title={ticket.title}
                      content={ticket.content}
                      priority={ticket.priority}
                      currentStatus={ticket.status_history.length > 0 ? ticket.status_history[ticket.status_history.length - 1].status:'null'}
                      forUser = {true}
                    />
                  )}
                </div>
                </div>

              
            </div>
          </div>
        </div>
      <Footer />
  </main>
  );
};

export default UserTicketDiscussionPage;
