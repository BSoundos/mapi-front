import React from 'react';

const ErrorComponent = ({ errorMessage, title = 'Error' }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-mapi-neutral-2 bg-opacity-90 z-50" 
      role="alert"
    >
      <div className="bg-mapi-neutral-3 text-white p-10 rounded-md max-w-sm flex flex-col items-center">
        <strong className="text-lg font-bold">{title}</strong>
        <p className='pt-5 text-center'>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
