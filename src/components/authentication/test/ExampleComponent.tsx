// ExampleComponent.js
import React from 'react';
import { updateUserFirstName } from './api';

const ExampleComponent = () => {
  const handleUpdateFirstName = async () => {
    await updateUserFirstName('Djamel');
  };

  return (
    <div>
      <button onClick={handleUpdateFirstName}>Update First Name</button>
    </div>
  );
};

export default ExampleComponent;
