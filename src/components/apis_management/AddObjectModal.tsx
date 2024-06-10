import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import { AddObjectProps } from "@/types/AddObjectProps";
import { AddObject } from "@/components/features/apis_management/objectSlice";
import { useSelector } from "react-redux";



const AddObjectModal: React.FC<AddObjectProps> = ({
  showModal,
  setShowModal,
  versionId
}) => {
    const dispatch=useAppDispatch();
    const [addObjectFormData, setAddObjectFormData] = useState({
        name: '',
        description: '',
        endpoints:[],
        });
    const toggleAddObjectModal = () => {
        setShowModal(!showModal);
        setAddObjectFormData({
            name: '',
            description: '',
            endpoints:[],
          })
        };
    const handleAddObjectInputChange = (e) => {
        if (e.target.name === 'endpoints') {
            const selectedOptions = Array.from(
            e.target.selectedOptions
            ).map((option:HTMLOptionElement) => option.value);
            setAddObjectFormData({ ...addObjectFormData, [e.target.name]: selectedOptions });
        } else {
            setAddObjectFormData({ ...addObjectFormData, [e.target.name]: e.target.value });
        }
    };
        
    const endpoints = useSelector((state:RootState)=>state.endpoints.endpoints);

    const handleAddObject=(e:React.FormEvent)=>{
        e.preventDefault();
        dispatch(AddObject({id:versionId,data:addObjectFormData}))
        setShowModal(false)
    }

  return (
    <>
        <form>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">Add Service</h2>
            <div className="flex flex-col gap-2 px-3 ">
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="name" className="text-sm font-semibold text-mapi-text flex-1">Name</label>
              <input type="text" id="name" name="name" required value={addObjectFormData.name} onChange={handleAddObjectInputChange}  className="add-plan w-4/5" />
            </div>
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="description" className="text-sm font-semibold text-mapi-text flex-1">Description</label>
              <textarea id="description"  name="description" value={addObjectFormData.description} onChange={handleAddObjectInputChange} className="add-plan w-4/5 h-40" />
            </div>
            <div className="mb-2 flex gap-6 items-center">
              <label htmlFor="endpoint" className="text-sm font-semibold text-mapi-text flex-1">Associated Endpoints</label>
              <select id="endpoint" multiple multiselect-search="true" multiselect-select-all="true"  name="endpoints"  onChange={handleAddObjectInputChange} className="add-plan w-4/5 multiselect">
                <option value="" disabled>Select Endpoints</option>
                {endpoints.map((endpoint) => (
                    <option key={endpoint.endpoint_id} value={endpoint.endpoint_id}>
                      {endpoint.title}
                     </option>
                 ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end mt-5">
            <button onClick={toggleAddObjectModal} className="text-base py-2 px-4 text-white">
             Cancel
           </button>
            <button  onClick={handleAddObject} className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white ">
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

export default AddObjectModal;