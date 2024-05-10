import SideBarUser from '@/components/SideBarUser';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { FetchUserTickets } from '@/components/features/tickets/TicketSlice';
import { useAppDispatch,RootState } from '@/app/store'; 
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TicketDescription from '@/components/Support_hub/TicketDescription';
import { Ticket } from '@/types/Ticket';
import { searchUserTickets } from '@/components/features/tickets/TicketSlice';
import SearchInput from '@/components/searchInput';
import PaginationR from '@/components/PaginationR';

const UserTicketsPage  = () => {
    
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
              forUser={true}
              apiName={ticket.api.name}
          />
        );
      }
      return paginatedTickets;
    };
  
    useEffect(() => {
      dispatch(FetchUserTickets());
  }, [dispatch]);
  
    useEffect(() => {
      setSearchResults(tickets);
    }, [tickets]); 
  
    const handleSearch = async () => {
      const actionResult = await dispatch(searchUserTickets(searchTerm));
      if (searchUserTickets.fulfilled.match(actionResult) ) {
          setSearchResults(actionResult.payload);
      }
      
      setCurrentPage(1);
    };
    return(
        <main className=''>
        <Navbar />
        <div className="flex bg-mapi-neutral-2 pt-3 ">
          <SideBarUser />
          <div className='flex-1 bg-mapi-neutral-1 border rounded-md border-[#7E89AC] border-opacity-30 mx-4 mb-4 '>
            <div className='pb-6 px-6 pt-3'>
              <div className='mb-6'>
                <h4 className="font-inter font-bold text-white text-xl mb-3">Support & Tickets Tracking</h4>
                <p className='text-[#BFBFBF]'>Keep track of your support tickets.</p>
              </div>
              <div>
                <h2 className="font-inter font-bold text-white text-base mb-3 overflow-y-auto w-fit scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">My Tickets</h2>

                            
                            <div className='mt-9 flex justify-end'> 
                                <div className="w-1/3 rounded-md border border-opacity-50 border-[#343B4F]">
                                <SearchInput
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    handleSearch={handleSearch}
                                    placeholder="Search a ticket"
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
        </div>
        <Footer />
      </main>
  
    );
    
};

export default UserTicketsPage;