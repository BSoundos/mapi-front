import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FetchProviderTickets, searchTickets, clearError } from '@/components/features/tickets/TicketSlice';
import { useAppDispatch, RootState } from '@/app/store';
import SupportNav from '@/components/Support_hub/SupportNav';
import Sidebar from '@/components/Support_hub/Sidebar';
import TicketItem from '@/components/Support_hub/TicketItem';
import { Ticket } from '@/types/Ticket';
import TicketDiscussion from '@/components/Support_hub/TicketDiscussion';
import { useParams,useNavigate } from 'react-router-dom';
import ErrorModal from '@/components/Support_hub/ErrorModal';
import SearchInput from '@/components/searchInput';
import Loading from '@/components/ui/Loading';
import SideBarPro from '@/components/apis_management/SideBarPro';


const TicketDiscussionPage = () => {
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const loading = useSelector((state: RootState) => state.ticket.loading);
  const error = useSelector((state: RootState) => state.ticket.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Ticket[]>(tickets);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const [isForSearch, setIsForSearch] = useState(false); // State to check if it's the initial render

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true); // Open the error modal when there's an error
    }
  }, [error]); // Re-run when error state changes

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false); // Close the modal
    dispatch(clearError()); // Call clearError to reset the error state
  };


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
    return <Loading/>;
  }


 

  return (
    <div className="flex ">
      <SideBarPro />
      <div className="flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52] ">
        <SupportNav />
        <div className="px-6">
            {isErrorModalOpen && (
                <ErrorModal
                  title="Error"
                  isOpen={isErrorModalOpen}
                  message={error}
                  onClose={handleCloseErrorModal}
                />
              )}
          <h4 className="ml-4 mt-8 font-inter font-bold text-white text-lg">Support & Discussions</h4>
          <div className="bg-mapi-neutral-3 border border-corner-1-300 rounded-md mt-5 ml-5 p-5">

          
            <div className="bg-mapi-neutral-3 border border-opacity-50 border-[#343B4F] rounded-md flex h-screen ">
            {/* Flex container */}
            
              <div className="w-1/3 pl-3 border-r border-opacity-50 border-[#343B4F]"> {/* 1/3 width for TicketItem list */}
                <div className='mr-4 mb-4 mt-4'> 
                    <div className="w-full rounded-md border border-opacity-50 border-[#343B4F]">
                      <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                      />
                    </div>
                </div>
                <div className="overflow-y-auto h-5/6"> 
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

              <div className="w-2/3 h-full -pb-1"> 
                {selectedTicketId !== null && (
                  <TicketDiscussion
                    key={selectedTicketId}
                    id={selectedTicketId}
                    userid={searchResults.find((ticket) => ticket.id === selectedTicketId)?.user.id}
                    title={searchResults.find((ticket) => ticket.id === selectedTicketId)?.title}
                    content={searchResults.find((ticket) => ticket.id === selectedTicketId)?.content}
                    priority={searchResults.find((ticket) => ticket.id === selectedTicketId)?.priority}
                    currentStatus={searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history.length > 0 ? searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history[searchResults.find((ticket) => ticket.id === selectedTicketId)?.status_history.length - 1].status:'null'}
                    forUser={false}
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDiscussionPage;
