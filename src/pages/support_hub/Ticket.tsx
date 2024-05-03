import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { FetchProviderTickets,searchTickets,fetchTicketsByStatus,fetchTicketsByPriority,fetchTicketsByNewest } from '@/components/features/tickets/TicketSlice';
import { useAppDispatch,RootState } from '@/app/store'; 
import TicketDescription from '@/components/TicketDescription';
import SupportNav from '@/components/SupportNav';
import { Ticket } from '@/types/Ticket';
import PaginationR from '@/components/PaginationR';
import Sidebar from '@/components/Sidebar';
import ErrorComponent from '@/components/ErrorComponent';
import SearchInput from '@/components/searchInput';

const TicketPage = () => {
    
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const loading = useSelector((state: RootState) => state.ticket.loading);
  const error = useSelector((state: RootState) => state.ticket.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Ticket[]>(tickets);
  
  // Pagination setup
  const totalTickets = searchResults.length
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 2; // Number of tickets per page

  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = Math.min(startIndex + ticketsPerPage, totalTickets);

  // Get tickets for the current page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderTickets = () => {
    const paginatedTickets = [];
    for (let i = startIndex; i < endIndex; i++) {
      const ticket = searchResults[i]; // Retrieve ticket from searchResults
      paginatedTickets.push(
        <TicketDescription
          key={ticket.id}
          id={ticket.id}
          title={ticket.title}
          content={ticket.content}
          priority={ticket.priority}
          username={ticket.user.username}
          postDate={ticket.status_history.length > 0 ? ticket.status_history[0].update_date : 'No update date'}
          currentStatus={ticket.status_history.length > 0 ? ticket.status_history[ticket.status_history.length - 1].status : 'null'}
          statusHistory={ticket.status_history}
        />
      );
    }
    return paginatedTickets;
  };

  useEffect(() => {
    dispatch(FetchProviderTickets());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(tickets);
  }, [tickets]); 

  const handleSearch = async () => {
    const actionResult = await dispatch(searchTickets(searchTerm));
    if (searchTickets.fulfilled.match(actionResult) ) {
        setSearchResults(actionResult.payload);
    }
    
    setCurrentPage(1);
  };

  const handleFilterByStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStatus = event.target.value; // Converts the string value to an integer
  
    const actionResult = await dispatch(fetchTicketsByStatus(selectedStatus));
    if (fetchTicketsByStatus.fulfilled.match(actionResult)) {
      setSearchResults(actionResult.payload); 
    } 
    setCurrentPage(1);
  };

  const handleFilterByPriority = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPriority = parseInt(event.target.value, 10); // Converts the string value to an integer
  
    const actionResult = await dispatch(fetchTicketsByPriority(selectedPriority));
    if (fetchTicketsByPriority.fulfilled.match(actionResult) ) {
      setSearchResults(actionResult.payload); 
    }
    setCurrentPage(1);
  };

  const handleFilterByNewest = async () => {
    const actionResult = await dispatch(fetchTicketsByNewest());
    if (fetchTicketsByNewest.fulfilled.match(actionResult)) {
      setSearchResults(actionResult.payload);
    } 
    setCurrentPage(1);
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
    <div className='flex'>
    <Sidebar/>
    <div className='flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-[100vh]  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]'>
      <SupportNav />
      <div className='m-12'>
      <div className=''>
        <h4 className="font-inter font-bold text-white text-2xl">Tickets Tracking</h4>
        <div className="font-public-sans flex justify-start space-x-6 text-[#BFBFBF] mt-8">
        <select
          className="bg-mapi-neutral-1 rounded-md px-5 py-2 hover:border hover:border-mapi-secondary-3 focus:outline-none focus:border-mapi-secondary-3"
          onChange={handleFilterByPriority}
        >
          <option value="">By Priority</option>
          <option value="3">Low</option>
          <option value="2">Medium</option>
          <option value="1">High</option>
        </select>
        <select
          className="bg-mapi-neutral-1 rounded-md px-5 py-2 hover:border hover:border-mapi-secondary-3 focus:outline-none focus:border-mapi-secondary-3"
          onChange={handleFilterByStatus}
        >
          <option value="">By Status</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
          <option value="solved">Solved</option>
          <option value="open">Open</option>
        </select>
          <button className="bg-mapi-neutral-1 rounded-md px-5 py-2 hover:border hover:border-mapi-secondary-3"
          onClick={handleFilterByNewest} >Newest</button>
        </div>
      </div>


      <div className='mt-9 flex justify-end'> 
        <div className="w-1/3 rounded-[7px] border border-opacity-50 border-[#343B4F]">
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        </div>
      </div>
      
      <div className='mt-9 '>
          {renderTickets()}
          <div className='flex items-center justify-start pt-8 pb-20'>
            <PaginationR
              currentPage={currentPage}
              totalPages={Math.ceil(totalTickets/ ticketsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
      </div>

          
      </div>
      
    </div>
    </div>
  );
};

export default TicketPage;


