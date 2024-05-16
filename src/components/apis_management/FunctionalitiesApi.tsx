import React, { useState,useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import {useSelector } from 'react-redux';
import { addFunctionalityToApi, addNewFunctionality, deleteApiFunctionality } from '@/components/features/apis_management/apiSlice';
import { fetchFunctionalities } from '@/components/features/apis/functionalitiesSlice';
import { RootState, useAppDispatch } from '@/app/store';
import { Functionality } from '@/types/ApiProvider';

interface FunctionalitiesManagerProps {
  api: number;
  functionalities: Functionality[];
}

const FunctionalitiesApi: React.FC<FunctionalitiesManagerProps> = ({ api, functionalities }) => {
  const [selectedFunctionality, setSelectedFunctionality] = useState('');
  const [newFunctionalityName, setNewFunctionalityName] = useState('');
  const [newFunctionalityDescription, setNewFunctionalityDescription] = useState('');
  const allfunctionalities = useSelector((state: RootState) => state.functionalities.functionalities);
  const dispatch = useAppDispatch();
  const handleNewFunctionalityNameChange = (e) => {
    setNewFunctionalityName(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchFunctionalities());
  }, [dispatch]);

  const handleNewFunctionalityDescriptionChange = (e) => {
    setNewFunctionalityDescription(e.target.value);
  };

  const handleAddNewFunctionality = (e) => {
    e.preventDefault();
    if (newFunctionalityName && newFunctionalityDescription) {
      const newFunctionality = {
        name: newFunctionalityName,
        description: newFunctionalityDescription,
      };
      dispatch(addNewFunctionality({ id: api, data: newFunctionality }))
        .then((action) => {
          const { functionality_id, name } = action.payload;
          dispatch(addFunctionalityToApi({ id: functionality_id, functionalityName: name }));
          setNewFunctionalityName('');
          setNewFunctionalityDescription('');
        })
        .catch((error) => {
          alert('Failed to add new functionality. Please try again.');
        });
    } else {
      alert('Please provide a name and description for the new functionality.');
    }
  };

  const handleRemoveFunctionalityFromApi = (functionalityId: number) => {
    dispatch(deleteApiFunctionality({ functionalityPk: functionalityId }));
  };

  const handleAddFunctionality = (e) => {
    e.preventDefault();
    if (selectedFunctionality) {
      const functionality = allfunctionalities.find(func => func.functionality_id === parseInt(selectedFunctionality));
      if (functionality) {
        dispatch(addFunctionalityToApi({ functionalityId: functionality.functionality_id, functionalityName: functionality.name }));
      }
    }
  };

  const handleFuncInputChange = (e) => {
    setSelectedFunctionality(e.target.value);
  };

  return (
    <div className="mb-2 flex flex-col gap-1 w-3/4">
      <div className="block text-sm font-semibold text-[#BFBFBF] mb-3">Functionalities</div>
      <div className="flex-col border-[#7E89AC] border-opacity-30 border-2 rounded px-2 pt-2 pb-10 ">
        {functionalities?.map((func) => (
          <div key={func.functionality_id} className="flex justify-between items-center p-2 bg-[#2C5EAF] bg-opacity-10 mb-2 rounded-sm">
            <p className="text-mapi-text text-sm">{func.name}</p>
           <button onClick={() => handleRemoveFunctionalityFromApi(func.functionality_id)} className="border border-[#616161] p-1 rounded flex justify-center items-center">
             <FaXmark size={15} className="text-[#D84C10]" />
           </button>
         </div>
       ))}
     </div>
     <div className="flex items-center  gap-6 w-full mt-2">
       <label htmlFor="functionality" className="text-sm  text-[#BFBFBF]">Add  Existing Functionality: </label>
       <div className="flex gap-2 flex-1">
         <select id="functionality" name="functionality" value={selectedFunctionality} onChange={handleFuncInputChange} className=" mt-1 update-api-input flex-1">
           <option value="">Select Functionality</option>
           {allfunctionalities
            .filter(func => !functionalities?.some(f => f.functionality_id === func.functionality_id))
            .map(func => (
              <option key={func.functionality_id} value={func.functionality_id}>
                {func.name}
              </option>
            ))}
         </select>
         <button onClick={handleAddFunctionality} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-4 rounded text-sm  font-semibold mt-1">+ Add </button>
       </div>
     </div>
     <div className="flex items-start  gap-11 w-full mt-3">
       <label htmlFor="newfunctionality" className="text-sm  text-[#BFBFBF]">Add  New Functionality: </label>
       <div className="flex gap-2 flex-1 items-start">
        <div className="flex flex-col flex-1 ">
         <input
           type="text"
           id="newfunctionality"
           name="functionalityname"
           placeholder="Name of your functionality"
           value={newFunctionalityName}
           onChange={handleNewFunctionalityNameChange}
           className=" update-api-input flex-1"
         />
         <textarea
           id="newfunctionalitydes"
           placeholder="Describe your Functionnality here"
           name="functionalitydesc"
           value={newFunctionalityDescription}
           onChange={handleNewFunctionalityDescriptionChange}
           className="mt-1 update-api-input  pb-5"
         />
         </div>
         <button onClick={handleAddNewFunctionality} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 px-4 rounded text-sm  font-semibold py-2 ">
           + Add
         </button>
       </div>
     </div>
   </div>
 );
};

export default FunctionalitiesApi;