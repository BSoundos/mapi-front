// 


import CheckboxInput from "@/components/ui/CheckBoxInput";
import { useAppDispatch } from "@/app/store";
import { EditSubPlanProps } from "@/types/EditSubPlanProps";
import { useState, useEffect } from "react";
import { addPrivatePlan, fetchAllPrivatePlansByVersion, updatePrivatePlan } from "@/components/features/apis_management/privatePlanSlice";

const EditPrivatePlan: React.FC<EditSubPlanProps> = ({
  setShowModal,
  privatePlan,
  editing,
  versionId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState({
    name: editing ? privatePlan?.name : '',
    description:editing ? privatePlan.description:'',
    type: editing ? privatePlan?.type : 'monthly',
    rate_limit: editing ? privatePlan?.rate_limit : '',
    subscription_price: editing ? privatePlan?.subscription_price :0,
  });

  useEffect(() => {
    if (editing && privatePlan) {
      setEditForm({
        name: privatePlan.name,
        description:privatePlan.description,
        type: privatePlan.type,
        rate_limit: privatePlan.rate_limit,
        subscription_price: privatePlan.subscription_price,
      });
    }
  }, [editing, privatePlan]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? Number(value) : value;
    setEditForm((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (editing && privatePlan) {
      dispatch(updatePrivatePlan({ id: privatePlan.id, data:editForm }));
    } else {
      dispatch(addPrivatePlan({id:versionId, data:editForm}));
    }

    dispatch(fetchAllPrivatePlansByVersion(versionId));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">{(editing ? 'Edit Plan' : 'Add New Plan')}</h2>
            <div className="flex flex-col gap-6 px-3 ">
              <div className="mb-2 flex gap-6 items-center w-full">
                <label htmlFor="name" className="text-sm font-semibold text-mapi-text w-40">Name<span className='text-red-500 -mt-3'>*</span></label>
                <input type="text" id="name" name="name" required value={editForm.name} onChange={handleInputChange} className="add-plan w-1/2" />
              </div>
              <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="description" className="text-sm font-semibold text-mapi-text w-40">Description</label>
              <textarea id="description"  name="description" value={editForm.description} onChange={handleInputChange} className="add-plan w-1/2 h-20" />
            </div>
              <div className="mb-4 flex gap-6 items-center">
                <label htmlFor="typeplan" className="text-sm font-semibold text-mapi-text w-44">
                  Plan type<span className='text-red-500 -mt-3'>*</span>
                </label>
                <div className="flex flex-col justify-start items-start gap-3 w-[80%]">
                  <CheckboxInput
                    id="monthly"
                    name="type"
                    value="monthly"
                    checked={editForm.type?.toLowerCase() === "monthly"}
                    label="Monthly Subscription"
                    onChange={handleInputChange}
                    disabled={false}
                  />
                  <CheckboxInput
                    id="peruse"
                    name="type"
                    value="pay_per_use"
                    checked={editForm.type?.toLowerCase() === "pay_per_use"}
                    label="Pay Per Use"
                    onChange={handleInputChange}
                    disabled={false}
                  />
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
                  onChange={handleInputChange}
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
                    value={editForm.subscription_price}
                    onChange={handleInputChange}
                    className="add-plan w-1/2"
                  />
                </div>
              )}
              <div className="flex gap-2 justify-end mt-5">
                <button onClick={handleCancel} className="text-base py-2 px-4 text-white">
                  Cancel
                </button>
                <button type="submit" className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white ">
                  {editing ? "Save" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditPrivatePlan;