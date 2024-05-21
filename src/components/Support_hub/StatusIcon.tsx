import { useState } from 'react';
import checkIcon from '@/assets/icons/check.svg';

const StatusIcon = ({ status }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <img src={checkIcon} alt="Check Icon" className="w-5 h-5" />
      {isTooltipVisible && (
        <div
            className="ml-4 absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm rounded-md py-2 px-2 shadow-lg max-w-xs whitespace-nowrap"
        >
          {status.update_message}
        </div>
      )}
    </div>
  );
};

export default StatusIcon;
