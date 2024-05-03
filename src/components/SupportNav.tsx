import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "@/styles/index.css";

const SupportNavBar = () => {
  const location = useLocation(); // Get the current route
  const [activeTab, setActiveTab] = useState('Tickets'); // Default to 'Tickets'


  useEffect(() => {
    if (location.pathname === '/Tickets') {
      setActiveTab('Tickets');
    } else if (location.pathname.startsWith('/Discussions')) {
      setActiveTab('Discussions');
    }
  }, [location]); 

  const getIndicatorWidth = () => {
    return activeTab === 'Tickets' ? '6rem' : '9rem'; 
  };

  return (
    <div className="pt-10">
      <div className="flex space-x-10 pl-12">
        <Link
          to="/Tickets"
          className={`font-inter text-xl ${
            activeTab === 'Tickets' ? 'text-mapi-secondary-3 font-bold' : 'text-white'
          }`}
        >
          Tickets
        </Link>
        <Link
          to="/Discussions"
          className={`font-inter text-xl ${
            activeTab === 'Discussions' ? 'text-mapi-secondary-3 font-bold' : 'text-white'
          }`}
        >
          Discussions
        </Link>
      </div>

      <div className="relative mt-2">
        <div className="absolute inset-x-0 border-b border-white opacity-50"></div>
        <div
          className="absolute w-24 border-b-2 border-mapi-secondary-3"
          style={{
            width: getIndicatorWidth(),
            left: activeTab === 'Tickets' ? '35px' : '140px', 
          }}
        ></div>
      </div>
    </div>
  );
};

export default SupportNavBar;
