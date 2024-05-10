import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import Switch from "react-switch";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import Loading from "@/components/ui/Loading";
import ErrorLoading from "@/components/ErrorLoading";
import { RootState, useAppDispatch } from "@/app/store";
import { fetchCategories } from "@/components/features/apis/categoriesSlice";
import { getApi, removeApi, updateApi } from "@/components/features/apis_management/apiSlice";
import Navbar from "@/components/NavbarProvider";
import CategorySelect from "@/components/CategorySelect";
import CheckedBox from "@/components/ui/CheckedBox";
import FunctionalitiesApi from "@/components/apis_management/FunctionalitiesApi";
import CheckboxInput from "@/components/ui/CheckBoxInput";
import SideBarPro from "./SideBarPro";

export default function GeneralApi() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams<{ id: string }>();
  const api = useSelector((state: RootState) => state.apiProvider.api);
  const [formData, setFormData] = useState({
    name: api.name,
    category: api.category,
    description: api.description,
    is_visible: api.is_visible,
    functionalities: api.functionalities,
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getApi(id))
  }, [dispatch,id]); 
  useEffect(() => {
    setFormData({
      name: api.name,
      category: api.category,
      description: api.description,
      is_visible:api.is_visible,
    });
  }, [api]);

  const updateFormData = () => {
    setFormData({
      name: api.name,
      category: api.category,
      description: api.description,
      is_visible: api.is_visible,
      documentation_url:api.documentation_url,
      functionalities: api.functionalities,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    updateFormData();
  };

  const handleRadioButtonChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const [accept, setAccept] = useState(false);
  const handleCheckboxChange = () => {
    setAccept(!accept);
  };

  const handleUpdateApi = () => {
    dispatch(
      updateApi({
        id,
        data: {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          is_visible:formData.is_visible,
          functionalities: api.functionalities,
        },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateApi();
  };

  const handleDelete = async () => {
    if (isChecked) {
      try {
        await dispatch(removeApi(id));
        navigate("/my-apis");
      } catch (error) {
        console.error("Error deleting API:", error);
      }
    } else {
      alert("Please confirm your decision to delete the API project.");
    }
  };

  return (
    <div className="flex ">
      <SideBarPro />
      <div className="bg-mapi-neutral-2 flex-1  ">
        <Navbar id={id} />
        {!api.loading ? (
          <div className="overflow-y-auto max-h-[80vh] w-fit  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
            <div className="container px-5 w-3/4 mt-5 ">
              <h2 className="pl-8 text-white text-2xl font-bold">General Informations</h2>
              <form>
                <div className="mt-5 ">
                  <div className="flex flex-col gap-2 px-3 ">
                    <div className="mb-2 flex flex-col gap-1">
                      <label htmlFor="name" className="block text-sm font-semibold text-[#BFBFBF] ">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name of api"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 update-api-input w-1/2"
                      />
                    </div>
                    <div className="mb-2 flex flex-col gap-1">
                      <label htmlFor="documentation" className="block text-sm font-semibold text-[#BFBFBF] ">
                        Documentation Url
                      </label>
                      <input
                        type="text"
                        id="documentation_url"
                        name="documentation_url"
                        placeholder="Documentation of api"
                        required
                        value={formData.documentation_url}
                        onChange={handleInputChange}
                        className="mt-1 update-api-input w-1/2"
                      />
                    </div>
                    <div className="mb-2 flex flex-col gap-1 w-1/2 ">
                      <label htmlFor="category" className="block text-sm font-semibold text-[#BFBFBF]">
                        Category
                      </label>
                      <CategorySelect
                        value={formData.category}
                        onChange={(value) => setFormData({ ...formData, category: value })}
                        style="update-api-input"
                      />
                    </div>
                    <div className="mb-3 flex flex-col gap-1">
                      <label htmlFor="description" className="block text-sm font-semibold text-[#BFBFBF]">
                        Description
                      </label>
                      <textarea
                        id="description"
                        placeholder="Describe your API here"
                        name="description"
                        value={formData.description}
                        required
                        onChange={handleInputChange}
                        className="mt-1 update-api-input w-3/4 pb-5"
                      />
                    </div>
                    {/* <div className="mb-3 flex flex-col gap-2 items-start ">
                      <label htmlFor="visibily" className="block text-sm font-semibold text-[#BFBFBF]">
                        Visibilty
                      </label>
                      <div className="flex  items-center ">
                        {api?.is_visible ? (
                          <div className="flex  items-center mt-3">
                            <IoMdUnlock className="text-[#99BDE6] text-opacity-85" size={20} />
                            <p className="text-white font-semibold ">API Project is Public</p>
                          </div>
                        ) : (
                          <div className="flex-col gap-2">
                            <div className="flex  items-center mt-3 gap-2">
                              <IoMdLock className="text-[#99BDE6] text-opacity-85 " size={25} />
                              <p className="text-white font-semibold ">API Project is Private</p>
                            </div>
                            <p className="text-mapi-text text-sm mt-3 ml-1">
                              It's not visible on the Hub and new users can't access it
                            </p>
                            <div className="flex  items-center mt-3 gap-2 ml-1">
                              <div className="flex justify-start items-center  ">
                                <input
                                  id="accept"
                                  className="hidden"
                                  type="checkbox"
                                  name="accept"
                                  checked={accept}
                                  onChange={handleCheckboxChange}
                                  />
                               <div
                                 className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
                                   accept ? 'bg-primary-dark border-primary-dark' : ''
                                 }`}
                                 onClick={handleCheckboxChange}
                               >
                                 {accept && (
                                 <CheckedBox/>
                                 )}
                               </div>
                             </div>
                             <p className="text-mapi-text">
                               I confirm that I own or have rights to publish this API.
                             </p>
                           </div>
                         </div>
                       )}
                     </div>
                     <div className="flex items-center gap-2 mt-3 ml-1">
                       <p className="text-mapi-text text-sm">Set to visible:</p>
                       <Switch
                         checked={api?.is_visible}
                         onChange={handleInputChange}
                         onColor="#3B73CE"
                         onHandleColor="#1F1F1F"
                         handleDiameter={8}
                         uncheckedIcon={false}
                         checkedIcon={false}
                         height={15}
                         width={28}
                         className="react-switch mt-1"
                         id="material-switch visibility"
                       />
                     </div>
                   </div> */}
                   <FunctionalitiesApi
                     api={id}
                     functionalities={api?.functionalities}
                   />
                   <div className="flex flex-col gap-3 ">
                     <div className="flex flex-col gap-2 w-3/4">
                       <h4 className="text-white text-base font-semibold">Delete API Project</h4>
                       <p className="text-[#757575] text-sm">
                         Permanently deleting this API project will remove it from the Mapi Hub
                         Listing, will destroy your team's data from Requests, Testing and
                         Descriptions. This action is not reversible.
                       </p>
                     </div>
                     <div className="flex gap-2">
                     <CheckboxInput
                        id="delete"
                        name="delete-api"
                        value={isChecked}
                        checked={isChecked}
                        label=""
                        onChange={handleRadioButtonChange}
                        disabled={false}
                        />
                       <span className="text-[#757575] text-sm">I confirmed my decision</span>
                     </div>
                     <button
                       onClick={handleDelete}
                       className={`text-sm text-white border-none rounded-md ${
                         isChecked ? 'bg-red-600' : 'bg-red-400'
                       } w-1/3 p-3`}
                     >
                       Delete API Project
                     </button>
                   </div>
                   <div className="fixed bottom-0 z-50 left-[calc(70%-48%)] border-t border-opacity-30 border-[#7E89AC] w-[42%] py-4 justify-end flex gap-2">
                     <button onClick={handleCancel} className="text-base py-2 px-4 text-white">
                       Cancel
                     </button>
                     <button
                       onClick={handleSubmit}
                       className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
                     >
                       Save
                     </button>
                   </div>
                 </div>
               </div>
             </form>
           </div>
         </div>
       ) : api.loading ? (
         <Loading />
       ) : api.error ? (
         <ErrorLoading />
       ) : null}
     </div>
   </div>
 );
}