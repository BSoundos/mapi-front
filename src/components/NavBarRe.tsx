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
    <div className="bg-mapi-neutral-2 border-b-[#343B4F] border-b flex justify-between pl-12 pt-3 items-center">
    <div className="flex gap-5">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`text-base pb-4 mr-5 ${
            (item.text === 'Pricing' &&
           (pathname === '/pricing/public' || pathname.includes('pricing'))) ||
             pathname === item.path
              ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 font-bold'
              : 'text-white'
          }`}
        >
          <span className="">{item.text}</span>
        </Link>
      ))}
    </div>
                
    </div>
  );
};

export default NavBarRe;
