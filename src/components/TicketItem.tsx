import { Link } from 'react-router-dom';
import '@/styles/index.css';

// Priority Mapping
const priorityMapping = {
  1: { text: 'High', color: 'text-[#7C1717]', bgcolor: 'bg-[#FF8080]' },
  2: { text: 'Medium', color: 'text-[#916818]', bgcolor: 'bg-[#E7D695]' },
  3: { text: 'Low', color: 'text-[#A3B723]', bgcolor: 'bg-[#EFF5CD]' },
};

// Define prop types for TicketItem
interface TicketItemProps {
    id: number;
    title: string;
    priority: number;
    username: string;
    onClick?: () => void; 
    selected?: boolean;
}
  
const TicketItem: React.FC<TicketItemProps> = ({ id, title, priority, username, onClick,selected = false }) => {
  const priorityDetails = priorityMapping[priority] || { text: 'Unknown', color: '', bgcolor: '' };

  return (
    <div className={`font-public-sans mb-2 p-4 border border-opacity-50 border-[#343B4F] rounded-tl-[7px] rounded-bl-[7px] ${
        selected ? 'bg-mapi-neutral-1' : ''
      }`} onClick={onClick}>
      <div className="pb-2">
        <h2 className="font-semibold text-16px text-white mb-2">{title}</h2>
      </div>
      
      <div className="border-t border-[#343B4F] pt-2">
        <p className="" style={{ color: 'rgba(255, 255, 255, 0.87)' }}>Created By: <span>{username}</span></p>
        <div className="flex justify-between pt-2">
            <div className="flex space-x-4">
                <p className={`${priorityDetails.bgcolor} text-12px rounded-[4.25px] px-2 py-1 ${priorityDetails.color}`}>
                    {priorityDetails.text}
                </p>
                <p className='bg-custom-opacity-blue text-12px rounded-[4.25px] px-2 py-1 text-white'>
                    Ticket ID : #{id}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
