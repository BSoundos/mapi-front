import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

const NavBarRe = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const items = [
        {text: 'Analytics', path: '/Revenue' },
        { text: 'Performance Tracking', path: '/Performance-Tracking' },
    
    
      ];
  return (
    <div>
  <div className="mb-4">
            <div className="  border-b border-opacity-30 border-[#7E89AC]">
                <div className="flex justify-center ">
                {items.map((item, index) => (
                    <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center   text-md p-3  rounded-lg font-semibold  ${
                        pathname === item.path ? '  border-mapi-secondary-3 text-mapi-secondary-3 shadow-link  ' : 'text-mapi-neutral-4'
                    }`}
                    
                    >
            <span className="ml-3">{item.text}</span>
            </Link>
        ))}
                </div>
                
            
            
            </div>
    </div>
    </div>
  );
};

export default NavBarRe;
