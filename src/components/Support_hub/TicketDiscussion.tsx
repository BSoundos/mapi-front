import '@/styles/index.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FetchTicketReplies, AddTicketReply } from '@/components/features/tickets/TicketDiscussionSlice';
import {updateTicketStatus,updateTicketPriority} from '@/components/features/tickets/TicketSlice';
import sendIcon from '@/assets/icons/send.svg';
import attachmentIcon from '@/assets/icons/attachement.png';
import { RootState,useAppDispatch } from '@/app/store';
import UpdateTicketForm from '@/components/Support_hub/UpdateTicketForm';
import { useNavigate } from 'react-router-dom';
import { STATUS_CHOICES, PRIORITY_CHOICES } from '@/types/choices';
import { BACKEND_BASE_URL } from '@/data/constants';
import { FaFile } from 'react-icons/fa';

// Priority Mapping 
const priorityMapping = {
  1: { text: 'High', color: 'text-[#7C1717]', bgcolor: 'bg-[#FF8080]' },
  2: { text: 'Medium', color: 'text-[#916818]', bgcolor: 'bg-[#E7D695]' },
  3: { text: 'Low', color: 'text-[#A3B723]', bgcolor: 'bg-[#EFF5CD]' },
};


// Define prop types for TicketItem
interface TicketDiscussionProps {
  id: number;
  title: string;
  content:string;
  priority: number;
  userid:number;
  currentStatus: string;
  forUser: boolean;
}

const TicketDiscussion: React.FC<TicketDiscussionProps> = ({
  id,
  userid,
  title,
  content,
  priority,
  currentStatus,
  forUser = false, 
}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  const [selectedPriority, setSelectedPriority] = useState(priority); 

  const [selectedStatus, setSelectedStatus] = useState();
  const [updateMessage, setUpdateMessage] = useState('');

  const dispatch = useAppDispatch();
  const replies = useSelector((state: RootState) => state.ticketReplies.replies);

  const [replyContent, setReplyContent] = useState('');
  const navigate = useNavigate();

  const [priorityDetails, setPriorityDetails] = useState(priorityMapping[priority]); // Initial priority details


  useEffect(() => {
    dispatch(FetchTicketReplies(id)); // Fetch replies when component mounts or id changes
  }, [id, dispatch]); // Re-run when id changes

  // const handleSendReply = async () => {
  //   if (replyContent.trim()) {
  //     await dispatch(AddTicketReply({ ticketId: id, content: replyContent })); // Add new reply
  //     setReplyContent(''); // Clear the input
  //   }
  // };

  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState(''); // State to hold the attachment file name

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setAttachmentName(file.name); // Set the file name in state
      // You can also add code here to preview the file or handle the upload
    }
  };

  const handleSendReply = async () => {
    if (replyContent.trim() || attachment) {
      const formData = new FormData();
      formData.append('ticketId', id);
      formData.append('content', replyContent);
      if (attachment) {
        formData.append('attachment', attachment);
      }
  
      await dispatch(AddTicketReply({ formData, ticketId: id })); // Pass an object with formData and ticketId
      setReplyContent(''); // Clear the input
      setAttachment(null); // Clear the attachment
      setAttachmentName('');
    }
  };


  const handleStatusClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitStatus = (e) => {
    e.preventDefault();
    dispatch(updateTicketStatus({ ticketId: id, newStatus: selectedStatus, updateMessage }));
    setIsModalOpen(false); // Close the modal after submitting
    navigate(`/TicketsDiscussions/${id}`);
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
    navigate(`/TicketsDiscussions/${id}`);
  }; 

  // Update priorityDetails when selectedPriority changes
  useEffect(() => {
    setPriorityDetails(priorityMapping[priority]);
  }, [priority]);

  const getReplyAlignment = (reply: any) => {

    const isAuthor = userid === reply.author_object_id;
    let alignmentClass;

    if (forUser) {
      alignmentClass = isAuthor ? 'justify-end' : 'justify-start'; // Inversed alignment for `forUser`
    } else {
      alignmentClass = isAuthor ? 'justify-start' : 'justify-end'; // Default alignment
    }

    return `${alignmentClass}`;
  };

  const getReplyStyle = (reply: any) => {

    const isAuthor = userid === reply.author_object_id;
    let styleClass;

    if (forUser) {
      styleClass = isAuthor ? 'bg-mapi-neutral-1 p-3 rounded-md' : ''; // Add background and padding if not author
    } else {
      styleClass = isAuthor ? '' : 'bg-mapi-neutral-1 p-3 rounded-md'; // Add styles if not author
    }

    return `${styleClass}`;
  };

  const isImage = (fileName: string) => {
    return /\.(jpg|jpeg|png|gif)$/.test(fileName);
  };

  const getFileNameFromPath = (filePath) => {
    if (!filePath) return '';
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  };

  return (
     
    <div className="flex flex-col h-full mb-2 p-4 text-sm " >
      <div className="border-b font-inter border-[#343B4F] pb-3">
        <div className="flex justify-between ">
         {!forUser ? (
          <>
            <div className="flex space-x-4">
              <p className={`${priorityDetails.bgcolor} text-sm rounded-md px-2 py-1 cursor-pointer ${priorityDetails.color}`} onClick={handlePriorityClick}>
                {priorityDetails.text}</p>
              <p className="text-20px text-white">Ticket ID: <span>#{id}</span></p>
            </div>
            <p className="text-mapi-neutral-5 "> 
              Ticket Status :  
              <span 
                className="bg-[#FFD986] text-black rounded-md px-5 py-2 ml-2 cursor-pointer"
                onClick={handleStatusClick}
              >
                {currentStatus === 'in_progress' ? 'In progress' : currentStatus}
              </span>
            </p>
          </>
          ) : (
            <>
            <p className=" text-white text-l py-1" >
                Ticket Title : <span className=''>{title}</span>
            </p>
            <p className="text-mapi-neutral-5 "> 
              Ticket Status :  
              <span 
                className="bg-[#FFD986] text-black rounded-md px-5 py-2 ml-2"
              >
                {currentStatus === 'in_progress' ? 'In progress' : currentStatus}
              </span>
            </p>
            </>
          )}
        </div>
      </div>
      <div className="font-public-sans pt-4 text-white ">
        {!forUser && <h2 className="font-semibold text-sm mb-2">{title}</h2>}
        <p className=''>
            {content}
        </p>
      </div>

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

      

        <div className=" flex-1 pt-4 font-public-sans  overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]" >
          {replies.map((reply) => (
             <div
             key={reply.id}
             className={`m-2 flex ${getReplyAlignment(reply)}`}
              >
              <div
                className={`flex flex-col ${getReplyStyle(reply)}`}
              >
                <p className="text-white">{reply.content}</p>
                {reply.attachment && (
                  <div className="mt-2">
                    
                      <div className="flex items-center">
                      <FaFile className="h-5 w-5 text-gray-500" />
                        <span className="ml-2 text-white">
                          <a href={`${BACKEND_BASE_URL}/media/ticket_attachments/${getFileNameFromPath(reply.attachment)}/`}>
                          {getFileNameFromPath(reply.attachment)}</a>
                        </span>
                      </div>
                    
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 flex flex-col">
        {/* Display the selected file name */}
        {attachmentName != '' && (
          <div className="px-4 py-2 rounded bg-mapi-neutral-1 text-white mb-2">
            {attachmentName}
          </div>
        )}
  
        <div className="flex justify-between">
        <input
          type="text"
          placeholder="Add a reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendReply();
            }
          }}
          className="flex-1 px-4 py-2 rounded bg-mapi-neutral-1 text-white"
        />
        <label htmlFor="attachment" className="mr-2 cursor-pointer ml-2 px-2 py-2 bg-secondary-blue rounded">
          <img src={attachmentIcon} alt="Attach file" className="h-5 w-5" />
        </label>
        <input
          type="file"
          id="attachment"
          className="hidden"
          onChange={handleAttachmentChange}
        />
        <button className="ml-2 px-2 py-2 bg-secondary-blue rounded" onClick={handleSendReply}>
          <img src={sendIcon} alt="Send" className="h-5 w-5" />
        </button>
      </div>
    </div>

      
        


    </div>
  );
};

export default TicketDiscussion;
