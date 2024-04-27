import React from "react";
import "@/styles/index.css"
import { Link } from 'react-router-dom';
import checkIcon  from '../assets/icons/check.svg';

interface TicketDescriptionProps {
      id:number;
      title: string;
      postDate: string; 
      currentStatus : string;
      content:string;
      priority:number;
      username:string;
      statusHistory: Array<{
        id: number;
        status: string;
        update_message: string;
        update_date: string;
      }>;
}

type PriorityMappingType = { [key: number]: { text: string; color: string; bgcolor: string; } };

const priorityMapping: PriorityMappingType = {
  1: { text: 'High', color: 'text-[#D8727D]' , bgcolor: 'bg-custom-opacity-red' }, // Red for high priority
  2: { text: 'Medium', color: 'text-[#E7D695]' , bgcolor: 'bg-custom-opacity-brown' }, // Brown for medium priority
  3: { text: 'Low', color: 'text-[#EFF5CD]', bgcolor: 'bg-custom-opacity-yellow' }, // Yellow for low priority
};

const formatDate = (dateString: string): string => {
    // Split the date string into its components
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = (timePart.split('.')[0]).split(':'); // Exclude milliseconds
  
    // Create a new Date object using the components
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1, // Months are 0-indexed in JavaScript Date objects
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    );
  
    // Format the date as needed
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
  };

const TicketDescription: React.FC<TicketDescriptionProps> = ({ id,title,content, postDate,currentStatus,priority,username , statusHistory }) => {
  const priorityInfo = priorityMapping[priority] || 'Unknown';  // Use 'Unknown' as fallback if the key is not found
  
  return (
          <div className="bg-mapi-neutral-1 font-inter w-full mb-4 p-6 border border-opacity-50 border-[#343B4F]  rounded-[7px]">
                <div className="flex justify-between mb-4">
                  <div className="flex space-x-4">  
                    <p className={`${priorityInfo.bgcolor} rounded-[4.25px] px-2 py-1 ${priorityInfo.color}`}>
                      {priorityInfo.text}
                    </p>
                    <p className="bg-[#FFD986] rounded-md px-5 py-2">
                      {currentStatus}
                    </p>
                  </div>
                  <p className="text-white mt-1">Posted on {formatDate(postDate)}</p>  
                </div>
                <div className="pb-4">
                  <Link to={`/ticket/${id}`}><h2 className="font-semibold text-20px text-white mb-2">{title}</h2></Link>
                  <p className=" text-[#787486]">{content}</p>
                </div>
                <div className="border-t border-gray-400 pt-5">
                  <p className=" text-white">By : <span className="text-secondary-blue">{username}</span></p>
                  <div className="flex space-x-20 pt-8"> 
                    {statusHistory.map((status) => (
                      <React.Fragment key={status.id}>
                        <div className="text-center flex flex-col items-center">
                          <img src={checkIcon} alt="Check Icon" className="w-5 h-5 text-gray-400" />
                          <p className="text-white">{status.status}</p>
                        </div>

    
                      </React.Fragment>
                  ))}
                  </div>
                </div>            
          </div>
        );
};
    
export default TicketDescription;