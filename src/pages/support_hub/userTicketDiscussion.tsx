import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FetchProviderTickets, searchTickets } from '@/components/features/tickets/TicketSlice';
import { FetchTicketReplies } from '@/components/features/tickets/TicketDiscussionSlice';
import { useAppDispatch, RootState } from '@/app/store';
import SupportNav from '@/components/SupportNav';
import Sidebar from '@/components/Sidebar';
import TicketItem from '@/components/TicketItem';
import { Ticket } from '@/types/Ticket';
import TicketDiscussion from '@/components/TicketDiscussion';
import { useParams,useNavigate } from 'react-router-dom';
import ErrorComponent from '@/components/ErrorComponent';


const UserTicketDiscussionPage = () => {
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const loading = useSelector((state: RootState) => state.ticket.loading);
  const error = useSelector((state: RootState) => state.ticket.error);

  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const replies = useSelector((state: RootState) => state.ticketReplies.replies);
  const loadingReplies = useSelector((state: RootState) => state.ticketReplies.loading);
  const errorReplies = useSelector((state: RootState) => state.ticketReplies.error);

  const { ticketId } = useParams(); // Get the ticket ID from the URL

  useEffect(() => {
    if (ticketId) {
        setSelectedTicketId(parseInt(ticketId)); // Set based on the URL
        dispatch(FetchTicketReplies(parseInt(ticketId))); // Fetch replies for this ticket
    }
  }, [ticketId]); // Run when ticketId is set

 

  return (
    <div className="flex">
      <div className="flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-[100vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
        <div className="m-12">
          <h4 className="ml-4 font-inter font-bold text-white text-2xl">Support & Discussions</h4>
          <div className="bg-mapi-neutral-3 border border-corner-1-300 p-5 rounded-[7px] mt-7 flex" style={{ height: '500px' }}>
          {/* Flex container */}
          
            <div className="w-full h-full " > {/*width for replies */}
              {selectedTicketId !== null && (
                <TicketDiscussion
                  key={selectedTicketId}
                  id={selectedTicketId}
                  userid={tickets.find((ticket) => ticket.id === selectedTicketId)?.user.id}
                  title={tickets.find((ticket) => ticket.id === selectedTicketId)?.title}
                  content={tickets.find((ticket) => ticket.id === selectedTicketId)?.content}
                  priority={tickets.find((ticket) => ticket.id === selectedTicketId)?.priority}
                  currentStatus={tickets.find((ticket) => ticket.id === selectedTicketId)?.status_history.length > 0 ? tickets.find((ticket) => ticket.id === selectedTicketId)?.status_history[tickets.find((ticket) => ticket.id === selectedTicketId)?.status_history.length - 1].status:'null'}
                  forUser = {true}
                />
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserTicketDiscussionPage;
