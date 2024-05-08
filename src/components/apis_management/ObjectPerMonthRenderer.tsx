import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updateObjectPerMonth, createObjectPerMonth, removeObjectPerMonth } from '@/components/features/apis_management/objectPerMonthSlice';
import CheckboxInput from '@/components/ui/CheckBoxInput';
import { RootState } from '@/app/store';
import { useAppDispatch } from '@/app/store';
import { ObjectPerMonthProps } from '@/types/ObjectPerMonthProps';



const ObjectPerMonthRenderer: React.FC<ObjectPerMonthProps & { isSubPlan: boolean }> = ({ object, subscriptionPlan ,isSubPlan}) => {
  const dispatch = useAppDispatch();
  const objectMonthly = useSelector((state: RootState) => isSubPlan ? state.objectPerMonth.objectPerMonthData : state.objectPerMonth.objectPerMonthUser);  
  const objectMonthlyData = 
  isSubPlan ? objectMonthly.find((data) => data.object_id === object.id)?.object_monthly.find((item) => item.subscription_plan === subscriptionPlan.id):
  objectMonthly.find((data) => data.object_id === object.id)?.object_monthly.find((item) => item.user_plan === subscriptionPlan.id);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [formData, setFormData] = useState(objectMonthlyData || {
    quota_type: 'unlimited',
    quota_limit: '',
    limit_type: 'soft',
    average_usage: 0,
  });

  
  const toggleAddRequestModal = () => {
    setShowAddRequestModal(!showAddRequestModal);
    setFormData(objectMonthlyData || {
      quota_type: 'unlimited',
      quota_limit: '',
      limit_type: 'soft',
      average_usage: 0,
    })
  };

  const handleAddRequestInputChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Number(value) : value;
  
    if (name === 'limit_type' && updatedValue === 'hard') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
        average_usage: 0, 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
  };
  const handleCreate = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(createObjectPerMonth({ objectId: object.id, planId: subscriptionPlan.id, planType, data: formData }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleUpdate = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(updateObjectPerMonth({ id: objectMonthlyData.id, data: formData, planType }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleDelete = () => {
    const planType = isSubPlan ? 'sub' : 'user';
    dispatch(removeObjectPerMonth({ id: objectMonthlyData.id, planType }));
    setShowAddRequestModal(!showAddRequestModal);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!objectMonthlyData) {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  return (
    <div>
      {!objectMonthlyData ? (
        <div className="flex-1 text-center pl-14">
          <button
            className="w-8 h-8 rounded text-2xl bg-[#1F1F1F] border border-[#616161] flex justify-center items-center text-mapi-text pb-1"
            onClick={toggleAddRequestModal}
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex gap-1 flex-1 justify-center items-center cursor-pointer -ml-10 " onClick={toggleAddRequestModal}>
          <div className="underline text-mapi-text font-semibold text-sm">{objectMonthlyData.quota_limit}</div>
          <div className="text-xs py-1 px-2 rounded-full text-[#99BDE6] bg-[#2C5EAF] bg-opacity-15">Quota</div>
        </div>
      )}

{showAddRequestModal && (
        <form>
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
              <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">{subscriptionPlan.name} / {object.name}</h2>
              <div className="flex flex-col gap-6 px-3 ">
                <div className="mb-4 flex gap-6 items-center">
                  <label htmlFor="quota-type" className="text-sm font-semibold text-mapi-text w-44">Quota Type<span className='text-red-500 -mt-3'>*</span></label>
                  <div className="flex flex-col justify-start items-start gap-3 w-[80%]">
            <CheckboxInput
              id="unlimited"
              name="quota_type"
              value="unlimited"
              checked={formData.quota_type === 'unlimited'}
              label="Unlimited"
              onChange={handleAddRequestInputChange}
              disabled={true}
            />
            <CheckboxInput
              id="monthly"
              name="quota_type"
              value="monthly"
              checked={formData.quota_type === 'monthly'}
              label="Monthly"
              onChange={handleAddRequestInputChange}
              disabled={false}
            />
            <CheckboxInput
              id="daily"
              name="quota_type"
              value="daily"
              checked={formData.quota_type === 'daily'}
              label="Daily"
              onChange={handleAddRequestInputChange}
              disabled={false}
            />
          </div>
                  
                </div>
                {(formData.quota_type !== "unlimited" && objectMonthlyData || formData.quota_type !== "unlimited") ? (
                  <>
                    <div className="mb-2 flex gap-6 items-center w-full">
                      <label htmlFor="quota-limit" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                        Quota limit<span className='text-red-500 -mt-3'>*</span>
                      </label>
                      <input
                        id="quota-limit"
                        type="number"
                        min={0}
                        name="quota_limit"
                        value={formData.quota_limit}
                        onChange={handleAddRequestInputChange}
                        className="add-plan w-1/2"
                        required
                      />
                    </div>
                    <div className="mb-4 flex gap-6 items-center">
                      <label htmlFor="quota-type" className="text-sm font-semibold text-mapi-text w-44">
                        Limit Type<span className='text-red-500 -mt-3'>*</span>
                      </label>
                      <div className="flex  flex-col justify-start items-start gap-3 w-[80%]">
                        <CheckboxInput
                          id="hard"
                          name="limit_type"
                          value="hard"
                          checked={formData.limit_type === "hard"}
                          label="Hard Limit"
                          onChange={handleAddRequestInputChange}
                          disabled={false}
                        />
                        <CheckboxInput
                          id="soft"
                          name="limit_type"
                          value="soft"
                          checked={formData.limit_type === 'soft'}
                          label="Soft Limit"
                          onChange={handleAddRequestInputChange}
                          disabled={false}
                        />
                      </div>
                    </div>
                    {(formData.limit_type !== "hard") ? (
                    <div className="mb-2 flex gap-6 items-center w-full">
                      <label htmlFor="average" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                        Average Usage
                      </label>
                      <input
                        id="average"
                        type="number"
                        min={0}
                        name="average_usage"
                        value={formData.average_usage}
                        onChange={handleAddRequestInputChange}
                        className="add-plan w-1/2"
                      />
                    </div>):null}
                    </>
                  ) : null}
            <div className="flex w-full justify-between">
            {objectMonthlyData &&
            <button onClick={handleDelete} className="text-base py-2 mt-5 px-4 text-white bg-red-600 rounded-md font-semibold">
                    Delete
            </button>}
                <div className="flex gap-2 justify-end mt-5 flex-1">
                  <button onClick={toggleAddRequestModal} className="text-base py-2 px-4 text-white">
                    Cancel
                  </button>
                <button
                  onClick={handleFormSubmit}
                  disabled={formData.quota_type === "unlimited"}
                  className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
                >
                  {objectMonthlyData ? 'Save' : 'Create'}
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

export default ObjectPerMonthRenderer;