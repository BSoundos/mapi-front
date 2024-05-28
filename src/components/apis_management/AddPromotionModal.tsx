import { RootState, useAppDispatch } from "@/app/store";
import { EditSubPlanProps } from "@/types/EditSubPlanProps";
import { useState, useEffect } from "react";
import { addPromotion,  clearPromotionError,  removePromotion,  updatePromotion } from "@/components/features/apis_management/promotionSlice";
import { useSelector } from "react-redux";
import CheckedBox from "../ui/CheckedBox";

const AddPromotionModal: React.FC<EditSubPlanProps> = ({
  setShowModal,
  subId
}) => {
    const promotions = useSelector((state: RootState) => state.promotion);
    const dispatch = useAppDispatch();
  
    const [promotionSelected, setPromotionSelected] = useState(null);
    const [editForm, setEditForm] = useState({
      name: 'dd',
      description: 'dd',
      start_date: '',
      end_date: '',
      discount_amount: 0,
      is_active: false,
    });
  
    useEffect(() => {
      const promotion = promotions.promotions.find(
        (promotion) => promotion.subscription_plan === subId
      );
  
      if (promotion) {
        setPromotionSelected(promotion);
        setEditForm({
          name: promotion.name,
          description: promotion.description,
          start_date: promotion.start_date,
          end_date: promotion.end_date,
          discount_amount: promotion.discount_amount,
          is_active: promotion.is_active,
        });
      } else {
        setPromotionSelected(null);
        setEditForm({
          name: 'dd',
          description: 'dd',
          start_date: '',
          end_date: '',
          discount_amount: 0,
          is_active: false,
        });
      }
    }, [promotions.promotions, subId]);
  
    const planError = useSelector((state: RootState) => state.promotion.error);
    const [error, setError] = useState("");
  
    const handleInputChange = (e) => {
        if (planError) {
          dispatch(clearPromotionError());
        }
        const { name, value, type,checked } = e.target;
        setEditForm((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
          }));
        setError("");
      };
  
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let isValid = true;
        let errorMessage = "";
      
        if (editForm.discount_amount <= 0) {
          isValid = false;
          errorMessage = "Discount amount must be greater than 0.";
        }
      
        if (
          new Date(editForm.end_date) <= new Date(editForm.start_date) &&
          editForm.end_date !== "" &&
          editForm.start_date !== ""
        ) {
          isValid = false;
          errorMessage = "End date must be greater than start date.";
        }
      
        if (isValid) {
          if (promotionSelected) {
            dispatch(updatePromotion({ id: promotionSelected.id, data: editForm }));
          } else {
            dispatch(addPromotion({ id: subId, data: editForm }));
          }
          setShowModal(false);
        } else {
          setError(errorMessage);
        }
      };
  
    const handleCancel = () => {
      setShowModal(false);
    };
    const handleDelete =() =>{
        dispatch(removePromotion(promotionSelected.id));
        handleCancel();
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">{(promotionSelected ? 'Edit Plan' : 'Add New Plan')}</h2>
            <div className="flex flex-col gap-6 px-3 ">
            {(error || planError) && ( 
              <p className="text-red-500 mb-4">{error || planError}</p>
            )} 
              <div className="mb-2 flex gap-6 items-center w-full">
                <label htmlFor="discount_amount" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Promotion Pourcentage
                </label>
                <input
                  id="discount_amount"
                  name="discount_amount"
                  type="number"
                  min={0}
                  value={editForm.discount_amount}
                  onChange={handleInputChange}
                  className="add-plan w-1/2"
                />
              </div>
              <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="start-date" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                name="start_date"
                value={editForm.start_date}
                onChange={handleInputChange}
                className="add-plan w-1/2"
                required
              />
             </div>
             <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="end-date" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                name="end_date"
                value={editForm.end_date}
                onChange={handleInputChange}
                className="add-plan w-1/2"
                required
              />
             </div>
             <div className="mb-4 flex gap-6 items-center">
                <label htmlFor="isactive" className="text-sm font-semibold text-mapi-text w-44">
                  Active<span className='text-red-500 -mt-3'>*</span>
                </label>
                <div className="flex justify-start items-center gap-3 w-[80%] ml-4">
                <input
                id="isactive"
                className="hidden"
                type="checkbox"
                checked={editForm.is_active}
                name="is_active"
                onChange={handleInputChange}
                />
                <div
                className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
                    editForm.is_active ? 'bg-primary-dark border-primary-dark' : ''
                }`}
                onClick={() => handleInputChange({
                    target: {
                    name: 'is_active',
                    value: !editForm.is_active,
                    },
                })}
                >
                {editForm.is_active && (
                <CheckedBox/>
                )}
                </div>
            </div>
              </div>
                    <div className="flex  justify-between mt-5 w-full">
                    {promotionSelected&&
                    <button onClick={handleDelete} className="text-base py-2 px-4 text-white bg-red-600 rounded-md mt-5">
                     Delete
                    </button>
                    }
                <div className="flex flex-1 gap-2 justify-end mt-5">
                        <button onClick={handleCancel} className="text-base py-2 px-4 text-white">
                        Cancel
                        </button>
                        <button type="submit" className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white ">
                        {promotionSelected ? "Save" : "Add"}
                        </button>
                    </div>
                    </div>
          
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPromotionModal;