import React from 'react';
import { Link } from 'react-router-dom';
import checkIcon from '@/assets/icons/check.svg';
import '@/styles/index.css';
import { useEffect,useState } from 'react';
import { useAppDispatch,RootState } from '@/app/store'; 
import {updateTicketStatus,updateTicketPriority,deleteTicket} from '@/components/features/tickets/TicketSlice';
import UpdateTicketForm from '@/components/UpdateTicketForm';


// Priority Mapping 
const priorityMapping = {
  1: { text: 'High', color: 'text-[#D8727D]', bgcolor: 'bg-custom-opacity-red' },
  2: { text: 'Medium', color: 'text-[#E7D695]', bgcolor: 'bg-custom-opacity-brown' },
  3: { text: 'Low', color: 'text-[#EFF5CD]', bgcolor: 'bg-custom-opacity-yellow' },
};

// Function to format date with default value handling
const formatDate = (dateString) => {
  if (!dateString) return 'Invalid date';

  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = (timePart.split('.')[0]).split(':');
  
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};


// Define radio button choices
const STATUS_CHOICES = [
  { value: 'open', label: 'Open' },
  { value: 'solved', label: 'Solved' },
  { value: 'closed', label: 'Closed' },
  { value: 'in_progress', label: 'In Progress' },
];

// Define radio button choices
const PRIORITY_CHOICES = [
  { value: 1, label: 'High' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'Low' },
];


const TicketDescription = ({ id, title, content, postDate, currentStatus, priority, username, statusHistory,forUser=false, apiName="" }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modals visibility
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [selectedPriority, setSelectedPriority] = useState(priority);
  const [updateMessage, setUpdateMessage] = useState('');

  const [priorityDetails, setPriorityDetails] = useState(priorityMapping[priority]); // Initial priority details


  // Update priorityDetails when selectedPriority changes
  useEffect(() => {
    setPriorityDetails(priorityMapping[priority]);
  }, [priority]);

  const handleStatusClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitStatus = (e) => {
    e.preventDefault();
    dispatch(updateTicketStatus({ ticketId: id, newStatus: selectedStatus, updateMessage }));
    setIsModalOpen(false); // Close the modal after submitting
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setIsPriorityModalOpen(false);
  };

  const handlePriorityClick = () => {
    setIsPriorityModalOpen(true); // Open the modal when priority is clicked
  };

  const handleSubmitPriority = (e) => {
    e.preventDefault();
    dispatch(updateTicketPriority({ ticketId: id, newPriority: selectedPriority }));
    setIsPriorityModalOpen(false);
  }; 

  const handleDelete = () => {
    dispatch(deleteTicket(id));
  };


  return (
    <div className="bg-mapi-neutral-1 font-inter w-full mb-4 p-6 border border-opacity-50 border-[#343B4F] rounded-[7px]">
      {isPriorityModalOpen && (
      <UpdateTicketForm
        isOpen={isPriorityModalOpen}
        name="priority"
        title="Priority"
        choices={PRIORITY_CHOICES}
        selectedChoice={selectedPriority}
        setSelectedChoice={setSelectedPriority}
        updateMessage={updateMessage}
        setUpdateMessage={setUpdateMessage}
        onSubmit={handleSubmitPriority}
        onClose={closeModal}
        hasMessage = {false}
      />
      )
      }
      {isModalOpen && (
      <UpdateTicketForm
        isOpen={isModalOpen}
        name="status"
        title="Status"
        choices={STATUS_CHOICES}
        selectedChoice={selectedStatus}
        setSelectedChoice={setSelectedStatus}
        updateMessage={updateMessage}
        setUpdateMessage={setUpdateMessage}
        onSubmit={handleSubmitStatus}
        onClose={closeModal}
      />
      )}





      {/* Main Content */}
      
        {!forUser && (
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              <p className={`${priorityDetails.bgcolor} rounded-md px-2 py-1 cursor-pointer ${priorityDetails.color}`} onClick={handlePriorityClick}>
                {priorityDetails.text}
              </p>
              <p className="bg-[#FFD986] rounded-md px-5 py-2 cursor-pointer" onClick={handleStatusClick}>
                {currentStatus === 'in_progress' ? 'In progress' : currentStatus}
              </p>
            </div>
            <p className="text-white mt-1">Posted on {formatDate(postDate)}</p>
          </div>
          )
        }
       <div className="pb-4">
       <div className="flex justify-between items-center pb-4">
            <div>
                {forUser ? (
                    <Link to={`/userDiscussions/${id}`}>
                      <h2 className="font-semibold text-base text-white mb-2">{title}</h2>
                    </Link>    
                ) : (
                  <Link to={`/Discussions/${id}`}>
                    <h2 className="font-semibold text-base text-white mb-2">{title}</h2>
                  </Link>
                )}
            </div>

            {forUser && (
              <button
                className="bg-red-500 border font-bold text-base py-2 px-4 rounded-md text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
         <p className="text-[#787486]">{content}</p>
       </div>
       <div className="border-t border-gray-400 pt-5">
          {forUser ? (
              <p className="text-white">For the API : <span className="text-secondary-blue">{apiName}</span></p>
                ) : (
                  <p className="text-white">By: <span className="text-secondary-blue">{username}</span></p>  
                )}
         


         <div className="pl-2 flex items-center space-x-40 pt-8">
           {statusHistory.map((status, index) => (
             <div key={status.id} className="relative flex flex-col items-center">
               {index < statusHistory.length - 1 && (
                 <div
                   className="absolute top-2.5 left-[90%] h-2 border-t border-[#0AB161]"
                   style={{ width: 'calc(100% + 150px)' }}
                 ></div>
               )}
               <div className="relative group"> 
               <img src={checkIcon} alt="Check Icon" className="w-5 h-5" />
               
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                      opacity-0 bg-gray-700 text-white text-sm rounded-md 
                      py-1 px-4 transition-opacity duration-300 group-hover:opacity-100 
                      max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                 {status.update_message}
               </div>
             </div>
             </div>
           ))}
         </div>
         <div className="flex items-center pt-3" style={{ gap: '7.4rem' }}>
           {statusHistory.map((status, index) => (
             <div key={status.id} className="relative flex flex-col items-center">
               <p className="text-white">
                 {status.status === 'in_progress' ? 'In progress' : status.status}
               </p>
             </div>
           ))}
         </div>
       </div>
     </div>
  )
};

export default TicketDescription;
