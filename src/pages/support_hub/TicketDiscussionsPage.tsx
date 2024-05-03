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
import SearchInput from '@/components/searchInput';


const TicketDiscussionPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const loading = useSelector((state: RootState) => state.ticket.loading);
  const error = useSelector((state: RootState) => state.ticket.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Ticket[]>(tickets);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const [isForSearch, setIsForSearch] = useState(false); // State to check if it's the initial render


  const { ticketId } = useParams(); // Get the ticket ID from the URL

  useEffect(() => {
    dispatch(FetchProviderTickets());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(tickets);
  }, [tickets]);

  useEffect(() => {
    if (tickets.length > 0) {
      if (ticketId && !isForSearch) { 
        setSelectedTicketId(parseInt(ticketId)); // Set based on the URL
      } else {
        setSelectedTicketId(searchResults[0].id); // Set to the first ticket
      }
    }
  }, [searchResults, ticketId]); // Run when tickets change or ticketId is set


  // Handle ticket click
  const handleTicketClick = (ticketId: number) => {
    setSelectedTicketId(ticketId); // Update selected ticket
  };

  const handleSearch = async () => {
  
    const actionResult = await dispatch(searchTickets(searchTerm)); // Dispatch the search action
    if (searchTickets.fulfilled.match(actionResult)) { // Check if the search was successful
      const results = actionResult.payload; // Retrieve the search results
      if (results.length === 0) {
        console.warn("No search results found."); // Log a warning if no results
      } else {
        setSearchResults(results); // Update search results
        if (ticketId) setIsForSearch(true);
      }
    }
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorComponent errorMessage={error} />
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-[100vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
        <SupportNav />
        <div className="m-12">
          <h4 className="ml-4 font-inter font-bold text-white text-2xl">Support & Discussions</h4>
          <div className="bg-mapi-neutral-3 border border-corner-1-300 p-5 rounded-[7px] mt-7 flex" style={{ height: '500px' }}>
          {/* Flex container */}
          
            <div className="w-1/3 pl-3 border border-opacity-50 border-[#343B4F] rounded-tl-[7px] rounded-bl-[7px] " style={{ height: '460px' }}> {/* 1/3 width for TicketItem list */}
              <div className='mr-4 mb-4 mt-4'> 
                  <div className="w-full rounded-[7px] border border-opacity-50 border-[#343B4F]">
                    <SearchInput
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      handleSearch={handleSearch}
                    />
                  </div>
              </div>
              <div className="overflow-y-auto" style={{ height: '85%' }}> 
                {searchResults.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    priority={ticket.priority}
                    username={ticket.user.username}
                    onClick={() => handleTicketClick(ticket.id)} 
                    selected={ticket.id === selectedTicketId}
                  />
                ))}
              </div>
            </div>

            <div className="w-2/3 h-full -pb-1 " > 
              {selectedTicketId !== null && (
                <TicketDiscussion
                  key={selectedTicketId}
                  id={selectedTicketId}
                  userid={searchResults.find((ticket) => ticket.id === selectedTicketId)?.user.id}
                  title={searchResults.find((ticket) => ticket.id === selectedTicketId)?.title}
                  content={searchResults.find((ticket) => ticket.id === selectedTicketId)?.content}
                  priority={searchResults.find((ticket) => ticket.id === selectedTicketId)?.priority}
                  currentStatus={searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history.length > 0 ? searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history[searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history.length - 1].status:'null'}
                />
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TicketDiscussionPage;
