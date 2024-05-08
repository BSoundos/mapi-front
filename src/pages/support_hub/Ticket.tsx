import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { clearError,FetchProviderTickets,searchTickets,fetchTicketsByStatus,fetchTicketsByPriority,fetchTicketsByNewest } from '@/components/features/tickets/TicketSlice';
import { useAppDispatch,RootState } from '@/app/store'; 
import TicketDescription from '@/components/Support_hub/TicketDescription';
import SupportNav from '@/components/Support_hub/SupportNav';
import { Ticket } from '@/types/Ticket';
import PaginationR from '@/components/PaginationR';
import Sidebar from '@/components/Support_hub/Sidebar';
import ErrorModal from '@/components/Support_hub/ErrorModal';
import SearchInput from '@/components/searchInput';
import { STATUS_CHOICES, PRIORITY_CHOICES } from '@/types/choices';
import CustomSelect from '@/components/Support_hub/CustomSelect'; 
import SideBarPro from '@/components/apis_management/SideBarPro';

const TicketPage = () => {
    
  const dispatch = useAppDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const loading = useSelector((state: RootState) => state.ticket.loading);
  const error = useSelector((state: RootState) => state.ticket.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Ticket[]>(tickets);

  const [showError, setShowError] = useState(false);
  
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

  

  return (
    <div className='flex'>
    <SideBarPro/>
    <div className='flex-1 bg-mapi-neutral-2 overflow-y-auto max-h-screen  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]'>

      <SupportNav />
      <div className='m-12'>
      {isErrorModalOpen && (
            <ErrorModal
              title="Error"
              isOpen={isErrorModalOpen}
              message={error}
              onClose={handleCloseErrorModal}
            />
          )}
      

      <div className='px-6'>
        <h4 className="font-inter font-bold text-white text-2xl">Tickets Tracking</h4>
        <div className="font-public-sans flex justify-start space-x-6 text-[#BFBFBF] mt-8">
          <CustomSelect
            options={PRIORITY_CHOICES}
            onChange={handleFilterByPriority}
            defaultFirstOption="By Priority" // Customizable default option
          />
          <CustomSelect
            options={STATUS_CHOICES}
            onChange={handleFilterByStatus}
            defaultFirstOption="By Status" // Customizable default option
          />
          <button className="bg-mapi-neutral-1 rounded-md px-5 py-2 hover:border hover:border-mapi-secondary-3"
          onClick={handleFilterByNewest} >Newest</button>
        </div>
      </div>


      <div className='mt-9 flex justify-end'> 
        <div className="w-1/3 rounded-md border border-opacity-50 border-[#343B4F]">
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


