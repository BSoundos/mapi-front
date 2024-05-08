import { useState } from 'react';
import {useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/store';
import { createObjectPerUse, removeObjectPerUse, updateObjectPerUse } from '@/components/features/apis_management/objectPerUseSlice';
import { ObjectPerUseProps } from '@/types/ObjectPerUseProps';



const ObjectPerUseRenderer: React.FC<ObjectPerUseProps & { isSubPlan: boolean }> = ({ object, subscriptionPlan,isSubPlan }) => {
  const dispatch = useAppDispatch();
  const objectPerUse = useSelector((state: RootState) => isSubPlan ? state.objectPerUse.objectPerUseData :state.objectPerUse.objectPerUseUser);
  const objectPerUseData = isSubPlan ? 
  objectPerUse.find((data) => data.object_id === object.id)?.object_per_use.find((item) => item.subscription_plan === subscriptionPlan.id)
  :objectPerUse.find((data) => data.object_id === object.id)?.object_per_use.find((item) => item.user_plan === subscriptionPlan.id);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [formData, setFormData] = useState(objectPerUseData || {
    price:'',
  });

  
  const toggleAddRequestModal = () => {
    setShowAddRequestModal(!showAddRequestModal);
    setFormData(objectPerUseData || {
      price:'',
    })
  };

  const handleAddRequestInputChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Number(value) : value;
    setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
  };
  const handleCreate = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(createObjectPerUse({ objectId: object.id, planId: subscriptionPlan.id, planType, data: formData }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleUpdate = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(updateObjectPerUse({ id: objectPerUseData.id, data: formData, planType }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleDelete = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(removeObjectPerUse({ id: objectPerUseData.id, planType }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!objectPerUseData) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };
  return (
    <div>
      {!objectPerUseData ? (
        <div className="flex-1 text-center pl-14">
          <button
            className="w-8 h-8 rounded text-2xl bg-[#1F1F1F] border border-[#616161] flex justify-center items-center text-mapi-text pb-1"
            onClick={toggleAddRequestModal}
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex gap-1 flex-1 justify-center items-center cursor-pointer -ml-10" onClick={toggleAddRequestModal}>
          <div className="underline text-mapi-text font-semibold text-sm">{objectPerUseData.price}/use</div>
        </div>
      )}

{showAddRequestModal && (
        <form>
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
              <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">{subscriptionPlan.name} / {object.name}</h2>
              <div className="flex flex-col gap-6 px-3 ">
              <div className="mb-2 flex gap-6 items-center w-full">
                      <label htmlFor="quota-limit" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                        Price<span className='text-red-500 -mt-3'>*</span>
                      </label>
                      <input
                        id="price"
                        type="number"
                        min={0}
                        name="price"
                        value={formData.price}
                        onChange={handleAddRequestInputChange}
                        className="add-plan w-1/2"
                        required
                      />
                    </div>
            <div className="flex w-full justify-between">
            {objectPerUseData &&
            <button onClick={handleDelete} className="text-base py-2 mt-5 px-4 text-white bg-red-600 rounded-md font-semibold">
                    Delete
            </button>}
                <div className="flex gap-2 justify-end mt-5 flex-1">
                  <button onClick={toggleAddRequestModal} className="text-base py-2 px-4 text-white">
                    Cancel
                  </button>
                <button
                  onClick={handleFormSubmit}
                  className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
                >
                  {objectPerUseData ? 'Save' : 'Create'}
                </button>
                </div>
            </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ObjectPerUseRenderer;