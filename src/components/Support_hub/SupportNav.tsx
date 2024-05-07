import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "@/styles/index.css";

const SupportNavBar = () => {
  const location = useLocation(); 
  const [activeTab, setActiveTab] = useState('Tickets'); // Default to 'Tickets'


  useEffect(() => {
    if (location.pathname === '/Tickets') {
      setActiveTab('Tickets');
    } else if (location.pathname.startsWith('/Discussions')) {
      setActiveTab('Discussions');
    }
  }, [location]); 


  return (
    <div className="pt-10">
      <div className="flex space-x-10 pl-12">
        <Link
          to="/Tickets"
          className={`font-inter text-xl pb-3 ${
            activeTab === 'Tickets' ? 'text-mapi-secondary-3 font-bold border-b border-mapi-secondary-3' : 'text-white'
          }`}
        >
          Tickets
        </Link>
        <Link
          to="/Discussions"
          className={`font-inter text-xl pb-3 ${
            activeTab === 'Discussions' ? 'text-mapi-secondary-3 font-bold border-b border-mapi-secondary-3' : 'text-white'
          }`}
        >
          Discussions
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 border-b border-white opacity-50"></div>
      </div>
    </div>
  );
};

export default SupportNavBar;
