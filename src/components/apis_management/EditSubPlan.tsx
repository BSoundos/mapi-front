import CheckedBox from "@/components/ui/CheckedBox";
import CheckboxInput from "@/components/ui/CheckBoxInput";
import { updateSubscriptionPlan,fetchAllSubscriptionPlansByVersion } from "@/components/features/apis_management/subPlanSlice";
import { useAppDispatch } from "@/app/store";
import { EditSubPlanProps } from "@/types/EditSubPlanProps";
import { useState } from "react";



const EditSubPlan: React.FC<EditSubPlanProps> = ({
  setShowModal,
  editForm,
  setEditForm,
  versionId
}) => {
  const dispatch = useAppDispatch();
 
  const [showTypeChangeWarning, setShowTypeChangeWarning] = useState("");

  const handleEditPlanInputChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Number(value) : value;
    const prevType = editForm.type?.toLowerCase();
  
    if (name === 'type') {
      const newType = updatedValue.toLowerCase();
  
      if (prevType !== newType) {
        setShowTypeChangeWarning("If you change the plan type, you need to rewrite all the object values.");
      } else {
        setShowTypeChangeWarning("");
      }
  
      if (newType === 'pay_per_use') {
        setEditForm((prevData) => ({
          ...prevData,
          [name]: updatedValue,
          subscription_price: 0,
        }));
      } else {
        setEditForm((prevData) => ({
          ...prevData,
          [name]: updatedValue,
        }));
      }
    } else {
      setEditForm((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number, data: any) => {
    e.preventDefault(); 
    dispatch(updateSubscriptionPlan({ id, data }));
    dispatch(fetchAllSubscriptionPlansByVersion(versionId));
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
  <form onSubmit={(e) => handleSubmit(e, editForm.id, editForm)}>
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
        <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">{editForm.name} plan</h2>
        <div className="flex flex-col gap-6 px-3 ">
          <div className="mb-4 flex gap-6 items-center">
            <label htmlFor="namefeature" className="text-sm font-semibold text-mapi-text w-44">
              Plan type<span className='text-red-500 -mt-3'>*</span>
            </label>
            <div className="flex flex-col justify-start items-start gap-3 w-[80%]">
            <CheckboxInput
                      id="monthly"
                      name="type"
                      value="monthly"
                      checked={editForm.type?.toLowerCase() === "monthly"}
                      label="Monthly Subscription"
                      onChange={handleEditPlanInputChange}
                      disabled={false}
                    />
              <CheckboxInput
                      id="peruse"
                      name="type"
                      value="pay_per_use"
                      checked={editForm.type?.toLowerCase() === "pay_per_use"}
                      label="Pay Per Use"
                      onChange={handleEditPlanInputChange}
                      disabled={false}
                    />
                    <p className="text-mapi-text">{showTypeChangeWarning}</p>
            </div>
          </div>

          <div className="mb-4 flex gap-6 items-center">
  <label htmlFor="recommended" className="text-sm font-semibold text-mapi-text w-44">
    Recommended
  </label>
  <div className="flex justify-start items-center gap-3 w-[80%]">
    <input
      id="recommended"
      className="hidden"
      type="checkbox"
      checked={editForm.recommended}
      name="recommended"
      onChange={handleEditPlanInputChange}
    />
    <div
      className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
        editForm.recommended ? 'bg-primary-dark border-primary-dark' : ''
      }`}
      onClick={() => handleEditPlanInputChange({
        target: {
          name: 'recommended',
          value: !editForm.recommended,
        },
      })}
    >
      {editForm.recommended && (
       <CheckedBox/>
      )}
    </div>
  </div>
</div>

          <div className="mb-2 flex gap-6 items-center w-full">
            <label htmlFor="ratelimit" className="text-sm font-semibold text-mapi-text w-40 text-start ">
              Rate limit
            </label>
            <input
              id="ratelimit"
              name="rate_limit"
              type="number"
              min={0}
              value={editForm.rate_limit}
              onChange={handleEditPlanInputChange}
              className="add-plan w-1/2"
            />
          </div>
          {editForm.type?.toLowerCase() === "monthly" && (
            <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="pricesub" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Subscription Price
              </label>
              <input
                id="pricesub"
                name="subscription_price"
                type="number"
                min={0}
                step="10"
                value={editForm.subscription_price || ''}
                onChange={handleEditPlanInputChange}
                className="add-plan w-1/2"
              />
            </div>
          )}
          <div className="flex gap-2 justify-end mt-5">
            <button onClick={handleCancel} className="text-base py-2 px-4 text-white">
              Cancel
            </button>
            <button type="submit" className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white ">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
    </>
  );
};

export default EditSubPlan;