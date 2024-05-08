import { EditObjectProps } from "@/types/EditObjectProps";
import { removeObject,updateObject } from "@/components/features/apis_management/objectSlice";
import { useAppDispatch } from "@/app/store";




const EditObjectModal: React.FC<EditObjectProps> = ({
  setShowModal,
  editForm,
  setEditForm,
  objectId
}) => {
  const dispatch = useAppDispatch();
 
  const handleEditObjectInputChange = (e) => {
    if (e.target.name === 'endpoints') {
        const selectedOptions = Array.from(
        e.target.selectedOptions
        ).map((option) => option.value);
        setEditForm({ ...editForm, [e.target.name]: selectedOptions });
    } else {
       setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeObject(objectId))
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const handleEditObject = (e) => {
  e.preventDefault();
  dispatch(updateObject({id:objectId,data:editForm}));
  }

  return (
    <>
  <form>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">Add Object</h2>
            <div className="flex flex-col gap-2 px-3 ">
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="name" className="text-sm font-semibold text-mapi-text flex-1">Name<span className='text-red-500 -mt-3'>*</span></label>
              <input type="text" id="name" name="name" required value={editForm.name} onChange={handleEditObjectInputChange}  className="add-plan w-4/5" />
            </div>
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="description" className="text-sm font-semibold text-mapi-text flex-1">Description</label>
              <textarea id="description"  name="description" value={editForm.description} onChange={handleEditObjectInputChange} className="add-plan w-4/5 h-40" />
            </div>
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="endpoint" className="text-sm font-semibold text-mapi-text flex-1">Associated Endpoints</label>
              <select id="endpoint" multiple multiselect-search="true" multiselect-select-all="true"  name="endpoints"  onChange={handleEditObjectInputChange} className="add-plan w-4/5 multiselect">
                <option value="">Select Endpoints</option>
                <option value="1">zouj</option>
                <option value="2">tlata</option>
              </select>
            </div>
            <div className="flex  justify-between mt-5 w-full">
            <button onClick={handleDelete} className="text-base py-2 px-4 text-white bg-red-600 rounded-md">
             Delete
           </button>
           <div className="flex gap-2 flex-1 justify-end">
            <button onClick={handleCancel} className="text-base py-2 px-4 text-white">
             Cancel
           </button>
            <button  onClick={handleEditObject} className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white ">
             Save
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

export default EditObjectModal;