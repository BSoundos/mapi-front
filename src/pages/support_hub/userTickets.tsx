import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchUserTickets } from '@/components/features/tickets/TicketSlice';
import { useAppDispatch,RootState } from '@/app/store'; 
import TicketDescription from '@/components/Support_hub/TicketDescription';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';


const UserTicketsPage  = () => {
    
    const dispatch = useAppDispatch();
    const tickets = useSelector((state: RootState) => state.ticket.tickets);
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);

    useEffect(() => {
        dispatch(FetchUserTickets());
    }, [dispatch]);


    return(
        <main>
            <Navbar />
            <div className="flex min-h-screen">
                {/* SideBar */}
                <div className='flex-1 bg-mapi-neutral-2'>
                    <div className='m-12'>
                        <div className='mb-10'>
                            <h4 className="font-inter font-bold text-white text-2xl mb-3">Support & Tickets Tracking</h4>
                            <p className='text-[#BFBFBF]'>Keep track of your support tickets.</p>
                        </div>
                        <div>
                            <h2 className="font-inter font-bold text-white text-xl mb-3">My Tickets</h2>
                            {tickets.map(ticket =>
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
                            )
            
                            }
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </main>
    );
    
};

export default UserTicketsPage;